import Link from 'next/link';
import { Metadata } from 'next';
import { ShoppingCart, Phone, MapPin, CheckCircle2, Shield, Award, Truck } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export const metadata: Metadata = {
  title: 'Authorized CCTV Dealers in Chennai | Hikvision, Dahua, CP Plus | Infysmart',
  description: 'Buy CCTV cameras in Chennai from authorized dealers. Wholesale prices for Hikvision, Dahua, CP Plus. Fast delivery across Chennai. Call +91 94456 75619 for bulk orders.',
  keywords: [
    'CCTV Dealers Chennai',
    'CCTV Camera Sales Chennai',
    'Buy CCTV Camera Chennai',
    'Hikvision Dealer Chennai',
    'Dahua Dealer Chennai',
    'CP Plus Dealer Chennai',
    'CCTV Wholesale Chennai',
    'CCTV Shop Chennai',
    'Richie Street CCTV',
    'NVR Sales Chennai',
    'DVR Sales Chennai'
  ],
  alternates: { canonical: 'https://infysmart.com/cctv-dealers-chennai' },
  openGraph: {
    title: 'Authorized CCTV Dealers in Chennai | Infysmart',
    description: 'Get genuine Hikvision, Dahua, and CP Plus cameras at wholesale prices in Chennai. Fast delivery and installation available.',
    url: 'https://infysmart.com/cctv-dealers-chennai',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CCTV Dealers Chennai' }],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://infysmart.com' },
    { '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://infysmart.com/shop' },
    { '@type': 'ListItem', position: 3, name: 'CCTV Dealers Chennai', item: 'https://infysmart.com/cctv-dealers-chennai' },
  ],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Infysmart - CCTV Camera Dealers Chennai',
  description: 'Authorized wholesale and retail dealer for Hikvision, Dahua, CP Plus CCTV cameras and security systems in Chennai.',
  url: 'https://infysmart.com/cctv-dealers-chennai',
  telephone: '+919445675619',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '16, Sarathi Nagar, Saidapet',
    addressLocality: 'Chennai',
    addressRegion: 'TN',
    postalCode: '600015',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '13.0213',
    longitude: '80.2231'
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00'
    }
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Where can I buy genuine Hikvision cameras in Chennai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Infysmart is an authorized dealer for Hikvision in Chennai. We provide genuine products with GST invoices and full manufacturer warranties. You can buy online or request delivery anywhere in Chennai.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you supply CCTV cameras at wholesale prices in Chennai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we offer competitive wholesale pricing for bulk orders, system integrators, and large projects like apartment complexes and factories across Chennai.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you deliver CCTV equipment to OMR and Ambattur?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. We provide fast delivery of CCTV cameras, DVRs, NVRs, and cabling across all Chennai localities including OMR, Ambattur, Velachery, Anna Nagar, and Guindy.',
      },
    },
  ],
};

const brands = [
  { name: 'Hikvision', desc: '#1 Global Brand. Best for industrial & commercial use.' },
  { name: 'Dahua', desc: 'High-quality alternative with excellent night vision tech.' },
  { name: 'CP Plus', desc: 'Popular for residential and small retail setups.' },
  { name: 'Honeywell', desc: 'Premium brand for enterprise and government projects.' },
];

export default function ChennaiDealersPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <section className="bg-slate-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/40" />
        <div className="container mx-auto px-6 relative z-10">
          <FadeIn direction="up" className="max-w-4xl">
            <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
              <Link href="/" className="hover:text-slate-300">Home</Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-slate-300">Shop</Link>
              <span>/</span>
              <span className="text-slate-400">Chennai Dealers</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-700 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6">
              <Award className="w-3 h-3" /> Authorized Distributors
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Leading CCTV Camera{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-400">
                Dealers in Chennai
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
              Skip the middleman. Get 100% genuine Hikvision, Dahua, and CP Plus cameras directly from authorized dealers in Chennai. Wholesale pricing available for bulk buyers and factories.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="bg-brand-blue text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" /> Browse Products
              </Link>
              <a href="tel:+919445675619" className="border border-slate-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" /> Call for Bulk Rates
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHY BUY FROM US */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Genuine Products', desc: '100% authentic equipment with original GST bills.' },
              { icon: Award, title: 'Authorized Dealer', desc: 'Direct partnerships with Hikvision & Dahua.' },
              { icon: Truck, title: 'Fast Chennai Delivery', desc: 'Quick dispatch to OMR, Ambattur, and city limits.' },
              { icon: CheckCircle2, title: 'Warranty Support', desc: 'Hassle-free replacement for defective units under warranty.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-4">
                <div className="w-16 h-16 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS & PRODUCTS */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Brands We Supply</h2>
            <p className="text-slate-600">We stock the entire range of products from top security manufacturers.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {brands.map((brand) => (
              <div key={brand.name} className="bg-white p-6 rounded-xl border border-slate-200 flex items-start gap-4 hover:shadow-md transition">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 font-bold text-slate-400">
                  {brand.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">{brand.name}</h3>
                  <p className="text-sm text-slate-500">{brand.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-brand-blue rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <h3 className="text-2xl font-bold mb-3">Looking for a specific model?</h3>
              <p className="text-blue-100 mb-0">
                Whether you need a specialized 4K ColorVu IP camera or a heavy-duty NVR, we can source it quickly through our distributor network. 
              </p>
            </div>
            <Link href="/get-quote/cctv" className="bg-white text-brand-blue px-8 py-4 rounded-xl font-bold whitespace-nowrap hover:bg-blue-50 transition shadow-lg shrink-0">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Chennai CCTV Sales FAQ</h2>
          <div className="space-y-5">
            {[
              {
                q: 'Where are you located in Chennai?',
                a: 'We are headquartered in Saidapet, Chennai, allowing us easy access to deliver products across the city, from Mount Road and Richie Street buyers to IT corridors in OMR.',
              },
              {
                q: 'Do you sell only cameras, or do you install them too?',
                a: 'We do both! You can purchase equipment directly from us (Supply-only) if you have your own technicians, or you can opt for our complete Supply & Installation packages.',
              },
              {
                q: 'What is the warranty period on CCTV cameras?',
                a: 'Most standard Hikvision and Dahua cameras come with a 1 to 2-year manufacturer warranty. Because we are authorized dealers, you get the full official warranty, not third-party seller warranties.',
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

      {/* FOOTER CTA */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="container mx-auto px-6">
          <MapPin className="w-10 h-10 text-brand-orange mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to Buy CCTV Cameras in Chennai?</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Check our online store or call us directly for bulk pricing and project inquiries.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/shop" className="bg-brand-orange text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition">
              Go to Shop
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
