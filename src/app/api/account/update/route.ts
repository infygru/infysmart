import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { directusAdmin } from '@/lib/directus-admin';
import { updateItem } from '@directus/sdk';

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, phone } = await request.json() as { name?: string; phone?: string };

  await directusAdmin.request(
    updateItem('customers', Number(session.user.id), {
      name: name ?? null,
      phone: phone ?? null,
    } as never)
  );

  return NextResponse.json({ success: true });
}
