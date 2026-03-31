import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin, CheckCircle2, Phone, Star, Clock, Truck } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export const metadata: Metadata = {
  title: 'CCTV Installation Service in Dharmapuri | Same-Day Visit | Infysmart',
  description: 'Professional CCTV camera installation in Dharmapuri starting ₹12,000. Same-day technician visit available. Serving Dharmapuri, Palacode, Pennagaram & surroundings. Authorized Hikvision & Dahua dealer. Free site survey.',
  keywords: [
    'CCTV installation Dharmapuri',
    'CCTV camera installation service Dharmapuri',
    'CCTV camera Dharmapuri',
    'CCTV installer Dharmapuri',
    'CCTV service Dharmapuri',
    'CCTV camera price Dharmapuri',
    'security camera Dharmapuri',
    'CCTV Palacode',
    'CCTV Pennagaram',
    'CCTV installation near me Dharmapuri',
    'Hikvision dealer Dharmapuri',
    'CCTV AMC Dharmapuri',
    'CCTV repair Dharmapuri',
    'factory CCTV Dharmapuri',
    'CCTV for shop Dharmapuri',
  ],
  alternates: { canonical: 'https://infysmart.com/cctv-installation-dharmapuri' },
  openGraph: {
    title: 'CCTV Installation in Dharmapuri | Same-Day Visit | Infysmart',
    description: 'Professional CCTV installation in Dharmapuri from ₹12,000. Same-day technician visit. Serving Dharmapuri, Palacode & surroundings. Free site survey.',
    url: 'https://infysmart.com/cctv-installation-dharmapuri',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CCTV Installation Dharmapuri by Infysmart' }],
  },
  twitter: {
    title: 'CCTV Installation Dharmapuri | Same-Day Visit | Infysmart',
    description: 'Professional CCTV for homes, shops & factories in Dharmapuri. Same-day technician. Free site survey.',
    images: ['/og-image.png'],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://infysmart.com' },
    { '@type': 'ListItem', position: 2, name: 'CCTV Services', item: 'https://infysmart.com/cctv' },
    { '@type': 'ListItem', position: 3, name: 'CCTV Installation Dharmapuri', item: 'https://infysmart.com/cctv-installation-dharmapuri' },
  ],
};

const localServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'CCTV Installation Service in Dharmapuri',
  serviceType: 'Security Camera Installation',
  description: 'Professional CCTV camera installation, repair, and AMC service for homes, shops, factories, and government facilities in Dharmapuri, Palacode, Pennagaram and surrounding areas.',
  provider: { '@id': 'https://infysmart.com/#organization' },
  areaServed: [
    { '@type': 'City', name: 'Dharmapuri' },
    { '@type': 'AdministrativeArea', name: 'Palacode' },
    { '@type': 'AdministrativeArea', name: 'Pennagaram' },
    { '@type': 'AdministrativeArea', name: 'Harur' },
    { '@type': 'AdministrativeArea', name: 'Nallampalli' },
    { '@type': 'AdministrativeArea', name: 'Pappireddipatti' },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '18',
    bestRating: '5',
  },
  offers: {
    '@type': 'Offer',
    name: 'CCTV Installation Dharmapuri — Same-Day Visit',
    priceCurrency: 'INR',
    price: '12000',
    description: '4-camera CCTV installation in Dharmapuri including cameras, DVR, HDD, cabling, installation and mobile setup',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does CCTV installation cost in Dharmapuri?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CCTV installation in Dharmapuri starts from ₹12,000 for a 4-camera home or shop setup including cameras, DVR, hard drive, cabling, professional installation, mobile app configuration, and 1-year warranty. We also provide free site surveys and written quotes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide same-day CCTV installation in Dharmapuri?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Infysmart provides same-day technician visits in Dharmapuri. Since we are based in Hosur (approx. 60km from Dharmapuri), our technicians can typically reach Dharmapuri on the same day for surveys and small installations. Full installations are completed within 1–2 days.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you cover Palacode and other areas near Dharmapuri?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We provide CCTV installation and service across Dharmapuri district including Palacode, Pennagaram, Harur, Nallampalli, Pappireddipatti, and surrounding taluks. We have completed projects in Palacode including factory and government facility installations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you sell and deliver CCTV cameras to Dharmapuri?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We provide same-day and next-day delivery of CCTV cameras, DVR/NVR, and accessories to Dharmapuri from our Hosur warehouse. You can also order online at infysmart.com/shop with pan-India delivery.',
      },
    },
  ],
};

const dharmapuriAreas = [
  'Dharmapuri Town', 'Palacode', 'Pennagaram', 'Harur',
  'Nallampalli', 'Pappireddipatti', 'Morappur', 'Kadathur',
  'Karimangalam', 'Bommidi', 'Thoppur', 'Hogenakkal',
];

export default function DharmapuriCCTVPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <section className="relative bg-slate-900 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-green-950/30" />
        <div className="container mx-auto px-6 relative z-10">
          <FadeIn direction="up" className="max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
              <Link href="/" className="hover:text-slate-300">Home</Link>
              <span>/</span>
              <Link href="/cctv" className="hover:text-slate-300">CCTV Services</Link>
              <span>/</span>
              <span className="text-slate-400">Dharmapuri</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/50 border border-green-700 text-green-300 text-xs font-bold uppercase tracking-widest mb-6">
              <MapPin className="w-3 h-3" /> Dharmapuri District, Tamil Nadu
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              CCTV Installation Service{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-400">
                in Dharmapuri
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-4 max-w-2xl leading-relaxed">
              Professional CCTV camera installation for homes, shops, factories, and government offices across Dharmapuri, Palacode, Pennagaram, and surroundings. Same-day technician visit available.
            </p>
            <div className="flex items-center gap-2 mb-8">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
              <span className="text-slate-300 text-sm font-semibold">4.9/5 — 18 verified installations in Dharmapuri</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/get-quote/cctv" className="bg-brand-blue text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg text-center">
                Get Free Dharmapuri Quote
              </Link>
              <a href="tel:+919445675619" className="px-8 py-4 rounded-lg font-bold text-white border border-slate-600 hover:bg-slate-800 transition-colors text-center flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> +91 94456 75619
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TRUST STRIPS */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: Clock, value: 'Same Day', label: 'Technician Visit' },
              { icon: Truck, value: '1-Day', label: 'Camera Delivery' },
              { icon: Star, value: '4.9/5', label: 'Rating in Dharmapuri' },
              { icon: CheckCircle2, value: '₹12,000', label: 'Starting Package' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 p-3">
                <Icon className="w-5 h-5 text-brand-blue mb-1" />
                <div className="text-xl font-extrabold text-slate-900">{value}</div>
                <div className="text-slate-400 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCAL EXPERTISE */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <FadeIn direction="right">
              <span className="text-brand-blue font-bold text-sm tracking-wide uppercase mb-2 block">Local Expertise</span>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Proven CCTV Projects in Dharmapuri & Palacode
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Infysmart has successfully completed CCTV installation projects in Dharmapuri district including a notable deployment in <strong>Palacode</strong>. Our Hosur base — just ~60 km from Dharmapuri — means our engineers can reach any location in the district the same day you call, with equipment ready to install.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                From small shops in Dharmapuri town to government-affiliated facilities in Palacode, we bring the same engineering standards used for our SIPCOT and TNPL projects. All installations come with documented handover reports, mobile app configuration, and 1-year on-site warranty.
              </p>
              <div className="space-y-3">
                {[
                  'Completed project in Palacode — proven local track record',
                  'Same-day technician visit from our Hosur base (~60 km)',
                  'Same-day / next-day CCTV camera delivery to Dharmapuri',
                  'Authorized Hikvision & Dahua dealer — genuine products only',
                  'GST invoice for businesses and government clients',
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
                <h3 className="text-xl font-bold mb-2 text-brand-orange">Areas Covered in Dharmapuri</h3>
                <p className="text-slate-400 text-sm mb-6">We serve all taluks and towns in Dharmapuri district.</p>
                <div className="grid grid-cols-2 gap-2">
                  {dharmapuriAreas.map((area) => (
                    <div key={area} className="flex items-center gap-2 text-slate-300 text-sm py-2 border-b border-slate-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                      {area}
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-green-900/30 border border-green-800 rounded-xl">
                  <div className="flex items-center gap-2 text-green-300 font-bold text-sm mb-1">
                    <Clock className="w-4 h-4" /> Same-Day Service Available
                  </div>
                  <p className="text-slate-400 text-xs">
                    Call before noon — our technician reaches Dharmapuri the same day. Camera delivery within 24 hours.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <FadeIn direction="up">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">CCTV Camera Price in Dharmapuri</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                All packages include supply, installation, mobile app setup, and 1-year on-site warranty. Same-day delivery of hardware available.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FadeIn direction="up" delay={0.1}>
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Home / Shop</h3>
                <p className="text-slate-500 text-sm mb-4">4 cameras — homes &amp; small shops</p>
                <div className="text-4xl font-extrabold text-brand-blue mb-1">₹12,000</div>
                <p className="text-slate-400 text-xs mb-6">onwards, incl. installation</p>
                <ul className="space-y-2 text-sm text-slate-600 mb-8 flex-1">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> 4× 2MP Cameras</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> 4-Channel DVR (H.265)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> 1TB Surveillance HDD</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Mobile Remote View</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> 1-Year On-site Warranty</li>
                </ul>
                <Link href="/get-quote/cctv" className="w-full block text-center bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-brand-blue transition-colors">
                  Get Free Quote
                </Link>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <div className="bg-brand-blue rounded-2xl p-8 shadow-xl h-full flex flex-col relative">
                <div className="absolute top-4 right-4 bg-white text-brand-blue text-xs font-extrabold px-3 py-1 rounded-full">POPULAR</div>
                <h3 className="text-xl font-bold text-white mb-2">Office / Showroom</h3>
                <p className="text-blue-200 text-sm mb-4">8 cameras — offices &amp; retail</p>
                <div className="text-4xl font-extrabold text-white mb-1">₹22,000</div>
                <p className="text-blue-200 text-xs mb-6">onwards, incl. installation</p>
                <ul className="space-y-2 text-sm text-blue-100 mb-8 flex-1">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white shrink-0" /> 8× 2MP HD Cameras</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white shrink-0" /> 8-Channel NVR (H.265+)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white shrink-0" /> 2TB HDD + Conduit Wiring</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white shrink-0" /> Motion Alerts + App</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white shrink-0" /> 1-Year On-site Warranty</li>
                </ul>
                <Link href="/get-quote/cctv" className="w-full block text-center bg-white text-brand-blue py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                  Get Free Quote
                </Link>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Factory / Godown</h3>
                <p className="text-slate-500 text-sm mb-4">16+ cameras — industries</p>
                <div className="text-4xl font-extrabold text-brand-orange mb-1">₹45,000</div>
                <p className="text-slate-400 text-xs mb-6">onwards, incl. installation</p>
                <ul className="space-y-2 text-sm text-slate-600 mb-8 flex-1">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> 16× 5MP IP Cameras</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> 16-Ch NVR + 4TB HDD</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> PoE Switch + Structured Cabling</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Perimeter PTZ Option</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> AMC Plan Available</li>
                </ul>
                <Link href="/get-quote/cctv" className="w-full block text-center bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-brand-blue transition-colors">
                  Custom Quote
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="container mx-auto px-6">
          <FadeIn direction="up">
            <h2 className="text-2xl font-bold text-slate-900 mb-3 text-center">CCTV for Every Property in Dharmapuri</h2>
            <p className="text-slate-500 text-center max-w-xl mx-auto mb-10">Tailored installations for the needs of Dharmapuri&apos;s homes, markets, and industries.</p>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                title: 'Homes & Apartments',
                desc: 'Entry gate, front door, parking and backyard cameras. Night vision and mobile remote view. AMC from ₹450/camera/year.',
              },
              {
                title: 'Shops & Showrooms',
                desc: 'Counter, billing area, storage room coverage. Anti-theft deterrence with visible cameras. Same-day installation.',
              },
              {
                title: 'Factories & Godowns',
                desc: 'Floor monitoring, entrance gate, perimeter coverage. IP67 weatherproof cameras for industrial environments.',
              },
              {
                title: 'Government & Panchayat Offices',
                desc: 'BIS-certified installations meeting government audit standards. Full documentation provided. Experienced in PSU-grade projects.',
              },
              {
                title: 'Schools & Colleges',
                desc: 'Entry gates, classrooms, corridors, and parking lots. Timed recording schedules. Ideal for government schools in Dharmapuri district.',
              },
              {
                title: 'Petrol Bunks & Lodges',
                desc: 'Forecourt cameras with license plate capture. Indoor and outdoor coverage. Remote monitoring on mobile.',
              },
            ].map((item) => (
              <FadeIn key={item.title} direction="up">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow h-full">
                  <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">CCTV Installation Dharmapuri — FAQ</h2>
          <div className="space-y-5">
            {[
              {
                q: 'How much does CCTV installation cost in Dharmapuri?',
                a: 'CCTV installation in Dharmapuri starts from ₹12,000 for a 4-camera home or shop setup. An 8-camera office system starts from ₹22,000. All prices include cameras, DVR/NVR, HDD, cabling, professional installation, and 1-year warranty. We provide free site surveys and written quotes with no obligation.',
              },
              {
                q: 'Do you provide same-day CCTV service in Dharmapuri?',
                a: 'Yes. Since we are based in Hosur (approximately 60 km from Dharmapuri), our technicians can reach Dharmapuri town and nearby areas including Palacode on the same day. Call before noon for a same-day visit. Camera hardware can also be delivered the same day or next day from our Hosur warehouse.',
              },
              {
                q: 'Do you service Palacode and other areas near Dharmapuri?',
                a: 'Yes. We cover the entire Dharmapuri district — Dharmapuri town, Palacode, Pennagaram, Harur, Nallampalli, Pappireddipatti, Morappur, Karimangalam, and surrounding taluks. We have already completed a project in Palacode, so we know the area well.',
              },
              {
                q: 'Can I buy CCTV cameras online and get delivery in Dharmapuri?',
                a: 'Yes. You can order Hikvision, Dahua, and CP Plus cameras from our online shop at infysmart.com/shop and receive same-day or next-day delivery to Dharmapuri from our Hosur warehouse. We dispatch with insured shipping and provide a GST invoice.',
              },
            ].map((item) => (
              <div key={item.q} className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brand-blue text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Free CCTV Quote in Dharmapuri</h2>
          <p className="text-blue-100 mb-2 max-w-xl mx-auto">
            Free site survey anywhere in Dharmapuri district. Same-day technician available.
          </p>
          <p className="text-blue-200 text-sm mb-8">Call before noon for same-day visit. Camera delivery within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-quote/cctv" className="bg-white text-brand-blue px-10 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all shadow-xl">
              Request Free Quote
            </Link>
            <a href="tel:+919445675619" className="border border-white text-white px-10 py-4 rounded-lg font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> Call: +91 94456 75619
            </a>
          </div>
          <p className="text-blue-200 text-sm mt-8">
            Also serving:{' '}
            <Link href="/cctv-installation-chennai" className="underline hover:text-white">Chennai</Link>{' · '}
            <Link href="/cctv-installation-hosur" className="underline hover:text-white">Hosur</Link>{' · '}
            <Link href="/cctv-installation-coimbatore" className="underline hover:text-white">Coimbatore</Link>{' · '}
            <Link href="/cctv-installation-bangalore" className="underline hover:text-white">Bangalore</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
