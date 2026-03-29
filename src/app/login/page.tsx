'use client';

import { useState, useEffect, Suspense } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Phone, ArrowRight, Loader2, ShieldCheck, RotateCcw } from 'lucide-react';

type LoginMethod = 'email' | 'phone';
type Step = 'input' | 'otp';

export default function LoginPageWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
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

  const [method, setMethod] = useState<LoginMethod>('email');
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
    setStep('input');
    setOtp('');
    setError('');
  }, [method]);

  if (status === 'loading' || status === 'authenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <Loader2 className="w-6 h-6 animate-spin text-brand-blue" />
      </div>
    );
  }

  const handleSendOTP = async () => {
    setError('');
    if (method === 'email') {
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Enter a valid email address');
        return;
      }
    } else {
      const cleaned = phone.replace(/\D/g, '');
      if (cleaned.length !== 10) {
        setError('Enter a valid 10-digit mobile number');
        return;
      }
    }

    setLoading(true);
    try {
      const endpoint = method === 'email' ? '/api/auth/send-otp' : '/api/auth/send-sms-otp';
      const body = method === 'email'
        ? { email: email.trim().toLowerCase() }
        : { phone: phone.replace(/\D/g, '') };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) { setError(data.error ?? 'Failed to send OTP'); return; }
      setStep('otp');
      setCountdown(60);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
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
      if (result?.error) {
        setError('Invalid or expired code. Please try again.');
        setOtp('');
      } else {
        router.replace(callbackUrl);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const maskedTarget = method === 'email'
    ? email
    : `+91 ${phone.replace(/\D/g, '').replace(/(\d{5})(\d{5})/, '$1 $2')}`;

  const inputBase = 'w-full bg-slate-800/60 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors';

  return (
    <main className="min-h-screen bg-[#020617] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-2xl font-extrabold text-white">
            Infy<span className="text-brand-blue">Smart</span>
          </Link>
          <p className="mt-2 text-slate-400 text-sm">Sign in or create your account</p>
        </div>

        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 shadow-xl p-8 space-y-6">

          {/* Google */}
          <button
            onClick={() => { setLoading(true); signIn('google', { callbackUrl }); }}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border-2 border-slate-700 rounded-xl text-slate-200 font-semibold text-sm hover:border-slate-600 hover:bg-slate-800 transition-all disabled:opacity-60"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-slate-700" />
            <span className="text-xs text-slate-500 font-medium">OR</span>
            <div className="flex-1 border-t border-slate-700" />
          </div>

          {/* Method toggle */}
          <div className="flex rounded-xl border border-slate-700 p-1 gap-1 bg-slate-800/40">
            {(['email', 'phone'] as LoginMethod[]).map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  method === m
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {m === 'email' ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                {m === 'email' ? 'Email OTP' : 'Mobile OTP'}
              </button>
            ))}
          </div>

          {/* Input step */}
          {step === 'input' ? (
            <div className="space-y-4">
              {method === 'email' ? (
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(''); }}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendOTP()}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className={`${inputBase} pl-10`}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1.5">Mobile Number</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">+91</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); setError(''); }}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendOTP()}
                      placeholder="9876543210"
                      autoComplete="tel"
                      maxLength={10}
                      className={`${inputBase} pl-12`}
                    />
                  </div>
                </div>
              )}

              {error && <p className="text-xs text-red-400">{error}</p>}

              <button
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-blue text-white font-bold rounded-xl hover:bg-blue-600 disabled:opacity-60 transition-colors"
              >
                {loading
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : <><span>Send OTP</span><ArrowRight className="w-4 h-4" /></>}
              </button>
            </div>
          ) : (
            /* OTP step */
            <div className="space-y-4">
              <div className={`rounded-xl p-3 text-sm ${method === 'email' ? 'bg-blue-500/10 border border-blue-500/30 text-blue-300' : 'bg-green-500/10 border border-green-500/30 text-green-300'}`}>
                {method === 'email' ? '📧' : '📱'} Code sent to <strong>{maskedTarget}</strong>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">6-Digit Code</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={otp}
                  onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); setError(''); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerifyOTP()}
                  placeholder="_ _ _ _ _ _"
                  autoComplete="one-time-code"
                  maxLength={6}
                  autoFocus
                  className="w-full bg-slate-800/60 border border-slate-700 text-white placeholder:text-slate-600 rounded-xl px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors"
                />
              </div>

              {error && <p className="text-xs text-red-400">{error}</p>}

              <button
                onClick={handleVerifyOTP}
                disabled={loading || otp.length !== 6}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-blue text-white font-bold rounded-xl hover:bg-blue-600 disabled:opacity-60 transition-colors"
              >
                {loading
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : <><ShieldCheck className="w-4 h-4" /><span>Verify &amp; Sign In</span></>}
              </button>

              <div className="flex items-center justify-between text-sm">
                <button
                  onClick={() => { setStep('input'); setOtp(''); setError(''); }}
                  className="text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" /> Change {method === 'email' ? 'email' : 'number'}
                </button>
                {countdown > 0
                  ? <span className="text-slate-500">Resend in {countdown}s</span>
                  : <button onClick={handleSendOTP} disabled={loading} className="text-brand-blue hover:underline font-semibold">Resend code</button>}
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          By signing in you agree to our{' '}
          <Link href="/terms" className="underline hover:text-brand-blue">Terms</Link> and{' '}
          <Link href="/refund-policy" className="underline hover:text-brand-blue">Privacy Policy</Link>.
        </p>
      </div>
    </main>
  );
}
