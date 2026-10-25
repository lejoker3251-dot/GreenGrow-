/**
 * Pure catalog helpers for isolated tests and future server-side use.
 * Do not treat browser/localStorage data as trusted and do not wire this into checkout
 * until a real server endpoint and release/availability policy have been reviewed.
 */
export const PACK_SIZES = Object.freeze([1, 3, 5, 10]);

const TYPE_CODES = Object.freeze({
  "Autoflowering": "AF",
  "Feminisierte Samen": "FEM",
  "Reguläre Samen": "REG",
});

export function typeCodeFor(category) {
  return TYPE_CODES[category] ?? null;
}

export function makeVariantId(product) {
  if (!product || typeof product.id !== "string" || !product.id.trim()) {
    throw new TypeError("A stable non-empty product id is required.");
  }
  const typeCode = typeCodeFor(product.category);
  if (!typeCode) throw new TypeError("Unknown product category.");
  return `${product.id}--${typeCode}`;
}

export function makePackVariantId(product, packSize) {
  if (!PACK_SIZES.includes(packSize)) throw new RangeError("Unsupported pack size.");
  return `${makeVariantId(product)}--P${packSize}`;
}

function toCents(eur) {
  if (typeof eur !== "number" || !Number.isFinite(eur) || eur <= 0) return null;
  const cents = Math.round(eur * 100);
  if (Math.abs(eur * 100 - cents) > 1e-7) return null;
  return cents;
}

/**
 * Resolves the authoritative unit price from the server-side catalog.
 * submitted unitPrice is checked only to detect stale/tampered cart state; it is
 * never used to calculate the result.
 */
export function validateCartLine(line, catalog) {
  if (!line || typeof line !== "object" || !Array.isArray(catalog)) {
    return { ok: false, code: "INVALID_LINE" };
  }
  if (typeof line.id !== "string" || !line.id.trim()) {
    return { ok: false, code: "INVALID_PRODUCT_ID" };
  }
  if (!PACK_SIZES.includes(line.packSize)) {
    return { ok: false, code: "INVALID_PACK_SIZE" };
  }
  if (!Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > 99) {
    return { ok: false, code: "INVALID_QUANTITY" };
  }

  const matches = catalog.filter((product) => product?.id === line.id);
  if (matches.length !== 1) return { ok: false, code: matches.length ? "AMBIGUOUS_PRODUCT" : "PRODUCT_NOT_FOUND" };

  const product = matches[0];
  if (!typeCodeFor(product.category)) return { ok: false, code: "UNKNOWN_PRODUCT_TYPE" };
  if (product.status !== "Entwurf" && product.status !== "Freigegeben") {
    return { ok: false, code: "PRODUCT_NOT_RELEASED" };
  }
  if (product.releaseStatus !== "Freigegeben") {
    return { ok: false, code: "PRODUCT_NOT_RELEASED" };
  }
  if (!Array.isArray(product.packVariants)) return { ok: false, code: "PRICE_NOT_FOUND" };

  const packMatches = product.packVariants.filter((variant) => variant?.quantity === line.packSize);
  if (packMatches.length !== 1) return { ok: false, code: "PRICE_NOT_FOUND" };
  const priceCents = toCents(packMatches[0].priceEUR);
  if (priceCents === null) return { ok: false, code: "INVALID_CATALOG_PRICE" };

  // Current catalog products are in draft; reject them above in the future stricter
  // policy. This helper currently intentionally refuses draft products too.
  if (product.status !== "Freigegeben" || product.releaseStatus !== "Freigegeben") {
    return { ok: false, code: "PRODUCT_NOT_RELEASED" };
  }

  const submittedCents = toCents(line.unitPrice);
  if (submittedCents !== null && submittedCents !== priceCents) {
    return { ok: false, code: "CLIENT_PRICE_MISMATCH", authoritativePriceCents: priceCents };
  }

  return {
    ok: true,
    variantId: makePackVariantId(product, line.packSize),
    productId: product.id,
    productType: product.category,
    packSize: line.packSize,
    quantity: line.quantity,
    unitPriceCents: priceCents,
    lineTotalCents: priceCents * line.quantity,
    currency: "EUR",
    gtin: null,
    gtinStatus: "not-provided",
    gtinSource: null,
    gtinCheckedAt: null,
  };
}

export function validateCart(lines, catalog) {
  if (!Array.isArray(lines) || !Array.isArray(catalog)) {
    return { ok: false, errors: [{ index: -1, code: "INVALID_CART" }] };
  }
  const validated = [];
  const errors = [];
  lines.forEach((line, index) => {
    const result = validateCartLine(line, catalog);
    if (!result.ok) errors.push({ index, code: result.code, ...(result.authoritativePriceCents ? { authoritativePriceCents: result.authoritativePriceCents } : {}) });
    else validated.push(result);
  });
  if (errors.length) return { ok: false, errors };
  return {
    ok: true,
    items: validated,
    subtotalCents: validated.reduce((sum, item) => sum + item.lineTotalCents, 0),
    currency: "EUR",
  };
}
