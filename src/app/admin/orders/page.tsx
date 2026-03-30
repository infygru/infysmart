import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { directusAdmin } from '@/lib/directus-admin';
import { readItems } from '@directus/sdk';
import type { Order } from '@/lib/directus';
import Link from 'next/link';
import { StatusBadge, PaymentBadge } from '../page';
import { ArrowLeft } from 'lucide-react';

const ADMIN_EMAILS = ['infysmartbiz@gmail.com', 'csenaren@gmail.com'];

const STATUS_OPTIONS = ['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function AdminOrdersPage({ searchParams }: PageProps) {
  const session = await auth();
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    redirect('/login?callbackUrl=/admin/orders');
  }

  const sp = await searchParams;
  const statusFilter = (sp.status as string) ?? 'all';
  const search = (sp.q as string) ?? '';
  const page = Math.max(1, Number(sp.page ?? 1));
  const limit = 20;
  const offset = (page - 1) * limit;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: Record<string, any> = {};
  if (statusFilter !== 'all') filter.status = { _eq: statusFilter };
  if (search) filter._or = [
    { order_number: { _icontains: search } },
    { customer_name: { _icontains: search } },
    { customer_email: { _icontains: search } },
    { customer_phone: { _icontains: search } },
  ];

  const [orders, totalResult] = await Promise.all([
    directusAdmin.request(readItems('orders', {
      filter, sort: ['-date_created'], limit, offset,
      fields: ['id', 'order_number', 'customer_name', 'customer_email', 'customer_phone', 'total_amount', 'status', 'payment_status', 'payment_method', 'date_created', 'items.id'],
    } as never)) as unknown as Order[],
    directusAdmin.request(readItems('orders', { filter, aggregate: { count: ['id'] } } as never)) as unknown as [{ count: { id: number } }],
  ]);

  const totalCount = totalResult[0]?.count?.id ?? 0;
  const totalPages = Math.ceil(totalCount / limit);

  const buildUrl = (params: Record<string, string>) => {
    const p = new URLSearchParams({ status: statusFilter, q: search, page: String(page), ...params });
    if (!p.get('q')) p.delete('q');
    if (p.get('status') === 'all') p.delete('status');
    if (p.get('page') === '1') p.delete('page');
    return `/admin/orders?${p.toString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/admin" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Link>
          <span className="text-gray-300">/</span>
          <h1 className="text-lg font-extrabold text-gray-900">Orders</h1>
          <span className="ml-auto bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-full">{totalCount} total</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          {/* Search */}
          <form method="GET" action="/admin/orders" className="flex gap-2">
            <input
              name="q"
              defaultValue={search}
              placeholder="Search order, customer, email..."
              className="h-9 bg-white border border-gray-300 rounded-xl px-4 text-sm focus:outline-none focus:border-orange-400 w-64"
            />
            {statusFilter !== 'all' && <input type="hidden" name="status" value={statusFilter} />}
            <button className="h-9 px-4 bg-gray-800 text-white text-sm font-semibold rounded-xl hover:bg-gray-900">Search</button>
          </form>

          {/* Status tabs */}
          <div className="flex flex-wrap gap-1.5 ml-auto">
            {STATUS_OPTIONS.map((s) => (
              <Link
                key={s}
                href={buildUrl({ status: s, page: '1' })}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize ${
                  statusFilter === s
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600'
                }`}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                  <th className="px-5 py-3 text-left font-semibold">Order #</th>
                  <th className="px-5 py-3 text-left font-semibold">Customer</th>
                  <th className="px-5 py-3 text-left font-semibold">Items</th>
                  <th className="px-5 py-3 text-left font-semibold">Amount</th>
                  <th className="px-5 py-3 text-left font-semibold">Payment</th>
                  <th className="px-5 py-3 text-left font-semibold">Status</th>
                  <th className="px-5 py-3 text-left font-semibold">Date</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-orange-50/30 transition-colors">
                    <td className="px-5 py-3.5 font-mono font-bold text-gray-800 text-xs">{order.order_number}</td>
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-gray-800">{order.customer_name}</p>
                      <p className="text-xs text-gray-400">{order.customer_email}</p>
                      <p className="text-xs text-gray-400">{order.customer_phone}</p>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">
                      {Array.isArray(order.items) ? order.items.length : '—'} item{Array.isArray(order.items) && order.items.length !== 1 ? 's' : ''}
                    </td>
                    <td className="px-5 py-3.5 font-bold text-gray-900">₹{order.total_amount.toLocaleString('en-IN')}</td>
                    <td className="px-5 py-3.5"><PaymentBadge method={order.payment_method} status={order.payment_status} /></td>
                    <td className="px-5 py-3.5"><StatusBadge status={order.status} /></td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs whitespace-nowrap">
                      {new Date(order.date_created).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-5 py-3.5">
                      <Link href={`/admin/orders/${order.id}`} className="text-xs font-bold text-orange-600 hover:underline whitespace-nowrap">Manage →</Link>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr><td colSpan={8} className="px-6 py-16 text-center text-gray-400">No orders found</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100 bg-gray-50">
              <p className="text-xs text-gray-500">Showing {offset + 1}–{Math.min(offset + limit, totalCount)} of {totalCount}</p>
              <div className="flex gap-1.5">
                {page > 1 && <Link href={buildUrl({ page: String(page - 1) })} className="px-3 py-1.5 text-xs font-semibold bg-white border border-gray-200 rounded-lg hover:border-orange-300 text-gray-600">← Prev</Link>}
                {page < totalPages && <Link href={buildUrl({ page: String(page + 1) })} className="px-3 py-1.5 text-xs font-semibold bg-white border border-gray-200 rounded-lg hover:border-orange-300 text-gray-600">Next →</Link>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
