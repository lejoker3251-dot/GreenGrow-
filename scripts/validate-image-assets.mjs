import { createHash } from "node:crypto";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = path.join(root, "images");
const catalogPath = path.join(root, "src/data/seed-products.json");
const allowedImageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"]);

function detectFormat(buffer) {
  if (buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return "png";
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return "jpeg";
  if (buffer.length >= 12 && buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP") return "webp";
  if (buffer.length >= 6 && /^GIF8[79]a$/.test(buffer.toString("ascii", 0, 6))) return "gif";
  if (buffer.length >= 4 && buffer.toString("ascii", 0, 4) === "<svg") return "svg";
  if (buffer.length >= 5 && buffer.toString("utf8", 0, 5) === "<?xml") return "xml";
  if (buffer.length >= 12 && buffer.toString("ascii", 4, 8) === "ftyp") return "avif-or-isobmff";
  return "unknown";
}

function expectedExtensions(format) {
  return ({
    png: [".png"],
    jpeg: [".jpg", ".jpeg"],
    webp: [".webp"],
    gif: [".gif"],
    svg: [".svg", ".xml"],
    xml: [".xml", ".svg"],
    "avif-or-isobmff": [".avif", ".heic", ".heif"],
  })[format] ?? [];
}

const files = (await readdir(imagesDir, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && entry.name !== ".gitkeep")
  .map((entry) => entry.name)
  .sort();

let errors = 0;
const hashes = new Map();
console.log("Image asset audit");
console.log("=================");

for (const name of files) {
  const fullPath = path.join(imagesDir, name);
  const buffer = await readFile(fullPath);
  const format = detectFormat(buffer);
  const bytes = (await stat(fullPath)).size;
  const ext = path.extname(name).toLowerCase();
  const accepted = expectedExtensions(format);
  const suspiciousExtensionChain = /\.(png|jpe?g|webp|gif)\.(png|jpe?g|webp|gif)$/i.test(name);

  console.log(`- ${name}: format=${format}, bytes=${bytes}`);
  if (!allowedImageExtensions.has(ext)) {
    console.warn(`  WARNING: unusual or missing final extension "${ext || "(none)"}"`);
  }
  if (accepted.length && !accepted.includes(ext)) {
    console.warn(`  WARNING: detected ${format} content but final extension is "${ext}"`);
  }
  if (suspiciousExtensionChain) {
    console.warn("  WARNING: multiple image extensions in filename; review naming");
  }
  const hash = createHash("sha256").update(buffer).digest("hex");
  if (hashes.has(hash)) {
    console.warn(`  WARNING: identical binary content to ${hashes.get(hash)}`);
  } else {
    hashes.set(hash, name);
  }
  if (format === "unknown") {
    console.warn("  WARNING: format signature not recognized; verify manually");
  }
}

const catalog = JSON.parse(await readFile(catalogPath, "utf8"));
if (!Array.isArray(catalog)) throw new Error("Product catalog must be a JSON array.");

const imageRefs = new Set(catalog.map((item) => item.image).filter(Boolean));
console.log(`\nCatalog entries: ${catalog.length}`);
console.log(`Distinct non-empty image references: ${imageRefs.size}`);

for (const ref of imageRefs) {
  let url;
  try {
    url = new URL(ref);
  } catch {
    console.error(`ERROR: invalid image URL: ${ref}`);
    errors++;
    continue;
  }

  const expectedPrefix = "/lejoker3251-dot/GreenGrow-/feature/premium-storefront-v1/images/";
  if (url.hostname === "raw.githubusercontent.com" && url.pathname.startsWith(expectedPrefix)) {
    const relative = decodeURIComponent(url.pathname.slice(expectedPrefix.length));
    const resolved = path.resolve(imagesDir, relative);
    if (!resolved.startsWith(imagesDir + path.sep)) {
      console.error(`ERROR: image path escapes images directory: ${ref}`);
      errors++;
      continue;
    }
    try {
      const info = await stat(resolved);
      if (!info.isFile() || info.size === 0) {
        console.error(`ERROR: image asset is empty or not a file: ${relative}`);
        errors++;
      } else {
        console.log(`Verified referenced asset exists: ${relative} (${info.size} bytes)`);
      }
    } catch {
      console.error(`ERROR: referenced image asset missing from branch: ${relative}`);
      errors++;
    }
  } else {
    console.warn(`WARNING: image reference is external or uses a different branch/path: ${ref}`);
  }
}

if (imageRefs.size === 1 && catalog.length > 1) {
  console.warn("WARNING: all catalog entries share one image reference; image-to-record mapping needs manual review.");
}
if (errors > 0) {
  console.error(`Image asset audit failed with ${errors} error(s).`);
  process.exitCode = 1;
} else {
  console.log("Image asset audit passed (warnings require manual review).");
}
