import { NextRequest, NextResponse } from 'next/server';
import { directusAdmin } from '@/lib/directus-admin';
import { readItems, createItem } from '@directus/sdk';
import { auth } from '@/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'productId is required' }, { status: 400 });
    }

    const reviews = await directusAdmin.request(
      readItems('product_reviews', {
        filter: {
          product: { _eq: productId },
          status: { _eq: 'published' },
        },
        fields: ['id', 'rating', 'title', 'content', 'date_created', 'customer.name'],
        sort: ['-date_created'],
      } as never)
    );

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('[GET /api/reviews]', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { productId, rating, title, content } = body;

    if (!productId || typeof rating !== 'number' || rating < 1 || rating > 5 || !content) {
      return NextResponse.json({ error: 'Invalid data provided. Rating and content are required.' }, { status: 400 });
    }

    const userEmail = session.user.email;
    const userPhone = session.user.phone;

    if (!userEmail && !userPhone) {
      return NextResponse.json({ error: 'User contact info missing' }, { status: 400 });
    }

    const contactFilters = [];
    if (userEmail) contactFilters.push({ customer_email: { _eq: userEmail } });
    if (userPhone) contactFilters.push({ customer_phone: { _eq: userPhone } });

    // Verify if customer has ordered the product.
    const orders = await directusAdmin.request(
      readItems('orders', {
        filter: {
          _and: [
            { _or: contactFilters },
            { status: { _in: ['pending', 'processing', 'confirmed', 'shipped', 'delivered'] } }
          ]
        },
        fields: ['id', 'items.product'],
      } as never)
    ) as Array<{ items?: Array<{ product: number | string }> }>;

    const hasPurchased = orders.some(order => 
      order.items?.some(item => String(item.product) === String(productId))
    );

    if (!hasPurchased) {
      return NextResponse.json({ error: 'You must purchase this product to leave a review.' }, { status: 403 });
    }

    // Create the review
    const review = await directusAdmin.request(
      createItem('product_reviews', {
        product: Number(productId),
        customer: Number(session.user.id),
        rating,
        title: title?.trim() || null,
        content: content.trim(),
        status: 'pending',
      } as never)
    );

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/reviews]', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
