import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2, Package, Truck, Phone, Mail,
  MapPin, ArrowRight, MessageCircle, ShieldCheck
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { directusAdmin } from '@/lib/directus-admin';
import { readItems, readSingleton } from '@directus/sdk';
import type { Order, OrderItem, ShippingAddress, GlobalSettings } from '@/lib/directus';

export const metadata: Metadata = {
  title: 'Order Confirmed | Infysmart',
  robots: { index: false, follow: false },
};

async function fetchOrder(id: string): Promise<Order | null> {
  try {
    // Use readItems + filter instead of readItem to avoid Directus row-level FORBIDDEN errors
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const results = await directusAdmin.request(readItems('orders' as any, {
      filter: { id: { _eq: Number(id) } } as never,
      limit: 1,
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
    } as never));
    const list = results as unknown as Order[];
    return list[0] ?? null;
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
  const { order: orderNumberFallback } = await searchParams;

  const order = await fetchOrder(orderId);
  if (!order) notFound();

  let gstRate = 18;
  try {
    const settings = await directusAdmin.request(
      readSingleton('global_settings' as never, { fields: ['gst_rate'] } as never)
    ) as GlobalSettings;
    gstRate = Number(settings.gst_rate ?? 18);
  } catch { /* use default */ }

  const orderNumber = order.order_number ?? orderNumberFallback ?? orderId.slice(0, 8).toUpperCase();
  const shippingAddr = order.shipping_address as ShippingAddress;
  const items = (order.items ?? []) as OrderItem[];

  const whatsappMsg = encodeURIComponent(
    `Hi Infysmart, I just placed an order!\n\nOrder Number: ${orderNumber}\nTotal: ₹${order.total_amount?.toLocaleString('en-IN')}\n\nPlease confirm the delivery timeline.`
  );
  const whatsappUrl = `https://wa.me/919445675619?text=${whatsappMsg}`;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200 py-10 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 border border-green-200 mb-5">
            <CheckCircle2 className="w-9 h-9 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Payment Confirmed!</h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Payment received. Your order is confirmed and will be processed &amp; dispatched shortly.
          </p>
          <div className="inline-flex items-center gap-2 mt-5 bg-orange-50 border border-orange-200 text-orange-900 px-5 py-2.5 rounded-full font-mono text-sm font-bold">
            <Package className="w-4 h-4 text-[#FF4500]" />
            {orderNumber}
          </div>
          {order.customer_email && (
            <p className="mt-3 text-xs text-gray-400 flex items-center justify-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              Confirmation sent to <span className="font-semibold text-gray-700">{order.customer_email}</span>
            </p>
          )}
        </div>
      </section>

      <div className="container mx-auto max-w-3xl px-4 py-6 space-y-4">

        {/* Order Timeline */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-bold text-gray-700 mb-5">Order Status</h2>
          <div className="flex items-start">
            {[
              { label: 'Order Placed', done: true },
              { label: 'Confirmed', done: ['confirmed', 'processing', 'shipped', 'delivered'].includes(order.status) },
              { label: 'Processing', done: ['processing', 'shipped', 'delivered'].includes(order.status) },
              { label: 'Shipped', done: ['shipped', 'delivered'].includes(order.status) },
              { label: 'Delivered', done: order.status === 'delivered' },
            ].map(({ label, done }, idx, arr) => (
              <div key={label} className="flex-1 flex flex-col items-center">
                <div className="flex items-center w-full">
                  {idx > 0 && <div className={`flex-1 h-0.5 ${done ? 'bg-[#FF4500]' : 'bg-gray-200'}`} />}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${
                    done ? 'bg-[#FF4500] border-[#FF4500]' : 'bg-white border-gray-200'
                  }`}>
                    {done ? <CheckCircle2 className="w-4 h-4 text-white" /> : <div className="w-2 h-2 rounded-full bg-gray-300" />}
                  </div>
                  {idx < arr.length - 1 && <div className={`flex-1 h-0.5 ${done && arr[idx + 1]?.done ? 'bg-[#FF4500]' : 'bg-gray-200'}`} />}
                </div>
                <span className={`text-[10px] font-semibold mt-1.5 text-center ${done ? 'text-[#FF4500]' : 'text-gray-400'}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
              <Package className="w-4 h-4 text-[#FF4500]" />
              Items Ordered ({items.length} product{items.length !== 1 ? 's' : ''})
            </h2>
          </div>
          <ul className="divide-y divide-gray-100">
            {items.map((item) => (
              <li key={item.id} className="flex items-start gap-4 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm leading-snug">{item.product_name}</p>
                  <p className="text-xs text-gray-500 mt-0.5 font-mono">SKU: {item.product_sku}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Qty: <span className="font-semibold text-gray-900">{item.quantity}</span>{' '}
                    × {formatPrice(item.unit_price)}
                  </p>
                </div>
                <span className="font-bold text-gray-900 text-sm whitespace-nowrap">{formatPrice(item.total_price)}</span>
              </li>
            ))}
          </ul>
          <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 space-y-1.5 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span><span className="text-gray-900">{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount_amount > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>Discount</span><span>− {formatPrice(order.discount_amount)}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span className={order.shipping_amount === 0 ? 'text-green-600 font-medium' : 'text-gray-900'}>
                {order.shipping_amount === 0 ? 'FREE' : formatPrice(order.shipping_amount)}
              </span>
            </div>
            <div className="flex justify-between font-extrabold text-base text-gray-900 pt-2 border-t border-gray-200 mt-2">
              <span>Total Paid</span><span>{formatPrice(order.total_amount)}</span>
            </div>
            <p className="text-[10px] text-gray-400 text-right">
              Incl. {gstRate}% GST (₹{order.tax_amount?.toLocaleString('en-IN') ?? '—'}) · Paid via Razorpay
            </p>
          </div>
        </div>

        {/* Delivery & Contact */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Delivery Address
            </h3>
            <address className="not-italic text-sm text-gray-600 leading-relaxed">
              <p className="font-semibold text-gray-900">{order.customer_name}</p>
              <p>{shippingAddr?.line1}</p>
              {shippingAddr?.line2 && <p>{shippingAddr.line2}</p>}
              <p>{shippingAddr?.city}, {shippingAddr?.state} – {shippingAddr?.pincode}</p>
              <p>{shippingAddr?.country}</p>
            </address>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> Contact
              </h3>
              <p className="text-sm text-gray-700">{order.customer_phone}</p>
              <p className="text-sm text-gray-500">{order.customer_email}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" /> Estimated Delivery
              </h3>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">3–7 business days</span>
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Tracking link sent via SMS/WhatsApp after dispatch</p>
            </div>
          </div>
        </div>

        {order.notes && (
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Delivery Notes</h3>
            <p className="text-sm text-gray-600">{order.notes}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2.5 py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-green-500 transition-colors">
            <MessageCircle className="w-5 h-5" /> Track via WhatsApp
          </a>
          <Link href="/shop"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:border-orange-300 hover:text-[#FF4500] transition-colors">
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {order.razorpay_payment_id && (
          <p className="text-center text-xs text-gray-400">
            Payment Reference: <span className="font-mono font-semibold text-gray-600">{order.razorpay_payment_id}</span>
          </p>
        )}

        <div className="flex items-center gap-2.5 bg-orange-50 border border-orange-100 rounded-xl p-4 text-xs text-gray-600">
          <ShieldCheck className="w-4 h-4 text-[#FF4500] shrink-0" />
          <span>
            GST invoice will be emailed to <strong className="text-gray-900">{order.customer_email}</strong> once dispatched.
            For B2B invoicing contact{' '}
            <a href="mailto:info@infysmart.com" className="text-[#FF4500] underline">info@infysmart.com</a>.
          </span>
        </div>

      </div>
    </main>
  );
}
