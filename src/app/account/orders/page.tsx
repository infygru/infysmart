import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { directusAdmin } from '@/lib/directus-admin';
import { readItems } from '@directus/sdk';
import type { Order } from '@/lib/directus';
import OrdersListClient from './OrdersListClient';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export default async function AccountOrdersPage() {
  const session = await auth();
  if (!session?.user) redirect('/login?callbackUrl=/account/orders');

  const orders = await directusAdmin.request(
    readItems('orders', {
      filter: { customer_email: { _eq: session.user.email } },
      sort: ['-date_created'],
      limit: 30,
      fields: [
        'id', 'order_number', 'total_amount', 'status', 'payment_method',
        'payment_status', 'date_created',
        'items.id', 'items.product_name', 'items.product_snapshot',
      ],
    } as never)
  ) as unknown as Order[];

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
      </div>
    }>
      <OrdersListClient orders={orders} sessionEmail={session.user.email ?? ''} />
    </Suspense>
  );
}
