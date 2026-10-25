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
const draftPricedIds = new Set(["seed-0033", "seed-0065", "seed-0062", "seed-0143", "seed-0119"]);
assert.equal(products.filter(p => p.packVariants.length > 0).length, 5, "Genau fünf Produkte sollen Preisentwürfe haben");
for (const product of products) {
  if (draftPricedIds.has(product.id)) {
    assert.equal(product.category, "Feminisierte Samen", `Preisdemo muss feminisiert sein: ${product.id}`);
    assert.deepEqual(product.packVariants.map(v => v.quantity), [1, 3, 5, 10], `Packungsgrößen falsch bei ${product.id}`);
    assert(product.packVariants.every(v => v.releaseStatus === "Entwurf" && v.priceType === "proposed-retail-price"), `Preise müssen Entwürfe bleiben: ${product.id}`);
    assert.equal(product.priceEUR, null, `Hauptpreis darf erst nach Freigabe gesetzt werden: ${product.id}`);
  } else {
    assert.equal(product.packVariants.length, 0, `Unerwartete Preisvariante bei ${product.id}`);
  }
}
assert(products.every(p => p.priceEUR === null), "Kein Hauptpreis darf ohne Freigabe gesetzt sein");
console.log(`Shop-Datenprüfung bestanden: ${products.length} Produkte; 5 feminisierte Produkte mit vier Preisentwürfen je Packung; Checkout und Zahlungen deaktiviert.`);
