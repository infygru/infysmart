import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin, CheckCircle2, Phone, Star } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export const metadata: Metadata = {
  title: 'CCTV Installation Service in Bangalore | Best CCTV Camera Price | Infysmart',
  description: 'Professional CCTV camera installation in Bangalore starting ₹12,000. Authorized Hikvision & Dahua dealer. Serving offices, IT parks, factories in Electronic City, Whitefield, Hosur Road. Free site survey.',
  keywords: [
    'CCTV installation Bangalore',
    'CCTV camera installation service Bangalore',
    'CCTV camera price Bangalore',
    'CCTV installer Bangalore',
    'CCTV for IT park Bangalore',
    'CCTV Electronic City',
    'CCTV Whitefield',
    'CCTV Hosur Road Bangalore',
    'CCTV service Bangalore',
    'Hikvision dealer Bangalore',
    'CCTV AMC service Bangalore',
    'security camera Bangalore',
    'industrial CCTV Bangalore',
  ],
  alternates: { canonical: 'https://infysmart.com/cctv-installation-bangalore' },
  openGraph: {
    title: 'CCTV Installation in Bangalore | Infysmart',
    description: 'Professional CCTV installation in Bangalore starting ₹12,000. Offices, IT parks & factories. Free site survey.',
    url: 'https://infysmart.com/cctv-installation-bangalore',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CCTV Installation Bangalore' }],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://infysmart.com' },
    { '@type': 'ListItem', position: 2, name: 'CCTV Services', item: 'https://infysmart.com/cctv' },
    { '@type': 'ListItem', position: 3, name: 'CCTV Installation Bangalore', item: 'https://infysmart.com/cctv-installation-bangalore' },
  ],
};

const localServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'CCTV Installation Service in Bangalore',
  serviceType: 'Security Camera Installation',
  description: 'Professional CCTV installation for IT offices, factories, apartments, and commercial facilities across Bangalore and surrounding areas.',
  provider: { '@id': 'https://infysmart.com/#organization' },
  areaServed: [
    { '@type': 'City', name: 'Bangalore' },
    { '@type': 'AdministrativeArea', name: 'Electronic City' },
    { '@type': 'AdministrativeArea', name: 'Whitefield' },
    { '@type': 'AdministrativeArea', name: 'Hosur Road' },
    { '@type': 'AdministrativeArea', name: 'Attibele' },
    { '@type': 'AdministrativeArea', name: 'Anekal' },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '22',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does CCTV installation cost in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CCTV installation in Bangalore starts from ₹12,000 for a basic 4-camera home or office setup. Enterprise-grade IP CCTV systems for IT offices start from ₹25,000. Industrial setups start from ₹45,000. All prices include cameras, NVR/DVR, cabling, installation, and 1-year warranty.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide CCTV installation in Electronic City and Whitefield, Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We serve Electronic City, Whitefield, Sarjapur Road, Hosur Road, Anekal, Attibele, and other South Bangalore areas with rapid deployment teams.',
      },
    },
  ],
};

const bangaloreAreas = [
  'Electronic City Phase I & II', 'Whitefield', 'Hosur Road', 'Sarjapur Road',
  'Bannerghatta Road', 'Anekal', 'Attibele', 'HSR Layout', 'Koramangala',
  'BTM Layout', 'Jayanagar', 'JP Nagar', 'Banashankari', 'Kengeri',
];

export default function BangaloreCCTVPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <section className="relative bg-slate-900 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40" />
        <div className="container mx-auto px-6 relative z-10">
          <FadeIn direction="up" className="max-w-4xl">
            <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
              <Link href="/" className="hover:text-slate-300">Home</Link>
              <span>/</span>
              <Link href="/cctv" className="hover:text-slate-300">CCTV Services</Link>
              <span>/</span>
              <span className="text-slate-400">Bangalore</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/50 border border-indigo-700 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-6">
              <MapPin className="w-3 h-3" /> Bangalore, Karnataka
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              CCTV Installation Service{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-400">
                in Bangalore
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-4 max-w-2xl leading-relaxed">
              Professional CCTV installation for IT offices, apartments, factories, and retail establishments in Bangalore. Authorized Hikvision dealer serving Electronic City, Whitefield, Hosur Road and South Bangalore.
            </p>
            <div className="flex items-center gap-2 mb-8">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
              <span className="text-slate-300 text-sm font-semibold">4.8/5 — 22 verified installations in Bangalore</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/get-quote/cctv" className="bg-brand-blue text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg text-center">
                Get Free Bangalore Quote
              </Link>
              <a href="tel:+919445675619" className="px-8 py-4 rounded-lg font-bold text-white border border-slate-600 hover:bg-slate-800 transition-colors text-center flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> +91 94456 75619
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <FadeIn direction="right">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">CCTV Solutions for Bangalore&apos;s IT &amp; Industrial Zones</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Bangalore&apos;s rapidly growing industrial corridor along Hosur Road — from Electronic City to Attibele — is a natural extension of our Hosur-based operations. We bring the same engineering standards that we apply to Tamil Nadu&apos;s SIPCOT industries to Bangalore&apos;s tech parks and manufacturing units.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Whether it&apos;s a startup office needing a basic 4-camera system in Koramangala, or a 200-employee manufacturing unit in Electronic City requiring a 32-camera IP network with cloud backup, our teams deliver.
              </p>
              <div className="space-y-3">
                {[
                  'Rapid deployment in Electronic City and Whitefield corridors',
                  'IT-grade IP camera networks with VLAN isolation',
                  'Same engineering standards as our SIPCOT deployments',
                  'Cross-border GST invoices for Karnataka clients',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <div className="bg-slate-900 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6">Bangalore Areas We Serve</h3>
                <div className="grid grid-cols-2 gap-2">
                  {bangaloreAreas.map((area) => (
                    <div key={area} className="flex items-center gap-2 text-slate-300 text-sm py-1 border-b border-slate-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />
                      {area}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">CCTV Camera Price in Bangalore</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { type: 'Home / Apartment', price: '₹12,000', cameras: '4 cameras', desc: 'DVR + 1TB + installation' },
              { type: 'Office / IT Park', price: '₹25,000', cameras: '8 cameras', desc: 'NVR + PoE + structured cabling' },
              { type: 'Factory / Industrial', price: '₹45,000+', cameras: '16+ cameras', desc: 'IP system + fiber backbone' },
            ].map((pkg) => (
              <div key={pkg.type} className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-slate-900 mb-1">{pkg.type}</h3>
                <div className="text-3xl font-extrabold text-brand-blue my-3">{pkg.price}</div>
                <p className="text-slate-500 text-xs mb-1">{pkg.cameras}</p>
                <p className="text-slate-400 text-xs mb-4">{pkg.desc}</p>
                <Link href="/get-quote/cctv" className="block w-full text-center bg-slate-900 text-white py-2 rounded-lg text-sm font-bold hover:bg-brand-blue transition-colors">
                  Get Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">FAQ — CCTV in Bangalore</h2>
          <div className="space-y-5">
            {[
              {
                q: 'How much does CCTV installation cost in Bangalore?',
                a: 'CCTV installation in Bangalore starts from ₹12,000 for a 4-camera home setup. Office and IT park setups (8 cameras) start from ₹25,000. Industrial CCTV with 16+ IP cameras starts from ₹45,000. All prices include cameras, NVR/DVR, cabling and 1-year warranty.',
              },
              {
                q: 'Do you serve Electronic City and Whitefield in Bangalore?',
                a: 'Yes. We have dedicated service teams for South Bangalore including Electronic City, Hosur Road, Attibele, Anekal, Whitefield, Sarjapur Road, and Bannerghatta Road areas.',
              },
            ].map((item) => (
              <div key={item.q} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-blue text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Free CCTV Quote in Bangalore</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">Free site survey in Bangalore. Written quote within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-quote/cctv" className="bg-white text-brand-blue px-10 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all">
              Request Free Quote
            </Link>
            <a href="tel:+919445675619" className="border border-white text-white px-10 py-4 rounded-lg font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> Call: +91 94456 75619
            </a>
          </div>
          <p className="text-blue-200 text-sm mt-6">
            Also serving: <Link href="/cctv-installation-chennai" className="underline hover:text-white">Chennai</Link> ·{' '}
            <Link href="/cctv-installation-hosur" className="underline hover:text-white">Hosur</Link> ·{' '}
            <Link href="/cctv-installation-coimbatore" className="underline hover:text-white">Coimbatore</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
