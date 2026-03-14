'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, ShieldCheck, Zap, Server,
  Camera, Sun, Fingerprint, Bell, CheckCircle, Building2, Phone
} from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  heroImage?: string;
}

const services = [
  { label: 'CCTV Installation', href: '/cctv', icon: Camera },
  { label: 'Solar 4G Cameras', href: '/solar', icon: Sun },
  { label: 'Biometric Systems', href: '/services/biometric-systems', icon: Fingerprint },
  { label: 'Video Door Phones', href: '/services/video-door-phones', icon: Bell },
  { label: 'Gate Automation', href: '/automation', icon: Building2 },
  { label: 'CCTV AMC', href: '/amc', icon: ShieldCheck },
];

const stats = [
  { value: '500+', label: 'Projects Done' },
  { value: '8+', label: 'Cities Served' },
  { value: '10+', label: 'Years Experience' },
  { value: '24/7', label: 'AMC Support' },
];

const trustPoints = [
  'TNPL & ACCET Empanelled',
  'GST & MSME Registered',
  'Hikvision & Dahua Authorized',
  'Free Site Survey',
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' as const },
});

export default function Hero({ heroImage }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-950">

      {/* Static background — no animated opacity (avoids hydration mismatch) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-blue-600/8 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-orange-500/6 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:28px_28px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 pt-28 pb-12">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">

          {/* ── LEFT ── */}
          <div className="max-w-xl">

            {/* Badge */}
            <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-widest mb-5">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              Govt‑Approved · Tamil Nadu &amp; Karnataka
            </motion.div>

            {/* H1 */}
            <motion.h1 {...fadeUp(0.2)} className="text-[2rem] sm:text-4xl lg:text-[2.6rem] xl:text-5xl font-extrabold text-white leading-[1.1] mb-4">
              Best CCTV &amp; Security
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-300">
                System Installer
              </span>
              <span className="block text-slate-300 text-xl sm:text-2xl lg:text-[1.6rem] font-semibold mt-1">
                in Tamil Nadu &amp; Bangalore
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p {...fadeUp(0.3)} className="text-slate-400 text-sm sm:text-base leading-relaxed mb-5 max-w-lg">
              Authorized <strong className="text-slate-200">Hikvision, Dahua &amp; CP Plus</strong> dealer
              offering end‑to‑end <strong className="text-slate-200">CCTV, Solar 4G cameras,
              biometric access control &amp; gate automation</strong> for factories, government
              offices, apartments &amp; campuses across{' '}
              <strong className="text-slate-200">Chennai, Hosur, Coimbatore &amp; Bangalore</strong>.
            </motion.p>

            {/* Trust points */}
            <motion.div {...fadeUp(0.38)} className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-400 mb-7">
              {trustPoints.map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  {item}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div {...fadeUp(0.46)} className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-[#FF4500] text-white font-bold rounded-lg shadow-lg shadow-orange-600/25 hover:bg-orange-600 hover:shadow-orange-500/40 transition-all text-sm"
              >
                Get Free Site Survey
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href="tel:+919445675619"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-700 text-white font-semibold rounded-lg hover:bg-slate-800 hover:border-slate-500 transition-all text-sm"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-800 text-slate-400 font-semibold rounded-lg hover:bg-slate-800/60 hover:text-white transition-all text-sm"
              >
                View Projects
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div {...fadeUp(0.54)} className="grid grid-cols-4 gap-3 border-t border-slate-800/70 pt-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-xl sm:text-2xl font-extrabold text-white">{s.value}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: visual ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="relative hidden lg:block h-[540px]"
          >
            {/* Main card */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl bg-slate-900">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt="CCTV Security Monitoring — Infysmart Tamil Nadu"
                  fill
                  className="object-cover opacity-70"
                  priority
                  sizes="(max-width: 1280px) 50vw, 620px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <ShieldCheck size={180} strokeWidth={0.3} className="text-slate-700" />
                </div>
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Corner label */}
              <div className="absolute bottom-5 left-5">
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Live Monitoring</p>
                <p className="text-white font-bold text-base">24/7 Surveillance Active</p>
              </div>

              {/* Scan line */}
              <motion.div
                initial={{ y: '0%' }}
                animate={{ y: ['0%', '100%', '0%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/25 to-transparent"
                aria-hidden
              />
            </div>

            {/* Floating pill: Security */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="absolute -left-12 top-12 flex items-center gap-3 px-4 py-3 bg-slate-900/95 border border-slate-700 rounded-xl shadow-xl w-56 backdrop-blur-sm"
            >
              <div className="p-2 bg-orange-500/15 rounded-lg shrink-0">
                <ShieldCheck size={18} className="text-orange-400" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Security Status</p>
                <p className="text-white font-bold text-sm">All Systems Active</p>
              </div>
            </motion.div>

            {/* Floating pill: Solar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              className="absolute -right-10 top-[40%] flex items-center gap-3 px-4 py-3 bg-slate-900/95 border border-slate-700 rounded-xl shadow-xl w-56 backdrop-blur-sm"
            >
              <div className="p-2 bg-green-500/15 rounded-lg shrink-0">
                <Zap size={18} className="text-green-400" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Solar 4G CCTV</p>
                <p className="text-white font-bold text-sm">100% Off-Grid Ready</p>
              </div>
            </motion.div>

            {/* Floating pill: uptime */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="absolute left-6 -bottom-4 flex items-center gap-2.5 px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl shadow-xl backdrop-blur-sm"
            >
              <Server size={16} className="text-blue-400 shrink-0" />
              <span className="text-slate-300 text-sm font-semibold">Network Uptime: 99.9%</span>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Service chips ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="mt-14 pt-7 border-t border-slate-800/60"
        >
          <p className="text-[10px] text-slate-600 uppercase font-bold tracking-[0.18em] mb-4 text-center">
            Our Security &amp; Technology Solutions
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {services.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full text-sm text-slate-300 hover:text-white hover:border-brand-blue hover:bg-slate-800 transition-all"
              >
                <Icon className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                {label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
