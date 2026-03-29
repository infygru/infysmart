import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { directusAdmin } from '@/lib/directus-admin';
import { readItems, updateItem } from '@directus/sdk';
import type { Customer, Order } from '@/lib/directus';
import AccountClient from './AccountClient';

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
        limit: 10,
        fields: ['id', 'order_number', 'total_amount', 'status', 'payment_method', 'date_created'],
      } as never)
    ) as unknown as Promise<Order[]>,
  ]);

  const customer = customers[0] ?? null;

  return (
    <AccountClient
      customer={customer}
      orders={orders}
      sessionEmail={session.user.email ?? ''}
    />
  );
}
