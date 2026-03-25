import { NextResponse } from 'next/server';
import crypto from 'crypto';

interface VerifyPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  order_payload: Record<string, unknown>;
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
    // Razorpay signature = HMAC_SHA256( razorpay_order_id + "|" + razorpay_payment_id, key_secret )
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const isValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'hex'),
      Buffer.from(razorpay_signature, 'hex')
    );

    if (!isValid) {
      console.error('Razorpay signature verification failed', {
        razorpay_order_id,
        razorpay_payment_id,
      });
      return NextResponse.json({ error: 'Payment verification failed — invalid signature' }, { status: 400 });
    }

    // ─── Signature valid — persist the order ─────────────────────────────────
    const createRes = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://infysmart.com'}/api/orders/create`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...order_payload,
          payment_status: 'paid',
          status: 'confirmed',
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        }),
      }
    );

    if (!createRes.ok) {
      const errBody = await createRes.json().catch(() => ({})) as { error?: string };
      console.error('Order creation after payment failed:', errBody);
      // Payment was captured but DB save failed — log for manual reconciliation
      return NextResponse.json(
        {
          error: 'Payment received but order save failed. Please contact support with your payment ID.',
          razorpay_payment_id,
        },
        { status: 500 }
      );
    }

    const order = await createRes.json() as { id: string; order_number: string };

    return NextResponse.json({
      success: true,
      id: order.id,
      order_number: order.order_number,
      razorpay_payment_id,
    });
  } catch (error) {
    console.error('Razorpay verify error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
