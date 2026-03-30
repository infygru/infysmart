import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { directusAdmin } from '@/lib/directus-admin';
import { readItems } from '@directus/sdk';
import type { Customer } from '@/lib/directus';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const customers = await directusAdmin.request(
    readItems('customers', {
      filter: { id: { _eq: Number(session.user.id) } },
      fields: ['saved_address'],
      limit: 1,
    } as never)
  ) as unknown as Pick<Customer, 'saved_address'>[];

  const address = customers[0]?.saved_address ?? null;
  return NextResponse.json({ address });
}
