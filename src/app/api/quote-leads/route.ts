import { createDirectus, rest, staticToken, createItem } from '@directus/sdk';
import { NextResponse } from 'next/server';

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://api.infysmart.com';
  const token = process.env.DIRECTUS_ADMIN_TOKEN!;
  return createDirectus(url).with(staticToken(token)).with(rest());
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const { name, phone, service_type, ...rest } = body;

    if (!name || !phone || !service_type) {
      return NextResponse.json(
        { error: 'name, phone, and service_type are required' },
        { status: 400 }
      );
    }

    const directus = getAdminClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lead = await directus.request(createItem('quote_leads' as any, {
      name, phone, service_type, status: 'New', ...rest,
    } as never));

    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    console.error('Quote Lead Submission Error:', error);
    return NextResponse.json({ error: 'Failed to submit quote request' }, { status: 500 });
  }
}
