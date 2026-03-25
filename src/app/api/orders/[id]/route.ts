import { NextResponse } from 'next/server';
import { createDirectus, rest, staticToken, readItem } from '@directus/sdk';

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://api.infysmart.com';
  const token = process.env.DIRECTUS_ADMIN_TOKEN!;
  return createDirectus(url).with(staticToken(token)).with(rest());
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const directus = getAdminClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const order = await directus.request(readItem('orders' as any, id, {
      fields: [
        'id', 'order_number', 'status', 'payment_status', 'payment_method',
        'razorpay_payment_id',
        'customer_name', 'customer_email', 'customer_phone',
        'shipping_address', 'billing_same_as_shipping', 'billing_address',
        'subtotal', 'tax_amount', 'shipping_amount', 'discount_amount', 'total_amount',
        'coupon_code', 'notes', 'date_created',
        // Nested order items
        'items.id', 'items.product_name', 'items.product_sku',
        'items.quantity', 'items.unit_price', 'items.total_price',
        'items.product_snapshot',
      ],
    } as never));

    return NextResponse.json(order);
  } catch (error) {
    console.error('Fetch order error:', error);
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }
}
