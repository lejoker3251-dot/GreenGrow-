import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateRequiredSeeds,
  createInMemoryInventoryLedger,
} from "../src/lib/shared-seed-inventory.js";

test("different pack sizes for one product consume the same shared loose-seed stock", async () => {
  const ledger = createInMemoryInventoryLedger({ "seed-0001": 1000 });

  const result = await ledger.reserve([
    { productId: "seed-0001", seedsPerPack: 1, packCount: 2 },
    { productId: "seed-0001", seedsPerPack: 3, packCount: 4 },
    { productId: "seed-0001", seedsPerPack: 5, packCount: 1 },
    { productId: "seed-0001", seedsPerPack: 10, packCount: 2 },
  ]);

  assert.equal(result.ok, true);
  assert.equal(result.requirements["seed-0001"], 39);
  assert.equal(ledger.getStock("seed-0001"), 961);
});

test("duplicate lines for the same product are combined before stock validation", () => {
  assert.deepEqual(
    calculateRequiredSeeds([
      { productId: "seed-0001", seedsPerPack: 3, packCount: 2 },
      { productId: "seed-0001", seedsPerPack: 5, packCount: 1 },
      { productId: "seed-0002", seedsPerPack: 10, packCount: 1 },
    ]),
    { ok: true, requirements: { "seed-0001": 11, "seed-0002": 10 } },
  );
});

test("an order that exceeds shared stock is rejected without a partial deduction", async () => {
  const ledger = createInMemoryInventoryLedger({
    "seed-0001": 10,
    "seed-0002": 20,
  });

  const result = await ledger.reserve([
    { productId: "seed-0001", seedsPerPack: 3, packCount: 2 },
    { productId: "seed-0002", seedsPerPack: 10, packCount: 3 },
  ]);

  assert.equal(result.ok, false);
  assert.equal(result.code, "INSUFFICIENT_STOCK");
  assert.equal(ledger.getStock("seed-0001"), 10);
  assert.equal(ledger.getStock("seed-0002"), 20);
});

test("invalid quantities, pack sizes and empty orders fail closed", () => {
  assert.equal(calculateRequiredSeeds([]).code, "EMPTY_ORDER");
  assert.equal(calculateRequiredSeeds([{ productId: "seed-0001", seedsPerPack: 3, packCount: 0 }]).code, "INVALID_PACK_COUNT");
  assert.equal(calculateRequiredSeeds([{ productId: "seed-0001", seedsPerPack: 0, packCount: 1 }]).code, "INVALID_PACK_SIZE");
  assert.equal(calculateRequiredSeeds([{ productId: "seed-0001", seedsPerPack: 3, packCount: 1.5 }]).code, "INVALID_PACK_COUNT");
});

test("two simultaneous reservations cannot consume more than the shared stock", async () => {
  const ledger = createInMemoryInventoryLedger({ "seed-0001": 10 });

  const results = await Promise.all([
    ledger.reserve([{ productId: "seed-0001", seedsPerPack: 5, packCount: 1 }]),
    ledger.reserve([{ productId: "seed-0001", seedsPerPack: 5, packCount: 1 }]),
    ledger.reserve([{ productId: "seed-0001", seedsPerPack: 1, packCount: 1 }]),
  ]);

  assert.equal(results.filter((result) => result.ok).length, 2);
  assert.equal(results.filter((result) => result.code === "INSUFFICIENT_STOCK").length, 1);
  assert.equal(ledger.getStock("seed-0001"), 0);
  assert.ok(ledger.getStock("seed-0001") >= 0);
});

test("simultaneous orders for different products use independent stock pools", async () => {
  const ledger = createInMemoryInventoryLedger({ "seed-0001": 3, "seed-0002": 5 });

  const results = await Promise.all([
    ledger.reserve([{ productId: "seed-0001", seedsPerPack: 3, packCount: 1 }]),
    ledger.reserve([{ productId: "seed-0002", seedsPerPack: 5, packCount: 1 }]),
  ]);

  assert.ok(results.every((result) => result.ok));
  assert.equal(ledger.getStock("seed-0001"), 0);
  assert.equal(ledger.getStock("seed-0002"), 0);
});
