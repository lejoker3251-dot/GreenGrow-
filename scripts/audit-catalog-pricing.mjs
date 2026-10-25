import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { makeVariantId, validateCartLine } from "../src/lib/catalog-pricing.js";

const catalog = JSON.parse(readFileSync(new URL("../src/data/seed-products.json", import.meta.url), "utf8"));
const expectedCategories = new Map([
  ["Autoflowering", 423],
  ["Feminisierte Samen", 423],
  ["Reguläre Samen", 423],
]);
const expectedPackSizes = [1, 3, 5, 10];
const ids = new Set();
const variantIds = new Set();
const categoryCounts = new Map();
const statusCounts = new Map();
const releaseStatusCounts = new Map();
let variantCount = 0;
let gtinFieldCount = 0;
let nonEmptyGtinCount = 0;

assert.equal(catalog.length, 1269, "catalog record count must remain 1269");

for (const [index, product] of catalog.entries()) {
  assert.ok(product && typeof product === "object", `record ${index} must be an object`);
  assert.equal(typeof product.id, "string", `record ${index} must have a string id`);
  assert.ok(product.id.trim(), `record ${index} id must not be empty`);
  assert.ok(!ids.has(product.id), `duplicate product id: ${product.id}`);
  ids.add(product.id);

  assert.ok(expectedCategories.has(product.category), `unknown category for ${product.id}: ${product.category}`);
  categoryCounts.set(product.category, (categoryCounts.get(product.category) ?? 0) + 1);
  statusCounts.set(product.status, (statusCounts.get(product.status) ?? 0) + 1);
  releaseStatusCounts.set(product.releaseStatus, (releaseStatusCounts.get(product.releaseStatus) ?? 0) + 1);

  assert.ok(Array.isArray(product.packVariants), `${product.id} packVariants must be an array`);
  assert.equal(product.packVariants.length, 4, `${product.id} must have exactly four pack variants`);
  const quantities = product.packVariants.map(v => v?.quantity);
  assert.equal(new Set(quantities).size, quantities.length, `${product.id} has duplicate pack sizes`);
  assert.deepEqual([...quantities].sort((a, b) => a - b), expectedPackSizes, `${product.id} pack sizes must be 1, 3, 5, 10`);

  for (const variant of product.packVariants) {
    variantCount += 1;
    assert.equal(typeof variant.priceEUR, "number", `${product.id}/P${variant.quantity} price must be numeric`);
    assert.ok(Number.isFinite(variant.priceEUR) && variant.priceEUR > 0, `${product.id}/P${variant.quantity} price must be positive and finite`);
    const cents = Math.round(variant.priceEUR * 100);
    assert.ok(Math.abs(variant.priceEUR * 100 - cents) < 1e-7, `${product.id}/P${variant.quantity} price must resolve to whole cents`);

    const variantId = makeVariantId(product, variant.quantity);
    assert.ok(!variantIds.has(variantId), `duplicate variant id: ${variantId}`);
    variantIds.add(variantId);

    // In-memory released clone tests the price resolver only; source catalog is never mutated.
    const releasedClone = { ...product, status: "Freigegeben", releaseStatus: "Freigegeben" };
    const result = validateCartLine({
      id: product.id,
      packSize: variant.quantity,
      quantity: 1,
      unitPrice: variant.priceEUR,
    }, [releasedClone]);
    assert.equal(result.ok, true, `${variantId} should validate against its catalog price: ${result.code}`);
    assert.equal(result.unitPriceCents, cents, `${variantId} should resolve the catalog price in cents`);
    assert.equal(result.variantId, variantId, `${variantId} should remain deterministic`);
    assert.equal(result.gtin, null, "GTIN must remain unassigned by this helper");
    assert.equal(result.gtinStatus, "not-provided");

    for (const obj of [product, variant]) {
      if (Object.hasOwn(obj, "gtin")) {
        gtinFieldCount += 1;
        if (obj.gtin !== null && obj.gtin !== "") nonEmptyGtinCount += 1;
      }
    }
  }

  const liveResult = validateCartLine({
    id: product.id,
    packSize: 1,
    quantity: 1,
    unitPrice: product.packVariants[0].priceEUR,
  }, catalog);
  assert.equal(liveResult.ok, false, `${product.id} in the actual catalog must not be released`);
  assert.equal(liveResult.code, "PRODUCT_NOT_RELEASED", `${product.id} should be rejected for release status`);
}

for (const [category, expected] of expectedCategories) {
  assert.equal(categoryCounts.get(category), expected, `${category} count mismatch`);
}
assert.equal(ids.size, catalog.length, "all product IDs must be unique");
assert.equal(variantCount, 1269 * 4, "catalog must contain 5,076 pack variants");
assert.equal(variantIds.size, variantCount, "all sellable variant IDs must be unique");
assert.equal(statusCounts.get("Entwurf"), 1269, "all source products should remain drafts");
assert.equal(releaseStatusCounts.get("Entwurf"), 1269, "all source products should remain unreleased");
assert.equal(nonEmptyGtinCount, 0, "this audit must not find any assigned GTIN values");

console.log(JSON.stringify({
  result: "PASS",
  products: catalog.length,
  uniqueProductIds: ids.size,
  categories: Object.fromEntries(categoryCounts),
  variants: variantCount,
  uniqueVariantIds: variantIds.size,
  packSizes: expectedPackSizes,
  statusCounts: Object.fromEntries(statusCounts),
  releaseStatusCounts: Object.fromEntries(releaseStatusCounts),
  pricesChecked: variantCount,
  releasedClonePriceChecks: variantCount,
  actualCatalogReleaseRejections: catalog.length,
  gtinFieldsPresent: gtinFieldCount,
  nonEmptyGtinValues: nonEmptyGtinCount,
  sourceCatalogMutated: false
}, null, 2));
