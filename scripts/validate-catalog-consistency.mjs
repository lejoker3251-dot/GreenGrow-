import { readFile } from 'node:fs/promises';

const csvUrl = new URL('../product-data/products.csv', import.meta.url);
const jsonUrl = new URL('../src/data/seed-products.json', import.meta.url);
const [csvText, jsonText] = await Promise.all([
  readFile(csvUrl, 'utf8'),
  readFile(jsonUrl, 'utf8'),
]);

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  const input = text.replace(/^\uFEFF/, '');

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    if (quoted) {
      if (char === '"' && input[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"' && field === '') {
      quoted = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n') {
      row.push(field.replace(/\r$/, ''));
      if (row.some((value) => value !== '')) rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }

  if (quoted) throw new Error('CSV endet innerhalb eines nicht geschlossenen Anführungszeichens.');
  if (field !== '' || row.length > 0) {
    row.push(field.replace(/\r$/, ''));
    if (row.some((value) => value !== '')) rows.push(row);
  }

  if (rows.length === 0) throw new Error('CSV enthält keine Kopfzeile.');
  const headers = rows.shift();
  if (new Set(headers).size !== headers.length) {
    throw new Error('CSV enthält doppelte Spaltennamen.');
  }

  return rows.map((values, index) => {
    if (values.length !== headers.length) {
      throw new Error(`CSV-Zeile ${index + 2}: ${values.length} Werte bei ${headers.length} Spalten.`);
    }
    return Object.fromEntries(headers.map((header, i) => [header, values[i]]));
  });
}

const csvRows = parseCsv(csvText);
const products = JSON.parse(jsonText);
if (!Array.isArray(products)) throw new Error('seed-products.json muss ein Array sein.');

const errors = [];
const warnings = [];
const csvById = new Map();
const jsonById = new Map();

for (const [index, row] of csvRows.entries()) {
  if (!row.id?.trim()) errors.push(`CSV-Zeile ${index + 2}: ID fehlt.`);
  else if (csvById.has(row.id)) errors.push(`CSV: doppelte ID ${row.id}.`);
  else csvById.set(row.id, row);
}
for (const [index, product] of products.entries()) {
  if (!product || typeof product !== 'object' || Array.isArray(product)) {
    errors.push(`JSON-Eintrag ${index + 1} ist kein Objekt.`);
    continue;
  }
  if (!product.id?.trim()) errors.push(`JSON-Eintrag ${index + 1}: ID fehlt.`);
  else if (jsonById.has(product.id)) errors.push(`JSON: doppelte ID ${product.id}.`);
  else jsonById.set(product.id, product);
}

for (const id of new Set([...csvById.keys(), ...jsonById.keys()])) {
  const csv = csvById.get(id);
  const json = jsonById.get(id);
  if (!csv) {
    errors.push(`ID ${id} fehlt in products.csv.`);
    continue;
  }
  if (!json) {
    errors.push(`ID ${id} fehlt in seed-products.json.`);
    continue;
  }
  for (const field of ['name', 'details', 'status']) {
    if ((csv[field] ?? '') !== (json[field] ?? '')) {
      errors.push(`ID ${id}: Feld "${field}" weicht zwischen CSV und JSON ab.`);
    }
  }
  if (csv.category?.trim() && csv.category !== json.category) {
    errors.push(`ID ${id}: Kategorie weicht zwischen CSV und JSON ab.`);
  }
  if (csv.image?.trim() && csv.image !== json.image) {
    errors.push(`ID ${id}: Bildpfad weicht zwischen CSV und JSON ab.`);
  }
  if (!csv.category?.trim() && json.category) {
    warnings.push('CSV-Kategorie fehlt, während JSON eine Kategorie enthält.');
  }
  if (!csv.image?.trim() && json.image) {
    warnings.push('CSV-Bildpfad fehlt, während JSON ein Bild referenziert.');
  }
}

const imageValues = [...new Set(products.map((product) => product?.image).filter(Boolean))];
if (imageValues.length === 1 && products.length > 1) {
  warnings.push(`Alle ${products.length} JSON-Datensätze verwenden dieselbe Bildreferenz.`);
}
const imageUrl = imageValues[0] ?? '';
if (imageUrl && !/^https?:\/\//i.test(imageUrl)) {
  warnings.push('Bildreferenzen sind nicht alle absolute HTTP(S)-URLs; Pfade bitte separat prüfen.');
}
if (products.some((product) => product?.status !== 'Entwurf')) {
  errors.push('Mindestens ein Datensatz hat nicht den erwarteten Status "Entwurf".');
}

console.log(`Katalogabgleich: CSV ${csvRows.length} Zeilen; JSON ${products.length} Einträge.`);
console.log(`IDs: CSV ${csvById.size}; JSON ${jsonById.size}.`);
for (const warning of [...new Set(warnings)]) console.warn(`WARNUNG: ${warning}`);
if (errors.length) {
  console.error('Katalogabgleich fehlgeschlagen:');
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log('Struktureller Abgleich der IDs, Namen, Quelldetails und Entwurfsstatus erfolgreich.');
  if (warnings.length) console.log(`Hinweise zur manuellen Prüfung: ${new Set(warnings).size}.`);
}
