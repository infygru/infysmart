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
    setStep('input'); setOtp(''); setError('');
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

  const inputCls = 'w-full h-11 bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-zinc-600 rounded-lg px-4 text-sm focus:outline-none focus:border-[#16a34a] focus:bg-white/[0.06] transition-all';

  return (
    <div className="min-h-screen flex bg-[#080c08]">

      {/* ── Left brand panel ─────────────────────────── */}
      <div className="hidden lg:flex lg:w-[460px] xl:w-[500px] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0a120a 0%, #0f1f0f 40%, #0d1a0d 100%)' }}>

        {/* Subtle green glow */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #16a34a 0%, transparent 70%)', transform: 'translate(-40%, -40%)' }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #ea580c 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative z-10">
          <Link href="/" className="inline-block">
            <span className="text-xl font-black tracking-tight text-white">Infy<span className="text-[#16a34a]">Smart</span></span>
          </Link>
        </div>

        <div className="relative z-10 space-y-10">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-[#16a34a] uppercase mb-4">Security Infrastructure</p>
            <h2 className="text-[2rem] font-bold text-white leading-snug tracking-tight">
              Trusted by factories,<br />institutions &amp;<br />commercial projects.
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { n: '500+', label: 'Projects delivered across Tamil Nadu &amp; Karnataka' },
              { n: '3–7', label: 'Days pan-India delivery with insured dispatch' },
              { n: '100%', label: 'Manufacturer warranty on all products' },
            ].map(({ n, label }) => (
              <div key={n} className="flex items-baseline gap-4">
                <span className="text-2xl font-black text-white flex-shrink-0 w-16">{n}</span>
                <span className="text-sm text-zinc-400 leading-snug" dangerouslySetInnerHTML={{ __html: label }} />
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-xs text-zinc-700">
          © {new Date().getFullYear()} Infysmart Technologies, Hosur
        </div>
      </div>

      {/* ── Right form panel ─────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-[#0c0c0c]">
        <div className="w-full max-w-[360px]">

          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <Link href="/" className="text-xl font-black tracking-tight text-white">
              Infy<span className="text-[#16a34a]">Smart</span>
            </Link>
          </div>

          {step === 'input' ? (
            <>
              <div className="mb-8">
                <h1 className="text-[1.6rem] font-bold text-white tracking-tight">Sign in</h1>
                <p className="mt-1.5 text-sm text-zinc-500">No password needed. We&apos;ll send you a code.</p>
              </div>

              {/* Google */}
              <button
                onClick={() => { setLoading(true); signIn('google', { callbackUrl }); }}
                disabled={loading}
                className="w-full h-11 flex items-center justify-center gap-3 bg-white text-zinc-900 text-sm font-semibold rounded-lg hover:bg-zinc-100 disabled:opacity-50 transition-colors"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-white/[0.06]" />
                <span className="text-xs text-zinc-700 uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>

              {/* Method tabs */}
              <div className="flex gap-6 mb-6 border-b border-white/[0.06]">
                {(['email', 'phone'] as Method[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                      method === m
                        ? 'text-white border-[#16a34a]'
                        : 'text-zinc-600 border-transparent hover:text-zinc-300'
                    }`}
                  >
                    {m === 'email' ? 'Email' : 'Mobile'}
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
                    <span className="h-11 flex items-center px-3.5 bg-white/[0.04] border border-r-0 border-white/[0.08] rounded-l-lg text-sm text-zinc-500 font-medium select-none">
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
                      className="flex-1 h-11 bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-zinc-600 rounded-r-lg px-4 text-sm focus:outline-none focus:border-[#16a34a] focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                </div>
              )}

              {error && <p className="mt-3 text-xs text-amber-500">{error}</p>}

              <button
                onClick={handleSendOTP}
                disabled={loading}
                className="mt-5 w-full h-11 flex items-center justify-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white text-sm font-semibold rounded-lg disabled:opacity-40 transition-colors"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Continue <ArrowRight className="w-3.5 h-3.5" /></>}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { setStep('input'); setOtp(''); setError(''); }}
                className="flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-300 transition-colors mb-8"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>

              <div className="mb-8">
                <h1 className="text-[1.6rem] font-bold text-white tracking-tight">
                  Check your {method === 'email' ? 'inbox' : 'messages'}
                </h1>
                <p className="mt-1.5 text-sm text-zinc-500">
                  Code sent to <span className="text-zinc-200 font-medium">{destination}</span>
                </p>
              </div>

              <div>
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
                  placeholder="——————"
                  className="w-full h-14 bg-white/[0.04] border border-white/[0.08] text-white rounded-lg px-4 text-2xl font-bold tracking-[0.5em] text-center focus:outline-none focus:border-[#16a34a] focus:bg-white/[0.06] transition-all placeholder:tracking-normal placeholder:text-zinc-700 placeholder:text-base"
                />
              </div>

              {error && <p className="mt-3 text-xs text-amber-500">{error}</p>}

              <button
                onClick={handleVerifyOTP}
                disabled={loading || otp.length !== 6}
                className="mt-5 w-full h-11 flex items-center justify-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white text-sm font-semibold rounded-lg disabled:opacity-40 transition-colors"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify &amp; sign in'}
              </button>

              <div className="mt-5 text-center">
                {countdown > 0
                  ? <p className="text-xs text-zinc-700">Resend in {countdown}s</p>
                  : <button onClick={handleSendOTP} disabled={loading} className="text-xs text-zinc-600 hover:text-zinc-300 underline underline-offset-2 transition-colors">Resend code</button>
                }
              </div>
            </>
          )}

          <p className="mt-10 text-center text-xs text-zinc-800">
            By continuing you agree to our{' '}
            <Link href="/terms" className="text-zinc-600 hover:text-zinc-400 transition-colors">Terms</Link>
            {' '}&amp;{' '}
            <Link href="/refund-policy" className="text-zinc-600 hover:text-zinc-400 transition-colors">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
