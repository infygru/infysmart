import { NextResponse } from 'next/server';
import { toPaise } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const { amount } = await request.json() as { amount: number };

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error('Razorpay keys not configured');
      return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 500 });
    }

    // Minimum order amount check (Razorpay minimum is ₹1)
    const amountInPaise = toPaise(amount);
    if (amountInPaise < 100) {
      return NextResponse.json({ error: 'Minimum order amount is ₹1' }, { status: 400 });
    }

    const credentials = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`,
        notes: {
          source: 'infysmart.com',
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({})) as { error?: { description?: string } };
      console.error('Razorpay order creation failed:', errorBody);
      return NextResponse.json(
        { error: errorBody?.error?.description ?? 'Failed to create payment order' },
        { status: 502 }
      );
    }

    const order = await response.json() as {
      id: string;
      amount: number;
      currency: string;
      status: string;
    };

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: keyId,
    });
  } catch (error) {
    console.error('Razorpay create-order error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
