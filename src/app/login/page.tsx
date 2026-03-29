'use client';

import { useState, useEffect, Suspense } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, ArrowRight, ChevronLeft } from 'lucide-react';

type Method = 'email' | 'phone';
type Step = 'input' | 'otp';

export default function LoginPageWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-slate-500" />
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
    setStep('input');
    setOtp('');
    setError('');
  }, [method]);

  if (status === 'loading' || status === 'authenticated') {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-slate-500" />
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
      if (phone.replace(/\D/g, '').length !== 10) {
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
      if (!res.ok) { setError(data.error ?? 'Failed to send code'); return; }
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
        setError('Invalid or expired code.');
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

  const destination = method === 'email'
    ? email
    : `+91 ${phone.replace(/\D/g, '').replace(/(\d{5})(\d{5})/, '$1 $2')}`;

  return (
    <div className="min-h-screen bg-[#020617] flex">

      {/* ── Left brand panel (desktop only) ─────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[520px] flex-col justify-between p-12 relative overflow-hidden bg-[#0a0f1e] border-r border-white/[0.06]">

        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(37,99,235,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(234,88,12,0.06),transparent_60%)]" />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '48px 48px' }}
        />

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-white">Infy<span className="text-[#2563eb]">Smart</span></span>
          </Link>
        </div>

        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white leading-tight tracking-tight">
              India&apos;s trusted<br />security infrastructure<br />partner.
            </h2>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed max-w-xs">
              CCTV, access control, networking — enterprise-grade solutions for factories, institutions, and commercial projects.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Pan-India delivery', detail: 'Hosur-based warehouse, insured dispatch' },
              { label: 'GST invoicing', detail: 'Instant digital invoice with every order' },
              { label: 'Manufacturer warranty', detail: 'Hikvision, Dahua, CP Plus, Matrix' },
            ].map(({ label, detail }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#2563eb] flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Infysmart Technologies
          </p>
        </div>
      </div>

      {/* ── Right form panel ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-[380px]">

          {/* Mobile logo */}
          <div className="lg:hidden mb-10 text-center">
            <Link href="/" className="text-xl font-black tracking-tight text-white">
              Infy<span className="text-[#2563eb]">Smart</span>
            </Link>
          </div>

          {step === 'input' ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-white tracking-tight">Sign in</h1>
                <p className="mt-1.5 text-sm text-slate-500">
                  New here? An account is created automatically.
                </p>
              </div>

              {/* Google */}
              <button
                onClick={() => { setLoading(true); signIn('google', { callbackUrl }); }}
                disabled={loading}
                className="w-full h-11 flex items-center justify-center gap-3 bg-white text-[#111] text-sm font-semibold rounded-lg hover:bg-slate-100 disabled:opacity-50 transition-colors"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-white/[0.08]" />
                <span className="text-xs text-slate-600 uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-white/[0.08]" />
              </div>

              {/* Method tabs */}
              <div className="flex gap-5 mb-5 border-b border-white/[0.06]">
                {(['email', 'phone'] as Method[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                      method === m
                        ? 'text-white border-[#2563eb]'
                        : 'text-slate-500 border-transparent hover:text-slate-300'
                    }`}
                  >
                    {m === 'email' ? 'Email' : 'Mobile'}
                  </button>
                ))}
              </div>

              {/* Input */}
              {method === 'email' ? (
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wide">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendOTP()}
                    placeholder="you@company.com"
                    autoComplete="email"
                    autoFocus
                    className="w-full h-11 bg-white/[0.04] border border-white/[0.1] text-white placeholder:text-slate-600 rounded-lg px-4 text-sm focus:outline-none focus:border-[#2563eb] focus:bg-white/[0.06] transition-all"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wide">
                    Mobile number
                  </label>
                  <div className="flex">
                    <div className="h-11 flex items-center px-3.5 bg-white/[0.04] border border-r-0 border-white/[0.1] rounded-l-lg text-sm text-slate-400 font-medium">
                      +91
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); setError(''); }}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendOTP()}
                      placeholder="98765 43210"
                      autoComplete="tel"
                      autoFocus
                      maxLength={10}
                      className="flex-1 h-11 bg-white/[0.04] border border-white/[0.1] text-white placeholder:text-slate-600 rounded-r-lg px-4 text-sm focus:outline-none focus:border-[#2563eb] focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                </div>
              )}

              {error && (
                <p className="mt-3 text-xs text-red-400">{error}</p>
              )}

              <button
                onClick={handleSendOTP}
                disabled={loading}
                className="mt-4 w-full h-11 flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-semibold rounded-lg disabled:opacity-50 transition-colors"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>Continue <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </>
          ) : (
            <>
              {/* OTP step header */}
              <button
                onClick={() => { setStep('input'); setOtp(''); setError(''); }}
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-8"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>

              <div className="mb-8">
                <h1 className="text-2xl font-bold text-white tracking-tight">Check your {method === 'email' ? 'inbox' : 'messages'}</h1>
                <p className="mt-1.5 text-sm text-slate-500">
                  We sent a 6-digit code to{' '}
                  <span className="text-slate-300 font-medium">{destination}</span>
                </p>
              </div>

              {/* OTP input — 6 individual boxes */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wide">
                  Verification code
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={otp}
                  onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); setError(''); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerifyOTP()}
                  autoComplete="one-time-code"
                  maxLength={6}
                  autoFocus
                  className="w-full h-14 bg-white/[0.04] border border-white/[0.1] text-white rounded-lg px-4 text-2xl font-bold tracking-[0.6em] text-center focus:outline-none focus:border-[#2563eb] focus:bg-white/[0.06] transition-all placeholder:tracking-normal placeholder:text-slate-700 placeholder:text-base"
                  placeholder="······"
                />
              </div>

              {error && (
                <p className="mt-3 text-xs text-red-400">{error}</p>
              )}

              <button
                onClick={handleVerifyOTP}
                disabled={loading || otp.length !== 6}
                className="mt-4 w-full h-11 flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-semibold rounded-lg disabled:opacity-40 transition-colors"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify & sign in'}
              </button>

              <div className="mt-5 text-center">
                {countdown > 0 ? (
                  <p className="text-xs text-slate-600">Resend code in {countdown}s</p>
                ) : (
                  <button
                    onClick={handleSendOTP}
                    disabled={loading}
                    className="text-xs text-slate-500 hover:text-slate-300 transition-colors underline underline-offset-2"
                  >
                    Resend code
                  </button>
                )}
              </div>
            </>
          )}

          {/* Footer */}
          <p className="mt-10 text-center text-xs text-slate-700">
            By continuing you agree to our{' '}
            <Link href="/terms" className="text-slate-500 hover:text-slate-300 transition-colors">Terms</Link>
            {' '}and{' '}
            <Link href="/refund-policy" className="text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
