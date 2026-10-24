import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const catalogUrl = new URL('../src/data/seed-products.json', import.meta.url);
const products = JSON.parse(await readFile(catalogUrl, 'utf8'));

const sourceTypeToCategory = new Map([
  ['Typ laut PDF: Automatic Flowering', 'Autoflowering'],
  ['Typ laut PDF: Feminized', 'Feminisierte Samen'],
  ['Typ laut PDF: Regular', 'Reguläre Samen'],
]);
const errors = [];
const warnings = [];
const imageUsage = new Map();

for (const product of products) {
  const expectedCategory = sourceTypeToCategory.get(product.details);
  if (!expectedCategory) {
    errors.push(`${product.id}: unbekannter Quelltyp "${product.details}".`);
  } else if (product.category !== expectedCategory) {
    errors.push(`${product.id}: Kategorie "${product.category}" passt nicht zum Quelltyp "${product.details}" (erwartet: "${expectedCategory}").`);
  }

  if (!product.image) {
    warnings.push(`${product.id}: Bildreferenz fehlt.`);
    continue;
  }
  imageUsage.set(product.image, (imageUsage.get(product.image) ?? 0) + 1);

  try {
    const url = new URL(product.image);
    if (url.hostname === 'raw.githubusercontent.com' &&
        url.pathname.startsWith('/lejoker3251-dot/GreenGrow-/')) {
      const parts = url.pathname.split('/').filter(Boolean);
      const branchIndex = parts.findIndex((part) => part === 'feature');
      if (branchIndex >= 0 && parts[branchIndex + 1] === 'premium-storefront-v1') {
        const repoPath = decodeURIComponent(parts.slice(branchIndex + 2).join('/'));
        const localPath = path.resolve(root, repoPath);
        if (!localPath.startsWith(root)) {
          errors.push(`${product.id}: Bildpfad verlässt das Repository.`);
        } else {
          await access(localPath);
        }
      } else {
        warnings.push(`${product.id}: Bild-URL verwendet einen anderen Branch-Pfad als erwartet.`);
      }
    } else if (!['http:', 'https:'].includes(url.protocol)) {
      errors.push(`${product.id}: nicht unterstütztes Bild-URL-Protokoll.`);
    }
  } catch {
    errors.push(`${product.id}: Bildreferenz ist ungültig oder zeigt auf keine vorhandene lokale Datei: ${product.image}`);
  }
}

if (imageUsage.size === 1 && products.length > 1) {
  warnings.push(`Alle ${products.length} Einträge verwenden dieselbe Bildreferenz; individuelle Zuordnung ist nicht belegt.`);
}

console.log(`Kategorie-/Bildprüfung: ${products.length} Katalogeinträge.`);
console.log('Quelltyp-Zuordnung:', Object.fromEntries([...sourceTypeToCategory.entries()]));
console.log(`Eindeutige Bildreferenzen: ${imageUsage.size}.`);
for (const warning of [...new Set(warnings)]) console.warn(`WARNUNG: ${warning}`);
if (errors.length) {
  console.error('Kategorie-/Bildprüfung fehlgeschlagen:');
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log('Quelltyp und Kategorie stimmen überein; referenzierte Repository-Dateien wurden lokal geprüft.');
}
