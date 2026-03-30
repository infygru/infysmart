'use client';

import { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { User, Mail, Phone, Package, LogOut, Save, Loader2, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import type { Customer, Order } from '@/lib/directus';
import { formatPrice } from '@/lib/utils';

const STATUS_COLORS: Record<string, string> = {
  pending:    'bg-yellow-100 text-yellow-700',
  confirmed:  'bg-violet-100 text-violet-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped:    'bg-indigo-100 text-indigo-700',
  delivered:  'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-600',
  refunded:   'bg-slate-100 text-slate-500',
};

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

  const inputCls = 'w-full text-sm bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-lg px-3 py-2.5 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-300 transition-all';

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-4 px-4">
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">My Account</h1>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </section>

      {/* Phone verification banner — shown when redirected from checkout */}
      {setupPhone && !customer?.phone && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
          <div className="container mx-auto max-w-4xl flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <p className="text-sm text-amber-800">
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
            <div className="bg-white rounded-xl border border-amber-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="w-4 h-4 text-amber-600" />
                <h2 className="text-sm font-semibold text-amber-800">Verify Mobile Number</h2>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Required to place orders. We use this to send order updates and delivery info.
              </p>

              {verifyStep === 'input' ? (
                <div className="space-y-3">
                  <div className="flex">
                    <span className="h-10 flex items-center px-3 bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg text-sm text-slate-500 font-medium">+91</span>
                    <input
                      type="tel"
                      value={verifyPhone}
                      onChange={(e) => { setVerifyPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); setVerifyError(''); }}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendVerifyOTP()}
                      placeholder="98765 43210"
                      maxLength={10}
                      className="flex-1 h-10 bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-r-lg px-3 text-sm focus:outline-none focus:border-violet-500 transition-all"
                    />
                  </div>
                  {verifyError && <p className="text-xs text-red-500">{verifyError}</p>}
                  <button
                    onClick={handleSendVerifyOTP}
                    disabled={verifyLoading}
                    className="w-full h-10 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white text-sm font-semibold rounded-lg disabled:opacity-50 transition-all"
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
                  {verifyError && <p className="text-xs text-red-500">{verifyError}</p>}
                  <button
                    onClick={handleConfirmPhone}
                    disabled={verifyLoading || verifyOtp.length !== 6}
                    className="w-full h-10 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white text-sm font-semibold rounded-lg disabled:opacity-40 transition-all"
                  >
                    {verifyLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify & Continue'}
                  </button>
                  <div className="text-center">
                    {countdown > 0
                      ? <p className="text-xs text-slate-400">Resend in {countdown}s</p>
                      : <button onClick={() => { setVerifyStep('input'); setVerifyOtp(''); }} className="text-xs text-slate-400 hover:text-slate-700 underline underline-offset-2">Change number</button>
                    }
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Profile info card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <div className="flex flex-col items-center text-center gap-3">
              {customer?.avatar ? (
                <Image
                  src={customer.avatar}
                  alt={name || 'User'}
                  width={72}
                  height={72}
                  className="rounded-full object-cover border-2 border-white/[0.1]"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-violet-100 border border-violet-200 flex items-center justify-center">
                  <User className="w-7 h-7 text-violet-600" />
                </div>
              )}
              <div>
                <p className="font-semibold text-slate-900 text-sm">{name || 'No name set'}</p>
                <p className="text-xs text-slate-500">{sessionEmail}</p>
              </div>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-widest">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputCls} />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-widest">Phone</label>
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
                  <p className="mt-1 text-[11px] text-slate-400">Verify above to set your number</p>
                )}
              </div>
              {saveError && <p className="text-xs text-red-500">{saveError}</p>}
              <button
                onClick={handleSave}
                disabled={saving || !customer?.phone}
                className="w-full flex items-center justify-center gap-2 h-10 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white text-sm font-semibold rounded-lg disabled:opacity-40 transition-all"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> :
                  saved ? <><CheckCircle2 className="w-4 h-4" /> Saved</> :
                  <><Save className="w-4 h-4" /> Save Changes</>}
              </button>
            </div>

            <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                <span className="truncate">{sessionEmail}</span>
              </div>
              {customer?.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" />
                  <span>+91 {customer.phone}</span>
                  <CheckCircle2 className="w-3 h-3 text-violet-500" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="flex items-center gap-2 font-semibold text-slate-900 mb-5 text-sm">
            <Package className="w-4 h-4 text-violet-600" />
            Recent Orders
          </h2>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">No orders yet</p>
              <Link href="/shop" className="mt-3 inline-block text-sm text-violet-600 font-semibold hover:underline">
                Start Shopping →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {orders.map((order) => (
                <div key={order.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 text-sm font-mono">{order.order_number}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {new Date(order.date_created).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      {' · '}
                      {order.payment_method === 'cod' ? 'Cash on Delivery' : 'Paid Online'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[order.status] ?? 'bg-slate-100 text-slate-500'}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <span className="font-bold text-slate-900 text-sm whitespace-nowrap">
                      {formatPrice(order.total_amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
