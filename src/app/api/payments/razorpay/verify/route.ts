import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createDirectus, rest, staticToken, createItem } from '@directus/sdk';
import { Resend } from 'resend';
import { generateOrderNumber } from '@/lib/utils';
import { sendOrderConfirmationSMS } from '@/lib/fast2sms';

const resend = new Resend(process.env.RESEND_API_KEY);

interface VerifyPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  order_payload: Record<string, unknown>;
}

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://api.infysmart.com';
  const token = process.env.DIRECTUS_ADMIN_TOKEN!;
  return createDirectus(url).with(staticToken(token)).with(rest());
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as VerifyPayload;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_payload } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment verification fields' }, { status: 400 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 500 });
    }

    // ─── HMAC-SHA256 signature verification ───────────────────────────────────
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const isValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'hex'),
      Buffer.from(razorpay_signature, 'hex')
    );

    if (!isValid) {
      console.error('Razorpay signature verification failed', { razorpay_order_id, razorpay_payment_id });
      return NextResponse.json({ error: 'Payment verification failed — invalid signature' }, { status: 400 });
    }

    // ─── Signature valid — create order directly in Directus ─────────────────
    const directus = getAdminClient();
    const order_number = generateOrderNumber();
    const p = order_payload;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newOrder = await directus.request(createItem('orders' as any, {
      order_number,
      status: 'confirmed',
      payment_status: 'paid',
      payment_method: p.payment_method ?? 'razorpay',
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer_name: p.customer_name,
      customer_email: p.customer_email,
      customer_phone: p.customer_phone,
      shipping_address: p.shipping_address,
      billing_same_as_shipping: p.billing_same_as_shipping ?? true,
      billing_address: p.billing_same_as_shipping ? null : p.billing_address,
      subtotal: p.subtotal,
      tax_amount: p.tax_amount,
      shipping_amount: p.shipping_amount,
      discount_amount: p.discount_amount,
      total_amount: p.total_amount,
      coupon_code: p.coupon_code ?? null,
      notes: p.notes ?? null,
      date_created: new Date().toISOString(),
    } as never));

    const created = newOrder as { id: string };

    // ─── Create order items ───────────────────────────────────────────────────
    const items = (p.items as Array<Record<string, unknown>>) ?? [];
    await Promise.all(items.map((item) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      directus.request(createItem('order_items' as any, {
        order: created.id,
        product: item.product_id ?? null,
        product_snapshot: item.product_snapshot,
        product_name: item.product_name,
        product_sku: item.product_sku,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
      } as never))
    ));

    // ─── SMS notification (fire & forget) ────────────────────────────────────
    const phone = (p.customer_phone as string)?.replace(/\D/g, '');
    if (phone && phone.length === 10) {
      sendOrderConfirmationSMS(phone, order_number, p.total_amount as number, 'razorpay')
        .catch((err) => console.error('Order SMS failed:', err));
    }

    // ─── Email confirmation (fire & forget) ──────────────────────────────────
    if (p.customer_email) {
      const addr = p.shipping_address as Record<string, string>;
      const addrStr = [addr.line1, addr.line2, `${addr.city}, ${addr.state} - ${addr.pincode}`]
        .filter(Boolean).join(', ');
      const totalAmt = (p.total_amount as number) ?? 0;
      const shippingAmt = (p.shipping_amount as number) ?? 0;
      const discountAmt = (p.discount_amount as number) ?? 0;
      const itemRows = items.map((item) =>
        `<tr style="border-bottom:1px solid #f1f5f9">
          <td style="padding:10px 0;font-size:13px;color:#334155">${item.product_name}</td>
          <td style="padding:10px 0;text-align:center;font-size:13px;color:#64748b">${item.quantity}</td>
          <td style="padding:10px 0;text-align:right;font-size:13px;color:#334155;font-weight:600">₹${(item.total_price as number).toLocaleString('en-IN')}</td>
        </tr>`
      ).join('');

      const html = `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif">
<div style="max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06)">
  <div style="background:#0f172a;padding:28px 32px;text-align:center">
    <h1 style="color:#fff;margin:0;font-size:22px;letter-spacing:-0.5px">Infy<span style="color:#FF4500">Smart</span></h1>
    <p style="color:#94a3b8;margin:6px 0 0;font-size:13px">Security Equipment Store</p>
  </div>
  <div style="padding:32px">
    <div style="text-align:center;margin-bottom:28px">
      <div style="display:inline-flex;align-items:center;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:50px;padding:8px 20px">
        <span style="color:#16a34a;font-size:18px;margin-right:8px">✓</span>
        <span style="color:#15803d;font-weight:700;font-size:15px">Payment Confirmed!</span>
      </div>
      <p style="color:#64748b;font-size:13px;margin:12px 0 0">Hi ${p.customer_name}, your payment was successful.</p>
    </div>
    <div style="background:#f8fafc;border-radius:8px;padding:16px 20px;margin-bottom:24px;text-align:center">
      <p style="margin:0;font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px">Order Number</p>
      <p style="margin:6px 0 0;font-size:20px;font-weight:800;color:#0f172a;font-family:monospace">${order_number}</p>
      <p style="margin:6px 0 0;font-size:11px;color:#94a3b8">Payment ID: ${razorpay_payment_id}</p>
    </div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
      <thead><tr style="border-bottom:2px solid #e2e8f0">
        <th style="padding:8px 0;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#94a3b8">Product</th>
        <th style="padding:8px 0;text-align:center;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#94a3b8">Qty</th>
        <th style="padding:8px 0;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#94a3b8">Total</th>
      </tr></thead>
      <tbody>${itemRows}</tbody>
    </table>
    <div style="background:#f8fafc;border-radius:8px;padding:16px 20px;margin-bottom:24px">
      ${discountAmt > 0 ? `<div style="display:flex;justify-content:space-between;font-size:13px;color:#64748b;margin-bottom:6px"><span>Discount</span><span style="color:#2563eb">− ₹${discountAmt.toLocaleString('en-IN')}</span></div>` : ''}
      <div style="display:flex;justify-content:space-between;font-size:13px;color:#64748b;margin-bottom:6px"><span>Shipping</span><span>${shippingAmt === 0 ? '<span style="color:#16a34a">FREE</span>' : `₹${shippingAmt.toLocaleString('en-IN')}`}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:15px;font-weight:700;color:#0f172a;border-top:1px solid #e2e8f0;padding-top:10px;margin-top:6px"><span>Total Paid</span><span>₹${totalAmt.toLocaleString('en-IN')}</span></div>
      <p style="margin:8px 0 0;font-size:11px;color:#94a3b8;text-align:right">Incl. 18% GST • Paid via Razorpay</p>
    </div>
    <div style="margin-bottom:24px">
      <p style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;margin:0 0 8px">Delivery Address</p>
      <p style="font-size:13px;color:#334155;margin:0;line-height:1.6">${addrStr}</p>
    </div>
    <p style="font-size:12px;color:#94a3b8;text-align:center">For queries, contact <a href="mailto:info@infysmart.com" style="color:#FF4500">info@infysmart.com</a></p>
  </div>
  <div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:16px 32px;text-align:center">
    <p style="font-size:11px;color:#94a3b8;margin:0">© ${new Date().getFullYear()} Infysmart Technologies, Hosur</p>
  </div>
</div></body></html>`;

      resend.emails.send({
        from: 'Infysmart Orders <noreply@infysmart.com>',
        to: p.customer_email as string,
        subject: `Payment Confirmed: ${order_number} | Infysmart`,
        html,
      }).catch((err) => console.error('Order email failed:', err));

      // ── Admin notification ──────────────────────────────────────────────────
      const adminHtml = `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px">
  <h2 style="color:#111;margin:0 0 16px">💳 New PAID Order — ${order_number}</h2>
  <table style="width:100%;border-collapse:collapse;font-size:14px">
    <tr><td style="padding:6px 0;color:#666;width:140px">Customer</td><td style="padding:6px 0;font-weight:600">${p.customer_name}</td></tr>
    <tr><td style="padding:6px 0;color:#666">Email</td><td style="padding:6px 0">${p.customer_email}</td></tr>
    <tr><td style="padding:6px 0;color:#666">Phone</td><td style="padding:6px 0">${p.customer_phone}</td></tr>
    <tr><td style="padding:6px 0;color:#666">Payment</td><td style="padding:6px 0;font-weight:700;color:#16a34a">✓ PAID via Razorpay</td></tr>
    <tr><td style="padding:6px 0;color:#666">Payment ID</td><td style="padding:6px 0;font-family:monospace;font-size:12px">${razorpay_payment_id}</td></tr>
    <tr><td style="padding:6px 0;color:#666">Total</td><td style="padding:6px 0;font-size:18px;font-weight:800;color:#FF4500">₹${(p.total_amount as number).toLocaleString('en-IN')}</td></tr>
    <tr><td style="padding:6px 0;color:#666">Items</td><td style="padding:6px 0">${items.map(i => `${i.product_name} × ${i.quantity}`).join('<br/>')}</td></tr>
    <tr><td style="padding:6px 0;color:#666">Ship to</td><td style="padding:6px 0">${[addrStr].join('')}</td></tr>
  </table>
  <a href="https://infysmart.com/admin/orders" style="display:inline-block;margin-top:20px;background:#FF4500;color:#fff;padding:10px 24px;border-radius:8px;font-weight:700;text-decoration:none">View in Admin →</a>
</div>`;
      resend.emails.send({
        from: 'Infysmart Orders <noreply@infysmart.com>',
        to: ['infysmartbiz@gmail.com', 'csenaren@gmail.com'],
        subject: `💳 PAID Order: ${order_number} — ₹${(p.total_amount as number).toLocaleString('en-IN')}`,
        html: adminHtml,
      }).catch((err) => console.error('Admin notification email failed:', err));
    }

    return NextResponse.json({
      success: true,
      id: created.id,
      order_number,
      razorpay_payment_id,
    });
  } catch (error) {
    console.error('Razorpay verify error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
