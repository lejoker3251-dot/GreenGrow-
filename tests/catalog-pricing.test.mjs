import test from "node:test";
import assert from "node:assert/strict";
import { makeVariantId, makeProductTypeId, validateCartLine, validateCart } from "../src/lib/catalog-pricing.js";

const releasedProduct = {
  id: "seed-0001",
  name: "Example",
  category: "Autoflowering",
  status: "Freigegeben",
  releaseStatus: "Freigegeben",
  packVariants: [
    { quantity: 1, priceEUR: 8.49 },
    { quantity: 3, priceEUR: 19.90 },
    { quantity: 5, priceEUR: 29.90 },
    { quantity: 10, priceEUR: 49.90 },
  ],
};
const catalog = [releasedProduct];

test("variant IDs are deterministic and include type and pack size", () => {
  assert.equal(makeProductTypeId(releasedProduct), "seed-0001--AF");
  assert.equal(makeVariantId(releasedProduct, 3), "seed-0001--AF--P3");
  assert.throws(() => makeVariantId(releasedProduct, 2), /Unsupported pack size/);
});

test("valid line resolves trusted catalog price in integer cents", () => {
  const result = validateCartLine({ id: "seed-0001", packSize: 3, quantity: 2, unitPrice: 19.90 }, catalog);
  assert.equal(result.ok, true);
  assert.equal(result.unitPriceCents, 1990);
  assert.equal(result.lineTotalCents, 3980);
  assert.equal(result.gtin, null);
  assert.equal(result.gtinStatus, "not-provided");
});

test("tampered client price is rejected and never used as authoritative price", () => {
  const result = validateCartLine({ id: "seed-0001", packSize: 3, quantity: 2, unitPrice: 0.01 }, catalog);
  assert.equal(result.ok, false);
  assert.equal(result.code, "CLIENT_PRICE_MISMATCH");
  assert.equal(result.authoritativePriceCents, 1990);
});

test("invalid product, pack size and quantity fail closed", () => {
  assert.equal(validateCartLine({ id: "missing", packSize: 3, quantity: 1 }, catalog).code, "PRODUCT_NOT_FOUND");
  assert.equal(validateCartLine({ id: "seed-0001", packSize: 2, quantity: 1 }, catalog).code, "INVALID_PACK_SIZE");
  assert.equal(validateCartLine({ id: "seed-0001", packSize: 3, quantity: 0 }, catalog).code, "INVALID_QUANTITY");
});

test("draft catalog product is rejected even when price fields exist", () => {
  const draft = { ...releasedProduct, status: "Entwurf", releaseStatus: "Entwurf" };
  const result = validateCartLine({ id: draft.id, packSize: 1, quantity: 1, unitPrice: 8.49 }, [draft]);
  assert.equal(result.ok, false);
  assert.equal(result.code, "PRODUCT_NOT_RELEASED");
});

test("cart subtotal is integer cents and any invalid line rejects the cart", () => {
  const result = validateCart([
    { id: "seed-0001", packSize: 1, quantity: 2, unitPrice: 8.49 },
    { id: "seed-0001", packSize: 3, quantity: 1, unitPrice: 19.90 },
  ], catalog);
  assert.equal(result.ok, true);
  assert.equal(result.subtotalCents, 3688);

  const rejected = validateCart([
    { id: "seed-0001", packSize: 1, quantity: 1, unitPrice: 8.49 },
    { id: "seed-0001", packSize: 3, quantity: 1, unitPrice: 0.01 },
  ], catalog);
  assert.equal(rejected.ok, false);
  assert.equal(rejected.errors[0].code, "CLIENT_PRICE_MISMATCH");
});
