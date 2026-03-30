'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Phone, Save, Loader2, CheckCircle2,
  AlertTriangle, ArrowRight, User, ShieldCheck,
  MapPin, Package, Edit2, X, Lock,
  ShoppingBag, LogOut, Mail, ChevronRight
} from 'lucide-react';
import type { Customer, ShippingAddress } from '@/lib/directus';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Delhi', 'Jammu and Kashmir',
  'Ladakh', 'Lakshadweep', 'Puducherry',
];

const EMPTY_ADDRESS: ShippingAddress = {
  line1: '', line2: '', city: '', state: '', pincode: '', country: 'India',
};

export default function ProfileClient({
  customer,
  sessionEmail,
  sessionName,
}: {
  customer: Customer | null;
  sessionEmail: string;
  sessionName: string;
}) {
  const { update: updateSession } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const setupPhone = searchParams.get('setup') === 'phone';
  const nextUrl = searchParams.get('next') ?? '/account';

  const [name, setName] = useState(customer?.name ?? sessionName ?? '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');

  const [verifyPhone, setVerifyPhone] = useState('');
  const [verifyOtp, setVerifyOtp] = useState('');
  const [verifyStep, setVerifyStep] = useState<'input' | 'otp'>('input');
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState('');
  const [countdown, setCountdown] = useState(0);

  const [editingAddress, setEditingAddress] = useState(false);
  const [address, setAddress] = useState<ShippingAddress>(
    customer?.saved_address ?? { ...EMPTY_ADDRESS }
  );
  const [addrSaving, setAddrSaving] = useState(false);
  const [addrSaved, setAddrSaved] = useState(false);
  const [addrError, setAddrError] = useState('');

  const hasAddress = !!(customer?.saved_address?.line1);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleSave = async () => {
    setSaving(true); setSaveError('');
    try {
      const res = await fetch('/api/account/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() }),
      });
      if (!res.ok) {
        const d = await res.json() as { error?: string };
        setSaveError(d.error ?? 'Failed to save'); return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch { setSaveError('Something went wrong'); }
    finally { setSaving(false); }
  };

  const handleSendOTP = async () => {
    const clean = verifyPhone.replace(/\D/g, '');
    if (clean.length !== 10) { setVerifyError('Enter a valid 10-digit mobile number'); return; }
    setVerifyLoading(true); setVerifyError('');
    try {
      const res = await fetch('/api/auth/send-sms-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: clean }),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) { setVerifyError(data.error ?? 'Failed to send OTP'); return; }
      setVerifyStep('otp'); setCountdown(60);
    } catch { setVerifyError('Something went wrong.'); }
    finally { setVerifyLoading(false); }
  };

  const handleVerifyOTP = async () => {
    if (verifyOtp.length !== 6) { setVerifyError('Enter the 6-digit code'); return; }
    setVerifyLoading(true); setVerifyError('');
    try {
      const cleanPhone = verifyPhone.replace(/\D/g, '');
      const res = await fetch('/api/account/verify-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone, otp: verifyOtp }),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) { setVerifyError(data.error ?? 'Verification failed'); return; }
      await updateSession({ phone: cleanPhone });
      router.push(nextUrl);
    } catch { setVerifyError('Something went wrong.'); }
    finally { setVerifyLoading(false); }
  };

  const handleSaveAddress = async () => {
    if (!address.line1.trim() || !address.city.trim() || !address.state || !address.pincode.trim()) {
      setAddrError('Please fill in all required address fields'); return;
    }
    if (!/^\d{6}$/.test(address.pincode)) {
      setAddrError('Enter a valid 6-digit pincode'); return;
    }
    setAddrSaving(true); setAddrError('');
    try {
      const res = await fetch('/api/account/address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });
      if (!res.ok) {
        const d = await res.json() as { error?: string };
        setAddrError(d.error ?? 'Failed to save address'); return;
      }
      setAddrSaved(true);
      setEditingAddress(false);
      setTimeout(() => setAddrSaved(false), 3000);
    } catch { setAddrError('Something went wrong'); }
    finally { setAddrSaving(false); }
  };

  const inputCls = 'w-full text-sm bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#FF4500] focus:ring-1 focus:ring-orange-100 transition-all';
  const displayName = name || customer?.name || sessionName || 'My Account';
  const initials = displayName.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase();

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ── Top header bar ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-500">My Account</p>
          <Link
            href="/account/orders"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#FF4500] hover:underline"
          >
            <Package className="w-3.5 h-3.5" /> My Orders <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* ── Hero profile banner ── */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-white text-xl font-extrabold shadow-lg shrink-0">
              {initials || <User className="w-7 h-7" />}
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-extrabold text-white truncate">{displayName}</h1>
              <p className="text-sm text-orange-100 truncate">{sessionEmail}</p>
              <div className="flex items-center gap-3 mt-1.5">
                {customer?.phone ? (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-white bg-white/20 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> {customer.phone}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-orange-100 bg-white/10 px-2 py-0.5 rounded-full">
                    <AlertTriangle className="w-3 h-3" /> Phone not verified
                  </span>
                )}
                {hasAddress && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-white bg-white/20 px-2 py-0.5 rounded-full">
                    <MapPin className="w-3 h-3" /> Address saved
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-6">

        {/* Setup phone prompt */}
        {setupPhone && !customer?.phone && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700">Please verify your mobile number to proceed to checkout.</p>
          </div>
        )}

        <div className="grid lg:grid-cols-[1fr_320px] gap-5">

          {/* ── LEFT COLUMN ── */}
          <div className="space-y-4">

            {/* Phone verification (only if not verified) */}
            {!customer?.phone && (
              <div className="bg-white rounded-2xl border border-amber-200 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="w-4 h-4 text-amber-500" />
                  <h2 className="font-bold text-gray-900 text-sm">Verify Mobile Number</h2>
                </div>
                <p className="text-xs text-gray-500 mb-4">Required for placing orders & delivery updates.</p>

                {verifyStep === 'input' ? (
                  <div className="space-y-3">
                    <div className="flex">
                      <span className="h-11 flex items-center px-3.5 bg-gray-50 border border-r-0 border-gray-200 rounded-l-lg text-sm text-gray-500 font-medium select-none">+91</span>
                      <input
                        type="tel"
                        value={verifyPhone}
                        onChange={(e) => { setVerifyPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); setVerifyError(''); }}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendOTP()}
                        placeholder="98765 43210"
                        maxLength={10}
                        className="flex-1 h-11 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-r-lg px-3 text-sm focus:outline-none focus:border-[#FF4500] focus:ring-1 focus:ring-orange-100 transition-all"
                      />
                    </div>
                    {verifyError && <p className="text-xs text-red-500">{verifyError}</p>}
                    <button
                      onClick={handleSendOTP}
                      disabled={verifyLoading}
                      className="w-full h-10 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-sm font-semibold rounded-xl disabled:opacity-50 transition-all"
                    >
                      {verifyLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Send OTP <ArrowRight className="w-3.5 h-3.5" /></>}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-gray-500">Code sent to <span className="font-semibold text-gray-800">+91 {verifyPhone}</span></p>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={verifyOtp}
                      onChange={(e) => { setVerifyOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); setVerifyError(''); }}
                      onKeyDown={(e) => e.key === 'Enter' && handleVerifyOTP()}
                      placeholder="6-digit code"
                      maxLength={6}
                      autoFocus
                      className={`${inputCls} text-center tracking-[0.4em] text-lg font-bold`}
                    />
                    {verifyError && <p className="text-xs text-red-500">{verifyError}</p>}
                    <button
                      onClick={handleVerifyOTP}
                      disabled={verifyLoading || verifyOtp.length !== 6}
                      className="w-full h-10 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-sm font-semibold rounded-xl disabled:opacity-40 transition-all"
                    >
                      {verifyLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify & Continue'}
                    </button>
                    <div className="text-center">
                      {countdown > 0
                        ? <p className="text-xs text-gray-400">Resend in {countdown}s</p>
                        : <button onClick={() => { setVerifyStep('input'); setVerifyOtp(''); }} className="text-xs text-gray-500 hover:text-[#FF4500] underline underline-offset-2">Change number</button>
                      }
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Profile info */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-[#FF4500]" /> Profile Information
              </h2>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className={inputCls}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={sessionEmail}
                    readOnly
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50 text-gray-400 cursor-not-allowed pr-10"
                  />
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Mobile Number</label>
                {customer?.phone ? (
                  <div className="flex items-center gap-2 h-11 bg-green-50 border border-green-200 rounded-lg px-3">
                    <Phone className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-sm text-gray-800 font-medium">+91 {customer.phone}</span>
                    <div className="ml-auto flex items-center gap-1 text-green-600 text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 h-11 bg-amber-50 border border-amber-200 rounded-lg px-3">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-sm text-amber-700">Not verified — add above</span>
                  </div>
                )}
              </div>

              {saveError && <p className="text-xs text-red-500">{saveError}</p>}

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 h-10 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-sm font-bold rounded-xl disabled:opacity-40 transition-all"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> :
                  saved ? <><CheckCircle2 className="w-4 h-4" /> Saved!</> :
                  <><Save className="w-4 h-4" /> Save Changes</>}
              </button>
            </div>

          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="space-y-4">

            {/* Quick actions */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <h2 className="font-bold text-gray-900 text-sm">Quick Actions</h2>
              </div>
              <div className="divide-y divide-gray-50">
                <Link href="/account/orders" className="flex items-center gap-3 px-4 py-3.5 hover:bg-orange-50 transition-colors group">
                  <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center shrink-0 group-hover:bg-orange-200 transition-colors">
                    <Package className="w-4 h-4 text-[#FF4500]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">My Orders</p>
                    <p className="text-xs text-gray-400">Track & manage orders</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#FF4500] transition-colors" />
                </Link>

                <Link href="/shop" className="flex items-center gap-3 px-4 py-3.5 hover:bg-orange-50 transition-colors group">
                  <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center shrink-0 group-hover:bg-orange-200 transition-colors">
                    <ShoppingBag className="w-4 h-4 text-[#FF4500]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">Browse Products</p>
                    <p className="text-xs text-gray-400">CCTV, NVR, networking & more</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#FF4500] transition-colors" />
                </Link>

                <Link href="/contact" className="flex items-center gap-3 px-4 py-3.5 hover:bg-orange-50 transition-colors group">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">Contact Support</p>
                    <p className="text-xs text-gray-400">Get help with your order</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#FF4500] transition-colors" />
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-red-50 transition-colors group text-left"
                >
                  <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                    <LogOut className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-red-500">Sign Out</p>
                    <p className="text-xs text-gray-400">Log out of your account</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Saved Address */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-[#FF4500]" /> Delivery Address
                </h2>
                {!editingAddress && (
                  <button
                    onClick={() => { setEditingAddress(true); setAddrError(''); }}
                    className="flex items-center gap-1 text-xs font-semibold text-[#FF4500] hover:underline"
                  >
                    <Edit2 className="w-3 h-3" /> {hasAddress ? 'Edit' : 'Add'}
                  </button>
                )}
              </div>

              {!editingAddress ? (
                hasAddress ? (
                  <div className="bg-gray-50 rounded-xl border border-gray-100 px-4 py-3 text-sm text-gray-700">
                    <p className="font-semibold text-gray-900">{address.line1}</p>
                    {address.line2 && <p className="text-gray-500 text-xs mt-0.5">{address.line2}</p>}
                    <p className="text-xs mt-0.5">{address.city}, {address.state} — {address.pincode}</p>
                    {addrSaved && (
                      <p className="text-[11px] text-green-600 font-semibold mt-2 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Saved!
                      </p>
                    )}
                    <p className="text-[11px] text-orange-500 font-semibold mt-2 flex items-center gap-1">
                      <ShoppingBag className="w-3 h-3" /> Auto-fills at checkout
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 py-5 text-center">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-gray-300" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-600">No saved address</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Add for faster checkout.</p>
                    </div>
                    <button
                      onClick={() => setEditingAddress(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs font-bold rounded-lg transition-all"
                    >
                      <MapPin className="w-3 h-3" /> Add Address
                    </button>
                  </div>
                )
              ) : (
                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 mb-1">Address Line 1 *</label>
                    <input type="text" value={address.line1} onChange={(e) => setAddress((p) => ({ ...p, line1: e.target.value }))} placeholder="House/Flat no., Street" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 mb-1">Line 2 (optional)</label>
                    <input type="text" value={address.line2} onChange={(e) => setAddress((p) => ({ ...p, line2: e.target.value }))} placeholder="Area, Landmark" className={inputCls} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 mb-1">City *</label>
                      <input type="text" value={address.city} onChange={(e) => setAddress((p) => ({ ...p, city: e.target.value }))} placeholder="Chennai" className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 mb-1">Pincode *</label>
                      <input type="text" inputMode="numeric" value={address.pincode} onChange={(e) => setAddress((p) => ({ ...p, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) }))} placeholder="600001" maxLength={6} className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 mb-1">State *</label>
                    <select value={address.state} onChange={(e) => setAddress((p) => ({ ...p, state: e.target.value }))} className={inputCls}>
                      <option value="">Select state</option>
                      {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  {addrError && <p className="text-xs text-red-500">{addrError}</p>}
                  <div className="flex gap-2 pt-1">
                    <button onClick={() => { setEditingAddress(false); setAddrError(''); }} className="flex-1 h-9 flex items-center justify-center gap-1 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-all">
                      <X className="w-3 h-3" /> Cancel
                    </button>
                    <button onClick={handleSaveAddress} disabled={addrSaving} className="flex-1 h-9 flex items-center justify-center gap-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs font-bold rounded-lg disabled:opacity-40 transition-all">
                      {addrSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><Save className="w-3 h-3" /> Save</>}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Security note */}
            <div className="flex items-center gap-2.5 bg-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-[#FF4500] shrink-0" />
              Your data is encrypted and never shared.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
