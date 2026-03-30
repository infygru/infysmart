'use client';

import { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { User, Mail, Phone, Package, LogOut, Save, Loader2, CheckCircle2, AlertTriangle, ArrowRight, ChevronRight, ShoppingBag } from 'lucide-react';
import type { Customer, Order, OrderItem } from '@/lib/directus';
import { formatPrice } from '@/lib/utils';

const STATUS_COLORS: Record<string, string> = {
  pending:    'bg-yellow-500/20 text-yellow-400',
  confirmed:  'bg-orange-500/20 text-orange-400',
  processing: 'bg-purple-500/20 text-purple-400',
  shipped:    'bg-indigo-500/20 text-indigo-400',
  delivered:  'bg-green-500/20 text-green-400',
  cancelled:  'bg-red-500/20 text-red-400',
  refunded:   'bg-zinc-700 text-zinc-400',
};

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL ?? 'https://api.infysmart.com';

export default function AccountClient({
  customer,
  orders,
  sessionEmail,
}: {
  customer: Customer | null;
  orders: Order[];
  sessionEmail: string;
}) {
  const { update: updateSession } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const setupPhone = searchParams.get('setup') === 'phone';
  const nextUrl = searchParams.get('next') ?? '/account';

  const [name, setName] = useState(customer?.name ?? '');
  const [phone, setPhone] = useState(customer?.phone ?? '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Phone verification state
  const [verifyPhone, setVerifyPhone] = useState('');
  const [verifyOtp, setVerifyOtp] = useState('');
  const [verifyStep, setVerifyStep] = useState<'input' | 'otp'>('input');
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState('');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleSave = async () => {
    setSaving(true);
    setSaveError('');
    try {
      const res = await fetch('/api/account/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim() }),
      });
      if (!res.ok) {
        const d = await res.json() as { error?: string };
        setSaveError(d.error ?? 'Failed to save');
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setSaveError('Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleSendVerifyOTP = async () => {
    const clean = verifyPhone.replace(/\D/g, '');
    if (clean.length !== 10) { setVerifyError('Enter a valid 10-digit mobile number'); return; }
    setVerifyLoading(true);
    setVerifyError('');
    try {
      const res = await fetch('/api/auth/send-sms-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: clean }),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) { setVerifyError(data.error ?? 'Failed to send OTP'); return; }
      setVerifyStep('otp');
      setCountdown(60);
    } catch { setVerifyError('Something went wrong.'); }
    finally { setVerifyLoading(false); }
  };

  const handleConfirmPhone = async () => {
    if (verifyOtp.length !== 6) { setVerifyError('Enter the 6-digit code'); return; }
    setVerifyLoading(true);
    setVerifyError('');
    try {
      const res = await fetch('/api/account/verify-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: verifyPhone.replace(/\D/g, ''), otp: verifyOtp }),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) { setVerifyError(data.error ?? 'Verification failed'); return; }
      // Refresh session so token.phone is updated
      await updateSession();
      router.push(nextUrl);
    } catch { setVerifyError('Something went wrong.'); }
    finally { setVerifyLoading(false); }
  };

  const inputCls = 'w-full text-sm bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 rounded-lg px-3 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all';

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Header */}
      <section className="bg-slate-900 border-b border-slate-800 py-4 px-4">
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">My Account</h1>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-200 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </section>

      {/* Phone verification banner */}
      {setupPhone && !customer?.phone && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-3">
          <div className="container mx-auto max-w-4xl flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <p className="text-sm text-amber-300">
              Verify your mobile number to proceed to checkout.
            </p>
          </div>
        </div>
      )}

      <div className="container mx-auto max-w-4xl px-4 py-6 grid md:grid-cols-[300px_1fr] gap-5 items-start">

        {/* Profile Card */}
        <div className="space-y-4">

          {/* Phone verification card — shown prominently if no phone */}
          {!customer?.phone && (
            <div className="bg-slate-900 rounded-xl border border-amber-500/30 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="w-4 h-4 text-amber-400" />
                <h2 className="text-sm font-semibold text-amber-300">Verify Mobile Number</h2>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Required to place orders. We use this to send order updates and delivery info.
              </p>

              {verifyStep === 'input' ? (
                <div className="space-y-3">
                  <div className="flex">
                    <span className="h-10 flex items-center px-3 bg-slate-800 border border-r-0 border-slate-700 rounded-l-lg text-sm text-slate-400 font-medium">+91</span>
                    <input
                      type="tel"
                      value={verifyPhone}
                      onChange={(e) => { setVerifyPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); setVerifyError(''); }}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendVerifyOTP()}
                      placeholder="98765 43210"
                      maxLength={10}
                      className="flex-1 h-10 bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 rounded-r-lg px-3 text-sm focus:outline-none focus:border-orange-500 transition-all"
                    />
                  </div>
                  {verifyError && <p className="text-xs text-red-400">{verifyError}</p>}
                  <button
                    onClick={handleSendVerifyOTP}
                    disabled={verifyLoading}
                    className="w-full h-10 flex items-center justify-center gap-2 bg-[#FF4500] hover:bg-orange-600 text-white text-sm font-semibold rounded-lg disabled:opacity-50 transition-colors"
                  >
                    {verifyLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Send OTP <ArrowRight className="w-3.5 h-3.5" /></>}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Code sent to +91 {verifyPhone}</p>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={verifyOtp}
                    onChange={(e) => { setVerifyOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); setVerifyError(''); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleConfirmPhone()}
                    placeholder="6-digit code"
                    maxLength={6}
                    autoFocus
                    className={inputCls}
                  />
                  {verifyError && <p className="text-xs text-red-400">{verifyError}</p>}
                  <button
                    onClick={handleConfirmPhone}
                    disabled={verifyLoading || verifyOtp.length !== 6}
                    className="w-full h-10 flex items-center justify-center gap-2 bg-[#FF4500] hover:bg-orange-600 text-white text-sm font-semibold rounded-lg disabled:opacity-40 transition-colors"
                  >
                    {verifyLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify & Continue'}
                  </button>
                  <div className="text-center">
                    {countdown > 0
                      ? <p className="text-xs text-slate-500">Resend in {countdown}s</p>
                      : <button onClick={() => { setVerifyStep('input'); setVerifyOtp(''); }} className="text-xs text-slate-500 hover:text-slate-200 underline underline-offset-2">Change number</button>
                    }
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Profile info card */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 space-y-4">
            <div className="flex flex-col items-center text-center gap-3">
              {customer?.avatar ? (
                <Image
                  src={customer.avatar}
                  alt={name || 'User'}
                  width={72}
                  height={72}
                  className="rounded-full object-cover border-2 border-slate-700"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
                  <User className="w-7 h-7 text-orange-400" />
                </div>
              )}
              <div>
                <p className="font-semibold text-white text-sm">{name || 'No name set'}</p>
                <p className="text-xs text-slate-500">{sessionEmail}</p>
              </div>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-widest">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputCls} />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-widest">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={customer?.phone ? customer.phone : 'Not verified yet'}
                  disabled={!customer?.phone}
                  maxLength={10}
                  className={`${inputCls} ${!customer?.phone ? 'opacity-40 cursor-not-allowed' : ''}`}
                />
                {!customer?.phone && (
                  <p className="mt-1 text-[11px] text-slate-500">Verify above to set your number</p>
                )}
              </div>
              {saveError && <p className="text-xs text-red-400">{saveError}</p>}
              <button
                onClick={handleSave}
                disabled={saving || !customer?.phone}
                className="w-full flex items-center justify-center gap-2 h-10 bg-[#FF4500] hover:bg-orange-600 text-white text-sm font-semibold rounded-lg disabled:opacity-40 transition-colors"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> :
                  saved ? <><CheckCircle2 className="w-4 h-4" /> Saved</> :
                  <><Save className="w-4 h-4" /> Save Changes</>}
              </button>
            </div>

            <div className="border-t border-slate-800 pt-3 space-y-1.5 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                <span className="truncate">{sessionEmail}</span>
              </div>
              {customer?.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" />
                  <span>+91 {customer.phone}</span>
                  <CheckCircle2 className="w-3 h-3 text-green-400" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          {/* Orders header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
            <h2 className="flex items-center gap-2 font-semibold text-white text-sm">
              <Package className="w-4 h-4 text-orange-400" />
              My Orders
              {orders.length > 0 && (
                <span className="bg-orange-500/20 text-orange-400 text-xs font-bold px-2 py-0.5 rounded-full">
                  {orders.length}
                </span>
              )}
            </h2>
            {orders.length > 0 && (
              <Link href="/shop" className="text-xs text-slate-500 hover:text-orange-400 transition-colors flex items-center gap-1">
                <ShoppingBag className="w-3.5 h-3.5" /> Shop More
              </Link>
            )}
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-14 px-6">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-slate-600" />
              </div>
              <p className="text-slate-300 font-semibold mb-1">No orders yet</p>
              <p className="text-slate-500 text-sm mb-5">
                Browse our CCTV cameras, NVR, DVR and networking products.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#FF4500] hover:bg-orange-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
              >
                <ShoppingBag className="w-4 h-4" /> Browse Products
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-slate-800">
              {orders.map((order) => {
                const items = (order.items ?? []) as OrderItem[];
                const thumbs = items
                  .slice(0, 3)
                  .map((item) => {
                    const snap = item.product_snapshot as { thumbnail?: string } | null;
                    return snap?.thumbnail
                      ? `${DIRECTUS_URL}/assets/${snap.thumbnail}?width=48&height=48&fit=cover&quality=80`
                      : null;
                  })
                  .filter(Boolean) as string[];

                return (
                  <li key={order.id}>
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-slate-800/50 transition-colors group"
                    >
                      {/* Product thumbnails */}
                      <div className="flex -space-x-2 flex-shrink-0">
                        {thumbs.length > 0 ? (
                          thumbs.map((src, i) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              key={i}
                              src={src}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover border-2 border-slate-800 bg-slate-700"
                            />
                          ))
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                            <Package className="w-4 h-4 text-slate-600" />
                          </div>
                        )}
                        {items.length > 3 && (
                          <div className="w-10 h-10 rounded-lg bg-slate-800 border-2 border-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400">
                            +{items.length - 3}
                          </div>
                        )}
                      </div>

                      {/* Order info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-bold text-white text-sm font-mono group-hover:text-orange-400 transition-colors">
                            {order.order_number}
                          </p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[order.status] ?? 'bg-slate-800 text-slate-400'}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {new Date(order.date_created).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          {' · '}
                          {items.length} item{items.length !== 1 ? 's' : ''}
                          {' · '}
                          {order.payment_method === 'cod' ? 'Cash on Delivery' : 'Paid Online'}
                        </p>
                      </div>

                      {/* Total + chevron */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-bold text-white text-sm">{formatPrice(order.total_amount)}</span>
                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-orange-400 transition-colors" />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
