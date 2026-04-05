import Link from 'next/link';
import { ShoppingCart, ArrowRight, Truck, FileText, ShieldCheck, BadgeCheck, Zap } from 'lucide-react';

const dealCards = [
  { category: 'CCTV Cameras', from: '₹1,999', tag: 'Best Seller', href: '/shop?category=cctv-cameras', color: 'from-blue-600/20 to-blue-800/10 border-blue-500/20' },
  { category: 'DVR / NVR Kits', from: '₹5,999', tag: 'Bundle Deal', href: '/shop?category=nvr-dvr', color: 'from-purple-600/20 to-purple-800/10 border-purple-500/20' },
  { category: 'Access Control', from: '₹3,499', tag: 'New Stock', href: '/shop?category=access-control', color: 'from-emerald-600/20 to-emerald-800/10 border-emerald-500/20' },
  { category: 'Solar CCTV', from: '₹8,999', tag: '4G + Solar', href: '/shop?category=solar-cctv', color: 'from-amber-600/20 to-amber-800/10 border-amber-500/20' },
];

const brands = ['Hikvision', 'Dahua', 'CP Plus', 'Honeywell', 'Essl'];

const perks = [
  { icon: Truck, text: 'Free shipping above ₹5,000' },
  { icon: FileText, text: 'GST invoice on every order' },
  { icon: ShieldCheck, text: '1-year manufacturer warranty' },
];

export default function HomeShopBanner() {
  return (
    <section className="bg-slate-900 relative overflow-hidden py-12 sm:py-16">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Glow accents */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#FF4500]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* ── LEFT: Text ── */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#FF4500]/15 border border-[#FF4500]/30 text-[#FF4500] text-xs font-bold px-3 py-1.5 rounded-full mb-5">
              <BadgeCheck className="w-3.5 h-3.5" />
              Official Authorized Dealer — Tamil Nadu &amp; Karnataka
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
              Security Cameras &amp;{' '}
              <span className="text-[#FF4500]">Equipment</span>
              <br />at Wholesale Prices
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md mb-6">
              Directly sourced from Hikvision, Dahua &amp; CP Plus. Same stock we install on-site — now available for direct purchase with GST invoice and pan-India delivery.
            </p>

            {/* Brand strip */}
            <div className="flex flex-wrap items-center gap-2 mb-7">
              <span className="text-slate-500 text-xs font-medium mr-1">Authorized for:</span>
              {brands.map((b) => (
                <span key={b} className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold px-3 py-1 rounded-lg">
                  {b}
                </span>
              ))}
            </div>

            {/* Perks */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              {perks.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-slate-400 text-xs">
                  <Icon className="w-3.5 h-3.5 text-[#FF4500] flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF4500] to-orange-500 hover:from-orange-600 hover:to-orange-400 text-white font-extrabold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#FF4500]/25"
              >
                <ShoppingCart className="w-4 h-4" /> Shop Now
              </Link>
              <Link
                href="/shop?sort=newest"
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-sm px-6 py-3 rounded-xl transition-all"
              >
                New Arrivals <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* ── RIGHT: Deal Cards ── */}
          <div className="grid grid-cols-2 gap-3">
            {dealCards.map(({ category, from, tag, href, color }) => (
              <Link
                key={category}
                href={href}
                className={`group relative bg-gradient-to-br ${color} border rounded-2xl p-5 hover:scale-[1.02] transition-all duration-200`}
              >
                <span className="inline-flex items-center gap-1 bg-[#FF4500]/20 text-[#FF4500] text-[10px] font-bold px-2 py-0.5 rounded-full mb-3">
                  <Zap className="w-2.5 h-2.5" /> {tag}
                </span>
                <p className="text-white font-bold text-sm leading-snug mb-1">{category}</p>
                <p className="text-slate-400 text-xs mb-3">Starting from</p>
                <p className="text-2xl font-extrabold text-white">{from}</p>
                <div className="mt-3 flex items-center gap-1 text-slate-400 text-xs group-hover:text-[#FF4500] transition-colors">
                  Browse <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs">
            📦 Same-day dispatch for orders placed before 2 PM · Insured shipping on all orders
          </p>
          <Link href="/shop" className="text-xs font-bold text-[#FF4500] hover:underline flex items-center gap-1">
            View all 200+ products <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
