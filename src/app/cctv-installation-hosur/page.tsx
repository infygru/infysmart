import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin, CheckCircle2, Phone, Star, Shield, Factory, Wrench } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export const metadata: Metadata = {
  title: 'CCTV Installation Service in Hosur | Industrial & Factory CCTV | Infysmart',
  description: 'Professional CCTV installation in Hosur starting ₹12,000. Industrial CCTV for SIPCOT factories, warehouses & offices. Authorized Hikvision & Dahua dealer. Free site survey.',
  keywords: [
    'CCTV installation Hosur',
    'CCTV camera installation service Hosur',
    'CCTV camera Hosur',
    'industrial CCTV Hosur',
    'factory CCTV Hosur',
    'SIPCOT CCTV installation',
    'CCTV for factories Hosur',
    'CCTV service Hosur',
    'CCTV repair Hosur',
    'security camera Hosur',
    'Hikvision dealer Hosur',
    'Dahua camera Hosur',
    'CCTV AMC Hosur',
    'warehouse CCTV Hosur',
  ],
  alternates: { canonical: 'https://infysmart.com/cctv-installation-hosur' },
  openGraph: {
    title: 'CCTV Installation in Hosur | Industrial & SIPCOT CCTV | Infysmart',
    description: 'Industrial CCTV installation in Hosur starting ₹12,000. Experts for SIPCOT factories, warehouses & offices. Free site survey.',
    url: 'https://infysmart.com/cctv-installation-hosur',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CCTV Installation Hosur by Infysmart' }],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://infysmart.com' },
    { '@type': 'ListItem', position: 2, name: 'CCTV Services', item: 'https://infysmart.com/cctv' },
    { '@type': 'ListItem', position: 3, name: 'CCTV Installation Hosur', item: 'https://infysmart.com/cctv-installation-hosur' },
  ],
};

const localServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'CCTV Installation Service in Hosur',
  serviceType: 'Industrial Security Camera Installation',
  description: 'Industrial-grade CCTV installation for factories, warehouses, and offices in Hosur and SIPCOT industrial zones. Authorized Hikvision and Dahua dealer.',
  provider: { '@id': 'https://infysmart.com/#organization' },
  areaServed: [
    { '@type': 'City', name: 'Hosur' },
    { '@type': 'AdministrativeArea', name: 'SIPCOT Hosur' },
    { '@type': 'AdministrativeArea', name: 'Bagalur' },
    { '@type': 'AdministrativeArea', name: 'Denkanikottai' },
    { '@type': 'AdministrativeArea', name: 'Krishnagiri' },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '45',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does CCTV installation cost in Hosur?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CCTV installation in Hosur starts from ₹12,000 for a basic 4-camera home or office setup. Industrial CCTV for factories and warehouses in SIPCOT starts from ₹45,000 for a 16-camera IP system with fiber optic cabling.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide CCTV installation for SIPCOT industrial units in Hosur?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Infysmart is the leading CCTV installer for SIPCOT industrial units in Hosur. We have completed 40+ industrial CCTV projects in Hosur SIPCOT including perimeter surveillance, factory floor monitoring, and government-compliance camera systems.',
      },
    },
    {
      '@type': 'Question',
      name: 'What type of CCTV cameras are best for factories in Hosur?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For factory environments in Hosur, we recommend Hikvision IP cameras with IP67 weatherproof rating, varifocal lenses for large floor coverage, and PoE infrastructure for clean cabling. For perimeter security, PTZ cameras with 360° pan capability are ideal. For production lines, 5MP fixed cameras provide clear footage for quality audits.',
      },
    },
  ],
};

export default function HosurCCTVPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <section className="relative bg-slate-900 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950/30" />
        <div className="container mx-auto px-6 relative z-10">
          <FadeIn direction="up" className="max-w-4xl">
            <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
              <Link href="/" className="hover:text-slate-300">Home</Link>
              <span>/</span>
              <Link href="/cctv" className="hover:text-slate-300">CCTV Services</Link>
              <span>/</span>
              <span className="text-slate-400">Hosur</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-900/50 border border-orange-700 text-orange-300 text-xs font-bold uppercase tracking-widest mb-6">
              <Factory className="w-3 h-3" /> Industrial Hub · Hosur, Tamil Nadu
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              CCTV Installation{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-400">
                in Hosur
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-4 max-w-2xl leading-relaxed">
              Industrial-grade CCTV for SIPCOT factories, warehouses, and commercial units in Hosur. Infysmart is based in Hosur — our home city — with dedicated teams for rapid response and local expertise.
            </p>
            <div className="flex items-center gap-2 mb-8">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
              <span className="text-slate-300 text-sm font-semibold">4.9/5 — 45 verified installations in Hosur</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/get-quote/cctv" className="bg-brand-orange text-white px-8 py-4 rounded-lg font-bold hover:bg-orange-700 transition-all shadow-lg text-center">
                Get Free Hosur Quote
              </Link>
              <a href="tel:+919445675619" className="px-8 py-4 rounded-lg font-bold text-white border border-slate-600 hover:bg-slate-800 transition-colors text-center flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> +91 94456 75619
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHY HOSUR */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <span className="text-brand-orange font-bold text-sm tracking-wide uppercase mb-2 block">Our Home City</span>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Local CCTV Experts in Hosur</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Infysmart is headquartered in Hosur, Tamil Nadu. We understand the unique security requirements of Hosur&apos;s thriving industrial ecosystem — from electronics manufacturing units in SIPCOT to auto component factories across the Bengaluru-Chennai corridor.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                We have worked extensively with TNPL, ACCET, and leading SIPCOT manufacturers to design and install high-compliance CCTV systems that meet government audit standards. Our local presence means faster response times and better understanding of site requirements.
              </p>
              <div className="space-y-3">
                {[
                  'Based in Hosur — fastest response times in the region',
                  'Experience with SIPCOT, Bagalur, and Mathigiri industrial belts',
                  'Government-compliance installations for PSU clients',
                  'TNPL & ACCET proven track record',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <div className="bg-slate-900 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6 text-brand-orange">Hosur Areas We Serve</h3>
                <div className="space-y-3">
                  {[
                    { area: 'SIPCOT Hosur Phase I & II', type: 'Industrial' },
                    { area: 'Bagalur Industrial Corridor', type: 'Industrial' },
                    { area: 'Mathigiri & Thally Road', type: 'Commercial / Residential' },
                    { area: 'Hosur Town & Bypass Road', type: 'Commercial' },
                    { area: 'Naganalli & Shoolagiri', type: 'Industrial' },
                    { area: 'Krishnagiri & Dharmapuri', type: 'Nearby Cities' },
                    { area: 'Attibele (Karnataka border)', type: 'Industrial' },
                  ].map((item) => (
                    <div key={item.area} className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-brand-orange shrink-0" />
                        <span className="text-slate-200 text-sm font-medium">{item.area}</span>
                      </div>
                      <span className="text-slate-500 text-xs">{item.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* INDUSTRIAL SPECIALIZATION */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <FadeIn direction="up">
              <h2 className="text-3xl font-bold mb-4">Industrial CCTV Solutions for Hosur Factories</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Specialized surveillance architecture for manufacturing and industrial facilities.
              </p>
            </FadeIn>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Production Floor Monitoring',
                desc: 'Wide-angle 5MP cameras covering entire production lines. AI-based motion detection for unauthorized zone access. Integration with existing factory ERP systems.',
              },
              {
                title: 'Perimeter & Gate Security',
                desc: 'PTZ cameras for wide-area perimeter coverage. Number plate recognition (ANPR) cameras for vehicle entry/exit logging. Boom barrier integration.',
              },
              {
                title: 'Government-Compliance Installs',
                desc: 'CCTV installations meeting SIPCOT, TANGEDCO, and PSU audit standards. Documented installation reports, BIS-certified components, and fire-safety compliant cabling.',
              },
            ].map((item) => (
              <FadeIn key={item.title} direction="up">
                <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 h-full">
                  <Shield className="w-8 h-8 text-brand-orange mb-4" />
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">CCTV Installation Hosur — FAQ</h2>
          <div className="space-y-5">
            {[
              {
                q: 'How much does CCTV installation cost in Hosur?',
                a: 'CCTV installation in Hosur starts from ₹12,000 for a 4-camera home or office setup. Industrial CCTV for factories in SIPCOT starts from ₹45,000 for a 16-camera IP network system with structured cabling.',
              },
              {
                q: 'Do you install CCTV for SIPCOT factories in Hosur?',
                a: 'Yes. Infysmart is based in Hosur and has completed 40+ CCTV projects in Hosur SIPCOT including electronics factories, auto-component units, and government PSU facilities. We understand SIPCOT compliance requirements and provide documented installation reports.',
              },
              {
                q: 'What cameras work best for Hosur industrial environments?',
                a: 'For factory floors with high dust and temperature variation, we recommend Hikvision IP67-rated weatherproof cameras with varifocal lenses. For perimeter areas, PTZ cameras with auto-tracking capability. For low-light factory environments, ColorVu cameras that capture full-color footage even in darkness.',
              },
            ].map((item) => (
              <div key={item.q} className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Get CCTV Quote for Your Hosur Factory or Office</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Free site survey anywhere in Hosur. Industrial CCTV experts on-call. Same-day consultation available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-quote/cctv" className="bg-brand-orange text-white px-10 py-4 rounded-lg font-bold hover:bg-orange-700 transition-all">
              Request Free Quote
            </Link>
            <a href="tel:+919445675619" className="border border-slate-600 text-white px-10 py-4 rounded-lg font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> Call: +91 94456 75619
            </a>
          </div>
          <p className="text-slate-500 text-sm mt-6">
            Also serving: <Link href="/cctv-installation-chennai" className="underline hover:text-white">Chennai</Link> ·{' '}
            <Link href="/cctv-installation-coimbatore" className="underline hover:text-white">Coimbatore</Link> ·{' '}
            <Link href="/cctv-installation-bangalore" className="underline hover:text-white">Bangalore</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
