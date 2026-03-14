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
  title: 'Best CCTV Installation Service in Chennai, Coimbatore, Hosur, Dharmapuri, Karaikudi & Bangalore | InfySmart',
  description: 'Expert CCTV & Surveillance solutions for Commercial, Industrial, and Factory units across Tamil Nadu and Bangalore. Sales, installation, repair & AMC from authorized Hikvision and Dahua dealers. Starting ₹450/year AMC.',
  alternates: { canonical: 'https://infysmart.com/cctv' },
  openGraph: {
    title: 'Best CCTV Installation Service in Chennai, Coimbatore, Hosur & Bangalore | InfySmart',
    description: 'Expert CCTV & Surveillance for Commercial, Industrial & Factory units across Tamil Nadu and Bangalore. Authorized Hikvision & Dahua dealer.',
    url: 'https://infysmart.com/cctv',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CCTV Installation Services by Infysmart' }],
  },
  twitter: {
    title: 'Best CCTV Installation in Chennai, Hosur & Bangalore | InfySmart',
    description: 'Expert CCTV for Industrial & Commercial units. AMC from ₹450/year.',
    images: ['/og-image.png'],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long do CCTV cameras record before overwriting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Recording duration depends on hard drive capacity, number of cameras, resolution, and encoding format. A typical 8-camera 2MP system with a 2TB HDD using H.265 compression records continuously for 15–20 days. With motion-detection recording enabled, retention extends to 30+ days.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need internet for a CCTV system to work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, internet is not required for local recording or monitoring. However, for remote smartphone viewing via apps like Hik-Connect or push notifications, an active internet connection at the DVR/NVR site is required.",
      },
    },
    {
      "@type": "Question",
      name: "Can wireless CCTV cameras be used for large industrial areas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Basic Wi-Fi cameras are not recommended for large critical infrastructure due to reliability concerns. For remote areas, we install 4G Solar PTZ Cameras that operate off-grid with a built-in solar panel and 4G SIM. For networked warehouses, Point-to-Point wireless bridges are highly reliable.",
      },
    },
    {
      "@type": "Question",
      name: "What does an Annual Maintenance Contract (AMC) cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our AMC packages cover quarterly preventive maintenance including cleaning camera lenses, re-focusing, testing UPS batteries, extracting dust from DVR/NVR, firmware updates, and verifying hard drive health. AMC packages start at ₹450 per year.",
      },
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "CCTV Installation Service",
  serviceType: "Security Camera Installation",
  provider: {
    "@id": "https://infysmart.com/#organization",
  },
  areaServed: [
    { "@type": "City", name: "Chennai" },
    { "@type": "City", name: "Hosur" },
    { "@type": "City", name: "Coimbatore" },
    { "@type": "City", name: "Bangalore" },
    { "@type": "City", name: "Dharmapuri" },
    { "@type": "City", name: "Karaikudi" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "CCTV Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "CCTV Camera Sales & Supply" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Professional CCTV Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "CCTV Repair & Service" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "CCTV Annual Maintenance Contract (AMC)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "CCTV Camera Rentals" } },
    ],
  },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Best CCTV Installation Service <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-400">
                in Chennai, Hosur, Dharmapuri, Coimbatore, Karaikudi & Bangalore.
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
                We don&apos;t just sell boxes. We provide end-to-end security ownership.
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
            {/* Only 4 cols in grid, this might wrap awkward if not handled. let&apos;s hide or keep as extra service? 
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

      {/* 5. TECHNICAL DEEP DIVE (SEO EXPANSION) */}
      <section className="py-20 bg-slate-900 border-t border-slate-800 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn direction="up">
              <h2 className="text-3xl font-bold mb-4">Industrial CCTV Architecture</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Deep technical expertise for complex enterprise deployments.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FadeIn direction="up" delay={0.1}>
              <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 h-full">
                <h3 className="text-xl font-bold mb-4 text-brand-orange">IP vs Analog HD</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  For industrial plants, we strongly recommend <strong>IP Camera Networks</strong> over traditional Analog HD. IP cameras offer digital zoom without pixelation, native POE (Power over Ethernet) simplifying cabling, and decentralized recording options.
                </p>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> CAT6 cabling handles both power and data.</li>
                  <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> Easier integration with existing IT infrastructure.</li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 h-full">
                <h3 className="text-xl font-bold mb-4 text-brand-orange">Storage & Encoding</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Using advanced <strong>H.265+ encoding</strong>, we compress video files up to 80% without losing quality. This means a standard 4TB Surveillance HDD can store up to 30 days of 1080p continuous recording for a 16-channel system.
                </p>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> WD Purple / Seagate Skyhawk Enterprise Drives.</li>
                  <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> Motion-based recording to maximize retention.</li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 h-full">
                <h3 className="text-xl font-bold mb-4 text-brand-orange">Compliance & Safety</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Our installations comply with strict safety standards required by SIPCOT and industrial safety audits. We utilize PVC conduits, armored fiber optic cables for long distances, and weatherproof IP67 rated camera housings.
                </p>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> BIS certified power supplies.</li>
                  <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> Surge protection on video and power lines.</li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600">Expert answers to your surveillance queries.</p>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h4 className="text-lg font-bold text-slate-900 mb-2">How long do CCTV cameras record before overwriting?</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Recording duration depends entirely on your hard drive capacity (TB), the number of cameras, the resolution (2MP vs 5MP), and the encoding format used. A typical 8-camera 2MP system with a 2TB hard drive using H.265 compression will record continuously for about 15-20 days. We optimize this by enabling motion-detection recording, which can extend retention to 30+ days.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Do I need internet for a CCTV system to work?</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                No, internet is <strong>not required</strong> for a CCTV system to record or monitor locally on a connected TV/monitor. However, if you want to view the live footage remotely on your smartphone (via apps like Hik-Connect) or receive motion-alert push notifications when you are away from the office, an active internet connection at the DVR/NVR site is necessary.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Can wireless CCTV cameras be used for large industrial areas?</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                We generally advise against basic Wi-Fi cameras for large critical infrastructure due to connectivity drops and latency. Instead, for remote areas like farmhouses or large perimeter fences without network cabling, we install <strong>4G Solar PTZ Cameras</strong>. These operate entirely off-grid using a built-in solar panel and an inserted 4G SIM card for direct cloud connectivity. For networked warehouses, Point-to-Point (P2P) wireless bridges are highly reliable.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h4 className="text-lg font-bold text-slate-900 mb-2">What does an Annual Maintenance Contract (AMC) cover?</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our AMC packages cover comprehensive quarterly preventive maintenance. This involves cleaning camera lenses, re-focusing, testing UPS battery backups, extracting dust from the DVR/NVR, updating firmware, and verifying hard drive health to prevent sudden recording failures. Spare parts and hardware replacements may be billed separately or included depending on whether it is a Comprehensive or Non-Comprehensive AMC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BRANDS */}
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