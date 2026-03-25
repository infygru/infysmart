import { NextResponse } from 'next/server';
import { createDirectus, rest, staticToken, readItems } from '@directus/sdk';
import type { Coupon } from '@/lib/directus';

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://api.infysmart.com';
  const token = process.env.DIRECTUS_ADMIN_TOKEN!;
  return createDirectus(url).with(staticToken(token)).with(rest());
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code')?.trim().toUpperCase();
    const subtotal = Number(searchParams.get('subtotal') ?? 0);

    if (!code) {
      return NextResponse.json({ valid: false, error: 'Coupon code is required' }, { status: 400 });
    }

    const directus = getAdminClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const results = await directus.request(readItems('coupons' as any, {
      filter: {
        code: { _eq: code },
        status: { _eq: 'active' },
      },
      limit: 1,
    })) as unknown as Coupon[];

    const coupon = results[0];

    if (!coupon) {
      return NextResponse.json({ valid: false, error: 'Invalid coupon code' });
    }

    const now = new Date();

    // Date range validation
    if (new Date(coupon.valid_from) > now) {
      return NextResponse.json({ valid: false, error: 'This coupon is not yet active' });
    }
    if (coupon.valid_until && new Date(coupon.valid_until) < now) {
      return NextResponse.json({ valid: false, error: 'This coupon has expired' });
    }

    // Usage limit
    if (coupon.max_uses !== null && coupon.used_count >= coupon.max_uses) {
      return NextResponse.json({ valid: false, error: 'This coupon has reached its usage limit' });
    }

    // Minimum order check
    if (subtotal < coupon.minimum_order) {
      return NextResponse.json({
        valid: false,
        error: `Minimum order of ₹${coupon.minimum_order.toLocaleString('en-IN')} required for this coupon`,
      });
    }

    return NextResponse.json({
      valid: true,
      coupon: {
        code: coupon.code,
        discount_type: coupon.discount_type,
        discount_value: coupon.discount_value,
        minimum_order: coupon.minimum_order,
      },
    });
  } catch (error) {
    console.error('Coupon validate error:', error);
    return NextResponse.json({ valid: false, error: 'Failed to validate coupon' }, { status: 500 });
  }
}
