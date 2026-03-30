import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { directusAdmin } from '@/lib/directus-admin';
import { updateItem } from '@directus/sdk';
import type { ShippingAddress } from '@/lib/directus';

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { address } = await request.json() as { address: ShippingAddress };

  if (!address?.line1 || !address?.city || !address?.state || !address?.pincode) {
    return NextResponse.json({ error: 'Incomplete address' }, { status: 400 });
  }

  await directusAdmin.request(
    updateItem('customers', Number(session.user.id), {
      saved_address: address,
    } as never)
  );

  return NextResponse.json({ success: true });
}
