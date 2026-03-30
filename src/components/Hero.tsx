'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, ShoppingBag, Star, CheckCircle, Camera, Sun, Fingerprint, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  heroImage?: string;
}

const SERVICES = [
  { icon: Camera, label: 'CCTV Installation', href: '/cctv', color: 'text-blue-400' },
  { icon: Sun, label: 'Solar 4G Cameras', href: '/solar', color: 'text-yellow-400' },
  { icon: Fingerprint, label: 'Biometric Systems', href: '/services/biometric-systems', color: 'text-green-400' },
  { icon: Zap, label: 'Gate Automation', href: '/automation', color: 'text-purple-400' },
];

const STATS = [
  { value: '500+', label: 'Projects' },
  { value: '10+', label: 'Years' },
  { value: '38', label: 'Districts' },
  { value: '24/7', label: 'Support' },
];

const TRUST = [
  'TNPL & ACCET Empanelled',
  'GST & MSME Registered',
  'Hikvision & Dahua Authorized',
  'Free Site Survey',
];

export default function Hero({ heroImage }: HeroProps) {
  return (
    <section className="relative lg:min-h-[100svh] flex flex-col justify-center overflow-hidden bg-slate-950">

      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[140px] -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-500/8 rounded-full blur-[120px] translate-y-1/4 -translate-x-1/4" />
        {/* Subtle dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(148,163,184,0.04)_1px,transparent_1px)] [background-size:28px_28px]" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-14 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 lg:pb-16">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ─────────── LEFT COLUMN ─────────── */}
          <div>

            {/* Gov badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/25 bg-orange-500/8 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3 sm:mb-6"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              Govt-Approved Vendor · Tamil Nadu &amp; Karnataka
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' as const }}
              className="text-[1.7rem] sm:text-4xl lg:text-[2.65rem] xl:text-5xl font-extrabold text-white leading-[1.12] mb-3 sm:mb-5"
            >
              #1 CCTV &amp; Security
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-300 mt-1">
                System Installer
              </span>
              <span className="block text-slate-300 text-xl sm:text-2xl font-semibold mt-2">
                in Tamil Nadu &amp; Bangalore
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' as const }}
              className="text-slate-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 max-w-lg hidden sm:block lg:block"
            >
              Authorized <strong className="text-slate-200">Hikvision, Dahua &amp; CP Plus</strong> dealer.
              Full-stack CCTV, Solar 4G cameras, biometric access control &amp; gate automation for
              factories, government offices, apartments and campuses across{' '}
              <strong className="text-slate-200">Chennai, Hosur, Coimbatore &amp; Bangalore</strong>.
            </motion.p>

            {/* Trust checklist */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease: 'easeOut' as const }}
              className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-4 sm:mb-7"
            >
              {TRUST.map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-slate-400">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  {t}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.36, ease: 'easeOut' as const }}
              className="flex flex-wrap gap-2.5 mb-5 sm:mb-8"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-[#FF4500] text-white font-bold rounded-xl shadow-lg shadow-orange-700/25 hover:bg-orange-600 hover:shadow-orange-600/40 transition-all text-sm"
              >
                Get Free Site Survey
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-orange-400/30 hover:text-orange-300 transition-all text-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                Shop Now
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.44, ease: 'easeOut' as const }}
              className="flex gap-5 sm:gap-8 border-t border-slate-800/70 pt-4 sm:pt-6"
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="text-xl sm:text-2xl font-extrabold text-white">{s.value}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ─────────── RIGHT COLUMN ─────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' as const }}
            className="relative hidden lg:flex flex-col gap-4"
          >
            {/* Main image card */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl bg-slate-900 aspect-[16/10]">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt="CCTV Security Monitoring — Infysmart Tamil Nadu"
                  fill
                  className="object-cover opacity-60"
                  priority
                  sizes="(max-width: 1280px) 50vw, 640px"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 flex items-center justify-center">
                  <ShieldCheck size={120} strokeWidth={0.4} className="text-slate-700" />
                </div>
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

              {/* Scan line animation */}
              <motion.div
                initial={{ y: '0%' }}
                animate={{ y: ['0%', '100%', '0%'] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
                aria-hidden
              />

              {/* Bottom label */}
              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="text-[9px] text-slate-500 font-mono uppercase tracking-[0.2em]">Live Surveillance</p>
                  <p className="text-white font-bold text-sm">24/7 Active Monitoring</p>
                </div>
                <div className="flex items-center gap-1.5 bg-green-500/15 border border-green-500/30 rounded-full px-2.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-[10px] font-bold">LIVE</span>
                </div>
              </div>
            </div>

            {/* Stats pill row */}
            <div className="grid grid-cols-4 gap-3">
              {STATS.map((s) => (
                <div key={s.label} className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 text-center">
                  <p className="text-lg font-extrabold text-white">{s.value}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Floating trust badge */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.45 }}
              className="absolute -right-8 top-6 flex items-center gap-3 px-4 py-3 bg-slate-900/95 border border-slate-700/60 rounded-xl shadow-2xl backdrop-blur-sm w-52"
            >
              <div className="p-2 bg-orange-500/15 rounded-lg shrink-0">
                <ShieldCheck size={16} className="text-orange-400" />
              </div>
              <div>
                <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Compliance</p>
                <p className="text-white font-bold text-xs leading-tight">TNPL · ACCET Approved</p>
              </div>
            </motion.div>

            {/* Floating rating badge */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.85, duration: 0.45 }}
              className="absolute -left-8 bottom-24 flex items-center gap-3 px-4 py-3 bg-slate-900/95 border border-slate-700/60 rounded-xl shadow-2xl backdrop-blur-sm w-48"
            >
              <div className="p-2 bg-yellow-500/15 rounded-lg shrink-0">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
              </div>
              <div>
                <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Rating</p>
                <p className="text-white font-bold text-xs">4.9 / 5 · 200+ Reviews</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ─────────── SERVICE CHIPS ─────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.45 }}
          className="mt-5 sm:mt-10 lg:mt-12 pt-4 sm:pt-6 lg:pt-7 border-t border-slate-800/50"
        >
          <p className="text-[10px] text-slate-600 uppercase font-bold tracking-[0.2em] mb-4 text-center lg:text-left">
            Services We Provide
          </p>
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {SERVICES.map(({ icon: Icon, label, href, color }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 hover:bg-slate-800 border border-slate-700/40 hover:border-slate-600 rounded-full text-sm text-slate-300 hover:text-white transition-all"
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${color}`} />
                {label}
              </Link>
            ))}
            <Link
              href="/amc"
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 hover:bg-slate-800 border border-slate-700/40 hover:border-slate-600 rounded-full text-sm text-slate-300 hover:text-white transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-blue-400" />
              CCTV AMC
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
