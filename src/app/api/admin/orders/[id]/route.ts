import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { directusAdmin } from '@/lib/directus-admin';
import { updateItem } from '@directus/sdk';

const ADMIN_EMAILS = ['infysmartbiz@gmail.com', 'csenaren@gmail.com'];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json() as { status?: string; payment_status?: string; notes?: string };

  const update: Record<string, string> = { date_updated: new Date().toISOString() };
  if (body.status) update.status = body.status;
  if (body.payment_status) update.payment_status = body.payment_status;
  if (body.notes !== undefined) update.notes = body.notes;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await directusAdmin.request(updateItem('orders' as any, id, update as never));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin order update error:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
