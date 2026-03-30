'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck, CreditCard, Truck, Smartphone,
  ChevronDown, ChevronUp, AlertCircle, Loader2, CheckCircle2,
  Lock, Zap, Info
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import {
  formatPrice, getEffectivePrice,
  isValidEmail, isValidPhone, isValidPincode
} from '@/lib/utils';
import { getAssetUrl } from '@/lib/directus';
import type { ShippingAddress } from '@/lib/directus';

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  shipping: ShippingAddress;
  billing_same: boolean;
  billing: ShippingAddress;
  notes: string;
}

type FormErrors = Partial<Record<string, string>>;

const EMPTY_ADDRESS: ShippingAddress = {
  line1: '', line2: '', city: '', state: '', pincode: '', country: 'India',
};

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Delhi', 'Jammu and Kashmir',
  'Ladakh', 'Lakshadweep', 'Puducherry',
];

const SAMEDAY_CITIES = ['Chennai', 'Coimbatore'];

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, totals, coupon, clearCart, gstRate } = useCart();

  const [form, setForm] = useState<CheckoutForm>({
    name: '', email: '', phone: '',
    shipping: { ...EMPTY_ADDRESS },
    billing_same: true,
    billing: { ...EMPTY_ADDRESS },
    notes: '',
  });

  const sessionEmail = session?.user?.email ?? '';
  const sessionPhone = session?.user?.phone ?? '';

  // Pre-fill from session
  useEffect(() => {
    if (session?.user) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || session.user.name || '',
        email: session.user.email || prev.email,
        phone: prev.phone || session.user.phone || '',
      }));
    }
  }, [session]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [serviceableStates, setServiceableStates] = useState<string[]>([]);
  const [shippingCharge, setShippingCharge] = useState(299);
  const [freeShippingAbove, setFreeShippingAbove] = useState(5000);

  useEffect(() => {
    fetch('/api/shipping/rules')
      .then((r) => r.json())
      .then((data: { serviceable_states: string[]; shipping_charge: number; free_shipping_above: number }) => {
        setServiceableStates(data.serviceable_states ?? []);
        setShippingCharge(data.shipping_charge ?? 299);
        setFreeShippingAbove(data.free_shipping_above ?? 5000);
      })
      .catch(() => { /* fail open */ });
  }, []);

  useEffect(() => {
    if (document.getElementById('razorpay-script')) return;
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (items.length === 0) router.replace('/cart');
  }, [items, router]);

  if (items.length === 0) return null;

  const setField = (path: string, value: string | boolean) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[path];
      return next;
    });
    setForm((prev) => {
      const keys = path.split('.');
      if (keys.length === 1) return { ...prev, [path]: value };
      if (keys[0] === 'shipping' || keys[0] === 'billing') {
        return { ...prev, [keys[0]]: { ...prev[keys[0]], [keys[1]]: value } };
      }
      return prev;
    });
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email.trim() || !isValidEmail(form.email)) e.email = 'Valid email is required';
    if (!form.phone.trim() || !isValidPhone(form.phone)) e.phone = 'Valid 10-digit mobile number required';

    const addr = form.shipping;
    if (!addr.line1.trim()) e['shipping.line1'] = 'Address line 1 is required';
    if (!addr.city.trim()) e['shipping.city'] = 'City is required';
    if (!addr.state) e['shipping.state'] = 'State is required';
    else if (serviceableStates.length > 0 && !serviceableStates.includes(addr.state)) {
      e['shipping.state'] = `We don't deliver to ${addr.state} yet.`;
    }
    if (!addr.pincode || !isValidPincode(addr.pincode)) e['shipping.pincode'] = 'Valid 6-digit PIN required';

    if (!form.billing_same) {
      const b = form.billing;
      if (!b.line1.trim()) e['billing.line1'] = 'Billing address line 1 is required';
      if (!b.city.trim()) e['billing.city'] = 'City is required';
      if (!b.state) e['billing.state'] = 'State is required';
      if (!b.pincode || !isValidPincode(b.pincode)) e['billing.pincode'] = 'Valid 6-digit PIN required';
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) {
      const firstError = document.querySelector('[data-error="true"]');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setLoading(true);
    try {
      await initiateRazorpay();
    } catch (err) {
      console.error('Order placement failed:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const buildOrderPayload = (extras: Record<string, unknown> = {}) => ({
    customer_name: form.name,
    customer_email: form.email,
    customer_phone: form.phone,
    shipping_address: form.shipping,
    billing_same_as_shipping: form.billing_same,
    billing_address: form.billing_same ? null : form.billing,
    payment_method: 'razorpay',
    coupon_code: coupon?.code ?? null,
    notes: form.notes || null,
    subtotal: totals.subtotal,
    tax_amount: totals.gst,
    shipping_amount: totals.shipping,
    discount_amount: totals.discount,
    total_amount: totals.total,
    items: items.map(({ product, quantity }) => ({
      product_id: product.id,
      product_name: product.name,
      product_sku: product.sku,
      quantity,
      unit_price: getEffectivePrice(product.price, product.sale_price),
      total_price: getEffectivePrice(product.price, product.sale_price) * quantity,
      product_snapshot: {
        id: product.id,
        name: product.name,
        sku: product.sku,
        thumbnail: product.thumbnail,
        price: product.price,
        sale_price: product.sale_price,
      },
    })),
    ...extras,
  });

  const initiateRazorpay = async () => {
    const rzpRes = await fetch('/api/payments/razorpay/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totals.total }),
    });
    if (!rzpRes.ok) throw new Error('Failed to create payment order');
    const { order_id, amount, currency, key_id } = await rzpRes.json() as {
      order_id: string; amount: number; currency: string; key_id: string;
    };

    const options = {
      key: key_id,
      amount,
      currency,
      order_id,
      name: 'Infysmart',
      description: `Order — ${items.length} item${items.length !== 1 ? 's' : ''}`,
      image: 'https://infysmart.com/logo.png',
      prefill: { name: form.name, email: form.email, contact: form.phone },
      notes: {
        shipping_address: `${form.shipping.line1}, ${form.shipping.city}, ${form.shipping.state} - ${form.shipping.pincode}`,
      },
      theme: { color: '#FF4500' },
      handler: async (response: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) => {
        setLoading(true);
        const verifyRes = await fetch('/api/payments/razorpay/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            order_payload: buildOrderPayload({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          }),
        });
        if (!verifyRes.ok) {
          alert('Payment verification failed. Please contact support with your payment reference.');
          setLoading(false);
          return;
        }
        const { id, order_number } = await verifyRes.json() as { id: string; order_number: string };
        clearCart();
        router.push(`/order/confirmation/${id}?method=razorpay&order=${order_number}`);
      },
      modal: { ondismiss: () => setLoading(false) },
    };

    if (!window.Razorpay) throw new Error('Razorpay SDK not loaded. Please refresh and try again.');
    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', (response: { error: { description: string } }) => {
      alert(`Payment failed: ${response.error.description}`);
      setLoading(false);
    });
    rzp.open();
  };

  const isSameDayCity = SAMEDAY_CITIES.some(
    (c) => form.shipping.city.trim().toLowerCase() === c.toLowerCase()
  );
  const isServiceable = serviceableStates.length === 0 || !form.shipping.state || serviceableStates.includes(form.shipping.state);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-3.5 px-4">
        <div className="container mx-auto max-w-5xl flex items-center justify-between">
          <h1 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#FF4500]" /> Secure Checkout
          </h1>
          <span className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 text-green-500" /> 256-bit SSL · Secured by Razorpay
          </span>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-6">
        <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">

          {/* ── LEFT: Form ── */}
          <div className="space-y-4">

            {/* Delivery info banner */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#FF4500] shrink-0" />
                <span className="font-semibold text-orange-800">Same-day delivery</span>
                <span className="text-orange-700">in Chennai &amp; Coimbatore (orders before 2 PM)</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-gray-500 shrink-0" />
                <span className="text-gray-600">Standard delivery 3–7 days · Free above {formatPrice(freeShippingAbove)} · Otherwise {formatPrice(shippingCharge)}</span>
              </div>
            </div>

            {/* Contact Information */}
            <FormSection title="Contact Information" icon={<Smartphone className="w-4 h-4 text-[#FF4500]" />}>
              {/* Ordering for someone else note */}
              <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5 text-xs text-blue-700">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>
                  Ordering for a client or project site? Enter the <strong>delivery contact&apos;s name and phone</strong> below — order confirmation will go to your account email.
                </span>
              </div>

              <FormRow>
                <FormField label="Full Name *" error={errors.name}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setField('name', e.target.value)}
                    placeholder="Delivery contact name"
                    className={inputCls(!!errors.name)}
                    autoComplete="name"
                  />
                </FormField>
                <FormField label="Mobile Number *" error={errors.phone}>
                  {sessionPhone ? (
                    <div className="relative">
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setField('phone', e.target.value)}
                        placeholder="10-digit mobile number"
                        className={inputCls(!!errors.phone)}
                        autoComplete="tel"
                        maxLength={10}
                      />
                    </div>
                  ) : (
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setField('phone', e.target.value)}
                      placeholder="10-digit mobile number"
                      className={inputCls(!!errors.phone)}
                      autoComplete="tel"
                      maxLength={10}
                    />
                  )}
                </FormField>
              </FormRow>

              {/* Email — locked to session */}
              <FormField label="Account Email" error={errors.email}>
                <div className="relative">
                  <input
                    type="email"
                    value={sessionEmail || form.email}
                    readOnly
                    className="w-full text-sm rounded-lg px-3 py-2.5 pr-10 border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                </div>
                <p className="text-[11px] text-gray-400 mt-1">Order confirmation &amp; invoice will be sent here</p>
              </FormField>
            </FormSection>

            {/* Shipping Address */}
            <FormSection title="Shipping Address" icon={<Truck className="w-4 h-4 text-[#FF4500]" />}>
              {isSameDayCity && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-xs text-green-700 font-semibold">
                  <Zap className="w-3.5 h-3.5" /> Same-day delivery available for {form.shipping.city}!
                </div>
              )}
              <AddressFields
                prefix="shipping"
                address={form.shipping}
                errors={errors}
                setField={setField}
                serviceableStates={serviceableStates}
              />
            </FormSection>

            {/* Billing Address */}
            <FormSection title="Billing Address" icon={<CreditCard className="w-4 h-4 text-[#FF4500]" />}>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.billing_same}
                  onChange={(e) => setField('billing_same', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 accent-orange-500"
                />
                <span className="text-sm font-medium text-gray-700">Same as shipping address</span>
              </label>
              {!form.billing_same && (
                <div className="mt-4">
                  <AddressFields prefix="billing" address={form.billing} errors={errors} setField={setField} serviceableStates={[]} />
                </div>
              )}
            </FormSection>

            {/* Order Notes */}
            <FormSection title="Delivery Notes" icon={null}>
              <textarea
                value={form.notes}
                onChange={(e) => setField('notes', e.target.value)}
                placeholder="Site address details, preferred delivery time, security gate instructions, contact person at site, etc."
                rows={3}
                className="w-full text-sm bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-lg px-3 py-2.5 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200 resize-none transition-colors"
              />
            </FormSection>

            {/* Payment — online only */}
            <FormSection title="Payment" icon={<CreditCard className="w-4 h-4 text-[#FF4500]" />}>
              <div className="flex items-start gap-3 p-4 rounded-xl border-2 border-orange-400 bg-orange-50">
                <div className="mt-0.5 w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">💳 Pay Online via Razorpay</p>
                  <p className="text-xs text-gray-500 mt-0.5">UPI · Credit/Debit Card · Net Banking · Wallets</p>
                </div>
              </div>
              <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                Your payment is secured by Razorpay — PCI DSS Level 1 certified
              </p>
            </FormSection>
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <div className="space-y-4 lg:sticky lg:top-20">

            {/* Mobile toggle */}
            <button
              className="lg:hidden flex items-center justify-between w-full bg-white border border-gray-200 shadow-sm rounded-xl p-4"
              onClick={() => setSummaryOpen(!summaryOpen)}
            >
              <span className="font-bold text-gray-900">Order Summary</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#FF4500]">{formatPrice(totals.total)}</span>
                {summaryOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
            </button>

            <div className={`space-y-4 ${summaryOpen ? 'block' : 'hidden lg:block'}`}>

              {/* Items */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h2 className="text-sm font-bold text-gray-700 mb-4">Items ({totals.itemCount})</h2>
                <ul className="space-y-3">
                  {items.map(({ product, quantity }) => {
                    const price = getEffectivePrice(product.price, product.sale_price);
                    const thumb = product.thumbnail
                      ? getAssetUrl(product.thumbnail, { width: '80', height: '80', fit: 'cover' })
                      : null;
                    return (
                      <li key={product.id} className="flex gap-3 text-sm">
                        <div className="relative flex-shrink-0">
                          <div className="w-14 h-14 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                            {thumb
                              ? <Image src={thumb} alt={product.name} width={56} height={56} className="w-full h-full object-cover" />
                              : <div className="w-full h-full bg-gray-100" />
                            }
                          </div>
                          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                            {quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 line-clamp-2 leading-snug text-xs">{product.name}</p>
                          <p className="text-gray-400 text-[10px] mt-0.5">SKU: {product.sku}</p>
                        </div>
                        <span className="font-semibold text-gray-900 text-xs whitespace-nowrap">{formatPrice(price * quantity)}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Totals */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-2">
                <div className="space-y-1.5 text-sm">
                  <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
                  {totals.discount > 0 && (
                    <Row label="Discount" value={`− ${formatPrice(totals.discount)}`} valueClass="text-green-600 font-semibold" />
                  )}
                  <Row
                    label="Shipping"
                    value={totals.shipping === 0 ? 'FREE' : formatPrice(totals.shipping)}
                    valueClass={totals.shipping === 0 ? 'text-green-600 font-semibold' : ''}
                  />
                </div>
                <div className="border-t border-gray-100 pt-2.5 flex justify-between font-extrabold text-base text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(totals.total)}</span>
                </div>
                <p className="text-[11px] text-gray-400 text-center">
                  Incl. {gstRate}% GST (₹{totals.gst.toLocaleString('en-IN')})
                </p>
              </div>

              {/* Place Order */}
              <button
                onClick={handlePlaceOrder}
                disabled={loading || !isServiceable}
                className="w-full flex items-center justify-center gap-2.5 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all text-base shadow-lg shadow-orange-200"
              >
                {loading
                  ? <><Loader2 className="w-5 h-5 animate-spin" /> Opening Payment…</>
                  : <><CheckCircle2 className="w-5 h-5" /> Pay {formatPrice(totals.total)}</>
                }
              </button>

              <p className="text-[11px] text-gray-400 text-center">
                By placing an order you agree to our{' '}
                <Link href="/terms" className="underline hover:text-[#FF4500]">Terms</Link> and{' '}
                <Link href="/refund-policy" className="underline hover:text-[#FF4500]">Refund Policy</Link>.
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function FormSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
        {icon}{title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function FormRow({ children }: { children: React.ReactNode }) {
  return <div className="grid sm:grid-cols-2 gap-4">{children}</div>;
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div data-error={!!error || undefined}>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `w-full text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 transition-colors ${
    hasError
      ? 'border border-red-400 bg-red-50 text-gray-900 placeholder:text-gray-400 focus:border-red-400 focus:ring-red-200'
      : 'border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-orange-400 focus:ring-orange-100'
  }`;
}

function AddressFields({
  prefix, address, errors, setField, serviceableStates,
}: {
  prefix: 'shipping' | 'billing';
  address: ShippingAddress;
  errors: FormErrors;
  setField: (path: string, value: string) => void;
  serviceableStates: string[];
}) {
  const stateNotServiceable =
    prefix === 'shipping' &&
    serviceableStates.length > 0 &&
    address.state !== '' &&
    !serviceableStates.includes(address.state);

  const selCls = (hasError: boolean) =>
    `w-full text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 transition-colors bg-white ${
      hasError
        ? 'border border-red-400 text-gray-700 focus:border-red-400 focus:ring-red-200'
        : 'border border-gray-200 text-gray-700 focus:border-orange-400 focus:ring-orange-100'
    }`;

  return (
    <div className="space-y-4">
      <FormField label="Address Line 1 *" error={errors[`${prefix}.line1`]}>
        <input type="text" value={address.line1} onChange={(e) => setField(`${prefix}.line1`, e.target.value)}
          placeholder="Plot/Door no., Street name" className={inputCls(!!errors[`${prefix}.line1`])} />
      </FormField>
      <FormField label="Address Line 2" error={undefined}>
        <input type="text" value={address.line2} onChange={(e) => setField(`${prefix}.line2`, e.target.value)}
          placeholder="Area, Landmark (optional)" className={inputCls(false)} />
      </FormField>
      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="City *" error={errors[`${prefix}.city`]}>
          <input type="text" value={address.city} onChange={(e) => setField(`${prefix}.city`, e.target.value)}
            placeholder="City / District" className={inputCls(!!errors[`${prefix}.city`])} />
        </FormField>
        <FormField label="PIN Code *" error={errors[`${prefix}.pincode`]}>
          <input type="text" value={address.pincode} onChange={(e) => setField(`${prefix}.pincode`, e.target.value)}
            placeholder="6-digit PIN" className={inputCls(!!errors[`${prefix}.pincode`])} maxLength={6} />
        </FormField>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <FormField label="State *" error={errors[`${prefix}.state`]}>
            <select value={address.state} onChange={(e) => setField(`${prefix}.state`, e.target.value)}
              className={selCls(!!errors[`${prefix}.state`] || stateNotServiceable)}>
              <option value="">Select State</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s} disabled={serviceableStates.length > 0 && !serviceableStates.includes(s)}>
                  {s}{serviceableStates.length > 0 && !serviceableStates.includes(s) ? ' (not serviceable)' : ''}
                </option>
              ))}
            </select>
          </FormField>
          {stateNotServiceable && !errors[`${prefix}.state`] && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> We don&apos;t deliver to {address.state} yet.
            </p>
          )}
        </div>
        <FormField label="Country" error={undefined}>
          <input type="text" value="India" disabled
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50 text-gray-400 cursor-not-allowed" />
        </FormField>
      </div>
    </div>
  );
}

function Row({ label, value, valueClass = '' }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex justify-between text-gray-500 text-sm">
      <span>{label}</span>
      <span className={valueClass || 'text-gray-900'}>{value}</span>
    </div>
  );
}
