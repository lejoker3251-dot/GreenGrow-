import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";

const products = JSON.parse(await readFile(new URL("../src/data/seed-products.json", import.meta.url), "utf8"));
const config = JSON.parse(await readFile(new URL("../src/data/shop-pricing-config.json", import.meta.url), "utf8"));
const allowedStatuses = new Set(["Entwurf", "Prüfung", "Freigegeben", "Gesperrt"]);

assert(Array.isArray(products), "Katalog muss ein Array sein");
assert.equal(products.length, 1269, "Unerwartete Kataloganzahl – Katalogänderung prüfen");
assert.deepEqual(config.packSizes, [1, 3, 5, 10], "Packungsgrößen müssen 1, 3, 5, 10 sein");
assert.equal(config.currency, "EUR");
assert.equal(config.checkoutEnabled, false, "Checkout muss deaktiviert bleiben");
assert.equal(config.paymentsEnabled, false, "Zahlungen müssen deaktiviert bleiben");

const ids = new Set();
for (const [index, product] of products.entries()) {
  assert(product.id && !ids.has(product.id), `Fehlende oder doppelte ID bei Eintrag ${index}`);
  ids.add(product.id);
  assert.equal(typeof product.name, "string", `Name fehlt bei ${product.id}`);
  assert(Object.hasOwn(product, "priceEUR"), `priceEUR fehlt bei ${product.id}`);
  assert(product.priceEUR === null || (typeof product.priceEUR === "number" && product.priceEUR >= 0), `Ungültiger Preis bei ${product.id}`);
  assert(Array.isArray(product.packVariants), `packVariants muss ein Array sein bei ${product.id}`);
  assert(allowedStatuses.has(product.releaseStatus), `Ungültiger releaseStatus bei ${product.id}`);
  for (const variant of product.packVariants) {
    assert(config.packSizes.includes(variant.quantity), `Nicht unterstützte Packungsgröße bei ${product.id}`);
    assert(variant.priceEUR === null || (typeof variant.priceEUR === "number" && variant.priceEUR >= 0), `Ungültiger Variantenpreis bei ${product.id}`);
    assert(allowedStatuses.has(variant.releaseStatus), `Ungültiger Variantenstatus bei ${product.id}`);
  }
}
assert(products.every(p => p.priceEUR === null), "Keine Preise dürfen ohne Freigabe eingetragen sein");
assert(products.every(p => p.packVariants.length === 0), "Keine Packungsvariante darf ohne produktbezogene Freigabe angelegt sein");
console.log(`Shop-Datenprüfung bestanden: ${products.length} Produkte; keine Preise/Varianten freigegeben; Checkout und Zahlungen deaktiviert.`);
