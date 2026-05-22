import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin, CheckCircle2, Phone, Star, Shield, Wrench, Clock } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export const metadata: Metadata = {
  title: 'CCTV Installation Service in Chennai | Best CCTV Camera Price | Infysmart',
  description: 'Professional CCTV camera installation in Chennai starting ₹12,000. Authorized Hikvision & Dahua dealer. Serving apartments, offices, factories across Chennai, Anna Nagar, Velachery, OMR, Porur & suburbs. Free site survey.',
  keywords: [
    'CCTV installation Chennai',
    'CCTV camera installation service Chennai',
    'CCTV camera price Chennai',
    'buy CCTV camera Chennai',
    'CCTV installer Chennai',
    'best CCTV company Chennai',
    'CCTV for apartments Chennai',
    'CCTV for office Chennai',
    'CCTV service center Chennai',
    'Hikvision dealer Chennai',
    'Dahua camera dealer Chennai',
    'CCTV AMC service Chennai',
    'CCTV repair Chennai',
    'security camera installation Chennai',
    'CCTV Anna Nagar',
    'CCTV Velachery',
    'CCTV OMR',
    'CCTV Tambaram',
    'CCTV Adyar',
  ],
  alternates: { canonical: 'https://infysmart.com/cctv-installation-chennai' },
  openGraph: {
    title: 'CCTV Installation Service in Chennai | Infysmart',
    description: 'Professional CCTV camera installation starting ₹12,000 across Chennai. Authorized Hikvision & Dahua dealer. Free site survey.',
    url: 'https://infysmart.com/cctv-installation-chennai',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CCTV Installation Chennai by Infysmart' }],
  },
  twitter: {
    title: 'CCTV Installation Chennai | Starting ₹12,000 | Infysmart',
    description: 'Professional CCTV for homes, offices & factories in Chennai. Free site survey.',
    images: ['/og-image.png'],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://infysmart.com' },
    { '@type': 'ListItem', position: 2, name: 'CCTV Services', item: 'https://infysmart.com/cctv' },
    { '@type': 'ListItem', position: 3, name: 'CCTV Installation Chennai', item: 'https://infysmart.com/cctv-installation-chennai' },
  ],
};

const localServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'CCTV Installation Service in Chennai',
  serviceType: 'Security Camera Installation',
  description: 'Professional CCTV camera installation, repair, and AMC service for homes, apartments, offices, and industrial facilities across Chennai and suburbs.',
  provider: { '@id': 'https://infysmart.com/#organization' },
  areaServed: [
    { '@type': 'City', name: 'Chennai' },
    { '@type': 'AdministrativeArea', name: 'Anna Nagar' },
    { '@type': 'AdministrativeArea', name: 'Velachery' },
    { '@type': 'AdministrativeArea', name: 'Tambaram' },
    { '@type': 'AdministrativeArea', name: 'Porur' },
    { '@type': 'AdministrativeArea', name: 'Adyar' },
    { '@type': 'AdministrativeArea', name: 'OMR' },
    { '@type': 'AdministrativeArea', name: 'Ambattur' },
    { '@type': 'AdministrativeArea', name: 'Guindy' },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '93',
    bestRating: '5',
  },
  offers: {
    '@type': 'Offer',
    name: 'Basic Home CCTV Installation Chennai',
    priceCurrency: 'INR',
    price: '12000',
    description: '4-camera CCTV installation package in Chennai including cameras, DVR, HDD and mobile setup',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does CCTV installation cost in Chennai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CCTV installation in Chennai starts from ₹12,000 for a 4-camera home setup. An 8-camera office system costs ₹22,000 onwards. Industrial setups with 16+ cameras start from ₹45,000. Prices include cameras, DVR/NVR, hard drive, cabling, and professional installation with 1-year warranty.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which areas in Chennai do you serve for CCTV installation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We provide CCTV installation across all Chennai localities including Anna Nagar, Adyar, Velachery, OMR, Porur, Tambaram, Chromepet, T. Nagar, Kodambakkam, Ambattur, Guindy, Perambur, and all suburban areas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide same-day CCTV installation in Chennai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we offer same-day and next-day installation for standard home and office setups in Chennai. After your free site survey and quote approval, our technicians are typically deployed within 24–48 hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are you an authorized Hikvision dealer in Chennai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Infysmart (a unit of Infygru Private Limited) is an authorized dealer for Hikvision, Dahua, and CP Plus cameras in Tamil Nadu. We supply genuine branded products with full manufacturer warranty and provide authorized service support.',
      },
    },
  ],
};

const chennaiareas = [
  'Anna Nagar', 'Adyar', 'Besant Nagar', 'T. Nagar', 'Kodambakkam',
  'Velachery', 'Guindy', 'Porur', 'Valasaravakkam', 'Mogappair',
  'Ambattur', 'Perambur', 'Kolathur', 'Korattur', 'Madhavaram',
  'Tambaram', 'Chromepet', 'Pallavaram', 'Perungudi', 'Sholinganallur',
  'OMR (Old Mahabalipuram Road)', 'ECR (East Coast Road)', 'Sriperumbudur', 'Oragadam',
];

export default function ChennaiCCTVPage() {
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
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
              <Link href="/" className="hover:text-slate-300">Home</Link>
              <span>/</span>
              <Link href="/cctv" className="hover:text-slate-300">CCTV Services</Link>
              <span>/</span>
              <span className="text-slate-400">Chennai</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-700 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6">
              <MapPin className="w-3 h-3" /> Chennai &amp; Suburbs
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              CCTV Installation Service{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-400">
                in Chennai
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-4 max-w-2xl leading-relaxed">
              Professional CCTV camera installation for homes, apartments, offices, shops, and factories across Chennai. Authorized Hikvision &amp; Dahua dealer with 4.8★ rating from 93+ verified installations.
            </p>
            <div className="flex items-center gap-2 mb-8">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
              <span className="text-slate-300 text-sm font-semibold">4.8/5 — 93 verified installations in Chennai</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/get-quote/cctv" className="bg-brand-blue text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg text-center">
                Get Free Chennai Quote
              </Link>
              <a href="tel:+919445675619" className="px-8 py-4 rounded-lg font-bold text-white border border-slate-600 hover:bg-slate-800 transition-colors text-center flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> +91 94456 75619
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* KEY STATS */}
      <section className="py-10 bg-white border-b border-slate-200">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '93+', label: 'Installations in Chennai' },
              { value: '₹12,000', label: 'Starting Package Price' },
              { value: '1 Day', label: 'Typical Install Time' },
              { value: '24/7', label: 'AMC Support Available' },
            ].map((stat) => (
              <div key={stat.label} className="p-4">
                <div className="text-3xl font-extrabold text-brand-blue mb-1">{stat.value}</div>
                <div className="text-slate-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <FadeIn direction="up">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">CCTV Camera Price in Chennai</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                All-inclusive packages with cameras, DVR/NVR, hard drive, cabling, professional installation, mobile app setup, and 1-year on-site warranty.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FadeIn direction="up" delay={0.1}>
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Home / Apartment</h3>
                <p className="text-slate-500 text-sm mb-4">4 cameras — flats &amp; villas</p>
                <div className="text-4xl font-extrabold text-brand-blue mb-1">₹12,000</div>
                <p className="text-slate-400 text-xs mb-6">onwards, incl. installation</p>
                <ul className="space-y-2 text-sm text-slate-600 mb-8 flex-1">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> 4× 2MP IR Cameras</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> 4-Channel DVR (H.265)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> 1TB HDD</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Mobile Remote View</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> 1-Year Warranty</li>
                </ul>
                <Link href="/get-quote/cctv" className="w-full block text-center bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-brand-blue transition-colors">
                  Get Quote
                </Link>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <div className="bg-brand-blue rounded-2xl p-8 shadow-xl h-full flex flex-col relative">
                <div className="absolute top-4 right-4 bg-white text-brand-blue text-xs font-extrabold px-3 py-1 rounded-full">POPULAR</div>
                <h3 className="text-xl font-bold text-white mb-2">Office / Shop</h3>
                <p className="text-blue-200 text-sm mb-4">8 cameras — retail &amp; offices</p>
                <div className="text-4xl font-extrabold text-white mb-1">₹22,000</div>
                <p className="text-blue-200 text-xs mb-6">onwards, incl. installation</p>
                <ul className="space-y-2 text-sm text-blue-100 mb-8 flex-1">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white shrink-0" /> 8× 2MP HD Cameras</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white shrink-0" /> 8-Channel NVR (H.265+)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white shrink-0" /> 2TB HDD + Conduit Wiring</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white shrink-0" /> Motion Alerts + App</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white shrink-0" /> 1-Year Warranty</li>
                </ul>
                <Link href="/get-quote/cctv" className="w-full block text-center bg-white text-brand-blue py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                  Get Quote
                </Link>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Factory / Industrial</h3>
                <p className="text-slate-500 text-sm mb-4">16+ cameras — warehouses</p>
                <div className="text-4xl font-extrabold text-brand-orange mb-1">₹45,000</div>
                <p className="text-slate-400 text-xs mb-6">onwards, incl. installation</p>
                <ul className="space-y-2 text-sm text-slate-600 mb-8 flex-1">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> 16× 5MP IP Cameras</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> 16-Ch NVR + 4TB HDD</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> PoE Switch + Fiber Optic</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> PTZ Perimeter Option</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> AMC Plan Included</li>
                </ul>
                <Link href="/get-quote/cctv" className="w-full block text-center bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-brand-blue transition-colors">
                  Custom Quote
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Choose Infysmart for CCTV Installation in Chennai?</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Chennai&apos;s rapid urban expansion — from IT corridors on OMR to apartment clusters in Velachery — demands surveillance solutions that are both technically robust and operationally reliable. Infysmart has deployed over 90 CCTV systems across Chennai, from gated communities in Adyar to manufacturing units in Ambattur Industrial Estate.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Shield, text: 'Authorized Hikvision, Dahua & CP Plus dealer in Tamil Nadu' },
                  { icon: Clock, text: 'Free site survey within 24 hours — no obligation' },
                  { icon: Wrench, text: 'Technicians available across all Chennai zones' },
                  { icon: CheckCircle2, text: 'GST invoice with full manufacturer warranty' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-brand-blue" />
                    </div>
                    <p className="text-slate-700 font-medium text-sm pt-1.5">{text}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <div className="bg-slate-900 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6">Chennai Areas We Serve</h3>
                <div className="grid grid-cols-2 gap-2">
                  {chennaiareas.map((area) => (
                    <div key={area} className="flex items-center gap-2 text-slate-300 text-sm py-1 border-b border-slate-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                      {area}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6">
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">CCTV Installation for Every Need in Chennai</h2>
            <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
              Tailored CCTV solutions for different property types across Chennai.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Apartment & Gated Community CCTV',
                desc: 'Full-complex coverage: entrance gate, lobby, stairwells, parking, lift cameras. Individual mobile access for flat owners. AMC plans from ₹450/camera/year.',
              },
              {
                title: 'Retail Shop & Showroom CCTV',
                desc: 'Indoor dome cameras for billing areas and stock rooms. POS-facing cameras for dispute resolution. Anti-theft coverage with night vision.',
              },
              {
                title: 'Office & IT Park CCTV',
                desc: 'Server room cameras, reception, meeting rooms, and entry/exit monitoring. Integration with biometric access control systems.',
              },
              {
                title: 'Restaurant & Hotel CCTV',
                desc: 'Kitchen, dining area, and cash counter surveillance. Cloud backup for remote management across multiple branches.',
              },
              {
                title: 'Factory & Warehouse CCTV — Ambattur',
                desc: 'Industrial-grade IP cameras for Ambattur Industrial Estate and Guindy factories. Perimeter PTZ cameras, fiber optic cabling, SIPCOT compliance.',
              },
              {
                title: 'School & College Campus CCTV',
                desc: 'Entry gates, corridors, labs, and parking area coverage. Timed recording schedules aligned with school hours. Government-approved installations.',
              },
            ].map((item) => (
              <FadeIn key={item.title} direction="up">
                <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">CCTV Installation Chennai — FAQ</h2>
          <div className="space-y-5">
            {[
              {
                q: 'How much does CCTV installation cost in Chennai?',
                a: 'CCTV installation in Chennai starts from ₹12,000 for a 4-camera home package. An 8-camera office setup costs ₹22,000 onwards. All prices include cameras, DVR/NVR, HDD, cabling, professional installation, and 1-year warranty. We provide free written quotes after a site visit.',
              },
              {
                q: 'Which areas in Chennai do you cover for CCTV installation?',
                a: 'We cover all Chennai localities: Anna Nagar, Adyar, Velachery, OMR, ECR, Porur, Tambaram, Chromepet, T. Nagar, Kodambakkam, Ambattur, Guindy, Perambur, Kolathur, Madhavaram, Sholinganallur, Perungudi, Sriperumbudur, Oragadam, and all suburban areas.',
              },
              {
                q: 'Do you provide same-day CCTV installation in Chennai?',
                a: 'Yes. For standard 4–8 camera setups in Chennai, our technicians can be dispatched within 24–48 hours of survey and quote approval. We also offer emergency CCTV repair service with same-day response for existing systems.',
              },
              {
                q: 'Are you an authorized Hikvision and Dahua dealer in Chennai?',
                a: 'Yes. Infysmart (unit of Infygru Private Limited) is an authorized dealer for Hikvision, Dahua, and CP Plus in Tamil Nadu. All products come with genuine manufacturer warranty. We also provide authorized service support and spare parts.',
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
          <h2 className="text-3xl font-bold mb-4">Get Your Free CCTV Quote in Chennai</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Free site survey anywhere in Chennai. Detailed written quote within 24 hours. No obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-quote/cctv" className="bg-white text-brand-blue px-10 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all shadow-xl">
              Request Free Quote
            </Link>
            <a href="tel:+919445675619" className="border border-white text-white px-10 py-4 rounded-lg font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> Call: +91 94456 75619
            </a>
          </div>
          <div className="mt-10 pt-6 border-t border-blue-800/50 flex flex-col md:flex-row items-center justify-center gap-4 text-blue-200 text-sm">
            <span>More Chennai Services:</span>
            <Link href="/cctv-amc-chennai" className="underline hover:text-white font-medium">CCTV AMC Chennai</Link>
            <span className="hidden md:inline">•</span>
            <Link href="/cctv-dealers-chennai" className="underline hover:text-white font-medium">CCTV Dealers & Sales Chennai</Link>
          </div>
          <p className="text-blue-200/70 text-xs mt-6">Also serving: <Link href="/cctv-installation-hosur" className="underline hover:text-white">Hosur</Link> · <Link href="/cctv-installation-coimbatore" className="underline hover:text-white">Coimbatore</Link> · <Link href="/cctv-installation-bangalore" className="underline hover:text-white">Bangalore</Link></p>
        </div>
      </section>
    </main>
  );
}
