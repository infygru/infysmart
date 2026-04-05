import { auth } from '@/auth';
import { redirect, notFound } from 'next/navigation';
import { directusAdmin } from '@/lib/directus-admin';
import { readItem } from '@directus/sdk';
import type { Order, OrderItem, ShippingAddress } from '@/lib/directus';
import Link from 'next/link';
import {
  ArrowLeft, Package, CheckCircle2, Truck, MapPin,
  Phone, CreditCard, Download, MessageCircle,
  ShieldCheck, Calendar,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Details | Infysmart',
  robots: { index: false, follow: false },
};

const STATUS_COLORS: Record<string, string> = {
  pending:    'bg-yellow-500/20 text-yellow-400',
  confirmed:  'bg-orange-500/20 text-orange-400',
  processing: 'bg-purple-500/20 text-purple-400',
  shipped:    'bg-indigo-500/20 text-indigo-400',
  delivered:  'bg-green-500/20 text-green-400',
  cancelled:  'bg-red-500/20 text-red-400',
  refunded:   'bg-zinc-700 text-zinc-400',
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect('/login?callbackUrl=/account');

  const { orderId } = await params;

  let order: Order | null = null;
  try {
    order = await directusAdmin.request(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      readItem('orders' as any, orderId, {
        fields: [
          'id', 'order_number', 'status', 'payment_status', 'payment_method',
          'razorpay_payment_id',
          'customer_name', 'customer_email', 'customer_phone',
          'shipping_address', 'billing_same_as_shipping', 'billing_address',
          'subtotal', 'tax_amount', 'shipping_amount', 'discount_amount', 'total_amount',
          'coupon_code', 'notes', 'date_created',
          'items.id', 'items.product_name', 'items.product_sku',
          'items.quantity', 'items.unit_price', 'items.total_price',
          'items.product_snapshot',
        ],
      } as never)
    ) as unknown as Order;
  } catch {
    notFound();
  }

  if (!order) notFound();

  // Security: only the order owner can view this page
  if (order.customer_email !== session.user.email) notFound();

  const items = (order.items ?? []) as OrderItem[];
  const shippingAddr = order.shipping_address as ShippingAddress;
  const isCOD = order.payment_method === 'cod';

  const whatsappMsg = encodeURIComponent(
    `Hi Infysmart, I need help with my order.\n\nOrder: ${order.order_number}\nStatus: ${order.status}\n\nPlease assist.`
  );

  const STATUS_STEPS = [
    { label: 'Placed',     done: true },
    { label: 'Confirmed',  done: !isCOD || order.status !== 'pending' },
    { label: 'Processing', done: ['processing', 'shipped', 'delivered'].includes(order.status) },
    { label: 'Shipped',    done: ['shipped', 'delivered'].includes(order.status) },
    { label: 'Delivered',  done: order.status === 'delivered' },
  ];

  const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL ?? 'https://api.infysmart.com';

  return (
    <main className="min-h-screen bg-slate-950">

      {/* ── Header ── */}
      <section className="bg-slate-900 border-b border-slate-800 py-4 px-4">
        <div className="container mx-auto max-w-4xl flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Link
              href="/account"
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> My Account
            </Link>
            <span className="text-slate-700">/</span>
            <span className="text-slate-300 font-semibold text-sm font-mono">{order.order_number}</span>
          </div>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${STATUS_COLORS[order.status] ?? 'bg-slate-800 text-slate-400'}`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </section>

      <div className="container mx-auto max-w-4xl px-4 py-6 space-y-4">

        {/* ── Order Meta ── */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Order No.</p>
            <p className="text-white font-bold font-mono">{order.order_number}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Date</p>
            <p className="text-slate-300 text-sm flex items-center gap-1">
              <Calendar className="w-3 h-3 shrink-0" />
              {new Date(order.date_created).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Payment</p>
            <p className="text-slate-300 text-sm flex items-center gap-1">
              <CreditCard className="w-3 h-3 shrink-0" />
              {isCOD ? 'Cash on Delivery' : 'Razorpay'}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Total</p>
            <p className="text-white font-bold text-lg">{formatPrice(order.total_amount)}</p>
          </div>
        </div>

        {/* ── COD notice ── */}
        {isCOD && order.status === 'pending' && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3">
            <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-300 text-sm">Awaiting Confirmation</p>
              <p className="text-amber-400/80 text-xs mt-1 leading-relaxed">
                Our team will call <span className="font-semibold text-amber-300">{order.customer_phone}</span> within
                1 business day to confirm your order before dispatch.
              </p>
            </div>
          </div>
        )}

        {/* ── Order Timeline ── */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
          <h2 className="text-sm font-bold text-slate-300 mb-5">Order Progress</h2>
          <div className="flex items-start">
            {STATUS_STEPS.map(({ label, done }, idx, arr) => (
              <div key={label} className="flex-1 flex flex-col items-center">
                <div className="flex items-center w-full">
                  {idx > 0 && (
                    <div className={`flex-1 h-0.5 ${done ? 'bg-gradient-to-r from-[#FF4500] to-orange-500' : 'bg-slate-700'}`} />
                  )}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${
                    done ? 'bg-gradient-to-br from-[#FF4500] to-orange-500 border-[#FF4500]' : 'bg-slate-900 border-slate-700'
                  }`}>
                    {done
                      ? <CheckCircle2 className="w-4 h-4 text-white" />
                      : <div className="w-2 h-2 rounded-full bg-slate-600" />}
                  </div>
                  {idx < arr.length - 1 && (
                    <div className={`flex-1 h-0.5 ${done && arr[idx + 1]?.done ? 'bg-gradient-to-r from-[#FF4500] to-orange-500' : 'bg-slate-700'}`} />
                  )}
                </div>
                <span className={`text-[10px] font-semibold mt-1.5 text-center ${done ? 'text-orange-400' : 'text-slate-600'}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Items ── */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
            <h2 className="font-bold text-white flex items-center gap-2 text-sm">
              <Package className="w-4 h-4 text-orange-400" />
              Items Ordered
            </h2>
            <span className="text-xs text-slate-500">{items.length} product{items.length !== 1 ? 's' : ''}</span>
          </div>

          <ul className="divide-y divide-slate-800">
            {items.map((item) => {
              const snap = item.product_snapshot as { thumbnail?: string; slug?: string } | null;
              const thumbUrl = snap?.thumbnail
                ? `${DIRECTUS_URL}/assets/${snap.thumbnail}?width=80&height=80&fit=cover&quality=80`
                : null;

              return (
                <li key={item.id} className="flex items-start gap-4 px-5 py-4">
                  <div className="w-14 h-14 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0 border border-slate-700">
                    {thumbUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={thumbUrl} alt={item.product_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-5 h-5 text-slate-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm leading-snug">{item.product_name}</p>
                    <p className="text-xs text-slate-500 mt-0.5 font-mono">SKU: {item.product_sku}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Qty: <span className="font-semibold text-white">{item.quantity}</span>
                      {' × '}{formatPrice(item.unit_price)}
                    </p>
                  </div>
                  <span className="font-bold text-white text-sm whitespace-nowrap">
                    {formatPrice(item.total_price)}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Totals */}
          <div className="px-5 py-4 bg-slate-800/50 border-t border-slate-700 space-y-1.5 text-sm">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="text-white">{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount_amount > 0 && (
              <div className="flex justify-between text-green-400 font-medium">
                <span>Discount{order.coupon_code ? ` (${order.coupon_code})` : ''}</span>
                <span>− {formatPrice(order.discount_amount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-400">
              <span>Shipping</span>
              <span className={order.shipping_amount === 0 ? 'text-green-400 font-medium' : 'text-white'}>
                {order.shipping_amount === 0 ? 'FREE' : formatPrice(order.shipping_amount)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-base text-white pt-2 border-t border-slate-700 mt-1">
              <span>{isCOD ? 'Total (Payable on Delivery)' : 'Total Paid'}</span>
              <span>{formatPrice(order.total_amount)}</span>
            </div>
            <p className="text-[10px] text-slate-500 text-right">
              Incl. GST ₹{order.tax_amount?.toLocaleString('en-IN') ?? '—'}{' '}
              {!isCOD && order.razorpay_payment_id && `· Ref: ${order.razorpay_payment_id}`}
            </p>
          </div>
        </div>

        {/* ── Address + Contact ── */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Delivery Address
            </h3>
            <address className="not-italic text-sm text-slate-300 leading-relaxed space-y-0.5">
              <p className="font-semibold text-white">{order.customer_name}</p>
              <p>{shippingAddr?.line1}</p>
              {shippingAddr?.line2 && <p>{shippingAddr.line2}</p>}
              <p>{shippingAddr?.city}, {shippingAddr?.state} – {shippingAddr?.pincode}</p>
              <p className="text-slate-500">{shippingAddr?.country}</p>
            </address>
          </div>

          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-4">
            <div>
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> Contact
              </h3>
              <p className="text-sm text-slate-300">{order.customer_phone}</p>
              <p className="text-sm text-slate-300">{order.customer_email}</p>
            </div>
            <div>
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" /> Estimated Delivery
              </h3>
              <p className="text-sm text-slate-400">
                <span className="font-semibold text-white">3–7 business days</span> from confirmation
              </p>
              <p className="text-xs text-slate-500 mt-0.5">Tracking details sent via SMS/WhatsApp</p>
            </div>
          </div>
        </div>

        {/* ── Notes ── */}
        {order.notes && (
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-2">Your Notes</h3>
            <p className="text-sm text-slate-300">{order.notes}</p>
          </div>
        )}

        {/* ── Actions ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/919445675619?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-green-500 transition-colors text-sm"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp Support
          </a>
          <Link
            href="/shop"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-slate-800 border border-slate-700 text-slate-300 font-bold rounded-xl hover:border-orange-500 hover:text-orange-400 transition-colors text-sm"
          >
            Continue Shopping
          </Link>
          <Link
            href="/account"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#FF4500] to-orange-500 hover:from-orange-600 hover:to-orange-400 text-white font-bold rounded-xl transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> My Account
          </Link>
        </div>

        {/* ── Invoice Note ── */}
        <div className="flex items-start gap-2.5 bg-orange-500/5 border border-orange-500/20 rounded-xl p-4 text-xs text-slate-400">
          <Download className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
          <span>
            GST invoice will be emailed to{' '}
            <strong className="text-white">{order.customer_email}</strong> once dispatched.
            For B2B invoicing contact{' '}
            <a href="mailto:info@infysmart.com" className="text-orange-400 underline">
              info@infysmart.com
            </a>
          </span>
        </div>

        <div className="flex items-center gap-2.5 bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0" />
          This order detail is private and visible only to the account holder.
        </div>

      </div>
    </main>
  );
}
