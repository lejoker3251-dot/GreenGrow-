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
const categoryCounts = new Map();
const expectedCategories = new Set(["Autoflowering", "Feminisierte Samen", "Reguläre Samen"]);
const priceAudit = { missingOrNull: 0, zeroOrNegative: 0 };
for (const [index, product] of products.entries()) {
  assert(product.id && !ids.has(product.id), `Fehlende oder doppelte ID bei Eintrag ${index}`);
  assert.equal(product.id, `seed-${String(index + 1).padStart(4, "0")}`, `ID-Reihenfolge oder ID-Lücke bei Eintrag ${index}`);
  ids.add(product.id);
  assert(expectedCategories.has(product.category), `Unbekannte oder fehlende Kategorie bei ${product.id}: ${product.category}`);
  categoryCounts.set(product.category, (categoryCounts.get(product.category) || 0) + 1);
  assert.equal(typeof product.name, "string", `Name fehlt bei ${product.id}`);
  assert(Object.hasOwn(product, "priceEUR"), `priceEUR fehlt bei ${product.id}`);
  assert(product.priceEUR === null || (typeof product.priceEUR === "number" && Number.isFinite(product.priceEUR) && product.priceEUR >= 0), `Ungültiger Preis bei ${product.id}`);
  if (product.priceEUR === null) priceAudit.missingOrNull++;
  if (typeof product.priceEUR === "number" && product.priceEUR <= 0) priceAudit.zeroOrNegative++;
  assert(Array.isArray(product.packVariants), `packVariants muss ein Array sein bei ${product.id}`);
  assert(allowedStatuses.has(product.releaseStatus), `Ungültiger releaseStatus bei ${product.id}`);
  for (const variant of product.packVariants) {
    assert(config.packSizes.includes(variant.quantity), `Nicht unterstützte Packungsgröße bei ${product.id}`);
    assert(variant.priceEUR === null || (typeof variant.priceEUR === "number" && Number.isFinite(variant.priceEUR) && variant.priceEUR >= 0), `Ungültiger Variantenpreis bei ${product.id}`);
    if (variant.priceEUR === null) priceAudit.missingOrNull++;
    if (typeof variant.priceEUR === "number" && variant.priceEUR <= 0) priceAudit.zeroOrNegative++;
    assert(allowedStatuses.has(variant.releaseStatus), `Ungültiger Variantenstatus bei ${product.id}`);
  }
}
assert.deepEqual(
  Object.fromEntries([...categoryCounts].sort(([a], [b]) => a.localeCompare(b, "de"))),
  { "Autoflowering": 423, "Feminisierte Samen": 423, "Reguläre Samen": 423 },
  "Kategorieverteilung weicht vom erwarteten Katalogstand ab – Zuordnung prüfen"
);

const priceSource = JSON.parse(await readFile(new URL("../src/data/pack-price-drafts.json", import.meta.url), "utf8"));
assert.equal(Object.keys(priceSource).length, products.length, "Für jedes Produkt müssen Preise hinterlegt sein");
for (const product of products) {
  const expected = priceSource[product.id];
  assert(Array.isArray(expected) && expected.length === 4, `Vier Preise fehlen bei ${product.id}`);
  assert.deepEqual(product.packVariants.map(v => v.quantity), [1, 3, 5, 10], `Packungsgrößen falsch bei ${product.id}`);
  assert.deepEqual(product.packVariants.map(v => v.priceEUR), expected, `Katalogpreise stimmen nicht mit Preisquelle überein bei ${product.id}`);
  assert.equal(product.priceEUR, expected[0], `Einzelpreis für 1 Samen fehlt bei ${product.id}`);
  assert(product.packVariants.every(v => v.releaseStatus === "Prüfung" && v.priceType === "retail-price"), `Preise müssen eingetragen und Produktprüfung separat bleiben: ${product.id}`);
}
assert(products.every(p => p.packVariants.length === 4), "Jedes Produkt muss vier Preisstufen haben");
console.log(`Shop-Datenprüfung bestanden: ${products.length} Produkte, lückenlose IDs, drei Kategorien mit je 423 Einträgen und vier Preisstufen; Checkout und Zahlungen deaktiviert.`);
console.log(`Preisprüfung: ${priceAudit.missingOrNull} fehlende/null Preisfelder, ${priceAudit.zeroOrNegative} Preisfelder mit 0 oder negativem Wert (manuell prüfen, keine automatische Freigabe).`);
