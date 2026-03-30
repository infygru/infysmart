import { auth } from '@/auth';
import { redirect, notFound } from 'next/navigation';
import { directusAdmin } from '@/lib/directus-admin';
import { readItem } from '@directus/sdk';
import type { Order, OrderItem } from '@/lib/directus';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { StatusBadge, PaymentBadge } from '../../page';
import OrderStatusUpdater from './OrderStatusUpdater';

const ADMIN_EMAILS = ['infysmartbiz@gmail.com', 'csenaren@gmail.com'];
const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://api.infysmart.com';

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    redirect('/login?callbackUrl=/admin/orders');
  }

  const { id } = await params;

  let order: Order;
  try {
    order = await directusAdmin.request(readItem('orders' as never, id, {
      fields: [
        'id', 'order_number', 'status', 'payment_status', 'payment_method',
        'razorpay_order_id', 'razorpay_payment_id',
        'customer_name', 'customer_email', 'customer_phone',
        'shipping_address', 'billing_same_as_shipping', 'billing_address',
        'subtotal', 'tax_amount', 'shipping_amount', 'discount_amount', 'total_amount',
        'coupon_code', 'notes', 'date_created', 'date_updated',
        'items.id', 'items.product_name', 'items.product_sku',
        'items.quantity', 'items.unit_price', 'items.total_price',
        'items.product_snapshot',
      ],
    } as never)) as unknown as Order;
  } catch {
    notFound();
  }

  if (!order) notFound();

  const items = (order.items ?? []) as OrderItem[];
  const addr = order.shipping_address;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-4 flex-wrap">
          <Link href="/admin/orders" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Orders
          </Link>
          <span className="text-gray-300">/</span>
          <h1 className="font-extrabold text-gray-900">{order.order_number}</h1>
          <StatusBadge status={order.status} />
          <span className="ml-auto text-xs text-gray-400">
            Placed {new Date(order.date_created).toLocaleString('en-IN', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-6">

        {/* Left — Order details */}
        <div className="lg:col-span-2 space-y-5">

          {/* Items */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-3.5 border-b border-gray-100 font-semibold text-gray-800 text-sm">
              Order Items ({items.length})
            </div>
            <div className="divide-y divide-gray-100">
              {items.map((item) => {
                const snap = item.product_snapshot as { thumbnail?: string; slug?: string } | null;
                const thumb = snap?.thumbnail
                  ? `${DIRECTUS_URL}/assets/${snap.thumbnail}?width=56&height=56&fit=cover`
                  : null;
                return (
                  <div key={item.id} className="flex items-center gap-4 px-5 py-3.5">
                    <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                      {thumb
                        ? <img src={thumb} alt={item.product_name} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No img</div>
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm line-clamp-1">{item.product_name}</p>
                      <p className="text-xs text-gray-400 font-mono">{item.product_sku}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-gray-900 text-sm">₹{item.total_price.toLocaleString('en-IN')}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity} × ₹{item.unit_price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Totals */}
            <div className="border-t border-gray-100 bg-gray-50 px-5 py-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span><span>₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {order.discount_amount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount {order.coupon_code ? `(${order.coupon_code})` : ''}</span>
                  <span>− ₹{order.discount_amount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{order.shipping_amount === 0 ? 'FREE' : `₹${order.shipping_amount.toLocaleString('en-IN')}`}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>GST</span><span>₹{order.tax_amount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-extrabold text-gray-900 text-base border-t border-gray-200 pt-2 mt-2">
                <span>Total</span><span>₹{order.total_amount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Customer + Address */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
            <h3 className="font-semibold text-gray-800 text-sm">Customer Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Name</p>
                <p className="font-semibold text-gray-800">{order.customer_name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Email</p>
                <a href={`mailto:${order.customer_email}`} className="font-semibold text-orange-600 hover:underline">{order.customer_email}</a>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Phone</p>
                <a href={`tel:${order.customer_phone}`} className="font-semibold text-gray-800">{order.customer_phone}</a>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">WhatsApp</p>
                <a
                  href={`https://wa.me/91${order.customer_phone?.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(order.customer_name)}%2C%20your%20order%20${order.order_number}%20is%20being%20processed.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline font-semibold text-sm"
                >
                  Message on WhatsApp →
                </a>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs text-gray-400 mb-1.5">Shipping Address</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}<br />
                {addr.city}, {addr.state} — {addr.pincode}<br />
                {addr.country}
              </p>
            </div>
          </div>

          {/* Payment details */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-800 text-sm mb-4">Payment Details</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Method</p>
                <p className="font-semibold text-gray-800 capitalize">{order.payment_method === 'cod' ? 'Cash on Delivery' : 'Razorpay (Online)'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Payment Status</p>
                <PaymentBadge method={order.payment_method} status={order.payment_status} />
              </div>
              {order.razorpay_payment_id && (
                <div className="sm:col-span-2">
                  <p className="text-xs text-gray-400 mb-0.5">Razorpay Payment ID</p>
                  <p className="font-mono text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">{order.razorpay_payment_id}</p>
                </div>
              )}
              {order.razorpay_order_id && (
                <div className="sm:col-span-2">
                  <p className="text-xs text-gray-400 mb-0.5">Razorpay Order ID</p>
                  <p className="font-mono text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">{order.razorpay_order_id}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right — Status management */}
        <div className="space-y-5">
          <OrderStatusUpdater
            orderId={String(order.id)}
            currentStatus={order.status}
            currentPaymentStatus={order.payment_status}
            currentNotes={order.notes ?? ''}
          />

          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-800 text-sm mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <a
                href={`mailto:${order.customer_email}?subject=Your Order ${order.order_number} Update&body=Hi ${order.customer_name},%0A%0AYour order ${order.order_number} has been updated.%0A%0AThank you,%0AInfysmart Team`}
                className="flex items-center justify-center gap-2 w-full py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-orange-300 hover:text-orange-600 transition-all"
              >
                ✉ Email Customer
              </a>
              <a
                href={`https://wa.me/91${order.customer_phone?.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(order.customer_name)}%2C%20your%20Infysmart%20order%20${order.order_number}%20status%20has%20been%20updated.%20Please%20check%20your%20account%20for%20details.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-semibold transition-all"
              >
                💬 WhatsApp Customer
              </a>
            </div>
          </div>

          {/* Order dates */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 text-sm space-y-2.5">
            <h3 className="font-semibold text-gray-800 mb-3">Timeline</h3>
            <div>
              <p className="text-xs text-gray-400">Order Placed</p>
              <p className="font-medium text-gray-700">{new Date(order.date_created).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</p>
            </div>
            {order.date_updated && (
              <div>
                <p className="text-xs text-gray-400">Last Updated</p>
                <p className="font-medium text-gray-700">{new Date(order.date_updated).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
