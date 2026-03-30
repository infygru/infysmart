import { Suspense } from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { directusAdmin } from '@/lib/directus-admin';
import { readItems } from '@directus/sdk';
import type { Customer, Order } from '@/lib/directus';
import AccountClient from './AccountClient';
import { Loader2 } from 'lucide-react';

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect('/login?callbackUrl=/account');

  const [customers, orders] = await Promise.all([
    directusAdmin.request(
      readItems('customers', {
        filter: { id: { _eq: Number(session.user.id) } },
        limit: 1,
      } as never)
    ) as unknown as Promise<Customer[]>,

    directusAdmin.request(
      readItems('orders', {
        filter: { customer_email: { _eq: session.user.email } },
        sort: ['-date_created'],
        limit: 20,
        fields: [
          'id', 'order_number', 'total_amount', 'status', 'payment_method',
          'date_created', 'items.id', 'items.product_name', 'items.product_snapshot',
        ],
      } as never)
    ) as unknown as Promise<Order[]>,
  ]);

  const customer = customers[0] ?? null;

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-zinc-600" />
      </div>
    }>
      <AccountClient
        customer={customer}
        orders={orders}
        sessionEmail={session.user.email ?? ''}
      />
    </Suspense>
  );
}
