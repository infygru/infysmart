import { NextResponse } from 'next/server';
import { createDirectus, rest, staticToken, createItem } from '@directus/sdk';
import { Resend } from 'resend';
import { generateOrderNumber } from '@/lib/utils';
import { sendOrderConfirmationSMS } from '@/lib/fast2sms';
import type { ShippingAddress } from '@/lib/directus';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // ── Send SMS notification (fire and forget) ─────────────────────────────
    const phone = body.customer_phone?.replace(/\D/g, '');
    if (phone && phone.length === 10) {
      sendOrderConfirmationSMS(phone, order_number, body.total_amount, body.payment_method)
        .catch((err) => console.error('Order SMS failed:', err));
    }

    // ── Send email confirmation via Resend (fire and forget) ─────────────────
    if (body.customer_email) {
      const addr = body.shipping_address;
      const addrStr = [addr.line1, addr.line2, `${addr.city}, ${addr.state} - ${addr.pincode}`]
        .filter(Boolean).join(', ');
      const itemRows = body.items.map((item) =>
        `<tr style="border-bottom:1px solid #f1f5f9">
          <td style="padding:10px 0;font-size:13px;color:#334155">${item.product_name}</td>
          <td style="padding:10px 0;text-align:center;font-size:13px;color:#64748b">${item.quantity}</td>
          <td style="padding:10px 0;text-align:right;font-size:13px;color:#334155;font-weight:600">₹${(item.total_price).toLocaleString('en-IN')}</td>
        </tr>`
      ).join('');
      const payLabel = body.payment_method === 'cod' ? 'Cash on Delivery' : 'Paid via Razorpay';
      const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif">
<div style="max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06)">
  <div style="background:#0f172a;padding:28px 32px;text-align:center">
    <h1 style="color:#fff;margin:0;font-size:22px;letter-spacing:-0.5px">Infy<span style="color:#FF4500">Smart</span></h1>
    <p style="color:#94a3b8;margin:6px 0 0;font-size:13px">Security Equipment Store</p>
  </div>
  <div style="padding:32px">
    <div style="text-align:center;margin-bottom:28px">
      <div style="display:inline-flex;align-items:center;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:50px;padding:8px 20px">
        <span style="color:#16a34a;font-size:18px;margin-right:8px">✓</span>
        <span style="color:#15803d;font-weight:700;font-size:15px">${body.payment_method === 'cod' ? 'Order Placed!' : 'Payment Confirmed!'}</span>
      </div>
      <p style="color:#64748b;font-size:13px;margin:12px 0 0">Hi ${body.customer_name}, your order has been received.</p>
    </div>
    <div style="background:#f8fafc;border-radius:8px;padding:16px 20px;margin-bottom:24px;text-align:center">
      <p style="margin:0;font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px">Order Number</p>
      <p style="margin:6px 0 0;font-size:20px;font-weight:800;color:#0f172a;font-family:monospace">${order_number}</p>
    </div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
      <thead>
        <tr style="border-bottom:2px solid #e2e8f0">
          <th style="padding:8px 0;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#94a3b8">Product</th>
          <th style="padding:8px 0;text-align:center;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#94a3b8">Qty</th>
          <th style="padding:8px 0;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#94a3b8">Total</th>
        </tr>
      </thead>
      <tbody>${itemRows}</tbody>
    </table>
    <div style="background:#f8fafc;border-radius:8px;padding:16px 20px;margin-bottom:24px">
      ${body.discount_amount > 0 ? `<div style="display:flex;justify-content:space-between;font-size:13px;color:#64748b;margin-bottom:6px"><span>Discount</span><span style="color:#2563eb">− ₹${body.discount_amount.toLocaleString('en-IN')}</span></div>` : ''}
      <div style="display:flex;justify-content:space-between;font-size:13px;color:#64748b;margin-bottom:6px"><span>Shipping</span><span>${body.shipping_amount === 0 ? '<span style="color:#16a34a">FREE</span>' : `₹${body.shipping_amount.toLocaleString('en-IN')}`}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:15px;font-weight:700;color:#0f172a;border-top:1px solid #e2e8f0;padding-top:10px;margin-top:6px"><span>Total ${body.payment_method === 'cod' ? '(Payable on delivery)' : 'Paid'}</span><span>₹${body.total_amount.toLocaleString('en-IN')}</span></div>
      <p style="margin:8px 0 0;font-size:11px;color:#94a3b8;text-align:right">Incl. 18% GST • ${payLabel}</p>
    </div>
    <div style="margin-bottom:24px">
      <p style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;margin:0 0 8px">Delivery Address</p>
      <p style="font-size:13px;color:#334155;margin:0;line-height:1.6">${addrStr}</p>
    </div>
    ${body.payment_method === 'cod' ? `<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:14px 16px;margin-bottom:24px">
      <p style="font-size:13px;color:#92400e;margin:0;font-weight:600">📞 COD Order — Call Confirmation</p>
      <p style="font-size:12px;color:#b45309;margin:6px 0 0">A sales representative will call you on <strong>${body.customer_phone}</strong> within 1 business day to confirm your order before dispatch.</p>
    </div>` : ''}
    <p style="font-size:12px;color:#94a3b8;text-align:center">For queries, contact <a href="mailto:info@infysmart.com" style="color:#FF4500">info@infysmart.com</a> or WhatsApp <a href="https://wa.me/919445675619" style="color:#FF4500">+91 94456 75619</a></p>
  </div>
  <div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:16px 32px;text-align:center">
    <p style="font-size:11px;color:#94a3b8;margin:0">© ${new Date().getFullYear()} Infysmart Technologies, Hosur. All rights reserved.</p>
  </div>
</div>
</body>
</html>`;

      resend.emails.send({
        from: 'Infysmart Orders <noreply@infysmart.com>',
        to: body.customer_email,
        subject: `Order Confirmed: ${order_number} | Infysmart`,
        html,
      }).catch((err) => console.error('Order email failed:', err));

      // ── Admin notification ──────────────────────────────────────────────────
      const adminHtml = `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px">
  <h2 style="color:#111;margin:0 0 16px">🛒 New Order Received — ${order_number}</h2>
  <table style="width:100%;border-collapse:collapse;font-size:14px">
    <tr><td style="padding:6px 0;color:#666;width:140px">Customer</td><td style="padding:6px 0;font-weight:600">${body.customer_name}</td></tr>
    <tr><td style="padding:6px 0;color:#666">Email</td><td style="padding:6px 0">${body.customer_email}</td></tr>
    <tr><td style="padding:6px 0;color:#666">Phone</td><td style="padding:6px 0">${body.customer_phone}</td></tr>
    <tr><td style="padding:6px 0;color:#666">Payment</td><td style="padding:6px 0;font-weight:600;color:${body.payment_method === 'cod' ? '#d97706' : '#16a34a'}">${body.payment_method === 'cod' ? 'Cash on Delivery' : 'PAID via Razorpay'}</td></tr>
    <tr><td style="padding:6px 0;color:#666">Total</td><td style="padding:6px 0;font-size:18px;font-weight:800;color:#FF4500">₹${body.total_amount.toLocaleString('en-IN')}</td></tr>
    <tr><td style="padding:6px 0;color:#666">Items</td><td style="padding:6px 0">${body.items.map(i => `${i.product_name} × ${i.quantity}`).join('<br/>')}</td></tr>
    <tr><td style="padding:6px 0;color:#666">Ship to</td><td style="padding:6px 0">${[addr.line1, addr.line2, `${addr.city}, ${addr.state} - ${addr.pincode}`].filter(Boolean).join(', ')}</td></tr>
  </table>
  <a href="https://infysmart.com/admin/orders" style="display:inline-block;margin-top:20px;background:#FF4500;color:#fff;padding:10px 24px;border-radius:8px;font-weight:700;text-decoration:none">View in Admin →</a>
</div>`;
      resend.emails.send({
        from: 'Infysmart Orders <noreply@infysmart.com>',
        to: ['infysmartbiz@gmail.com', 'csenaren@gmail.com'],
        subject: `🛒 New Order: ${order_number} — ₹${body.total_amount.toLocaleString('en-IN')} (${body.payment_method === 'cod' ? 'COD' : 'PAID'})`,
        html: adminHtml,
      }).catch((err) => console.error('Admin notification email failed:', err));
    }

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
