/**
 * One-time script to create the quote_leads collection in Directus.
 * Run: node scripts/setup-directus-quotes.mjs
 */

const BASE_URL = 'https://api.infysmart.com';
const EMAIL = 'hosting@infygru.com';
const PASSWORD = 'Naren@123info';

async function login() {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  const data = await res.json();
  if (!data.data?.access_token) throw new Error(`Login failed: ${JSON.stringify(data)}`);
  console.log('✅ Logged in');
  return data.data.access_token;
}

async function apiFetch(token, path, method = 'GET', body = null) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE_URL}${path}`, opts);
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

async function collectionExists(token, name) {
  const res = await apiFetch(token, `/collections/${name}`);
  return !res.errors;
}

async function createCollection(token) {
  const exists = await collectionExists(token, 'quote_leads');
  if (exists) {
    console.log('ℹ️  quote_leads collection already exists — skipping creation');
    return;
  }

  const payload = {
    collection: 'quote_leads',
    meta: {
      icon: 'request_quote',
      note: 'Quote requests submitted from the website',
      display_template: '{{name}} — {{service_type}}',
      sort_field: null,
    },
    schema: {},
    fields: [
      {
        field: 'id',
        type: 'integer',
        meta: { hidden: true, readonly: true },
        schema: { is_primary_key: true, has_auto_increment: true },
      },
      {
        field: 'date_created',
        type: 'timestamp',
        meta: { special: ['date-created'], display: 'datetime', readonly: true, width: 'half' },
        schema: {},
      },
      {
        field: 'status',
        type: 'string',
        meta: {
          interface: 'select-dropdown',
          display: 'labels',
          width: 'half',
          options: {
            choices: [
              { text: 'New', value: 'New', color: '#3B82F6' },
              { text: 'In Progress', value: 'In Progress', color: '#F59E0B' },
              { text: 'Quoted', value: 'Quoted', color: '#8B5CF6' },
              { text: 'Closed', value: 'Closed', color: '#10B981' },
            ],
          },
        },
        schema: { default_value: 'New' },
      },
      {
        field: 'service_type',
        type: 'string',
        meta: {
          interface: 'select-dropdown',
          display: 'labels',
          width: 'half',
          options: {
            choices: [
              { text: 'CCTV', value: 'cctv', color: '#3B82F6' },
              { text: 'Solar', value: 'solar', color: '#F59E0B' },
              { text: 'Automation', value: 'automation', color: '#8B5CF6' },
            ],
          },
        },
        schema: {},
      },
      { field: 'name', type: 'string', meta: { interface: 'input', width: 'half', required: true }, schema: {} },
      { field: 'phone', type: 'string', meta: { interface: 'input', width: 'half', required: true }, schema: {} },
      { field: 'email', type: 'string', meta: { interface: 'input', width: 'half' }, schema: {} },
      { field: 'location', type: 'string', meta: { interface: 'input', width: 'half' }, schema: {} },
      { field: 'property_type', type: 'string', meta: { interface: 'input', width: 'half' }, schema: {} },
      { field: 'message', type: 'text', meta: { interface: 'input-multiline', width: 'full' }, schema: {} },
      // CCTV-specific
      { field: 'cctv_camera_count', type: 'integer', meta: { interface: 'input', width: 'half', note: 'CCTV only' }, schema: {} },
      { field: 'cctv_has_existing_system', type: 'boolean', meta: { interface: 'toggle', width: 'half', note: 'CCTV only' }, schema: { default_value: false } },
      // Solar-specific
      { field: 'solar_system_type', type: 'string', meta: { interface: 'input', width: 'half', note: 'Solar only' }, schema: {} },
      { field: 'solar_capacity', type: 'string', meta: { interface: 'input', width: 'half', note: 'Solar only' }, schema: {} },
      { field: 'solar_monthly_bill', type: 'string', meta: { interface: 'input', width: 'half', note: 'Solar only' }, schema: {} },
      // Automation-specific
      { field: 'automation_type', type: 'string', meta: { interface: 'input', width: 'half', note: 'Automation only' }, schema: {} },
    ],
  };

  const res = await apiFetch(token, '/collections', 'POST', payload);
  if (res.errors) {
    console.error('❌ Failed to create collection:', JSON.stringify(res.errors, null, 2));
  } else {
    console.log('✅ quote_leads collection created');
  }
}

async function main() {
  try {
    const token = await login();
    await createCollection(token);
    console.log('\n🎉 Directus setup complete!');
    console.log(`   → Manage leads at: ${BASE_URL}/admin/content/quote_leads`);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

main();
