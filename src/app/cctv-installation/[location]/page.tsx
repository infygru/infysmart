import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { locationData, allSlugs } from './locationData';

interface Props {
  params: Promise<{ location: string }>;
}

export async function generateStaticParams() {
  return allSlugs.map((slug) => ({ location: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location } = await params;
  const data = locationData[location];
  if (!data) return {};

  const title = `CCTV Installation in ${data.name} | ${data.deliveryNote} Service | Infysmart`;
  const description = `Professional CCTV camera installation in ${data.name}, ${data.state}. ${data.deliveryNote} delivery. Hikvision, Dahua & CP Plus systems for homes, offices & industries. Starting ₹12,000. Call Infysmart.`;

  return {
    title,
    description,
    keywords: data.keywords,
    alternates: {
      canonical: `https://infysmart.com/cctv-installation/${data.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://infysmart.com/cctv-installation/${data.slug}`,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `CCTV Installation ${data.name}` }],
    },
    twitter: {
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const { location } = await params;
  const data = locationData[location];
  if (!data) notFound();

  const baseFaqs = [
    {
      q: `How much does CCTV installation cost in ${data.shortName}?`,
      a: `CCTV installation in ${data.shortName} starts at ₹12,000 for a basic 4-camera home system. Office packages start at ₹22,000 and industrial/factory installations at ₹45,000. Final pricing depends on camera count, cable length, and site conditions. We provide free on-site surveys and transparent quotes.`,
    },
    {
      q: `How long does CCTV installation take in ${data.shortName}?`,
      a: `A standard 4–8 camera installation is completed in a single day. Larger industrial systems may require 2–3 days. We confirm the timeline during the pre-installation survey.`,
    },
    {
      q: 'Which CCTV brands do you install?',
      a: 'We are authorized dealers for Hikvision, Dahua, and CP Plus — all three leading brands. We recommend the right brand and model based on your site requirements and budget.',
    },
    {
      q: 'Do you provide AMC (Annual Maintenance Contract) after installation?',
      a: 'Yes. We offer AMC plans from ₹450/camera/year covering preventive maintenance visits, HDD health checks, software updates, and priority support. AMC customers receive 24-hour response on faults.',
    },
    ...(data.faqExtra || []),
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `CCTV Camera Installation in ${data.name}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Infysmart',
      url: 'https://infysmart.com',
      telephone: '+919445675619',
    },
    areaServed: {
      '@type': data.type === 'city' ? 'City' : 'AdministrativeArea',
      name: data.name,
      containedInPlace: { '@type': 'State', name: data.state },
    },
    description: `Professional CCTV installation service in ${data.name}. Authorized Hikvision, Dahua & CP Plus dealer. Industrial, commercial and residential surveillance systems.`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: data.rating,
      reviewCount: String(data.reviewCount),
      bestRating: '5',
      worstRating: '1',
    },
    offers: [
      { '@type': 'Offer', name: 'Home CCTV Package', price: '12000', priceCurrency: 'INR', description: '4 cameras + DVR + installation' },
      { '@type': 'Offer', name: 'Office CCTV Package', price: '22000', priceCurrency: 'INR', description: '8 cameras + NVR + PoE switch + installation' },
      { '@type': 'Offer', name: 'Industrial CCTV Package', price: '45000', priceCurrency: 'INR', description: '16+ cameras + fiber + full documentation' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: baseFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://infysmart.com' },
      { '@type': 'ListItem', position: 2, name: 'CCTV Installation', item: 'https://infysmart.com/cctv' },
      { '@type': 'ListItem', position: 3, name: data.name, item: `https://infysmart.com/cctv-installation/${data.slug}` },
    ],
  };

  const packages = [
    { name: 'Home / Small Shop', price: '₹12,000', cameras: '4 cameras', extras: '1 TB DVR, mobile app, 1-yr warranty', color: 'border-brand-blue/30 bg-slate-800/60' },
    { name: 'Office / Mid-Size', price: '₹22,000', cameras: '8 cameras', extras: '2 TB NVR, PoE switch, remote access', color: 'border-brand-blue bg-brand-blue/10', badge: 'Most Popular' },
    { name: 'Industrial / Factory', price: '₹45,000+', cameras: '16+ cameras', extras: 'Fiber cabling, audit docs, 3-yr support', color: 'border-slate-600 bg-slate-800/60' },
  ];

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen bg-slate-900 text-white">

        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16 pb-14 border-b border-slate-700/50">
          <div className="container mx-auto px-4 max-w-5xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/cctv" className="hover:text-slate-300 transition-colors">CCTV</Link>
              <span>/</span>
              <span className="text-slate-400">{data.name}</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/30 rounded-full px-3 py-1 mb-4">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  <span className="text-brand-blue text-xs font-semibold">Serving {data.name}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                  CCTV Installation in {data.shortName}
                </h1>
                <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6">
                  {data.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="tel:+919445675619"
                    className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold px-6 py-3 rounded-xl transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    Call Now: +91 94456 75619
                  </a>
                  <Link
                    href="/get-quote/cctv"
                    className="inline-flex items-center gap-2 border border-slate-600 hover:border-brand-blue text-slate-300 hover:text-white font-bold px-6 py-3 rounded-xl transition-colors"
                  >
                    Get Free Quote
                  </Link>
                </div>
              </div>

              {/* Rating Card */}
              <div className="md:w-56 bg-slate-800/80 border border-slate-700 rounded-2xl p-6 text-center flex-shrink-0">
                <div className="text-4xl font-extrabold text-white mb-1">{data.rating}</div>
                <div className="flex justify-center gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.floor(parseFloat(data.rating)) ? 'text-amber-400' : 'text-slate-600'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
                <div className="text-slate-400 text-xs mb-4">Based on {data.reviewCount} reviews</div>
                <div className="border-t border-slate-700 pt-4">
                  <div className="text-xs text-slate-500 mb-1">Delivery</div>
                  <div className="text-sm font-bold text-green-400">{data.deliveryNote}</div>
                  <div className="text-xs text-slate-500 mt-2">{data.distanceNote}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Strip */}
        <section className="bg-slate-800/50 border-b border-slate-700/50 py-4">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-wrap justify-center md:justify-between gap-4 text-sm">
              {[
                { icon: '🏛️', text: 'Govt-Approved Vendor' },
                { icon: '✅', text: 'Hikvision / Dahua Authorized' },
                { icon: '🚚', text: `${data.deliveryNote} Delivery` },
                { icon: '🛡️', text: '1-Year Installation Warranty' },
                { icon: '🔧', text: 'AMC Plans Available' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-slate-300">
                  <span>{item.icon}</span>
                  <span className="text-xs font-semibold">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Focus */}
        <section className="py-10 border-b border-slate-800">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-3">
                  Industries &amp; Sectors We Serve in {data.shortName}
                </h2>
                <p className="text-slate-400 text-sm mb-4">
                  Our primary focus in {data.name}: <span className="text-slate-300 font-medium">{data.industryFocus}</span>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {data.useCases.map((uc) => (
                    <div key={uc.title} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
                      <div className="text-white text-sm font-bold mb-1">{uc.title}</div>
                      <div className="text-slate-400 text-xs leading-relaxed">{uc.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Areas We Cover */}
        <section className="py-10 border-b border-slate-800 bg-slate-900/50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-xl font-bold text-white mb-2">
              Areas Covered in {data.name}
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              We send technicians to all areas below — no extra travel charge within the zone.
            </p>
            <div className="flex flex-wrap gap-2">
              {data.areas.map((area) => (
                <span key={area} className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-lg">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Packages */}
        <section className="py-12 border-b border-slate-800">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">
              CCTV Installation Packages — {data.shortName}
            </h2>
            <p className="text-slate-400 text-sm text-center mb-8">
              Transparent pricing. No hidden charges. All-inclusive installation.
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {packages.map((pkg) => (
                <div key={pkg.name} className={`border rounded-2xl p-6 relative ${pkg.color}`}>
                  {pkg.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                      {pkg.badge}
                    </div>
                  )}
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-wide mb-2">{pkg.name}</div>
                  <div className="text-3xl font-extrabold text-white mb-1">{pkg.price}</div>
                  <div className="text-brand-blue font-semibold text-sm mb-3">{pkg.cameras}</div>
                  <div className="text-slate-400 text-xs leading-relaxed mb-5">{pkg.extras}</div>
                  <a
                    href="tel:+919445675619"
                    className="block text-center bg-slate-700 hover:bg-brand-blue text-white text-sm font-bold py-2.5 rounded-xl transition-colors"
                  >
                    Get Quote
                  </a>
                </div>
              ))}
            </div>
            <p className="text-slate-600 text-xs text-center mt-4">
              * Prices are starting estimates. Final quote issued after free site survey. GST applicable.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 border-b border-slate-800 bg-slate-900/50">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Frequently Asked Questions — CCTV in {data.shortName}
            </h2>
            <div className="space-y-4">
              {baseFaqs.map((faq) => (
                <div key={faq.q} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
                  <h3 className="text-white font-bold text-sm mb-2">{faq.q}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-gradient-to-r from-brand-blue/20 via-slate-800/50 to-brand-blue/10 border-b border-slate-700/50">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
              Ready to Secure Your Premises in {data.shortName}?
            </h2>
            <p className="text-slate-300 text-sm mb-8">
              {data.sameDay
                ? `We can visit your site today. Call before noon for same-day assessment. ${data.distanceNote}.`
                : `We typically schedule visits within 24 hours. ${data.distanceNote}.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919445675619"
                className="inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold px-8 py-4 rounded-xl text-base transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                Call +91 94456 75619
              </a>
              <Link
                href="/get-quote/cctv"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-white/60 text-white font-bold px-8 py-4 rounded-xl text-base transition-colors"
              >
                Request a Free Quote
              </Link>
            </div>
          </div>
        </section>

        {/* Related Cities */}
        <section className="py-10">
          <div className="container mx-auto px-4 max-w-5xl">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4 text-center">
              CCTV Installation — Other Locations We Serve
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {allSlugs
                .filter((s) => s !== data.slug)
                .slice(0, 12)
                .map((slug) => {
                  const loc = locationData[slug];
                  return (
                    <Link
                      key={slug}
                      href={`/cctv-installation/${slug}`}
                      className="text-xs text-slate-500 hover:text-brand-blue border border-slate-800 hover:border-brand-blue/40 rounded-lg px-3 py-1.5 transition-colors"
                    >
                      {loc.shortName}
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
