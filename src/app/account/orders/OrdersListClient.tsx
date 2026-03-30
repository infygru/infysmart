'use client';

import Link from 'next/link';
import { Package, ShoppingBag, ChevronRight, User, ChevronLeft } from 'lucide-react';
import type { Order, OrderItem } from '@/lib/directus';
import { formatPrice } from '@/lib/utils';
import { useSession } from 'next-auth/react';

const STATUS_COLORS: Record<string, string> = {
  pending:    'bg-yellow-100 text-yellow-700',
  confirmed:  'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped:    'bg-orange-100 text-orange-700',
  delivered:  'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-700',
  refunded:   'bg-gray-100 text-gray-500',
};

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL ?? 'https://api.infysmart.com';

export default function OrdersListClient({
  orders,
  sessionEmail,
}: {
  orders: Order[];
  sessionEmail: string;
}) {
  const { data: session } = useSession();
  const name = session?.user?.name ?? '';

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center">
              <User className="w-4 h-4 text-[#FF4500]" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{name || 'My Orders'}</p>
              <p className="text-xs text-gray-400">{sessionEmail}</p>
            </div>
          </div>
          <Link
            href="/account"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#FF4500] transition-colors"
          >
            <ChevronLeft className="w-3 h-3" /> My Profile
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-extrabold text-gray-900">My Orders</h2>
            <p className="text-sm text-gray-500 mt-0.5">{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#FF4500] hover:underline"
          >
            <ShoppingBag className="w-4 h-4" /> Shop More
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 py-20 flex flex-col items-center gap-4 text-center px-6">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
              <Package className="w-8 h-8 text-gray-300" />
            </div>
            <div>
              <p className="font-bold text-gray-700 mb-1">No orders yet</p>
              <p className="text-sm text-gray-400">Browse our products and place your first order.</p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all"
            >
              <ShoppingBag className="w-4 h-4" /> Browse Products
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
            {orders.map((order) => {
              const items = (order.items ?? []) as OrderItem[];
              const thumbs = items
                .slice(0, 3)
                .map((item) => {
                  const snap = item.product_snapshot as { thumbnail?: string } | null;
                  return snap?.thumbnail
                    ? `${DIRECTUS_URL}/assets/${snap.thumbnail}?width=56&height=56&fit=cover&quality=80`
                    : null;
                })
                .filter(Boolean) as string[];

              return (
                <Link
                  key={order.id}
                  href={`/account/orders/${order.id}`}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-orange-50/40 transition-colors group"
                >
                  {/* Thumbnails */}
                  <div className="flex -space-x-2 flex-shrink-0">
                    {thumbs.length > 0 ? (
                      thumbs.map((src, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={i}
                          src={src}
                          alt=""
                          className="w-11 h-11 rounded-xl object-cover border-2 border-white bg-gray-100 shadow-sm"
                        />
                      ))
                    ) : (
                      <div className="w-11 h-11 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center">
                        <Package className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                    {items.length > 3 && (
                      <div className="w-11 h-11 rounded-xl bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500">
                        +{items.length - 3}
                      </div>
                    )}
                  </div>

                  {/* Order info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-gray-900 text-sm font-mono group-hover:text-[#FF4500] transition-colors">
                        {order.order_number}
                      </p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${STATUS_COLORS[order.status] ?? 'bg-gray-100 text-gray-500'}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(order.date_created).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      {' · '}
                      {items.length} item{items.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  {/* Total + arrow */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-extrabold text-gray-900 text-sm">{formatPrice(order.total_amount)}</span>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#FF4500] transition-colors" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
