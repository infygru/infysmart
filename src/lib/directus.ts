import { createDirectus, rest } from '@directus/sdk';

// ─── Existing CMS Types ────────────────────────────────────────────────────────

export interface GlobalSettings {
  id: number;
  site_name: string;
  contact_phone: string;
  contact_email: string;
  address: string;
  logo: string;
  hero_image: string;
  legal_disclaimer: string;
  announcement_bar: string;
  // Shipping config
  serviceable_states: string[] | null;  // null/empty = all states allowed
  shipping_charge: number | null;       // flat rate (default ₹299)
  free_shipping_above: number | null;   // free shipping threshold (default ₹5000)
  // Tax & payment config
  gst_rate: number | null;              // GST percentage (default 18)
  cod_max_order_amount: number | null;  // max COD order value (default ₹50,000)
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  icon: string;
  short_description: string;
  full_description: string;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  image: string;
  category: string;
  summary: string;
  content: string;
  date_published: string;
  author: string;
}

export interface Client {
  id: number | string;
  name: string;
  logo: string | null;
  website_url?: string;
  sort?: number;
  status?: string;
}

export interface Lead {
  name: string;
  phone: string;
  service_interested: string;
  message: string;
  status: 'New' | 'Contacted' | 'Closed';
}

export interface Project {
  id: number;
  title: string;
  location: string;
  status: 'Ongoing' | 'Completed';
  summary: string;
  image: string;
}

// ─── Ecommerce Types ───────────────────────────────────────────────────────────

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;           // Directus file UUID
  parent_category: number | null; // Self-referencing M2O
  sort: number;
  status: 'published' | 'draft';
  meta_title: string | null;
  meta_description: string | null;
  date_created: string;
}

export interface ProductBrand {
  id: number;
  name: string;
  slug: string;
  logo: string | null;            // Directus file UUID
  website: string | null;
  status: 'published' | 'draft';
}

export interface ProductImage {
  id: number;
  product: number;                // FK → products
  image: string;                  // Directus file UUID
  alt_text: string | null;
  sort: number;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  category: number | ProductCategory;   // FK or populated
  brand: number | ProductBrand;         // FK or populated
  short_description: string;
  description: string | null;           // Rich HTML
  specifications: ProductSpecification[] | null;
  features: string[] | null;
  price: number;                        // Base price ex-GST
  sale_price: number | null;
  stock_quantity: number;
  track_inventory: boolean;
  thumbnail: string | null;             // Primary image UUID
  images: ProductImage[];               // O2M
  status: 'published' | 'draft';
  is_featured: boolean;
  tags: string[] | null;
  weight: number | null;                // kg
  dimensions: { length: number; width: number; height: number } | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;      // Comma-separated keywords for <meta keywords> & structured data
  og_image: string | null;           // Optional OG image override (Directus file UUID)
  date_created: string;
  date_updated: string | null;
}

export interface ProductReview {
  id: number;
  product: number | Product;        // FK -> products
  customer: number | Customer;      // FK -> customers
  rating: number;                   // 1-5
  title: string | null;
  content: string;
  status: 'pending' | 'published' | 'rejected';
  date_created: string;
}

// ─── Order Types ───────────────────────────────────────────────────────────────

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export type PaymentMethod = 'razorpay' | 'cod';

export interface ShippingAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface OrderItem {
  id: number;
  order: number;                    // FK → orders
  product: number | null;           // FK → products (nullable if deleted)
  product_snapshot: {               // Immutable snapshot at time of order
    id: string;
    name: string;
    sku: string;
    thumbnail: string | null;
    price: number;
    sale_price: number | null;
  };
  product_name: string;
  product_sku: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Order {
  id: number;
  order_number: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  razorpay_signature: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: ShippingAddress;
  billing_same_as_shipping: boolean;
  billing_address: ShippingAddress | null;
  subtotal: number;                 // Sum of items ex-GST
  tax_amount: number;               // 18% GST
  shipping_amount: number;
  discount_amount: number;
  total_amount: number;
  coupon_code: string | null;
  notes: string | null;
  items?: OrderItem[];              // Populated via nested query
  date_created: string;
  date_updated: string | null;
}

export interface Customer {
  id: number;
  name: string | null;
  email: string;
  phone: string | null;
  email_verified: boolean;
  google_id: string | null;
  avatar: string | null;
  status: 'active' | 'inactive';
  date_created: string;
  saved_address?: ShippingAddress | null;
}

export interface OtpCode {
  id: number;
  email: string | null;
  phone: string | null;
  code: string;
  expires_at: string;
  used: boolean;
  date_created: string;
}

export interface Coupon {
  id: number;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  minimum_order: number;
  max_uses: number | null;
  used_count: number;
  valid_from: string;
  valid_until: string | null;
  status: 'active' | 'inactive';
}

// ─── Directus Schema ──────────────────────────────────────────────────────────

interface Schema {
  global_settings: GlobalSettings;
  services: Service[];
  clients: Client[];
  leads: Lead[];
  projects: Project[];
  blogs: Blog[];
  // Ecommerce
  product_categories: ProductCategory[];
  product_brands: ProductBrand[];
  products: Product[];
  product_images: ProductImage[];
  product_reviews: ProductReview[];
  orders: Order[];
  order_items: OrderItem[];
  coupons: Coupon[];
  customers: Customer[];
  otp_codes: OtpCode[];
  notification_bar: NotificationBar;
}

export interface NotificationBar {
  id: number;
  enabled: boolean;
  bg_color: 'orange' | 'blue' | 'green' | 'red' | 'dark';
  message: string | null;
  cta_label: string | null;
  cta_url: string | null;
}

// ─── Client Init ──────────────────────────────────────────────────────────────

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://api.infysmart.com';

export const directus = createDirectus<Schema>(directusUrl).with(rest());

export const getAssetUrl = (id: string, params?: Record<string, string>) => {
  const url = new URL(`${directusUrl}/assets/${id}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  return url.toString();
};
