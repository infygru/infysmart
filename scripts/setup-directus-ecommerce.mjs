/**
 * Infysmart — Directus Ecommerce Schema Setup
 * Run: node scripts/setup-directus-ecommerce.mjs
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

try {
  const envPath = resolve(__dirname, '../.env.local');
  const envContent = readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    process.env[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim();
  }
} catch { /* rely on env */ }

const BASE_URL = (process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://api.infysmart.com').replace(/\/$/, '');
let TOKEN = '';

// ─── Auth ─────────────────────────────────────────────────────────────────────

async function login() {
  console.log('🔐  Authenticating as admin...');
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'hosting@infygru.com', password: 'Naren@123info' }),
  });
  if (!res.ok) throw new Error(`Login failed: ${await res.text()}`);
  const data = await res.json();
  TOKEN = data?.data?.access_token;
  if (!TOKEN) throw new Error('No access_token in login response');
  console.log('  ✓ Authenticated.\n');
}

// ─── HTTP helpers ─────────────────────────────────────────────────────────────

async function api(method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${text.slice(0, 200)}`);
  return text ? JSON.parse(text) : null;
}

async function exists(path) {
  try { await api('GET', path); return true; } catch { return false; }
}

// ─── Collection builder ───────────────────────────────────────────────────────

async function ensureCollection(collection, meta, fields) {
  const colExists = await exists(`/collections/${collection}`);

  // Always include schema: { name: collection } so Directus actually creates the DB table
  const payload = { collection, schema: { name: collection }, meta, fields };

  if (!colExists) {
    await api('POST', '/collections', payload);
    console.log(`  ✓  Created: ${collection} (${fields.length} fields)`);
    return;
  }

  // Collection exists — check if properly set up: DB table exists AND first custom field exists
  // (e.g. 'name' or 'code') — the id field alone means it was created incomplete
  const firstCustomField = fields.find(f => f.field !== 'id')?.field;
  let fullySetup = false;
  if (firstCustomField) {
    fullySetup = await exists(`/fields/${collection}/${firstCustomField}`);
  } else {
    try { await api('GET', `/items/${collection}?limit=1`); fullySetup = true; } catch { /* no */ }
  }

  if (!fullySetup) {
    console.log(`  ⚠  "${collection}" exists but is incomplete. Deleting and recreating...`);
    await api('DELETE', `/collections/${collection}`);
    await new Promise(r => setTimeout(r, 500)); // brief pause
    await api('POST', '/collections', payload);
    console.log(`  ✓  Recreated: ${collection} (${fields.length} fields)`);
    return;
  }

  console.log(`  ⚠  "${collection}" already fully set up — skipping.`);
}

// ─── Seed helpers ─────────────────────────────────────────────────────────────

async function seedItem(collection, item, uniqueField) {
  // Check if item already exists
  try {
    const existing = await api('GET', `/items/${collection}?filter[${uniqueField}][_eq]=${encodeURIComponent(item[uniqueField])}&limit=1`);
    if (existing?.data?.length > 0) {
      process.stdout.write('·');
      return;
    }
  } catch { /* proceed to create */ }

  try {
    await api('POST', `/items/${collection}`, item);
    process.stdout.write('✓');
  } catch (e) {
    process.stdout.write('✗');
    console.log(`\n    ⚠  ${item[uniqueField]}: ${e.message.slice(0, 100)}`);
  }
}

// ─── Schema ───────────────────────────────────────────────────────────────────

async function setup() {
  console.log('📁  product_categories');
  await ensureCollection('product_categories',
    { icon: 'folder', display_template: '{{name}}', sort_field: 'sort' },
    [
      { field: 'name',             type: 'string',    meta: { required: true } },
      { field: 'slug',             type: 'string',    meta: { required: true } },
      { field: 'description',      type: 'text',      meta: {} },
      { field: 'image',            type: 'uuid',      meta: { interface: 'file-image', special: ['file'] } },
      { field: 'sort',             type: 'integer',   schema: { default_value: 0 }, meta: {} },
      { field: 'status',           type: 'string',    schema: { default_value: 'published' }, meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Published', value: 'published' }, { text: 'Draft', value: 'draft' }] } } },
      { field: 'meta_title',       type: 'string',    meta: {} },
      { field: 'meta_description', type: 'text',      meta: {} },
      { field: 'date_created',     type: 'timestamp', meta: { special: ['date-created'], readonly: true } },
    ]
  );

  console.log('\n🏷  product_brands');
  await ensureCollection('product_brands',
    { icon: 'verified', display_template: '{{name}}' },
    [
      { field: 'name',    type: 'string', meta: { required: true } },
      { field: 'slug',    type: 'string', meta: { required: true } },
      { field: 'logo',    type: 'uuid',   meta: { interface: 'file-image', special: ['file'] } },
      { field: 'website', type: 'string', meta: {} },
      { field: 'status',  type: 'string', schema: { default_value: 'published' }, meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Published', value: 'published' }, { text: 'Draft', value: 'draft' }] } } },
    ]
  );

  console.log('\n📦  products');
  await ensureCollection('products',
    { icon: 'inventory_2', display_template: '{{name}}', sort_field: 'date_created' },
    [
      { field: 'name',              type: 'string',    meta: { required: true } },
      { field: 'slug',              type: 'string',    meta: { required: true } },
      { field: 'sku',               type: 'string',    meta: { required: true } },
      { field: 'category',          type: 'integer',   meta: { interface: 'select-dropdown-m2o', special: ['m2o'] } },
      { field: 'brand',             type: 'integer',   meta: { interface: 'select-dropdown-m2o', special: ['m2o'] } },
      { field: 'short_description', type: 'text',      meta: { required: true } },
      { field: 'description',       type: 'text',      meta: { interface: 'input-rich-text-html' } },
      { field: 'specifications',    type: 'json',      meta: { special: ['cast-json'] } },
      { field: 'features',          type: 'json',      meta: { special: ['cast-json'] } },
      { field: 'price',             type: 'decimal',   meta: { required: true } },
      { field: 'sale_price',        type: 'decimal',   meta: {} },
      { field: 'stock_quantity',    type: 'integer',   schema: { default_value: 0 }, meta: {} },
      { field: 'track_inventory',   type: 'boolean',   schema: { default_value: true }, meta: {} },
      { field: 'thumbnail',         type: 'uuid',      meta: { interface: 'file-image', special: ['file'] } },
      { field: 'status',            type: 'string',    schema: { default_value: 'published' }, meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Published', value: 'published' }, { text: 'Draft', value: 'draft' }] } } },
      { field: 'is_featured',       type: 'boolean',   schema: { default_value: false }, meta: {} },
      { field: 'tags',              type: 'json',      meta: { special: ['cast-json'] } },
      { field: 'weight',            type: 'decimal',   meta: {} },
      { field: 'dimensions',        type: 'json',      meta: { special: ['cast-json'] } },
      { field: 'meta_title',        type: 'string',    meta: {} },
      { field: 'meta_description',  type: 'text',      meta: {} },
      { field: 'date_created',      type: 'timestamp', meta: { special: ['date-created'], readonly: true } },
      { field: 'date_updated',      type: 'timestamp', meta: { special: ['date-updated'], readonly: true } },
    ]
  );

  console.log('\n🖼  product_images');
  await ensureCollection('product_images',
    { icon: 'image', display_template: '{{sort}}', sort_field: 'sort' },
    [
      { field: 'product',  type: 'integer', meta: { interface: 'select-dropdown-m2o', special: ['m2o'] } },
      { field: 'image',    type: 'uuid',    meta: { interface: 'file-image', special: ['file'] } },
      { field: 'alt_text', type: 'string',  meta: {} },
      { field: 'sort',     type: 'integer', schema: { default_value: 0 }, meta: {} },
    ]
  );

  console.log('\n🛒  orders');
  await ensureCollection('orders',
    { icon: 'receipt_long', display_template: '{{order_number}} — {{customer_name}}', sort_field: 'date_created' },
    [
      { field: 'order_number',             type: 'string',    meta: { required: true } },
      { field: 'status',                   type: 'string',    schema: { default_value: 'pending' },   meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Pending', value: 'pending' }, { text: 'Confirmed', value: 'confirmed' }, { text: 'Processing', value: 'processing' }, { text: 'Shipped', value: 'shipped' }, { text: 'Delivered', value: 'delivered' }, { text: 'Cancelled', value: 'cancelled' }, { text: 'Refunded', value: 'refunded' }] } } },
      { field: 'payment_status',           type: 'string',    schema: { default_value: 'pending' },   meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Pending', value: 'pending' }, { text: 'Paid', value: 'paid' }, { text: 'Failed', value: 'failed' }, { text: 'Refunded', value: 'refunded' }] } } },
      { field: 'payment_method',           type: 'string',    meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Razorpay', value: 'razorpay' }, { text: 'Cash on Delivery', value: 'cod' }] } } },
      { field: 'razorpay_order_id',        type: 'string',    meta: {} },
      { field: 'razorpay_payment_id',      type: 'string',    meta: {} },
      { field: 'razorpay_signature',       type: 'string',    meta: {} },
      { field: 'customer_name',            type: 'string',    meta: { required: true } },
      { field: 'customer_email',           type: 'string',    meta: { required: true } },
      { field: 'customer_phone',           type: 'string',    meta: { required: true } },
      { field: 'shipping_address',         type: 'json',      meta: { special: ['cast-json'] } },
      { field: 'billing_same_as_shipping', type: 'boolean',   schema: { default_value: true }, meta: {} },
      { field: 'billing_address',          type: 'json',      meta: { special: ['cast-json'] } },
      { field: 'subtotal',                 type: 'decimal',   meta: {} },
      { field: 'tax_amount',               type: 'decimal',   meta: {} },
      { field: 'shipping_amount',          type: 'decimal',   meta: {} },
      { field: 'discount_amount',          type: 'decimal',   schema: { default_value: 0 }, meta: {} },
      { field: 'total_amount',             type: 'decimal',   meta: {} },
      { field: 'coupon_code',              type: 'string',    meta: {} },
      { field: 'notes',                    type: 'text',      meta: {} },
      { field: 'date_created',             type: 'timestamp', meta: { special: ['date-created'], readonly: true } },
      { field: 'date_updated',             type: 'timestamp', meta: { special: ['date-updated'], readonly: true } },
    ]
  );

  console.log('\n📋  order_items');
  await ensureCollection('order_items',
    { icon: 'list', display_template: '{{product_name}} × {{quantity}}' },
    [
      { field: 'order',            type: 'integer', meta: { interface: 'select-dropdown-m2o', special: ['m2o'] } },
      { field: 'product',          type: 'integer', meta: { interface: 'select-dropdown-m2o', special: ['m2o'] } },
      { field: 'product_snapshot', type: 'json',    meta: { special: ['cast-json'] } },
      { field: 'product_name',     type: 'string',  meta: { required: true } },
      { field: 'product_sku',      type: 'string',  meta: { required: true } },
      { field: 'quantity',         type: 'integer', meta: { required: true } },
      { field: 'unit_price',       type: 'decimal', meta: { required: true } },
      { field: 'total_price',      type: 'decimal', meta: { required: true } },
    ]
  );

  console.log('\n🎟  coupons');
  await ensureCollection('coupons',
    { icon: 'local_offer', display_template: '{{code}}' },
    [
      { field: 'code',           type: 'string',    meta: { required: true } },
      { field: 'discount_type',  type: 'string',    meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Percentage (%)', value: 'percentage' }, { text: 'Fixed Amount (₹)', value: 'fixed' }] } } },
      { field: 'discount_value', type: 'decimal',   meta: { required: true } },
      { field: 'minimum_order',  type: 'decimal',   schema: { default_value: 0 }, meta: {} },
      { field: 'max_uses',       type: 'integer',   meta: {} },
      { field: 'used_count',     type: 'integer',   schema: { default_value: 0 }, meta: {} },
      { field: 'valid_from',     type: 'timestamp', meta: { required: true } },
      { field: 'valid_until',    type: 'timestamp', meta: {} },
      { field: 'status',         type: 'string',    schema: { default_value: 'active' }, meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Active', value: 'active' }, { text: 'Inactive', value: 'inactive' }] } } },
    ]
  );

  // ─── Seed categories ──────────────────────────────────────────────────────
  console.log('\n🌱  Seeding product categories... ');
  const categories = [
    { name: 'IP Cameras',         slug: 'ip-cameras',         sort: 1  },
    { name: 'Analog Cameras',     slug: 'analog-cameras',     sort: 2  },
    { name: 'NVR / DVR',          slug: 'nvr-dvr',            sort: 3  },
    { name: 'PTZ Cameras',        slug: 'ptz-cameras',        sort: 4  },
    { name: 'Solar 4G Cameras',   slug: 'solar-4g',           sort: 5  },
    { name: 'PoE Switches',       slug: 'poe-switches',       sort: 6  },
    { name: 'Network Switches',   slug: 'network-switches',   sort: 7  },
    { name: 'Structured Cabling', slug: 'structured-cabling', sort: 8  },
    { name: 'Access Control',     slug: 'access-control',     sort: 9  },
    { name: 'Video Door Phone',   slug: 'video-door-phone',   sort: 10 },
    { name: 'Hard Drives',        slug: 'hard-drives',        sort: 11 },
    { name: 'UPS & Power',        slug: 'ups-power',          sort: 12 },
  ];
  for (const cat of categories) await seedItem('product_categories', { ...cat, status: 'published' }, 'slug');
  console.log();

  // ─── Seed brands ──────────────────────────────────────────────────────────
  console.log('\n🌱  Seeding product brands... ');
  const brands = [
    { name: 'Hikvision', slug: 'hikvision', website: 'https://www.hikvision.com' },
    { name: 'Dahua',     slug: 'dahua',     website: 'https://www.dahuasecurity.com' },
    { name: 'CP Plus',   slug: 'cp-plus',   website: 'https://www.cpplus.in' },
    { name: 'Honeywell', slug: 'honeywell', website: 'https://www.honeywell.com' },
    { name: 'Essl',      slug: 'essl',      website: 'https://www.essl.co.in' },
    { name: 'Matrix',    slug: 'matrix',    website: 'https://www.matrixcomsec.com' },
    { name: 'D-Link',    slug: 'd-link',    website: 'https://www.dlink.com' },
    { name: 'TP-Link',   slug: 'tp-link',   website: 'https://www.tp-link.com' },
    { name: 'Panasonic', slug: 'panasonic', website: 'https://www.panasonic.com' },
    { name: 'Bosch',     slug: 'bosch',     website: 'https://www.boschsecurity.com' },
  ];
  for (const brand of brands) await seedItem('product_brands', { ...brand, status: 'published' }, 'slug');
  console.log();
}

// ─── Permissions ──────────────────────────────────────────────────────────────

async function grantPublicPermissions() {
  console.log('\n🔒  Granting public read permissions...');

  // Website Public Access policy (for static token + unauthenticated frontend)
  const PUBLIC_POLICY = '15e3925b-588b-41e6-b3dd-5d3d8f7aea54';

  const desired = [
    { collection: 'product_categories', action: 'read' },
    { collection: 'product_brands',     action: 'read' },
    { collection: 'products',           action: 'read' },
    { collection: 'product_images',     action: 'read' },
    { collection: 'orders',             action: 'create' },
    { collection: 'orders',             action: 'read' },
    { collection: 'order_items',        action: 'create' },
    { collection: 'order_items',        action: 'read' },
    { collection: 'coupons',            action: 'read' },
  ];

  // Fetch existing permissions for this policy (as map: "collection:action" -> id)
  let existingMap = {};
  try {
    const res = await api('GET', `/permissions?filter[policy][_eq]=${PUBLIC_POLICY}&limit=100`);
    for (const p of (res?.data || [])) {
      existingMap[`${p.collection}:${p.action}`] = { id: p.id, fields: p.fields };
    }
  } catch { /* ignore */ }

  let created = 0, updated = 0;
  for (const { collection, action } of desired) {
    const key = `${collection}:${action}`;
    const existing = existingMap[key];
    if (existing) {
      // Ensure fields is set to ["*"]
      if (!existing.fields || !existing.fields.includes('*')) {
        try {
          await api('PATCH', `/permissions/${existing.id}`, { fields: ['*'] });
          process.stdout.write('↑');
          updated++;
        } catch { process.stdout.write('✗'); }
      } else {
        process.stdout.write('·');
      }
      continue;
    }
    try {
      await api('POST', '/permissions', { policy: PUBLIC_POLICY, collection, action, fields: ['*'] });
      process.stdout.write('✓');
      created++;
    } catch (e) {
      process.stdout.write('✗');
      console.log(`\n    ⚠  ${key}: ${e.message.slice(0, 100)}`);
    }
  }
  console.log(`\n  ${created} created, ${updated} updated.`);
}

// ─── Run ──────────────────────────────────────────────────────────────────────

(async () => {
  console.log(`\n🚀  Infysmart Ecommerce — Directus Schema Setup`);
  console.log(`   Target: ${BASE_URL}\n`);
  try {
    await login();
    await setup();
    await grantPublicPermissions();
    console.log('\n✅  Done! Open ' + BASE_URL + '/admin to verify.\n');
  } catch (err) {
    console.error('\n❌  Failed:', err.message);
    process.exit(1);
  }
})();
