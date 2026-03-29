import { NextResponse } from 'next/server';
import { createDirectus, rest, staticToken, createItem, readSingleton } from '@directus/sdk';
import { generateOrderNumber } from '@/lib/utils';
import type { ShippingAddress, GlobalSettings } from '@/lib/directus';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface OrderItemPayload {
  product_id: string | null;
  product_name: string;
  product_sku: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  product_snapshot: {
    id: string;
    name: string;
    sku: string;
    thumbnail: string | null;
    price: number;
    sale_price: number | null;
  };
}

interface CreateOrderPayload {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: ShippingAddress;
  billing_same_as_shipping: boolean;
  billing_address: ShippingAddress | null;
  payment_method: 'razorpay' | 'cod';
  payment_status: 'pending' | 'paid' | 'failed';
  status: 'pending' | 'confirmed' | 'processing';
  razorpay_order_id?: string | null;
  razorpay_payment_id?: string | null;
  razorpay_signature?: string | null;
  coupon_code?: string | null;
  notes?: string | null;
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  discount_amount: number;
  total_amount: number;
  items: OrderItemPayload[];
}

// ─── Admin Directus client ─────────────────────────────────────────────────────

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://api.infysmart.com';
  const token = process.env.DIRECTUS_ADMIN_TOKEN!;
  return createDirectus(url).with(staticToken(token)).with(rest());
}

// ─── Route handler ─────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const body = await request.json() as CreateOrderPayload;

    // ── Validation ──────────────────────────────────────────────────────────────
    if (!body.customer_name || !body.customer_phone || !body.customer_email) {
      return NextResponse.json({ error: 'Customer details are required' }, { status: 400 });
    }
    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ error: 'Order must contain at least one item' }, { status: 400 });
    }
    if (!body.total_amount || body.total_amount <= 0) {
      return NextResponse.json({ error: 'Invalid order total' }, { status: 400 });
    }

    const directus = getAdminClient();

    // COD limit guard — fetch limit from Directus, fall back to ₹50,000
    let codMaxAmount = 50000;
    try {
      const settings = await directus.request(
        readSingleton('global_settings', { fields: ['cod_max_order_amount'] } as never)
      ) as GlobalSettings;
      codMaxAmount = Number(settings.cod_max_order_amount ?? 50000);
    } catch { /* use default */ }

    if (body.payment_method === 'cod' && body.total_amount > codMaxAmount) {
      return NextResponse.json(
        { error: `Cash on Delivery is only available for orders up to ₹${codMaxAmount.toLocaleString('en-IN')}` },
        { status: 400 }
      );
    }
    const order_number = generateOrderNumber();

    // ── Create order ────────────────────────────────────────────────────────────
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newOrder = await directus.request(createItem('orders' as any, {
      order_number,
      status: body.status ?? 'pending',
      payment_status: body.payment_status ?? 'pending',
      payment_method: body.payment_method,
      razorpay_order_id: body.razorpay_order_id ?? null,
      razorpay_payment_id: body.razorpay_payment_id ?? null,
      razorpay_signature: body.razorpay_signature ?? null,
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      customer_phone: body.customer_phone,
      shipping_address: body.shipping_address,
      billing_same_as_shipping: body.billing_same_as_shipping,
      billing_address: body.billing_same_as_shipping ? null : body.billing_address,
      subtotal: body.subtotal,
      tax_amount: body.tax_amount,
      shipping_amount: body.shipping_amount,
      discount_amount: body.discount_amount,
      total_amount: body.total_amount,
      coupon_code: body.coupon_code ?? null,
      notes: body.notes ?? null,
      date_created: new Date().toISOString(),
    } as never));

    const createdOrder = newOrder as { id: string };

    // ── Create order items ──────────────────────────────────────────────────────
    const itemPromises = body.items.map((item) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      directus.request(createItem('order_items' as any, {
        order: createdOrder.id,
        product: item.product_id ?? null,
        product_snapshot: item.product_snapshot,
        product_name: item.product_name,
        product_sku: item.product_sku,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
      } as never))
    );

    await Promise.all(itemPromises);

    return NextResponse.json({
      success: true,
      id: createdOrder.id,
      order_number,
    });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
