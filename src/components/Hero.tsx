'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, ShieldCheck, Zap, Server,
  Camera, Sun, Fingerprint, Bell, CheckCircle, Building2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

interface HeroProps {
  heroImage?: string;
}

const services = [
  { label: 'CCTV Installation', href: '/cctv', icon: Camera },
  { label: 'Solar 4G Cameras', href: '/solar', icon: Sun },
  { label: 'Biometric Access Control', href: '/services/biometric-systems', icon: Fingerprint },
  { label: 'Video Door Phones', href: '/services/video-door-phones', icon: Bell },
  { label: 'Building Automation', href: '/automation', icon: Building2 },
  { label: 'CCTV AMC Services', href: '/amc', icon: ShieldCheck },
];

const stats = [
  { to: 500, suffix: '+', label: 'Projects Delivered' },
  { to: 8, suffix: '+', label: 'Cities Served' },
  { to: 10, suffix: '+', label: 'Years Experience' },
  { to: 99.9, suffix: '%', label: 'Uptime SLA' },
];

const trustPoints = [
  'TNPL & ACCET Empanelled',
  'GST & MSME Registered',
  'BIS Certified Equipment',
  'Free Site Survey',
];

// Animated counter component
function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const controls = animate(0, to, {
      duration: 2,
      delay: 0.9,
      ease: 'easeOut',
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = (to % 1 === 0 ? Math.round(value) : value.toFixed(1)) + suffix;
        }
      },
    });
    return controls.stop;
  }, [to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

// Variants
const h1Container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.28 } },
};
const h1Line = {
  hidden: { opacity: 0, y: 22, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.65, ease: 'easeOut' as const } },
};
const trustContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.55 } },
};
const trustItem = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};
const chipContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 1.1 } },
};
const chipItem = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: 'backOut' as const } },
};

export default function Hero({ heroImage }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-950">

      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.1, 0.16, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 right-0 w-[900px] h-[900px] bg-blue-600/10 rounded-full blur-[160px] -translate-y-1/3 translate-x-1/4"
        />
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-orange-500/10 rounded-full blur-[130px] translate-y-1/4 -translate-x-1/4"
        />
        {/* Dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-28 pb-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* ─── LEFT CONTENT ─── */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-widest mb-5"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              Govt‑Approved Vendor · Tamil Nadu &amp; Karnataka
            </motion.div>

            {/* H1 — staggered lines */}
            <motion.h1
              variants={h1Container}
              initial="hidden"
              animate="show"
              className="text-3xl md:text-4xl lg:text-[2.6rem] xl:text-[3rem] font-extrabold text-white leading-[1.12] mb-4"
            >
              <motion.span variants={h1Line} className="block">
                Best CCTV Installation
              </motion.span>
              <motion.span variants={h1Line} className="block">
                &amp; Security Systems
              </motion.span>
              <motion.span variants={h1Line} className="block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-300">
                  in Tamil Nadu &amp; Bangalore
                </span>
              </motion.span>
            </motion.h1>

            {/* Description — smaller */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="text-slate-400 text-sm md:text-[0.95rem] leading-relaxed mb-5 max-w-lg"
            >
              Authorized{' '}
              <strong className="text-slate-200">Hikvision, Dahua &amp; CP Plus</strong> dealer
              offering end-to-end{' '}
              <strong className="text-slate-200">CCTV, Solar 4G cameras, biometric access
              control &amp; gate automation</strong> for industrial units, government offices,
              factories &amp; campuses across{' '}
              <strong className="text-slate-200">
                Chennai, Hosur, Coimbatore, Dharmapuri &amp; Bangalore
              </strong>.
            </motion.p>

            {/* Trust checkmarks — staggered */}
            <motion.div
              variants={trustContainer}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400 mb-7"
            >
              {trustPoints.map((item) => (
                <motion.span key={item} variants={trustItem} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  {item}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.68, duration: 0.5 }}
              className="flex flex-wrap gap-3 mb-9"
            >
              <Link
                href="/contact"
                className="group relative px-6 py-3.5 bg-[#FF4500] text-white font-bold rounded-lg overflow-hidden shadow-lg shadow-orange-600/25 transition-all hover:scale-105 hover:shadow-orange-500/40 text-sm"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Free Site Survey
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/15"
                  initial={{ y: '100%' }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </Link>
              <Link
                href="tel:+919445675619"
                className="px-6 py-3.5 border border-slate-700 text-white font-semibold rounded-lg hover:bg-slate-800 hover:border-slate-500 transition-all text-sm"
              >
                📞 Call Now
              </Link>
              <Link
                href="/projects"
                className="px-6 py-3.5 border border-slate-700 text-slate-400 font-semibold rounded-lg hover:bg-slate-800 hover:border-slate-500 hover:text-white transition-all text-sm"
              >
                View Projects
              </Link>
            </motion.div>

            {/* Stats — animated counters */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.82, duration: 0.5 }}
              className="grid grid-cols-4 gap-3 border-t border-slate-800/70 pt-6"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl md:text-2xl font-extrabold text-white tabular-nums">
                    <Counter to={stat.to} suffix={stat.suffix} />
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ─── RIGHT VISUAL ─── */}
          <div className="relative hidden lg:block h-[560px] w-full">

            {/* Main image card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-gradient-to-tr from-slate-800 to-slate-900 rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden"
            >
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt="CCTV Security Monitoring System — Infysmart Tamil Nadu"
                  fill
                  className="object-cover opacity-75"
                  priority
                  sizes="(max-width: 1280px) 50vw, 600px"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <ShieldCheck size={260} strokeWidth={0.4} className="text-white" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-0.5">Live Monitoring Active</p>
                <p className="text-white font-bold">24/7 Surveillance Network</p>
              </div>

              {/* Scan line animation */}
              <motion.div
                animate={{ y: ['0%', '100%', '0%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent pointer-events-none"
              />
            </motion.div>

            {/* Floating card: Security — bobs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                className="absolute -left-14 top-14 p-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/70 rounded-2xl shadow-2xl flex items-center gap-3 w-56"
              >
                <div className="p-2.5 bg-orange-500/20 rounded-lg text-orange-400 shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Security Status</p>
                  <p className="text-white font-bold text-sm">All Systems Active</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating card: Solar 4G — bobs offset */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 2.1 }}
                className="absolute -right-8 top-[38%] p-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/70 rounded-2xl shadow-2xl flex items-center gap-3 w-56"
              >
                <div className="p-2.5 bg-green-500/20 rounded-lg text-green-400 shrink-0">
                  <Zap size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Solar 4G CCTV</p>
                  <p className="text-white font-bold text-sm">100% Off-Grid Ready</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating card: Uptime */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
                className="absolute left-8 -bottom-4 p-3.5 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl flex items-center gap-3"
              >
                <Server size={16} className="text-blue-400 shrink-0" />
                <span className="text-slate-300 text-sm font-semibold">Network Uptime: 99.9%</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ─── SERVICE QUICK-NAV — staggered chips ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05 }}
          className="mt-12 pt-7 border-t border-slate-800/60"
        >
          <p className="text-[10px] text-slate-600 uppercase font-bold tracking-[0.2em] mb-4 text-center">
            Our Security &amp; Technology Solutions
          </p>
          <motion.div
            variants={chipContainer}
            initial="hidden"
            animate="show"
            className="flex flex-wrap justify-center gap-2.5"
          >
            {services.map(({ label, href, icon: Icon }) => (
              <motion.div key={href} variants={chipItem}>
                <Link
                  href={href}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full text-sm text-slate-300 hover:text-white hover:border-brand-blue hover:bg-slate-800 transition-all"
                >
                  <Icon className="w-3.5 h-3.5 text-brand-blue" />
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
