'use client';

import { useState, useEffect, Suspense } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, ArrowRight, ChevronLeft, ShieldCheck, Truck, Star } from 'lucide-react';

type Method = 'email' | 'phone';
type Step = 'input' | 'otp';

export default function LoginPageWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-zinc-500" />
      </div>
    }>
      <LoginPage />
    </Suspense>
  );
}

function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/account';

  const [method, setMethod] = useState<Method>('email');
  const [step, setStep] = useState<Step>('input');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (status === 'authenticated') router.replace(callbackUrl);
  }, [status, router, callbackUrl]);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  useEffect(() => {
    setStep('input'); setOtp(''); setError('');
  }, [method]);

  if (status === 'loading' || status === 'authenticated') {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-zinc-500" />
      </div>
    );
  }

  const handleSendOTP = async () => {
    setError('');
    if (method === 'email') {
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Enter a valid email address'); return;
      }
    } else {
      if (phone.replace(/\D/g, '').length !== 10) {
        setError('Enter a valid 10-digit mobile number'); return;
      }
    }
    setLoading(true);
    try {
      const endpoint = method === 'email' ? '/api/auth/send-otp' : '/api/auth/send-sms-otp';
      const body = method === 'email'
        ? { email: email.trim().toLowerCase() }
        : { phone: phone.replace(/\D/g, '') };
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json() as { error?: string };
      if (!res.ok) { setError(data.error ?? 'Failed to send code'); return; }
      setStep('otp');
      setCountdown(60);
    } catch { setError('Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleVerifyOTP = async () => {
    setError('');
    if (otp.length !== 6) { setError('Enter the 6-digit code'); return; }
    setLoading(true);
    try {
      const provider = method === 'email' ? 'email-otp' : 'phone-otp';
      const credentials = method === 'email'
        ? { email: email.trim().toLowerCase(), otp }
        : { phone: phone.replace(/\D/g, ''), otp };
      const result = await signIn(provider, { ...credentials, redirect: false });
      if (result?.error) { setError('Invalid or expired code.'); setOtp(''); }
      else router.replace(callbackUrl);
    } catch { setError('Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  };

  const destination = method === 'email'
    ? email
    : `+91 ${phone.replace(/\D/g, '').replace(/(\d{5})(\d{5})/, '$1 $2')}`;

  const inputCls = 'w-full h-11 bg-zinc-800/60 border border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl px-4 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all';

  return (
    <div className="min-h-screen flex bg-zinc-950 relative overflow-hidden">

      {/* ── Ambient background orbs ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-orange-500/8 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-amber-500/6 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      {/* ── Left brand panel (desktop) ── */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[520px] flex-col justify-between p-14 relative z-10 border-r border-zinc-800/50">
        <Link href="/" className="inline-block">
          <Image src="/infysmart.webp" alt="Infysmart" width={140} height={40} className="h-10 w-auto object-contain" />
        </Link>

        <div className="space-y-10">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] text-orange-400 uppercase mb-5 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              Govt-Approved Vendor
            </span>
            <h2 className="text-3xl font-extrabold text-white leading-snug tracking-tight">
              India&apos;s trusted<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                security equipment
              </span><br />
              store.
            </h2>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed max-w-xs">
              Authorized Hikvision, Dahua & CP Plus dealer. GST invoices for all orders.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: ShieldCheck, value: '500+', label: 'Projects' },
              { icon: Truck, value: '3–7d', label: 'Delivery' },
              { icon: Star, value: '4.9★', label: 'Rating' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 text-center">
                <Icon className="w-4 h-4 text-orange-400 mx-auto mb-2" />
                <p className="text-white font-extrabold text-base">{value}</p>
                <p className="text-zinc-500 text-[10px] mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2.5">
            {['CCTV Cameras & NVR/DVR Systems', 'PoE Switches & Networking Gear', 'Access Control & Biometrics', 'Pan-India delivery with warranty'].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm text-zinc-400">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-zinc-700">© {new Date().getFullYear()} Infysmart Technologies, Hosur</p>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-[380px]">

          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-10">
            <Link href="/">
              <Image src="/infysmart.webp" alt="Infysmart" width={120} height={36} className="h-9 w-auto object-contain" />
            </Link>
          </div>

          {step === 'input' ? (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-white tracking-tight">Sign in to your account</h1>
                <p className="mt-1.5 text-sm text-zinc-400">No password needed — we&apos;ll send you a code.</p>
              </div>

              {/* Google */}
              <button
                onClick={() => { setLoading(true); signIn('google', { callbackUrl }); }}
                disabled={loading}
                className="w-full h-11 flex items-center justify-center gap-3 bg-white text-zinc-900 text-sm font-semibold rounded-xl hover:bg-zinc-100 disabled:opacity-50 transition-colors border border-zinc-200"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <div className="my-5 flex items-center gap-3">
                <div className="flex-1 h-px bg-zinc-800" />
                <span className="text-[11px] text-zinc-600 uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-zinc-800" />
              </div>

              {/* Method tabs */}
              <div className="flex gap-1 mb-5 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
                {(['email', 'phone'] as Method[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                      method === m
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {m === 'email' ? '✉ Email' : '📱 Mobile'}
                  </button>
                ))}
              </div>

              {method === 'email' ? (
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-500 mb-2 uppercase tracking-widest">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendOTP()}
                    placeholder="you@company.com"
                    autoComplete="email"
                    autoFocus
                    className={inputCls}
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-500 mb-2 uppercase tracking-widest">Mobile number</label>
                  <div className="flex">
                    <span className="h-11 flex items-center px-3.5 bg-zinc-800/60 border border-r-0 border-zinc-700 rounded-l-xl text-sm text-zinc-400 font-medium select-none">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); setError(''); }}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendOTP()}
                      placeholder="98765 43210"
                      autoComplete="tel"
                      autoFocus
                      maxLength={10}
                      className="flex-1 h-11 bg-zinc-800/60 border border-zinc-700 text-white placeholder:text-zinc-500 rounded-r-xl px-4 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all"
                    />
                  </div>
                </div>
              )}

              {error && <p className="mt-2.5 text-xs text-red-400">{error}</p>}

              <button
                onClick={handleSendOTP}
                disabled={loading}
                className="mt-4 w-full h-11 flex items-center justify-center gap-2 bg-[#FF4500] hover:bg-orange-600 text-white text-sm font-bold rounded-xl disabled:opacity-40 transition-colors shadow-lg shadow-orange-900/30"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Get Code <ArrowRight className="w-3.5 h-3.5" /></>}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { setStep('input'); setOtp(''); setError(''); }}
                className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-200 transition-colors mb-8"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>

              <div className="mb-7">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Check your {method === 'email' ? 'inbox' : 'messages'}
                </h1>
                <p className="mt-1.5 text-sm text-zinc-400">
                  We sent a 6-digit code to{' '}
                  <span className="text-zinc-200 font-semibold">{destination}</span>
                </p>
              </div>

              <label className="block text-[11px] font-semibold text-zinc-500 mb-2 uppercase tracking-widest">Verification code</label>
              <input
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); setError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && handleVerifyOTP()}
                autoComplete="one-time-code"
                maxLength={6}
                autoFocus
                placeholder="• • • • • •"
                className="w-full h-14 bg-zinc-800/60 border border-zinc-700 text-white rounded-xl px-4 text-2xl font-bold tracking-[0.5em] text-center focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all placeholder:tracking-normal placeholder:text-zinc-700 placeholder:text-base"
              />

              {error && <p className="mt-2.5 text-xs text-red-400">{error}</p>}

              <button
                onClick={handleVerifyOTP}
                disabled={loading || otp.length !== 6}
                className="mt-4 w-full h-11 flex items-center justify-center gap-2 bg-[#FF4500] hover:bg-orange-600 text-white text-sm font-bold rounded-xl disabled:opacity-40 transition-colors shadow-lg shadow-orange-900/30"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify & Sign in'}
              </button>

              <div className="mt-5 text-center">
                {countdown > 0
                  ? <p className="text-xs text-zinc-600">Resend in {countdown}s</p>
                  : <button onClick={handleSendOTP} disabled={loading} className="text-xs text-zinc-500 hover:text-zinc-200 underline underline-offset-2 transition-colors">Resend code</button>
                }
              </div>
            </>
          )}

          <p className="mt-8 text-center text-xs text-zinc-700">
            By continuing you agree to our{' '}
            <Link href="/terms" className="text-zinc-500 hover:text-zinc-400 transition-colors underline underline-offset-2">Terms</Link>
            {' & '}
            <Link href="/refund-policy" className="text-zinc-500 hover:text-zinc-400 transition-colors underline underline-offset-2">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
