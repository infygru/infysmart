'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Phone, Mail, Save, Loader2, CheckCircle2,
  AlertTriangle, ArrowRight, User, ShieldCheck
} from 'lucide-react';
import type { Customer } from '@/lib/directus';
import AccountNav from './AccountNav';

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

  const inputCls = 'w-full text-sm bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#FF4500] focus:ring-1 focus:ring-orange-100 transition-all';

  return (
    <main className="min-h-screen bg-gray-50">
      <AccountNav name={customer?.name ?? sessionName} email={sessionEmail} />

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
                    <span className="h-11 flex items-center px-3.5 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg text-sm text-gray-500 font-medium select-none">+91</span>
                    <input
                      type="tel"
                      value={verifyPhone}
                      onChange={(e) => { setVerifyPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); setVerifyError(''); }}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendOTP()}
                      placeholder="98765 43210"
                      maxLength={10}
                      className="flex-1 h-11 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-r-lg px-3 text-sm focus:outline-none focus:border-[#FF4500] focus:ring-1 focus:ring-orange-100 transition-all"
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
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
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
