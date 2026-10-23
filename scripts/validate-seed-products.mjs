import { readFile } from 'node:fs/promises';

const file = new URL('../src/data/seed-products.json', import.meta.url);
const products = JSON.parse(await readFile(file, 'utf8'));

const errors = [];
const expectedCount = 1269;
const allowedCategories = new Set([
  'Autoflowering',
  'Feminisierte Samen',
  'Reguläre Samen',
  'Nicht zugeordnet',
]);

if (!Array.isArray(products)) {
  throw new Error('seed-products.json muss ein Array sein.');
}

if (products.length !== expectedCount) {
  errors.push(`Erwartet wurden ${expectedCount} Produkte, gefunden: ${products.length}.`);
}

const ids = new Set();
const categoryCounts = new Map();

for (const [index, product] of products.entries()) {
  const row = index + 1;
  if (!product || typeof product !== 'object' || Array.isArray(product)) {
    errors.push(`Eintrag ${row} ist kein Produktobjekt.`);
    continue;
  }

  for (const field of ['id', 'name', 'category', 'details', 'status']) {
    if (typeof product[field] !== 'string' || product[field].trim() === '') {
      errors.push(`Eintrag ${row}: Pflichtfeld "${field}" fehlt oder ist leer.`);
    }
  }

  if (typeof product.id === 'string' && product.id.trim()) {
    if (ids.has(product.id)) errors.push(`Doppelte Produkt-ID: ${product.id}.`);
    ids.add(product.id);
  }

  if (typeof product.category === 'string' && product.category.trim()) {
    categoryCounts.set(product.category, (categoryCounts.get(product.category) || 0) + 1);
    if (!allowedCategories.has(product.category)) {
      errors.push(`Unbekannte Kategorie bei ${product.id || `Eintrag ${row}`}: ${product.category}.`);
    }
  }

  if (product.status !== 'Entwurf') {
    errors.push(`Produkt ${product.id || row} hat unerwarteten Freigabestatus: ${product.status}.`);
  }

  if ('price' in product || 'stock' in product || 'available' in product) {
    errors.push(`Produkt ${product.id || row} enthält Verkaufs-/Bestandsfelder, die vor Prüfung nicht freigegeben sind.`);
  }
}

if (errors.length) {
  console.error('Produktdaten-Prüfung fehlgeschlagen:');
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Produktdaten-Prüfung erfolgreich: ${products.length} Einträge, ${ids.size} eindeutige IDs.`);
  console.log('Kategorien:', Object.fromEntries([...categoryCounts.entries()].sort(([a], [b]) => a.localeCompare(b, 'de'))));
  console.log('Alle Einträge bleiben Entwürfe; keine Preise oder Bestandsangaben wurden freigegeben.');
}
