// ─── Price & Tax ──────────────────────────────────────────────────────────────

const GST_RATE = 0.18; // fallback only — actual rate comes from Directus global_settings

/**
 * Format a number as Indian Rupees.
 * e.g. 12500 → "₹12,500"
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

/**
 * Returns the effective selling price for a product.
 * Uses sale_price if set and lower than price.
 */
export function getEffectivePrice(price: number | string, salePrice: number | string | null): number {
  const p = Number(price);
  const s = salePrice !== null ? Number(salePrice) : null;
  if (s !== null && s > 0 && s < p) return s;
  return p;
}

/**
 * Calculate GST amount on a given base (ex-GST) amount.
 * Used for internal calculations only.
 */
export function calculateGST(baseAmount: number): number {
  return Math.round(baseAmount * GST_RATE);
}

/**
 * Extract the GST component from a GST-inclusive price.
 * e.g. extractGST(11800) → 1800  (where rate is 18%)
 * Pass ratePercent to override the default (e.g. from Directus).
 */
export function extractGST(inclPrice: number, ratePercent = GST_RATE * 100): number {
  const rate = ratePercent / 100;
  return Math.round(inclPrice * rate / (1 + rate));
}

/**
 * Extract the base (ex-GST) price from a GST-inclusive price.
 * e.g. extractBasePrice(11800) → 10000
 * Pass ratePercent to override the default (e.g. from Directus).
 */
export function extractBasePrice(inclPrice: number, ratePercent = GST_RATE * 100): number {
  const rate = ratePercent / 100;
  return Math.round(inclPrice / (1 + rate));
}

export const GST_PERCENTAGE = 18; // fallback only — actual rate comes from Directus global_settings

// ─── Order Number ─────────────────────────────────────────────────────────────

/**
 * Generates a unique order number like ORD-20240325-A4B2C
 */
export function generateOrderNumber(): string {
  const date = new Date();
  const datePart = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ORD-${datePart}-${randomPart}`;
}

// ─── Text ─────────────────────────────────────────────────────────────────────

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trimEnd() + '…';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ─── Validation ───────────────────────────────────────────────────────────────

export function isValidPhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone.replace(/\s+/g, ''));
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPincode(pincode: string): boolean {
  return /^[1-9][0-9]{5}$/.test(pincode);
}

// ─── Discount ─────────────────────────────────────────────────────────────────

export function applyDiscount(
  subtotal: number,
  discountType: 'percentage' | 'fixed',
  discountValue: number
): number {
  if (discountType === 'percentage') {
    return Math.round(subtotal * (discountValue / 100));
  }
  return Math.min(discountValue, subtotal);
}

// ─── Razorpay ─────────────────────────────────────────────────────────────────

/** Convert INR to paise (Razorpay expects smallest currency unit) */
export function toPaise(amount: number): number {
  return Math.round(amount * 100);
}

/** Convert paise back to INR */
export function fromPaise(paise: number): number {
  return paise / 100;
}
