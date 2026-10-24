import { readFile } from 'node:fs/promises';

const products = JSON.parse(await readFile(new URL('../src/data/seed-products.json', import.meta.url), 'utf8'));
if (!Array.isArray(products)) throw new Error('seed-products.json muss ein Array sein.');

const groups = new Map();
const issues = [];

function normalizedName(value) {
  return value.normalize('NFKC').trim().replace(/\s+/g, ' ').toLocaleLowerCase('de-DE');
}

for (const [index, product] of products.entries()) {
  const label = `Eintrag ${index + 1} (${product?.id || 'ohne ID'})`;
  if (typeof product?.name !== 'string' || !product.name.trim()) {
    issues.push(`${label}: Name fehlt oder ist leer.`);
    continue;
  }

  if (product.name !== product.name.trim()) {
    issues.push(`${label}: Name enthält führende oder nachgestellte Leerzeichen.`);
  }
  if (/\s{2,}/u.test(product.name)) {
    issues.push(`${label}: Name enthält aufeinanderfolgende Leerzeichen.`);
  }
  if (product.name !== product.name.normalize('NFC')) {
    issues.push(`${label}: Name verwendet eine nicht kanonisch zusammengesetzte Unicode-Schreibweise.`);
  }

  const key = normalizedName(product.name);
  const group = groups.get(key) ?? [];
  group.push({ id: product.id, name: product.name });
  groups.set(key, group);
}

const variants = [...groups.values()].filter((group) => new Set(group.map((item) => item.name)).size > 1);
console.log(`Namensprüfung: ${products.length} Einträge; ${groups.size} normalisierte Namensgruppen.`);
if (issues.length) {
  console.warn(`Hinweise zu Format/Unicode (${issues.length}):`);
  for (const issue of issues) console.warn(`- ${issue}`);
}
if (variants.length) {
  console.warn(`Mögliche Schreibvarianten nach Unicode-/Leerzeichen-/Großschreibungs-Normalisierung (${variants.length} Gruppen):`);
  for (const group of variants) {
    console.warn('- ' + group.map((item) => `${item.id}: ${JSON.stringify(item.name)}`).join(' | '));
  }
} else {
  console.log('Keine unterschiedlichen Namen gefunden, die nach Unicode-/Leerzeichen-/Großschreibungs-Normalisierung zusammenfallen.');
}
console.log('Hinweise sind nur zur manuellen Prüfung gedacht; Quelldaten wurden nicht verändert.');
