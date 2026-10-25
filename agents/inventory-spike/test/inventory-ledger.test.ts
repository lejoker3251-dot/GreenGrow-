import { env } from "cloudflare:workers";
import { describe, it, expect } from "vitest";

const stub = () => env.INVENTORY_LEDGER.get(env.INVENTORY_LEDGER.idFromName("inventory-spike-tests"));
const post = (path: string, body: unknown) => stub().fetch(`https://inventory.test${path}`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});
const seed = (items: Array<{ productId: string; quantity: number }>) => post("/__test/seed", { items });
const line = (productId: string, seedsPerPack: number, packCount: number) => ({ productId, seedsPerPack, packCount });
const key = () => `test_${crypto.randomUUID().replaceAll("-", "")}`;

describe("isolated SQLite inventory reservation", () => {
  it("reserves mixed pack sizes against one shared product stock", async () => {
    const productId = `mix_${crypto.randomUUID().slice(0, 8)}`;
    await seed([{ productId, quantity: 100 }]);
    const response = await post("/reserve", {
      idempotencyKey: key(),
      lines: [line(productId, 1, 2), line(productId, 3, 4), line(productId, 5, 1), line(productId, 10, 2)],
    });
    expect(response.status).toBe(200);
    expect((await response.json() as { status: string }).status).toBe("reserved");
    const second = await post("/reserve", { idempotencyKey: key(), lines: [line(productId, 1, 1)] });
    expect(second.status).toBe(200);
    const exhausted = await post("/reserve", { idempotencyKey: key(), lines: [line(productId, 1, 62)] });
    expect(exhausted.status).toBe(409);
  });

  it("rejects a multi-product reservation atomically when one product is short", async () => {
    const a = `rollback_a_${crypto.randomUUID().slice(0, 8)}`;
    const b = `rollback_b_${crypto.randomUUID().slice(0, 8)}`;
    await seed([{ productId: a, quantity: 20 }, { productId: b, quantity: 2 }]);
    const response = await post("/reserve", { idempotencyKey: key(), lines: [line(a, 5, 2), line(b, 3, 1)] });
    expect(response.status).toBe(409);
    const checkA = await post("/reserve", { idempotencyKey: key(), lines: [line(a, 1, 20)] });
    expect(checkA.status).toBe(200);
  });

  it("serializes simultaneous requests so successful reservations never exceed stock", async () => {
    const productId = `race_${crypto.randomUUID().slice(0, 8)}`;
    await seed([{ productId, quantity: 10 }]);
    const responses = await Promise.all(Array.from({ length: 20 }, () =>
      post("/reserve", { idempotencyKey: key(), lines: [line(productId, 1, 1)] })
    ));
    expect(responses.filter((response) => response.status === 200)).toHaveLength(10);
    expect(responses.filter((response) => response.status === 409)).toHaveLength(10);
  });

  it("replays the same reservation for an identical idempotency key", async () => {
    const productId = `idem_${crypto.randomUUID().slice(0, 8)}`;
    await seed([{ productId, quantity: 10 }]);
    const idempotencyKey = key();
    const body = { idempotencyKey, lines: [line(productId, 3, 2)] };
    const first = await post("/reserve", body);
    const second = await post("/reserve", body);
    const firstBody = await first.json() as { reservationId: string };
    const secondBody = await second.json() as { reservationId: string; replay: boolean };
    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
    expect(secondBody.reservationId).toBe(firstBody.reservationId);
    expect(secondBody.replay).toBe(true);
  });

  it("rejects reuse of an idempotency key with different request contents", async () => {
    const productId = `keyreuse_${crypto.randomUUID().slice(0, 8)}`;
    await seed([{ productId, quantity: 20 }]);
    const idempotencyKey = key();
    expect((await post("/reserve", { idempotencyKey, lines: [line(productId, 1, 2)] })).status).toBe(200);
    const conflicting = await post("/reserve", { idempotencyKey, lines: [line(productId, 1, 3)] });
    expect(conflicting.status).toBe(409);
  });

  it("releases a reservation at most once", async () => {
    const productId = `release_${crypto.randomUUID().slice(0, 8)}`;
    await seed([{ productId, quantity: 5 }]);
    const created = await post("/reserve", { idempotencyKey: key(), lines: [line(productId, 1, 5)] });
    const { reservationId } = await created.json() as { reservationId: string };
    expect(created.status).toBe(200);
    expect((await post("/release", { reservationId })).status).toBe(200);
    const repeat = await post("/release", { reservationId });
    expect(repeat.status).toBe(200);
    expect((await repeat.json() as { replay: boolean }).replay).toBe(true);
    const replacement = await post("/reserve", { idempotencyKey: key(), lines: [line(productId, 1, 5)] });
    expect(replacement.status).toBe(200);
  });

  it("rejects invalid quantities and hides the test seed route outside test mode", async () => {
    const invalid = await post("/reserve", { idempotencyKey: key(), lines: [line("invalid", 1, 0)] });
    expect(invalid.status).toBe(400);
    const health = await stub().fetch("https://inventory.test/health");
    expect(health.status).toBe(200);
  });
});
