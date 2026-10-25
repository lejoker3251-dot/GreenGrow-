import { DurableObject } from "cloudflare:workers";

type PackLine = { productId: string; seedsPerPack: number; packCount: number };
type Requirement = { productId: string; seedsRequired: number };
declare global {
  interface Env {
    INVENTORY_LEDGER: DurableObjectNamespace<InventoryLedger>;
    SPIKE_TEST_MODE?: string;
    RESERVATION_TTL_SECONDS?: string;
  }
}

function json(data: unknown, status = 200): Response {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

function validId(value: unknown): value is string {
  return typeof value === "string" && /^[a-zA-Z0-9_-]{1,100}$/.test(value);
}

function parseLines(value: unknown): { ok: true; requirements: Requirement[] } | { ok: false; error: string } {
  if (!Array.isArray(value) || value.length === 0 || value.length > 100) {
    return { ok: false, error: "INVALID_LINES" };
  }
  const totals = new Map<string, number>();
  for (const raw of value) {
    if (!raw || typeof raw !== "object") return { ok: false, error: "INVALID_LINE" };
    const line = raw as Partial<PackLine>;
    if (!validId(line.productId)) return { ok: false, error: "INVALID_PRODUCT_ID" };
    if (!Number.isSafeInteger(line.seedsPerPack) || (line.seedsPerPack ?? 0) <= 0 ||
        !Number.isSafeInteger(line.packCount) || (line.packCount ?? 0) <= 0) {
      return { ok: false, error: "INVALID_QUANTITY" };
    }
    const required = (line.seedsPerPack as number) * (line.packCount as number);
    const total = (totals.get(line.productId) ?? 0) + required;
    if (!Number.isSafeInteger(required) || !Number.isSafeInteger(total)) {
      return { ok: false, error: "QUANTITY_OVERFLOW" };
    }
    totals.set(line.productId, total);
  }
  return { ok: true, requirements: [...totals].map(([productId, seedsRequired]) => ({ productId, seedsRequired })) };
}

export class InventoryLedger extends DurableObject<{ SPIKE_TEST_MODE?: string; RESERVATION_TTL_SECONDS?: string }> {
  private readonly sql: SqlStorage;

  constructor(ctx: DurableObjectState, env: { SPIKE_TEST_MODE?: string }) {
    super(ctx, env);
    this.sql = this.ctx.storage.sql;
    this.sql.exec(`CREATE TABLE IF NOT EXISTS inventory (
      product_id TEXT PRIMARY KEY,
      on_hand_seeds INTEGER NOT NULL CHECK(on_hand_seeds >= 0),
      reserved_seeds INTEGER NOT NULL DEFAULT 0 CHECK(reserved_seeds >= 0 AND reserved_seeds <= on_hand_seeds),
      updated_at TEXT NOT NULL
    )`);
    this.sql.exec(`CREATE TABLE IF NOT EXISTS reservations (
      reservation_id TEXT PRIMARY KEY,
      idempotency_key TEXT NOT NULL UNIQUE,
      request_fingerprint TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('reserved','released','expired')),
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      expires_at TEXT
    )`);
    const reservationColumns = this.sql.exec<{ name: string }>("PRAGMA table_info(reservations)").toArray();
    if (!reservationColumns.some((column) => column.name === "expires_at")) {
      this.sql.exec("ALTER TABLE reservations ADD COLUMN expires_at TEXT");
    }
    this.sql.exec(`CREATE TABLE IF NOT EXISTS reservation_lines (
      reservation_id TEXT NOT NULL REFERENCES reservations(reservation_id),
      product_id TEXT NOT NULL,
      seeds_required INTEGER NOT NULL CHECK(seeds_required > 0),
      PRIMARY KEY(reservation_id, product_id)
    )`);
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/health") {
      return json({ ok: true, service: "inventory-spike", mode: "isolated-prototype" });
    }
    if (request.method === "POST" && url.pathname === "/__test/seed") {
      if (this.env.SPIKE_TEST_MODE !== "true") return json({ error: "NOT_FOUND" }, 404);
      return this.seedForTest(request);
    }
    if (request.method === "POST" && url.pathname === "/reserve") return this.reserve(request);
    if (request.method === "POST" && url.pathname === "/release") return this.release(request);
    return json({ error: "NOT_FOUND" }, 404);
  }

  private async seedForTest(request: Request): Promise<Response> {
    let body: unknown;
    try { body = await request.json(); } catch { return json({ error: "INVALID_JSON" }, 400); }
    const items = (body as { items?: unknown })?.items;
    if (!Array.isArray(items) || items.length === 0 || items.length > 200) return json({ error: "INVALID_ITEMS" }, 400);
    const normalized: Array<{ productId: string; quantity: number }> = [];
    for (const item of items) {
      if (!item || !validId(item.productId) || !Number.isSafeInteger(item.quantity) || item.quantity < 0) {
        return json({ error: "INVALID_STOCK" }, 400);
      }
      normalized.push({ productId: item.productId, quantity: item.quantity });
    }
    this.ctx.storage.transactionSync(() => {
      const now = new Date().toISOString();
      for (const item of normalized) {
        this.sql.exec(
          `INSERT INTO inventory(product_id,on_hand_seeds,reserved_seeds,updated_at) VALUES(?,?,0,?)
           ON CONFLICT(product_id) DO UPDATE SET on_hand_seeds=excluded.on_hand_seeds,
           reserved_seeds=0,updated_at=excluded.updated_at`,
          item.productId, item.quantity, now
        );
      }
    });
    return json({ ok: true, seededProducts: normalized.length });
  }

  private async reserve(request: Request): Promise<Response> {
    let body: { idempotencyKey?: unknown; lines?: unknown };
    try { body = await request.json() as typeof body; } catch { return json({ error: "INVALID_JSON" }, 400); }
    if (!body || typeof body !== "object" || typeof body.idempotencyKey !== "string" ||
        !/^[a-zA-Z0-9_-]{8,128}$/.test(body.idempotencyKey)) {
      return json({ error: "INVALID_IDEMPOTENCY_KEY" }, 400);
    }
    const parsed = parseLines(body.lines);
    if (!parsed.ok) return json({ error: parsed.error }, 400);
    const canonical = JSON.stringify(parsed.requirements.slice().sort((a, b) => a.productId.localeCompare(b.productId)));
    const fingerprint = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(canonical))
      .then((hash) => [...new Uint8Array(hash)].map((byte) => byte.toString(16).padStart(2, "0")).join(""));
    const reservationId = crypto.randomUUID();
    const now = new Date();
    const nowIso = now.toISOString();
    const configuredTtl = Number(this.env.RESERVATION_TTL_SECONDS ?? "900");
    const ttlSeconds = Number.isSafeInteger(configuredTtl) && configuredTtl >= 1 && configuredTtl <= 86400 ? configuredTtl : 900;
    const expiresAt = new Date(now.getTime() + ttlSeconds * 1000).toISOString();

    const outcome = this.ctx.storage.transactionSync(() => {
      this.expireDueReservations(nowIso);
      const previous = this.sql.exec<{ reservation_id: string; request_fingerprint: string; status: string }>(
        "SELECT reservation_id, request_fingerprint, status FROM reservations WHERE idempotency_key = ?",
        body.idempotencyKey as string
      ).toArray()[0];
      if (previous) {
        if (previous.request_fingerprint !== fingerprint) return { kind: "conflict" as const };
        return { kind: "existing" as const, reservationId: previous.reservation_id, status: previous.status };
      }

      for (const item of parsed.requirements) {
        const row = this.sql.exec<{ on_hand_seeds: number; reserved_seeds: number }>(
          "SELECT on_hand_seeds, reserved_seeds FROM inventory WHERE product_id = ?", item.productId
        ).toArray()[0];
        if (!row) return { kind: "unknown-product" as const, productId: item.productId };
        if (row.on_hand_seeds - row.reserved_seeds < item.seedsRequired) {
          return { kind: "insufficient" as const, productId: item.productId, available: row.on_hand_seeds - row.reserved_seeds, required: item.seedsRequired };
        }
      }

      this.sql.exec(
        "INSERT INTO reservations(reservation_id,idempotency_key,request_fingerprint,status,created_at,updated_at,expires_at) VALUES(?,?,?,'reserved',?,?,?)",
        reservationId, body.idempotencyKey as string, fingerprint, nowIso, nowIso, expiresAt
      );
      for (const item of parsed.requirements) {
        const update = this.sql.exec(
          "UPDATE inventory SET reserved_seeds = reserved_seeds + ?, updated_at = ? WHERE product_id = ? AND on_hand_seeds - reserved_seeds >= ?",
          item.seedsRequired, now, item.productId, item.seedsRequired
        );
        if (update.rowsWritten !== 1) throw new Error("INVENTORY_CONDITION_FAILED");
        this.sql.exec(
          "INSERT INTO reservation_lines(reservation_id,product_id,seeds_required) VALUES(?,?,?)",
          reservationId, item.productId, item.seedsRequired
        );
      }
      return { kind: "created" as const, reservationId };
    });

    if (outcome.kind === "conflict") return json({ error: "IDEMPOTENCY_KEY_REUSED_WITH_DIFFERENT_REQUEST" }, 409);
    if (outcome.kind === "unknown-product") return json({ error: "UNKNOWN_PRODUCT", productId: outcome.productId }, 404);
    if (outcome.kind === "insufficient") return json({ error: "INSUFFICIENT_STOCK", ...outcome }, 409);
    return json({ ok: true, reservationId: outcome.reservationId, status: outcome.kind === "existing" ? outcome.status : "reserved", replay: outcome.kind === "existing" }, outcome.kind === "existing" && outcome.status !== "reserved" ? 409 : 200);
  }

  private expireDueReservations(now: string): void {
    const expired = this.sql.exec<{ reservation_id: string }>(
      "SELECT reservation_id FROM reservations WHERE status='reserved' AND expires_at IS NOT NULL AND expires_at <= ?",
      now
    ).toArray();
    for (const item of expired) {
      const lines = this.sql.exec<{ product_id: string; seeds_required: number }>(
        "SELECT product_id, seeds_required FROM reservation_lines WHERE reservation_id = ?",
        item.reservation_id
      ).toArray();
      for (const line of lines) {
        const update = this.sql.exec(
          "UPDATE inventory SET reserved_seeds = reserved_seeds - ?, updated_at = ? WHERE product_id = ? AND reserved_seeds >= ?",
          line.seeds_required, now, line.product_id, line.seeds_required
        );
        if (update.rowsWritten !== 1) throw new Error("RESERVATION_EXPIRY_INVARIANT_FAILED");
      }
      this.sql.exec("UPDATE reservations SET status='expired', updated_at=? WHERE reservation_id=? AND status='reserved'", now, item.reservation_id);
    }
  }

  private async release(request: Request): Promise<Response> {
    let body: { reservationId?: unknown };
    try { body = await request.json() as typeof body; } catch { return json({ error: "INVALID_JSON" }, 400); }
    if (typeof body?.reservationId !== "string") return json({ error: "INVALID_RESERVATION_ID" }, 400);
    const now = new Date().toISOString();
    const result = this.ctx.storage.transactionSync(() => {
      this.expireDueReservations(now);
      const reservation = this.sql.exec<{ status: string }>(
        "SELECT status FROM reservations WHERE reservation_id = ?", body.reservationId as string
      ).toArray()[0];
      if (!reservation) return { kind: "missing" as const };
      if (reservation.status === "released") return { kind: "already-released" as const };
      if (reservation.status === "expired") return { kind: "already-expired" as const };
      const lines = this.sql.exec<{ product_id: string; seeds_required: number }>(
        "SELECT product_id, seeds_required FROM reservation_lines WHERE reservation_id = ?", body.reservationId as string
      ).toArray();
      for (const line of lines) {
        const update = this.sql.exec(
          "UPDATE inventory SET reserved_seeds = reserved_seeds - ?, updated_at = ? WHERE product_id = ? AND reserved_seeds >= ?",
          line.seeds_required, now, line.product_id, line.seeds_required
        );
        if (update.rowsWritten !== 1) throw new Error("RESERVATION_RELEASE_INVARIANT_FAILED");
      }
      this.sql.exec("UPDATE reservations SET status='released', updated_at=? WHERE reservation_id=?", now, body.reservationId as string);
      return { kind: "released" as const };
    });
    if (result.kind === "missing") return json({ error: "RESERVATION_NOT_FOUND" }, 404);
    if (result.kind === "already-expired") return json({ ok: true, status: "expired", replay: true }, 409);
    return json({ ok: true, status: "released", replay: result.kind === "already-released" });
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const id = env.INVENTORY_LEDGER.idFromName("inventory-spike-single-ledger");
    return env.INVENTORY_LEDGER.get(id).fetch(request);
  },
};
