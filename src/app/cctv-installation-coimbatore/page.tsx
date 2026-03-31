import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin, CheckCircle2, Phone, Star } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export const metadata: Metadata = {
  title: 'CCTV Installation Service in Coimbatore | Best CCTV Camera | Infysmart',
  description: 'Professional CCTV camera installation in Coimbatore starting ₹12,000. Authorized Hikvision & Dahua dealer. Serving textile mills, factories, apartments & offices across Coimbatore. Free site survey.',
  keywords: [
    'CCTV installation Coimbatore',
    'CCTV camera installation service Coimbatore',
    'CCTV camera price Coimbatore',
    'CCTV installer Coimbatore',
    'CCTV for textile mills Coimbatore',
    'industrial CCTV Coimbatore',
    'CCTV for apartments Coimbatore',
    'CCTV service Coimbatore',
    'Hikvision dealer Coimbatore',
    'security camera installation Coimbatore',
    'CCTV AMC Coimbatore',
  ],
  alternates: { canonical: 'https://infysmart.com/cctv-installation-coimbatore' },
  openGraph: {
    title: 'CCTV Installation in Coimbatore | Infysmart',
    description: 'Professional CCTV installation in Coimbatore starting ₹12,000. Textile mills, factories & offices. Free site survey.',
    url: 'https://infysmart.com/cctv-installation-coimbatore',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CCTV Installation Coimbatore' }],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://infysmart.com' },
    { '@type': 'ListItem', position: 2, name: 'CCTV Services', item: 'https://infysmart.com/cctv' },
    { '@type': 'ListItem', position: 3, name: 'CCTV Installation Coimbatore', item: 'https://infysmart.com/cctv-installation-coimbatore' },
  ],
};

const localServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'CCTV Installation Service in Coimbatore',
  serviceType: 'Security Camera Installation',
  description: 'Professional CCTV installation for textile mills, factories, apartments, and commercial establishments across Coimbatore.',
  provider: { '@id': 'https://infysmart.com/#organization' },
  areaServed: [
    { '@type': 'City', name: 'Coimbatore' },
    { '@type': 'AdministrativeArea', name: 'Peelamedu' },
    { '@type': 'AdministrativeArea', name: 'Gandhipuram' },
    { '@type': 'AdministrativeArea', name: 'RS Puram' },
    { '@type': 'AdministrativeArea', name: 'Saibaba Colony' },
    { '@type': 'AdministrativeArea', name: 'Singanallur' },
    { '@type': 'AdministrativeArea', name: 'Tirupur' },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    reviewCount: '28',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does CCTV installation cost in Coimbatore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CCTV installation in Coimbatore starts from ₹12,000 for a 4-camera home or office setup. Industrial CCTV for textile mills and factories starts from ₹30,000. All packages include cameras, DVR/NVR, hard drive, cabling, professional installation, and 1-year warranty.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide CCTV installation for textile mills in Coimbatore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We specialize in CCTV systems for Coimbatore\'s textile and garment industry. Our solutions include dust-proof camera housings for spinning mills, wide-area coverage for weaving sheds, and perimeter security for export garment units. We comply with buyer audit CCTV requirements (BSCI, ISO).',
      },
    },
  ],
};

const coimbatoreAreas = [
  'Gandhipuram', 'RS Puram', 'Saibaba Colony', 'Peelamedu', 'Singanallur',
  'Ukkadam', 'Vadavalli', 'Kuniyamuthur', 'Kovaipudur', 'Thudiyalur',
  'Kinathukadavu', 'Pollachi', 'Sulur', 'Tirupur', 'Mettupalayam',
];

export default function CoimbatoreCCTVPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <section className="relative bg-slate-900 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/40" />
        <div className="container mx-auto px-6 relative z-10">
          <FadeIn direction="up" className="max-w-4xl">
            <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
              <Link href="/" className="hover:text-slate-300">Home</Link>
              <span>/</span>
              <Link href="/cctv" className="hover:text-slate-300">CCTV Services</Link>
              <span>/</span>
              <span className="text-slate-400">Coimbatore</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-700 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6">
              <MapPin className="w-3 h-3" /> Coimbatore, Tamil Nadu
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              CCTV Installation Service{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-400">
                in Coimbatore
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-4 max-w-2xl leading-relaxed">
              Professional CCTV installation for textile mills, IT companies, apartments, and retail stores across Coimbatore. Starting ₹12,000 with free site survey.
            </p>
            <div className="flex items-center gap-2 mb-8">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
              <span className="text-slate-300 text-sm font-semibold">4.7/5 — 28 verified installations in Coimbatore</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/get-quote/cctv" className="bg-brand-blue text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg text-center">
                Get Free Coimbatore Quote
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
              <h2 className="text-3xl font-bold text-slate-900 mb-6">CCTV Solutions for Coimbatore&apos;s Industry</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Coimbatore — India&apos;s textile and engineering capital — has unique surveillance requirements. From dusty spinning mill environments requiring IP67-rated cameras to multi-floor IT campuses needing network-grade NVR systems, Infysmart delivers tailored CCTV solutions for every sector.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                We work with garment exporters who need CCTV systems compliant with BSCI and ISO buyer audits, and with residential developers seeking smart apartment surveillance with mobile access for all residents.
              </p>
              <div className="space-y-3">
                {[
                  'Dust-proof & weatherproof cameras for textile mills',
                  'ISO & BSCI audit-compliant CCTV documentation',
                  'Apartment & gated community full-coverage systems',
                  'CCTV AMC service with quarterly maintenance visits',
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
                <h3 className="text-xl font-bold mb-6">Areas Covered in Coimbatore</h3>
                <div className="grid grid-cols-2 gap-2">
                  {coimbatoreAreas.map((area) => (
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
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">CCTV Camera Price in Coimbatore</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { type: 'Home / Apartment', price: '₹12,000', cameras: '4 cameras', desc: 'DVR + 1TB HDD + installation' },
              { type: 'Office / Showroom', price: '₹22,000', cameras: '8 cameras', desc: 'NVR + 2TB + conduit wiring' },
              { type: 'Mill / Factory', price: '₹30,000+', cameras: '12-16 cameras', desc: 'IP system + fiber cabling' },
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
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">FAQ — CCTV in Coimbatore</h2>
          <div className="space-y-5">
            {[
              {
                q: 'How much does CCTV installation cost in Coimbatore?',
                a: 'CCTV installation in Coimbatore starts from ₹12,000 for a basic 4-camera home setup. Office or showroom setups (8 cameras) start from ₹22,000. Mill and factory CCTV with IP cameras starts from ₹30,000. All prices include cameras, DVR/NVR, HDD, cabling and installation.',
              },
              {
                q: 'Do you install CCTV for textile mills and garment factories in Coimbatore?',
                a: 'Yes. We specialize in dust-proof IP67 camera installations for spinning mills and garment units in Coimbatore. Our systems are compatible with BSCI and ISO factory audit CCTV requirements, with structured cabling documentation.',
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
          <h2 className="text-3xl font-bold mb-4">Get Free CCTV Quote in Coimbatore</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">Free site survey in Coimbatore. Written quote within 24 hours. No obligation.</p>
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
            <Link href="/cctv-installation-bangalore" className="underline hover:text-white">Bangalore</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
