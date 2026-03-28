// ─── Price & Tax ──────────────────────────────────────────────────────────────

const GST_RATE = Number(process.env.NEXT_PUBLIC_GST_RATE ?? 18) / 100;
const FREE_SHIPPING_THRESHOLD = Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD ?? 5000);
const SHIPPING_CHARGE = Number(process.env.NEXT_PUBLIC_SHIPPING_CHARGE ?? 299);

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
export function getEffectivePrice(price: number, salePrice: number | null): number {
  if (salePrice !== null && salePrice > 0 && salePrice < price) return salePrice;
  return price;
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
 */
export function extractGST(inclPrice: number): number {
  return Math.round(inclPrice * GST_RATE / (1 + GST_RATE));
}

/**
 * Extract the base (ex-GST) price from a GST-inclusive price.
 * e.g. extractBasePrice(11800) → 10000
 */
export function extractBasePrice(inclPrice: number): number {
  return Math.round(inclPrice / (1 + GST_RATE));
}

/**
 * Calculate shipping cost based on subtotal (before GST).
 * Free above FREE_SHIPPING_THRESHOLD, else SHIPPING_CHARGE.
 */
export function calculateShipping(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE;
}

export const FREE_SHIPPING_ABOVE = FREE_SHIPPING_THRESHOLD;
export const GST_PERCENTAGE = Number(process.env.NEXT_PUBLIC_GST_RATE ?? 18);

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
