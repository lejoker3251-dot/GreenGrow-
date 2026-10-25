/**
 * Isolated inventory rules for loose individual seeds.
 * This is a test/reference implementation only, not a production reservation service.
 */
export function calculateRequiredSeeds(lines) {
  if (!Array.isArray(lines) || lines.length === 0) {
    return { ok: false, code: "EMPTY_ORDER" };
  }

  const totals = new Map();
  for (const line of lines) {
    const productId = line?.productId;
    const packSize = line?.seedsPerPack;
    const packCount = line?.packCount;

    if (typeof productId !== "string" || productId.trim() === "") {
      return { ok: false, code: "INVALID_PRODUCT_ID" };
    }
    if (!Number.isSafeInteger(packSize) || packSize <= 0) {
      return { ok: false, code: "INVALID_PACK_SIZE" };
    }
    if (!Number.isSafeInteger(packCount) || packCount <= 0) {
      return { ok: false, code: "INVALID_PACK_COUNT" };
    }

    const required = packSize * packCount;
    if (!Number.isSafeInteger(required)) {
      return { ok: false, code: "INVALID_REQUIRED_QUANTITY" };
    }
    const next = (totals.get(productId) ?? 0) + required;
    if (!Number.isSafeInteger(next)) {
      return { ok: false, code: "INVALID_REQUIRED_QUANTITY" };
    }
    totals.set(productId, next);
  }

  return {
    ok: true,
    requirements: Object.fromEntries(totals),
  };
}

/**
 * In-memory serial reservation model used only to test race conditions.
 * Production must implement the same invariant with a database transaction,
 * atomic conditional update, or equivalent durable concurrency control.
 */
export function createInMemoryInventoryLedger(initialStock) {
  const stock = new Map(Object.entries(initialStock));
  let queue = Promise.resolve();

  return {
    getStock(productId) {
      return stock.get(productId);
    },

    reserve(lines) {
      const operation = queue.then(() => {
        const calculated = calculateRequiredSeeds(lines);
        if (!calculated.ok) return calculated;

        for (const [productId, required] of Object.entries(calculated.requirements)) {
          const available = stock.get(productId);
          if (!Number.isSafeInteger(available) || available < 0) {
            return { ok: false, code: "INVALID_STOCK", productId };
          }
          if (required > available) {
            return {
              ok: false,
              code: "INSUFFICIENT_STOCK",
              productId,
              required,
              available,
            };
          }
        }

        for (const [productId, required] of Object.entries(calculated.requirements)) {
          stock.set(productId, stock.get(productId) - required);
        }
        return { ok: true, requirements: calculated.requirements };
      });

      queue = operation.then(() => undefined, () => undefined);
      return operation;
    },
  };
}
