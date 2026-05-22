import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { directusAdmin } from '@/lib/directus-admin';
import { readItems } from '@directus/sdk';
import type { Order } from '@/lib/directus';
import Link from 'next/link';
import { ShoppingBag, Clock, TrendingUp, AlertCircle, Package } from 'lucide-react';

const ADMIN_EMAILS = ['infysmartbiz@gmail.com', 'csenaren@gmail.com'];

export default async function AdminDashboard() {
  const session = await auth();
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    redirect('/login?callbackUrl=/admin');
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [allOrders, todayOrders] = await Promise.all([
    directusAdmin.request(readItems('orders', {
      sort: ['-date_created'],
      limit: 10,
      fields: ['id', 'order_number', 'customer_name', 'customer_email', 'total_amount', 'status', 'payment_status', 'payment_method', 'date_created'],
    } as never)) as unknown as Order[],
    directusAdmin.request(readItems('orders', {
      filter: { date_created: { _gte: today.toISOString() } },
      aggregate: { count: ['id'], sum: ['total_amount'] },
    } as never)) as unknown as [{ count: { id: number }; sum: { total_amount: number } }],
  ]);

  const [pendingCount, processingCount, shippedCount] = await Promise.all([
    directusAdmin.request(readItems('orders', { filter: { status: { _in: ['pending', 'confirmed'] } }, aggregate: { count: ['id'] } } as never)) as unknown as [{ count: { id: number } }],
    directusAdmin.request(readItems('orders', { filter: { status: { _eq: 'processing' } }, aggregate: { count: ['id'] } } as never)) as unknown as [{ count: { id: number } }],
    directusAdmin.request(readItems('orders', { filter: { status: { _eq: 'shipped' } }, aggregate: { count: ['id'] } } as never)) as unknown as [{ count: { id: number } }],
  ]);

  const todayCount = todayOrders[0]?.count?.id ?? 0;
  const todayRevenue = todayOrders[0]?.sum?.total_amount ?? 0;
  const pending = pendingCount[0]?.count?.id ?? 0;
  const processing = processingCount[0]?.count?.id ?? 0;
  const shipped = shippedCount[0]?.count?.id ?? 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">Infysmart Admin</h1>
            <p className="text-xs text-gray-500 mt-0.5">Order Management Dashboard</p>
          </div>
          <Link href="/admin/orders" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-all">
            All Orders →
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Today's Orders", value: todayCount, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: "Today's Revenue", value: `₹${todayRevenue.toLocaleString('en-IN')}`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Pending / New', value: pending, icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Processing', value: processing, icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Shipped', value: shipped, icon: Package, color: 'text-orange-600', bg: 'bg-orange-50' },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-4.5 h-4.5 ${color}`} />
              </div>
              <p className="text-2xl font-extrabold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-orange-600 font-semibold hover:underline">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3 text-left font-semibold">Order</th>
                  <th className="px-6 py-3 text-left font-semibold">Customer</th>
                  <th className="px-6 py-3 text-left font-semibold">Amount</th>
                  <th className="px-6 py-3 text-left font-semibold">Payment</th>
                  <th className="px-6 py-3 text-left font-semibold">Status</th>
                  <th className="px-6 py-3 text-left font-semibold">Date</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {allOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3.5 font-mono font-semibold text-gray-800">{order.order_number}</td>
                    <td className="px-6 py-3.5">
                      <p className="font-medium text-gray-800">{order.customer_name}</p>
                      <p className="text-xs text-gray-400">{order.customer_email}</p>
                    </td>
                    <td className="px-6 py-3.5 font-semibold text-gray-900">₹{order.total_amount.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-3.5">
                      <PaymentBadge method={order.payment_method} status={order.payment_status} />
                    </td>
                    <td className="px-6 py-3.5"><StatusBadge status={order.status} /></td>
                    <td className="px-6 py-3.5 text-gray-500 text-xs">{new Date(order.date_created).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="px-6 py-3.5">
                      <Link href={`/admin/orders/${order.id}`} className="text-orange-600 hover:underline font-semibold text-xs">Manage →</Link>
                    </td>
                  </tr>
                ))}
                {allOrders.length === 0 && (
                  <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-400">No orders yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    processing: 'bg-purple-100 text-purple-700',
    shipped: 'bg-orange-100 text-orange-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    refunded: 'bg-gray-100 text-gray-600',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold capitalize ${map[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
}

export function PaymentBadge({ method, status }: { method: string; status: string }) {
  const isPaid = status === 'paid';
  return (
    <div>
      <span className={`text-[11px] font-bold ${isPaid ? 'text-green-600' : 'text-amber-600'}`}>
        {isPaid ? '✓ Paid' : '⏳ Pending'}
      </span>
      <p className="text-[10px] text-gray-400 capitalize">{method === 'cod' ? 'Cash on Delivery' : 'Razorpay'}</p>
    </div>
  );
}
