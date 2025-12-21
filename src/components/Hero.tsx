'use client';

import Link from 'next/link';
import Image from 'next/image'; // 1. Import Image
import { ArrowRight, ShieldCheck, Zap, Server } from 'lucide-react';
import { motion } from 'framer-motion';

// 2. Define the interface for props
interface HeroProps {
  heroImage?: string; // Optional prop for the Directus image URL
}

export default function Hero({ heroImage }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-900">
      {/* 1. Dynamic Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
        {/* Removed grid-pattern.svg reference to avoid 404 if you don't have it, added simple CSS grid instead if needed */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* 2. Left Content - Animated Text */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-500 text-xs font-bold uppercase tracking-wider mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Authorized Partner: Hikvision & Dahua
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Smarter Safety. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300">
              Sustainable Power.
            </span>
          </h1>

          <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-lg">
            Infysmart integrates enterprise CCTV surveillance, solar energy, and industrial automation into one seamless infrastructure.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link 
              href="/contact" 
              className="group relative px-8 py-4 bg-orange-600 text-white font-bold rounded-lg overflow-hidden shadow-lg shadow-orange-600/25 transition-all hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Free Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            
            <Link 
              href="/services" 
              className="px-8 py-4 border border-slate-700 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
            >
              View Projects
            </Link>
          </div>
        </motion.div>

        {/* 3. Right Visual - Floating Cards (Premium Tech Look) */}
        <div className="relative hidden lg:block h-[600px] w-full">
           
           {/* MAIN IMAGE CONTAINER */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1 }}
             className="absolute inset-0 bg-gradient-to-tr from-slate-800 to-slate-900 rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden"
           >
             {/* 3. LOGIC: Check if Directus image exists, else show fallback */}
             {heroImage ? (
               <Image 
                 src={heroImage} 
                 alt="Smart Surveillance Dashboard" 
                 fill 
                 className="object-cover opacity-80"
                 priority
               />
             ) : (
                // Fallback if no image provided
               <div className="absolute inset-0 flex items-center justify-center text-slate-800 opacity-20">
                 <ShieldCheck size={300} strokeWidth={0.5} />
               </div>
             )}
             
             {/* Gradient Overlay to ensure text readability if image is bright */}
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
           </motion.div>

           {/* Floating Glass Card 1: CCTV */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6 }}
             className="absolute -left-12 top-20 p-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-xl flex items-center gap-4 w-64"
           >
             <div className="p-3 bg-orange-500/20 rounded-lg text-orange-500">
               <ShieldCheck size={24} />
             </div>
             <div>
               <p className="text-xs text-slate-400 uppercase font-semibold">Security Status</p>
               <p className="text-white font-bold">Active Monitoring</p>
             </div>
           </motion.div>

           {/* Floating Glass Card 2: Solar */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.8 }}
             className="absolute -right-4 bottom-32 p-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-xl flex items-center gap-4 w-64"
           >
             <div className="p-3 bg-green-500/20 rounded-lg text-green-400">
               <Zap size={24} />
             </div>
             <div>
               <p className="text-xs text-slate-400 uppercase font-semibold">Energy Savings</p>
               <p className="text-white font-bold">40% Reduced Cost</p>
             </div>
           </motion.div>

           {/* Floating Glass Card 3: Automation */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 1.0 }}
             className="absolute left-10 -bottom-6 p-4 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl flex items-center gap-3"
           >
             <Server size={20} className="text-blue-400" />
             <span className="text-slate-300 text-sm font-medium">System Integrity: 100%</span>
           </motion.div>
        </div>
      </div>
    </section>
  );
}