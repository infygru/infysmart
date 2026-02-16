import { directus } from '@/lib/directus';
import { readItems, readSingleton } from '@directus/sdk';
import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import {
  Shield,
  Eye,
  Wrench,
  MapPin,
  CheckCircle2,
  Settings,
  Truck,
  ShoppingCart,
  HardDrive,
  Clock
} from 'lucide-react';

import { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Industrial CCTV Camera Installation in Chennai, Ambattur, Guindy | InfySmart',
  description: 'Expert CCTV & Surveillance solutions for Commercial, Industrial, and Factory units in Ambattur, Guindy, Sriperumbudur, Kanchipuram & SIPCOT. Installation & AMC.',
};

// 1. Define Interface
interface Service {
  title: string;
  description: string;
  icon: string;
  slug: string;
}

export default async function CCTVPage() {
  const [settings, services] = await Promise.all([
    directus.request(readSingleton('global_settings')),
    directus.request(readItems('services', {
      filter: { slug: { _eq: 'cctv' } },
      limit: 1
    }))
  ]);

  // 2. FIX: Use 'as unknown as Service' to bypass the strict check
  const service = services[0] as unknown as Service | undefined;

  // Fallback content
  const description = service?.description || "Advanced security camera solutions for homes, businesses, and industrial facilities.";

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">

      {/* 1. HERO SECTION (SEO Optimized H1) */}
      <section className="relative h-[75vh] flex items-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2070&auto=format&fit=crop"
            alt="Best CCTV Camera Installation Service in Chennai Tamil Nadu"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <FadeIn direction="right" className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-700 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6">
              <Eye className="w-3 h-3" /> Sales • Installation • Service • AMC
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Commercial & Industrial <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-400">
                Surveillance Solutions.
              </span>
            </h1>
            <ul className="flex flex-wrap gap-4 text-lg text-slate-300 mb-8 max-w-2xl list-none">
              <li><Link href="/services/cctv" className="hover:text-brand-blue transition border-b border-transparent hover:border-brand-blue">CCTV Surveillance</Link></li>
              <li className="text-slate-600">•</li>
              <li><Link href="/services/solar" className="hover:text-brand-blue transition border-b border-transparent hover:border-brand-blue">Solar Power</Link></li>
              <li className="text-slate-600">•</li>
              <li><Link href="/services/automation" className="hover:text-brand-blue transition border-b border-transparent hover:border-brand-blue">Home Automation</Link></li>
              <li className="text-slate-600">•</li>
              <li><Link href="/services/amc" className="hover:text-brand-blue transition border-b border-transparent hover:border-brand-blue">AMC Support</Link></li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="bg-brand-blue text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/50 text-center">
                Book Free Site Visit
              </Link>
              <Link href="tel:+919876543210" className="px-8 py-4 rounded-lg font-bold text-white border border-slate-600 hover:bg-slate-800 transition-colors text-center">
                Call for Repair / AMC
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. OUR 4-STEP SERVICE MODEL (Sales -> Install -> Service -> AMC) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn direction="up">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Complete Lifecycle Support</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                We don't just sell boxes. We provide end-to-end security ownership.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Sales */}
            <FadeIn direction="up" delay={0.1}>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:border-brand-blue hover:shadow-lg transition-all group h-full">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:bg-brand-blue transition-colors">
                  <ShoppingCart className="w-6 h-6 text-brand-blue group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Sales & Supply</h3>
                <p className="text-sm text-slate-600">
                  Wholesale pricing on Hikvision, Dahua, & CP Plus Cameras. Wireless & 4G Solar Options available.
                </p>
              </div>
            </FadeIn>

            {/* Installation */}
            <FadeIn direction="up" delay={0.2}>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:border-brand-blue hover:shadow-lg transition-all group h-full">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:bg-brand-blue transition-colors">
                  <Settings className="w-6 h-6 text-brand-blue group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Pro Installation</h3>
                <p className="text-sm text-slate-600">
                  Neat structured cabling, strategic camera positioning for zero blind spots, and mobile config.
                </p>
              </div>
            </FadeIn>

            {/* Service */}
            <FadeIn direction="up" delay={0.3}>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:border-brand-blue hover:shadow-lg transition-all group h-full">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:bg-brand-blue transition-colors">
                  <Wrench className="w-6 h-6 text-brand-blue group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Repair & Service</h3>
                <p className="text-sm text-slate-600">
                  Camera offline? HDD not recording? Our technicians provide quick on-site troubleshooting.
                </p>
              </div>
            </FadeIn>

            {/* AMC */}
            <FadeIn direction="up" delay={0.4}>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:border-brand-blue hover:shadow-lg transition-all group h-full">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:bg-brand-blue transition-colors">
                  <Shield className="w-6 h-6 text-brand-blue group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">AMC Packages</h3>
                <p className="text-sm text-slate-600 mb-2">
                  Annual Maintenance Contracts for apartments and offices.
                </p>
                <div className="text-xs font-bold text-brand-blue bg-blue-50 inline-block px-2 py-1 rounded border border-blue-200">
                  Starts @ ₹450 / Year
                </div>
              </div>
            </FadeIn>

            {/* RENTALS - Optional 5th card or keep consistent grid */}
            {/* Only 4 cols in grid, this might wrap awkward if not handled. Let's hide or keep as extra service? 
                 The original had it. I'll put it in a separate row or just append if grid adapts.
                 Original grid was md:grid-cols-4. If 5 items, last one wraps.
              */}
          </div>

          {/* Rental Card separated or appended? Original had it inside grid. */}
          <div className="mt-6 max-w-sm mx-auto">
            <FadeIn direction="up" delay={0.5}>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:border-brand-orange hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:bg-brand-orange transition-colors">
                  <Clock className="w-6 h-6 text-brand-orange group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">CCTV Rentals</h3>
                <p className="text-sm text-slate-600 mb-2">
                  Temporary surveillance for events, construction sites, and exhibitions.
                </p>
                <div className="text-xs font-bold text-brand-orange bg-orange-50 inline-block px-2 py-1 rounded border border-orange-200">
                  Short-term & Long-term
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* 3. DYNAMIC CONTENT (Overview) */}
      <section className="py-20 container mx-auto px-6 border-t border-slate-200">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="right">
            <span className="text-brand-orange font-bold text-sm tracking-wide uppercase mb-2 block">Why Choose InfySmart?</span>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Technology That Protects</h2>
            <div className="prose prose-lg prose-slate text-slate-600 leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="text-green-500 w-5 h-5" />
                <span className="font-semibold text-slate-800">Night Vision & ColorVu Technology</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="text-green-500 w-5 h-5" />
                <span className="font-semibold text-slate-800">Face Detection & Intrusion Alarms</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500 w-5 h-5" />
                <span className="font-semibold text-slate-800">Cloud Storage & Remote Playback</span>
              </div>
            </div>
          </FadeIn>

          {/* Tech Visual */}
          <FadeIn direction="left" className="relative h-96 bg-slate-900 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center group">
            {/* Overlay Pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>

            <div className="text-center relative z-10">
              <HardDrive className="w-20 h-20 text-brand-blue mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-bold text-white">Smart Monitoring</h3>
              <p className="text-slate-400 mt-2">Access footage from anywhere in the world</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Service Locations & Industrial Coverage</h2>
            <p className="text-slate-600 max-w-3xl mx-auto">
              From small offices in <strong>Guindy</strong> to large-scale manufacturing units in <strong>Sriperumbudur and Oragadam</strong>, we provide specialized CCTV & Surveillance solutions tailored for commercial and industrial needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {/* Commercial/Residential Zones */}
            <FadeIn direction="up" className="md:col-span-1">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-8 h-8 text-brand-orange" />
                  <h3 className="text-xl font-bold text-slate-900">Chennai City & Suburbs</h3>
                </div>
                <p className="text-slate-600 mb-6 text-sm">
                  Rapid installation teams for retail shops, apartments, and offices across Chennai metropolitan areas.
                </p>
                <div className="grid grid-cols-1 gap-y-2 text-sm text-slate-600 font-medium">
                  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-orange"></div> Adyar & Besant Nagar</span>
                  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-orange"></div> T. Nagar & Kodambakkam</span>
                  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-orange"></div> Velachery & OMR</span>
                  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-orange"></div> Anna Nagar & Mogappair</span>
                  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-orange"></div> Tambaram & Chromepet</span>
                  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-orange"></div> Porur & Valasaravakkam</span>
                </div>
              </div>
            </FadeIn>

            {/* Industrial Hubs - NEW SEO TARGET */}
            <FadeIn direction="up" delay={0.1} className="md:col-span-1">
              <div className="bg-slate-900 text-white p-8 rounded-xl shadow-xl border border-slate-700 h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Settings className="w-32 h-32 text-white" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <HardDrive className="w-8 h-8 text-yellow-400" />
                    <h3 className="text-xl font-bold text-white">Industrial & SIPCOT Zones</h3>
                  </div>
                  <p className="text-slate-300 mb-6 text-sm">
                    Specialized <strong>Factory & Warehouse Surveillance</strong> logic for heavy-industry zones. IP Cameras, Fiber Optic Cabling & Perimeter Protection.
                  </p>
                  <ul className="space-y-3 text-sm text-slate-200 font-medium">
                    <li className="flex items-center gap-2 border-b border-slate-700 pb-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                      Ambattur Industrial Estate
                    </li>
                    <li className="flex items-center gap-2 border-b border-slate-700 pb-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                      Guindy Industrial Estate
                    </li>
                    <li className="flex items-center gap-2 border-b border-slate-700 pb-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                      Sriperumbudur & Oragadam
                    </li>
                    <li className="flex items-center gap-2 border-b border-slate-700 pb-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                      Kanchipuram & Vallam
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                      SIPCOT (Irungattukottai/Siruseri)
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            {/* State-wide Projects */}
            <FadeIn direction="up" delay={0.2} className="md:col-span-1">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="w-8 h-8 text-brand-blue" />
                  <h3 className="text-xl font-bold text-slate-900">Tamil Nadu Wide</h3>
                </div>
                <p className="text-slate-600 mb-6 text-sm">
                  We handle multi-site commercial projects for retail chains and government tenders across the state.
                </p>
                <div className="flex flex-wrap gap-2 mb-auto">
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">Coimbatore</span>
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">Madurai</span>
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">Trichy</span>
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">Salem</span>
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">Hosur</span>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <Link href="/contact" className="flex items-center justify-center gap-2 text-brand-blue font-bold hover:gap-3 transition-all group-hover:text-blue-700">
                    Request Industrial Quote <span className="text-xl leading-none">&rarr;</span>
                  </Link>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* 5. BRANDS */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
            Authorized Sales & Service Partners For
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-xl font-bold text-slate-400 grayscale opacity-80">
            <span>Hikvision</span>
            <span>Dahua</span>
            <span>CP Plus</span>
            <span>Honeywell</span>
            <span>Panasonic</span>
            <span>Bosch</span>
          </div>
        </div>
      </section>

    </main>
  );
}