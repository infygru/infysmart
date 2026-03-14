'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, ShieldCheck, Zap, Server,
  Camera, Sun, Fingerprint, Bell, CheckCircle, Building2
} from 'lucide-react';
import { motion } from 'framer-motion';

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
  { value: '500+', label: 'Projects Delivered' },
  { value: '8+', label: 'Cities Served' },
  { value: '10+', label: 'Years Experience' },
  { value: '24/7', label: 'AMC Support' },
];

const trustPoints = [
  'TNPL & ACCET Empanelled',
  'GST & MSME Registered',
  'BIS Certified Equipment',
  'Free Site Survey',
];

export default function Hero({ heroImage }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-950">

      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-blue-600/10 rounded-full blur-[160px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-orange-500/8 rounded-full blur-[130px] translate-y-1/4 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[100px] -translate-y-1/2" />
        {/* Dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-28 pb-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* ─── LEFT CONTENT ─── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Government badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              Govt‑Approved Vendor · Tamil Nadu &amp; Karnataka
            </motion.div>

            {/* H1 — keyword rich */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.6rem] font-extrabold text-white leading-[1.08] mb-5"
            >
              Best CCTV Installation<br />
              &amp; Security Systems<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-300">
                in Tamil Nadu &amp; Bangalore
              </span>
            </motion.h1>

            {/* Keyword-rich description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-slate-400 text-base md:text-lg leading-relaxed mb-6 max-w-xl"
            >
              Authorized{' '}
              <strong className="text-slate-200">Hikvision, Dahua &amp; CP Plus</strong> dealer
              offering end-to-end{' '}
              <strong className="text-slate-200">CCTV camera installation, Solar 4G cameras,
              biometric access control, video door phones</strong> and{' '}
              <strong className="text-slate-200">gate automation</strong> for industrial units,
              government offices, factories, apartments &amp; educational campuses across{' '}
              <strong className="text-slate-200">
                Chennai, Hosur, Coimbatore, Dharmapuri, Karaikudi, Puducherry &amp; Bangalore
              </strong>.
            </motion.p>

            {/* Trust checkmarks */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400 mb-8"
            >
              {trustPoints.map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                  {item}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link
                href="/contact"
                className="group relative px-7 py-4 bg-[#FF4500] text-white font-bold rounded-lg overflow-hidden shadow-lg shadow-orange-600/30 transition-all hover:scale-105 hover:shadow-orange-500/40"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Free Site Survey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              <Link
                href="tel:+919445675619"
                className="px-7 py-4 border border-slate-700 text-white font-semibold rounded-lg hover:bg-slate-800 hover:border-slate-500 transition-all"
              >
                📞 Call Now
              </Link>
              <Link
                href="/projects"
                className="px-7 py-4 border border-slate-700 text-slate-300 font-semibold rounded-lg hover:bg-slate-800 hover:border-slate-500 transition-all"
              >
                View Projects
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="grid grid-cols-4 gap-4 border-t border-slate-800/80 pt-7"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl md:text-3xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-tight">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── RIGHT VISUAL ─── */}
          <div className="relative hidden lg:block h-[580px] w-full">

            {/* Main image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
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
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center opacity-10">
                    <ShieldCheck size={280} strokeWidth={0.4} className="text-white mx-auto" />
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-0.5">Live Monitoring Active</p>
                <p className="text-white font-bold text-lg">24/7 Surveillance Network</p>
              </div>
            </motion.div>

            {/* Floating card: Security */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="absolute -left-14 top-14 p-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/70 rounded-2xl shadow-2xl flex items-center gap-3 w-60"
            >
              <div className="p-2.5 bg-orange-500/20 rounded-lg text-orange-400 shrink-0">
                <ShieldCheck size={22} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Security Status</p>
                <p className="text-white font-bold text-sm">All Systems Active</p>
              </div>
            </motion.div>

            {/* Floating card: Solar 4G */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="absolute -right-8 top-[38%] p-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/70 rounded-2xl shadow-2xl flex items-center gap-3 w-60"
            >
              <div className="p-2.5 bg-green-500/20 rounded-lg text-green-400 shrink-0">
                <Zap size={22} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Solar 4G CCTV</p>
                <p className="text-white font-bold text-sm">100% Off-Grid Ready</p>
              </div>
            </motion.div>

            {/* Floating card: Uptime */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.05 }}
              className="absolute left-8 -bottom-5 p-3.5 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl flex items-center gap-3"
            >
              <Server size={18} className="text-blue-400 shrink-0" />
              <span className="text-slate-300 text-sm font-semibold">Network Uptime: 99.9%</span>
            </motion.div>
          </div>
        </div>

        {/* ─── SERVICE QUICK-NAV ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-14 pt-8 border-t border-slate-800/70"
        >
          <p className="text-[10px] text-slate-600 uppercase font-bold tracking-[0.2em] mb-4 text-center">
            Our Security &amp; Technology Solutions
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {services.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full text-sm text-slate-300 hover:text-white hover:border-brand-blue hover:bg-slate-800 transition-all"
              >
                <Icon className="w-3.5 h-3.5 text-brand-blue" />
                {label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
