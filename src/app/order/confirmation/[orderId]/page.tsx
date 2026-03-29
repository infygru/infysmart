import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2, Package, Truck, Phone, Mail,
  MapPin, ArrowRight, Download, MessageCircle
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { directus } from '@/lib/directus';
import { readSingleton } from '@directus/sdk';
import type { Order, OrderItem, ShippingAddress, GlobalSettings } from '@/lib/directus';

export const metadata: Metadata = {
  title: 'Order Confirmed | Infysmart',
  robots: { index: false, follow: false },
};

async function fetchOrder(id: string): Promise<Order | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://infysmart.com';
    const res = await fetch(`${baseUrl}/api/orders/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return await res.json() as Order;
  } catch {
    return null;
  }
}

interface PageProps {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<{ method?: string; order?: string }>;
}

export default async function OrderConfirmationPage({ params, searchParams }: PageProps) {
  const { orderId } = await params;
  const { method, order: orderNumberFallback } = await searchParams;

  const order = await fetchOrder(orderId);
  if (!order) notFound();

  let gstRate = 18;
  try {
    const settings = await directus.request(
      readSingleton('global_settings', { fields: ['gst_rate'] } as never)
    ) as GlobalSettings;
    gstRate = Number(settings.gst_rate ?? 18);
  } catch { /* use default */ }

  const isCOD = method === 'cod' || order.payment_method === 'cod';
  const orderNumber = order.order_number ?? orderNumberFallback ?? orderId.slice(0, 8).toUpperCase();
  const shippingAddr = order.shipping_address as ShippingAddress;
  const items = (order.items ?? []) as OrderItem[];

  const whatsappMsg = encodeURIComponent(
    `Hi Infysmart, I just placed an order!\n\nOrder Number: ${orderNumber}\nTotal: ₹${order.total_amount?.toLocaleString('en-IN')}\n\nPlease confirm the delivery timeline.`
  );
  const whatsappUrl = `https://wa.me/919445675619?text=${whatsappMsg}`;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero — success banner */}
      <section className="bg-white border-b border-slate-200 py-10 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-5">
            <CheckCircle2 className="w-9 h-9 text-green-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
            {isCOD ? 'Order Placed Successfully!' : 'Payment Confirmed!'}
          </h1>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            {isCOD
              ? 'Your order has been received. Our team will confirm it within 1 business day before dispatch.'
              : 'Payment received. Your order is now confirmed and will be processed shortly.'}
          </p>

          {/* Order number badge */}
          <div className="inline-flex items-center gap-2 mt-5 bg-slate-900 text-white px-5 py-2.5 rounded-full font-mono text-sm font-bold">
            <Package className="w-4 h-4" />
            {orderNumber}
          </div>

          {/* Confirmation email note */}
          {order.customer_email && (
            <p className="mt-3 text-xs text-slate-400 flex items-center justify-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              Confirmation sent to <span className="font-semibold text-slate-600">{order.customer_email}</span>
            </p>
          )}
        </div>
      </section>

      <div className="container mx-auto max-w-3xl px-6 py-8 space-y-5">

        {/* COD notice */}
        {isCOD && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
            <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-800 text-sm">Cash on Delivery Order</p>
              <p className="text-amber-700 text-xs mt-1 leading-relaxed">
                A sales representative will call you on{' '}
                <span className="font-semibold">{order.customer_phone}</span> within 1 business day
                to confirm your order and provide an estimated delivery date.
              </p>
            </div>
          </div>
        )}

        {/* Order Timeline */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="text-sm font-bold text-slate-700 mb-5">Order Status</h2>
          <div className="flex items-start gap-0">
            {[
              { label: 'Order Placed', done: true },
              { label: 'Confirmed', done: !isCOD || order.status !== 'pending' },
              { label: 'Processing', done: ['processing', 'shipped', 'delivered'].includes(order.status) },
              { label: 'Shipped', done: ['shipped', 'delivered'].includes(order.status) },
              { label: 'Delivered', done: order.status === 'delivered' },
            ].map(({ label, done }, idx, arr) => (
              <div key={label} className="flex-1 flex flex-col items-center">
                <div className="flex items-center w-full">
                  {idx > 0 && (
                    <div className={`flex-1 h-0.5 ${done ? 'bg-brand-blue' : 'bg-slate-200'}`} />
                  )}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${
                    done ? 'bg-brand-blue border-brand-blue' : 'bg-white border-slate-300'
                  }`}>
                    {done ? (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-slate-300" />
                    )}
                  </div>
                  {idx < arr.length - 1 && (
                    <div className={`flex-1 h-0.5 ${done && arr[idx + 1]?.done ? 'bg-brand-blue' : 'bg-slate-200'}`} />
                  )}
                </div>
                <span className={`text-[10px] font-semibold mt-1.5 text-center ${
                  done ? 'text-brand-blue' : 'text-slate-400'
                }`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
              <Package className="w-4 h-4 text-brand-blue" />
              Items Ordered ({items.length} product{items.length !== 1 ? 's' : ''})
            </h2>
          </div>
          <ul className="divide-y divide-slate-100">
            {items.map((item) => (
              <li key={item.id} className="flex items-start gap-4 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm leading-snug">{item.product_name}</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-mono">SKU: {item.product_sku}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Qty: <span className="font-semibold">{item.quantity}</span>{' '}
                    × {formatPrice(item.unit_price)}
                  </p>
                </div>
                <span className="font-bold text-slate-900 text-sm whitespace-nowrap">
                  {formatPrice(item.total_price)}
                </span>
              </li>
            ))}
          </ul>

          {/* Totals */}
          <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 space-y-1.5 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount_amount > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>Discount</span>
                <span>− {formatPrice(order.discount_amount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              <span className={order.shipping_amount === 0 ? 'text-green-600 font-medium' : ''}>
                {order.shipping_amount === 0 ? 'FREE' : formatPrice(order.shipping_amount)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-base text-slate-900 pt-2 border-t border-slate-200 mt-2">
              <span>Total Paid</span>
              <span>{formatPrice(order.total_amount)}</span>
            </div>
            <p className="text-[10px] text-slate-400 text-right">
              Incl. {gstRate}% GST (₹{order.tax_amount?.toLocaleString('en-IN') ?? '—'}) •{' '}
              {isCOD ? 'Payable on delivery' : 'Paid via Razorpay'}
            </p>
          </div>
        </div>

        {/* Delivery & Contact grid */}
        <div className="grid sm:grid-cols-2 gap-4">

          {/* Shipping address */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Delivery Address
            </h3>
            <address className="not-italic text-sm text-slate-700 leading-relaxed">
              <p className="font-semibold">{order.customer_name}</p>
              <p>{shippingAddr?.line1}</p>
              {shippingAddr?.line2 && <p>{shippingAddr.line2}</p>}
              <p>{shippingAddr?.city}, {shippingAddr?.state} – {shippingAddr?.pincode}</p>
              <p>{shippingAddr?.country}</p>
            </address>
          </div>

          {/* Contact & Payment */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> Contact
              </h3>
              <p className="text-sm text-slate-700">{order.customer_phone}</p>
              <p className="text-sm text-slate-700">{order.customer_email}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" /> Delivery
              </h3>
              <p className="text-sm text-slate-600">
                Estimated <span className="font-semibold text-slate-800">3–7 business days</span>
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                You will receive a tracking link via SMS/WhatsApp
              </p>
            </div>
          </div>
        </div>

        {/* Notes */}
        {order.notes && (
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
              Your Notes
            </h3>
            <p className="text-sm text-slate-600">{order.notes}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2.5 py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-green-500 transition-colors shadow-sm"
          >
            <MessageCircle className="w-5 h-5" />
            Track via WhatsApp
          </a>
          <Link
            href="/shop"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:border-brand-blue hover:text-brand-blue transition-colors"
          >
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Payment ID reference */}
        {order.razorpay_payment_id && (
          <p className="text-center text-xs text-slate-400">
            Payment Reference:{' '}
            <span className="font-mono font-semibold text-slate-600">{order.razorpay_payment_id}</span>
          </p>
        )}

        {/* Invoice note */}
        <div className="flex items-center gap-2.5 bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-slate-600">
          <Download className="w-4 h-4 text-brand-blue shrink-0" />
          <span>
            A GST invoice will be emailed to <strong>{order.customer_email}</strong> once your order is dispatched.
            For bulk/B2B invoicing, contact{' '}
            <a href="mailto:info@infysmart.com" className="text-brand-blue underline">info@infysmart.com</a>.
          </span>
        </div>

      </div>
    </main>
  );
}
