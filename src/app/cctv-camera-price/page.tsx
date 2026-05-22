import Link from 'next/link';
import { Metadata } from 'next';
import { ShoppingCart, Phone } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export const metadata: Metadata = {
  title: 'CCTV Camera Price List 2025 — Hikvision, Dahua, CP Plus | Infysmart',
  description: 'Complete CCTV camera price list 2025 in India. Hikvision 2MP from ₹1,200, Dahua 5MP from ₹3,500, PTZ cameras from ₹8,000. Installation packages from ₹12,000. Buy online or get installed.',
  keywords: [
    'CCTV camera price',
    'CCTV camera price list 2025',
    'Hikvision camera price India',
    'Dahua camera price',
    'CP Plus camera price',
    '2MP CCTV camera price',
    '5MP CCTV camera price',
    '4K CCTV camera price',
    'PTZ camera price India',
    'dome camera price India',
    'bullet camera price India',
    'CCTV installation cost India',
    'CCTV camera price Chennai',
    'NVR price India',
    'DVR price India',
    'CCTV full set price India',
  ],
  alternates: { canonical: 'https://infysmart.com/cctv-camera-price' },
  openGraph: {
    title: 'CCTV Camera Price List 2025 | Hikvision, Dahua, CP Plus | Infysmart',
    description: 'Complete CCTV camera price guide 2025. Hikvision, Dahua, CP Plus prices with installation costs. Buy online or get installed across India.',
    url: 'https://infysmart.com/cctv-camera-price',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CCTV Camera Price List India 2025' }],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://infysmart.com' },
    { '@type': 'ListItem', position: 2, name: 'CCTV Services', item: 'https://infysmart.com/cctv' },
    { '@type': 'ListItem', position: 3, name: 'CCTV Camera Price Guide', item: 'https://infysmart.com/cctv-camera-price' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the price of a CCTV camera in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CCTV camera prices in India range from ₹800 for a basic 1MP analog camera to ₹50,000+ for a 4K PTZ network camera. A standard 2MP IP dome camera (Hikvision/Dahua) costs ₹1,500–₹3,000. A complete 4-camera home kit with DVR and HDD costs ₹12,000–₹18,000 installed.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a Hikvision CCTV camera cost in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hikvision camera prices in India: 2MP Bullet camera ₹1,200–₹2,500, 2MP Dome camera ₹1,500–₹2,800, 5MP ColorVu camera ₹3,500–₹6,000, 8MP/4K camera ₹6,000–₹12,000, PTZ camera ₹8,000–₹35,000. These are supply-only prices. Installation is charged separately.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the cost of CCTV installation for a home in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Complete CCTV installation for a home (supply + installation) costs: 4-camera kit ₹12,000–₹18,000, 8-camera kit ₹22,000–₹35,000. This includes cameras, DVR, 1–2TB surveillance HDD, cabling, professional installation, mobile app setup, and 1-year warranty.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which CCTV brand is best in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hikvision is the #1 CCTV brand globally and in India, offering the best image quality and features. Dahua is a close second with similar quality at slightly lower prices. CP Plus is preferred for home use due to its widespread local service network. For enterprise use, Hikvision is recommended.',
      },
    },
  ],
};

const cameras = [
  {
    category: '2MP Cameras (Full HD 1080p)',
    items: [
      { name: 'Hikvision 2MP Bullet Camera (DS-2CD1023G0E)', price: '₹1,200 – ₹2,500', note: 'Most popular for home & shop' },
      { name: 'Hikvision 2MP Dome Camera (DS-2CD1123G0E)', price: '₹1,500 – ₹2,800', note: 'Indoor use, vandal-proof' },
      { name: 'Dahua 2MP Bullet Camera', price: '₹1,100 – ₹2,200', note: 'Budget-friendly alternative' },
      { name: 'CP Plus 2MP Dome Camera', price: '₹900 – ₹1,800', note: 'Good for home, local support' },
    ],
  },
  {
    category: '5MP Cameras (Super HD)',
    items: [
      { name: 'Hikvision 5MP ColorVu Bullet Camera', price: '₹3,500 – ₹6,000', note: '24/7 full-color, no IR flash' },
      { name: 'Hikvision 5MP AcuSense Dome Camera', price: '₹4,000 – ₹7,000', note: 'AI motion detection, fewer false alerts' },
      { name: 'Dahua 5MP WDR Bullet Camera', price: '₹3,000 – ₹5,500', note: 'Wide dynamic range for backlighting' },
      { name: 'CP Plus 5MP Bullet Camera', price: '₹2,800 – ₹5,000', note: 'Value option for offices' },
    ],
  },
  {
    category: '8MP / 4K Cameras',
    items: [
      { name: 'Hikvision 8MP 4K Bullet Camera', price: '₹6,000 – ₹12,000', note: 'For critical entry points, license plates' },
      { name: 'Dahua 8MP 4K Dome Camera', price: '₹5,500 – ₹11,000', note: 'Future-proof for large areas' },
      { name: 'Hikvision 4K PTZ Network Camera', price: '₹15,000 – ₹50,000', note: 'For perimeter, parking lots' },
    ],
  },
  {
    category: 'Specialty Cameras',
    items: [
      { name: '4G Solar PTZ Camera (Off-grid)', price: '₹12,000 – ₹25,000', note: 'No power/internet needed, for remote sites' },
      { name: 'Hikvision ANPR Camera (Number Plate)', price: '₹18,000 – ₹40,000', note: 'Vehicle entry/exit logging' },
      { name: 'Hikvision Fisheye 360° Camera', price: '₹8,000 – ₹18,000', note: 'Full-room coverage with 1 camera' },
      { name: 'Explosion-Proof Camera (ATEX)', price: '₹35,000+', note: 'Petrochemical, chemical plants' },
    ],
  },
];

const packages = [
  {
    name: 'Home Basic',
    cameras: '4× 2MP Bullet',
    recorder: '4-Ch DVR (H.265)',
    storage: '1TB Surveillance HDD',
    price: '₹12,000',
    note: 'Flats, small homes',
    popular: false,
  },
  {
    name: 'Office Standard',
    cameras: '8× 2MP HD Cameras',
    recorder: '8-Ch NVR (H.265+)',
    storage: '2TB HDD + Conduit Wiring',
    price: '₹22,000',
    note: 'Shops, offices',
    popular: true,
  },
  {
    name: 'Office HD',
    cameras: '8× 5MP IP Cameras',
    recorder: '8-Ch NVR + PoE',
    storage: '4TB HDD',
    price: '₹35,000',
    note: 'High-traffic offices',
    popular: false,
  },
  {
    name: 'Industrial',
    cameras: '16× 5MP IP Cameras',
    recorder: '16-Ch NVR + PoE Switch',
    storage: '4TB HDD + Fiber',
    price: '₹55,000',
    note: 'Factories, warehouses',
    popular: false,
  },
];

export default function CCTVPricePage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-6">
          <FadeIn direction="up" className="max-w-3xl">
            <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
              <Link href="/" className="hover:text-slate-300">Home</Link>
              <span>/</span>
              <Link href="/cctv" className="hover:text-slate-300">CCTV Services</Link>
              <span>/</span>
              <span className="text-slate-400">Price Guide</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              CCTV Camera Price List{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-400">2025</span>
            </h1>
            <p className="text-lg text-slate-300 mb-6 max-w-2xl">
              Complete price guide for Hikvision, Dahua, and CP Plus CCTV cameras in India — individual camera prices, full installation packages, and buying advice.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">Updated: March 2025</span>
              <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">GST inclusive prices</span>
              <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">Authorized dealer</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CAMERA PRICE TABLE */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">CCTV Camera Prices — Hikvision, Dahua, CP Plus</h2>
            <p className="text-slate-500 mb-10 max-w-2xl">
              Prices below are supply-only (camera unit price). Installation is charged separately starting ₹500/camera.
              <Link href="/shop" className="text-brand-blue hover:underline ml-1 font-semibold">Buy online →</Link>
            </p>
          </FadeIn>

          <div className="space-y-10">
            {cameras.map((group) => (
              <FadeIn key={group.category} direction="up">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-6 bg-brand-blue rounded-full inline-block" />
                  {group.category}
                </h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-bold text-slate-700">Camera Model</th>
                        <th className="text-left py-3 px-4 font-bold text-slate-700">Price (Supply Only)</th>
                        <th className="text-left py-3 px-4 font-bold text-slate-700 hidden md:table-cell">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.items.map((item, idx) => (
                        <tr key={item.name} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                          <td className="py-3 px-4 font-medium text-slate-800">{item.name}</td>
                          <td className="py-3 px-4 font-bold text-brand-blue">{item.price}</td>
                          <td className="py-3 px-4 text-slate-500 hidden md:table-cell">{item.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* INSTALLATION PACKAGES */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-5xl">
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Complete CCTV Installation Package Prices</h2>
            <p className="text-slate-500 mb-10 max-w-2xl">
              All-inclusive packages: cameras + DVR/NVR + HDD + cabling + professional installation + mobile app setup + 1-year warranty.
            </p>
          </FadeIn>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left py-4 px-5 font-bold">Package</th>
                  <th className="text-left py-4 px-5 font-bold">Cameras</th>
                  <th className="text-left py-4 px-5 font-bold hidden md:table-cell">Recorder</th>
                  <th className="text-left py-4 px-5 font-bold hidden lg:table-cell">Storage</th>
                  <th className="text-left py-4 px-5 font-bold">Total Price</th>
                  <th className="text-left py-4 px-5 font-bold hidden sm:table-cell">Best For</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg, idx) => (
                  <tr key={pkg.name} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} ${pkg.popular ? 'ring-2 ring-inset ring-brand-blue' : ''}`}>
                    <td className="py-4 px-5 font-bold text-slate-900">
                      {pkg.name}
                      {pkg.popular && <span className="ml-2 text-xs bg-brand-blue text-white px-2 py-0.5 rounded-full">Popular</span>}
                    </td>
                    <td className="py-4 px-5 text-slate-600">{pkg.cameras}</td>
                    <td className="py-4 px-5 text-slate-600 hidden md:table-cell">{pkg.recorder}</td>
                    <td className="py-4 px-5 text-slate-600 hidden lg:table-cell">{pkg.storage}</td>
                    <td className="py-4 px-5 font-extrabold text-brand-blue text-lg">{pkg.price}</td>
                    <td className="py-4 px-5 text-slate-500 hidden sm:table-cell">{pkg.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-400 text-xs mt-4">* Prices vary based on exact camera model, cabling length, and site complexity. Get a free written quote.</p>
        </div>
      </section>

      {/* BUYING GUIDE */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">How to Choose the Right CCTV Camera</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'For Home & Apartments',
                rec: '2MP dome or bullet cameras + 4-channel DVR',
                why: 'Sufficient resolution to identify faces and vehicles. Cost-effective. Easy to install in 1 day.',
                budget: '₹12,000–₹18,000 (4 cameras, installed)',
              },
              {
                title: 'For Retail Shops & Showrooms',
                rec: '5MP IP cameras + 8-channel NVR',
                why: 'Higher resolution to clearly read price tags and product labels on shelves. Wider dynamic range handles glass reflections.',
                budget: '₹22,000–₹40,000 (8 cameras, installed)',
              },
              {
                title: 'For Factories & Warehouses',
                rec: '5MP IP cameras + fiber optic network + 16-channel NVR',
                why: 'IP cameras with PoE eliminate long power cable runs. Fiber handles 100m+ distances. Ruggedized IP67 housings handle dust and moisture.',
                budget: '₹45,000–₹1,20,000 (16–32 cameras, installed)',
              },
              {
                title: 'For Remote Sites (Farms, Construction)',
                rec: '4G Solar PTZ Camera',
                why: 'No electricity or internet required. Built-in solar panel + 4G SIM provides 24/7 monitoring. Cloud storage included.',
                budget: '₹12,000–₹25,000 per camera',
              },
            ].map((item) => (
              <FadeIn key={item.title} direction="up">
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 h-full">
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-brand-blue text-sm font-semibold mb-2">Recommended: {item.rec}</p>
                  <p className="text-slate-500 text-sm mb-3">{item.why}</p>
                  <div className="bg-white rounded-lg px-3 py-2 border border-slate-200 text-sm">
                    <span className="text-slate-500">Typical budget: </span>
                    <span className="font-bold text-slate-900">{item.budget}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">CCTV Price FAQ</h2>
          <div className="space-y-5">
            {[
              {
                q: 'What is the price of a CCTV camera in India?',
                a: 'CCTV camera prices in India range from ₹800 for a basic analog camera to ₹50,000+ for a 4K PTZ network camera. A standard 2MP IP dome camera (Hikvision/Dahua) costs ₹1,500–₹3,000. A complete 4-camera home kit with DVR and HDD costs ₹12,000–₹18,000 including installation.',
              },
              {
                q: 'How much does Hikvision CCTV camera cost in India?',
                a: 'Hikvision camera prices: 2MP Bullet ₹1,200–₹2,500 · 2MP Dome ₹1,500–₹2,800 · 5MP ColorVu ₹3,500–₹6,000 · 8MP/4K ₹6,000–₹12,000 · PTZ ₹8,000–₹50,000. Buy from authorized dealer Infysmart to ensure genuine products with manufacturer warranty.',
              },
              {
                q: 'How much does complete CCTV installation cost in India?',
                a: 'A complete CCTV system (supply + installation) costs: 4-camera home setup ₹12,000–₹18,000 · 8-camera office setup ₹22,000–₹35,000 · 16-camera factory setup ₹45,000–₹80,000. Prices include cameras, recorder, hard drive, structured cabling, installation labor, mobile app setup, and 1-year warranty.',
              },
              {
                q: 'Which CCTV brand is best in India?',
                a: 'Hikvision is the world\'s #1 CCTV brand with the best image quality and features. Dahua offers similar quality at slightly lower prices. CP Plus is popular for home use due to widespread local service centers. For commercial and industrial use, Hikvision (ColorVu/AcuSense series) is the top recommendation.',
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
      <section className="py-14 bg-slate-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Exact Pricing for Your Site</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Prices depend on camera models, cabling length, and site complexity. Get a free written quote after our engineer visits your site.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-quote/cctv" className="bg-brand-blue text-white px-10 py-4 rounded-lg font-bold hover:bg-blue-700 transition-all">
              Get Free Quote
            </Link>
            <Link href="/shop" className="flex items-center justify-center gap-2 border border-slate-600 text-white px-10 py-4 rounded-lg font-bold hover:bg-slate-800 transition-all">
              <ShoppingCart className="w-4 h-4" /> Buy Cameras Online
            </Link>
            <a href="tel:+919445675619" className="flex items-center justify-center gap-2 border border-slate-600 text-white px-10 py-4 rounded-lg font-bold hover:bg-slate-800 transition-all">
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
