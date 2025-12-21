import { directus } from '@/lib/directus';
import { createItem } from '@directus/sdk';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      service = 'General',
      source = 'Website',
      ...rest
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and Phone are required' },
        { status: 400 }
      );
    }

    const newLead = await directus.request(
      createItem('leads', {
        name,
        phone,
        service,
        source,
        message: JSON.stringify(rest),
        created_at: new Date().toISOString()
      } as any) // ✅ THIS FIXES THE ERROR
    );

    return NextResponse.json({ success: true, data: newLead });
  } catch (error) {
    console.error('Lead Submission Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 }
    );
  }
}
