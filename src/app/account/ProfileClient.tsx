'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Phone, Mail, Save, Loader2, CheckCircle2,
  AlertTriangle, ArrowRight, User, ShieldCheck,
  MapPin, ChevronLeft, Package, Edit2, X, Lock
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

  // Address state
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
              <p className="text-sm font-bold text-gray-900">{name || 'My Profile'}</p>
              <p className="text-xs text-gray-400">{sessionEmail}</p>
            </div>
          </div>
          <Link
            href="/account/orders"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#FF4500] transition-colors"
          >
            <Package className="w-3.5 h-3.5" /> My Orders <ChevronLeft className="w-3 h-3 rotate-180" />
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="max-w-xl space-y-5">

          {/* Setup phone prompt */}
          {setupPhone && !customer?.phone && (
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700">Please verify your mobile number to proceed to checkout.</p>
            </div>
          )}

          {/* Phone verification card */}
          {!customer?.phone && (
            <div className="bg-white rounded-2xl border border-amber-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Phone className="w-4 h-4 text-amber-500" />
                <h2 className="font-bold text-gray-900 text-sm">Verify Mobile Number</h2>
              </div>
              <p className="text-xs text-gray-500 mb-5">
                Required to place orders. Used for delivery updates and order tracking.
              </p>

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

          {/* Profile card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5">
            <h2 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-[#FF4500]" /> Profile Information
            </h2>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className={inputCls}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={sessionEmail}
                  readOnly
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50 text-gray-500 cursor-not-allowed pr-10"
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
              </div>
              <p className="text-[11px] text-gray-400 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Mobile Number</label>
              {customer?.phone ? (
                <div className="flex items-center gap-2 h-11 bg-gray-50 border border-gray-200 rounded-lg px-3">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-sm text-gray-700 font-medium">+91 {customer.phone}</span>
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

          {/* Saved Address card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-[#FF4500]" /> Delivery Address
              </h2>
              {!editingAddress && (
                <button
                  onClick={() => { setEditingAddress(true); setAddrError(''); }}
                  className="flex items-center gap-1 text-xs font-semibold text-[#FF4500] hover:underline"
                >
                  <Edit2 className="w-3 h-3" /> {hasAddress ? 'Edit' : 'Add Address'}
                </button>
              )}
            </div>

            {!editingAddress ? (
              hasAddress ? (
                <div className="bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 space-y-0.5">
                  <p className="font-semibold">{address.line1}</p>
                  {address.line2 && <p className="text-gray-500">{address.line2}</p>}
                  <p>{address.city}, {address.state} — {address.pincode}</p>
                  <p className="text-xs text-gray-400">{address.country}</p>
                  <p className="text-[11px] text-green-600 font-semibold mt-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Auto-fills at checkout
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 py-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gray-300" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">No saved address</p>
                    <p className="text-xs text-gray-400 mt-0.5">Add your delivery address for faster checkout.</p>
                  </div>
                  <button
                    onClick={() => setEditingAddress(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs font-bold rounded-xl transition-all"
                  >
                    <MapPin className="w-3.5 h-3.5" /> Add Address
                  </button>
                </div>
              )
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Address Line 1 *</label>
                  <input
                    type="text"
                    value={address.line1}
                    onChange={(e) => setAddress((p) => ({ ...p, line1: e.target.value }))}
                    placeholder="House/Flat no., Street name"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Address Line 2</label>
                  <input
                    type="text"
                    value={address.line2}
                    onChange={(e) => setAddress((p) => ({ ...p, line2: e.target.value }))}
                    placeholder="Area, Landmark (optional)"
                    className={inputCls}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">City *</label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress((p) => ({ ...p, city: e.target.value }))}
                      placeholder="Chennai"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Pincode *</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={address.pincode}
                      onChange={(e) => setAddress((p) => ({ ...p, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) }))}
                      placeholder="600001"
                      maxLength={6}
                      className={inputCls}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">State *</label>
                  <select
                    value={address.state}
                    onChange={(e) => setAddress((p) => ({ ...p, state: e.target.value }))}
                    className={inputCls}
                  >
                    <option value="">Select state</option>
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {addrError && <p className="text-xs text-red-500">{addrError}</p>}

                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditingAddress(false); setAddrError(''); }}
                    className="flex-1 h-10 flex items-center justify-center gap-1.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-all"
                  >
                    <X className="w-3.5 h-3.5" /> Cancel
                  </button>
                  <button
                    onClick={handleSaveAddress}
                    disabled={addrSaving}
                    className="flex-1 h-10 flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-sm font-bold rounded-xl disabled:opacity-40 transition-all"
                  >
                    {addrSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-3.5 h-3.5" /> Save Address</>}
                  </button>
                </div>
              </div>
            )}

            {addrSaved && (
              <p className="mt-3 text-xs text-green-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Address saved successfully!
              </p>
            )}
          </div>

          {/* Security note */}
          <div className="flex items-center gap-2.5 bg-gray-100 rounded-xl px-4 py-3 text-xs text-gray-500">
            <ShieldCheck className="w-4 h-4 text-[#FF4500] shrink-0" />
            Your data is encrypted and never shared with third parties.
          </div>
        </div>
      </div>
    </main>
  );
}
