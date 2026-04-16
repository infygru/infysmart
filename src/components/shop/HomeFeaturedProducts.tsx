import Link from 'next/link';
import { ArrowRight, ShoppingBag, Truck, ShieldCheck, BadgePercent } from 'lucide-react';
import type { Product } from '@/lib/directus';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
}

const trustBadges = [
  { icon: Truck, label: 'Fast Delivery', sub: 'Pan-India shipping' },
  { icon: ShieldCheck, label: '1-Year Warranty', sub: 'All products covered' },
  { icon: BadgePercent, label: 'Best Price', sub: 'Authorized dealer' },
  { icon: ShoppingBag, label: 'GST Invoice', sub: 'For every order' },
];

const placeholders = [
  { name: 'Hikvision 2MP Dome Camera', price: '₹2,499', badge: 'Best Seller' },
  { name: 'Dahua 4MP Bullet Camera', price: '₹3,799', badge: 'New' },
  { name: 'CP Plus 8Ch DVR Kit', price: '₹12,999', badge: 'Bundle' },
  { name: 'Hikvision 8Ch NVR', price: '₹8,499', badge: 'Sale' },
];

export default function HomeFeaturedProducts({ products }: Props) {
  return (
    <section className="bg-white py-14 border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#FF4500] uppercase tracking-widest mb-2 block">Online Store</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              Featured Products
            </h2>
            <p className="text-gray-500 text-sm mt-1">Hikvision · Dahua · CP Plus — Authorized Dealer</p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF4500] to-orange-500 hover:from-orange-600 hover:to-orange-400 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-orange-200/50 self-start sm:self-auto"
          >
            Browse All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {trustBadges.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3">
              <div className="w-9 h-9 rounded-lg bg-[#FF4500]/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-[#FF4500]" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">{label}</p>
                <p className="text-[10px] text-gray-500">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Fallback static cards when no featured products are set */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {placeholders.map((item) => (
              <Link
                key={item.name}
                href="/shop"
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all flex flex-col"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center relative">
                  <ShoppingBag className="w-10 h-10 text-gray-200" />
                  <span className="absolute top-2 left-2 bg-[#FF4500] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">{item.badge}</span>
                </div>
                <div className="p-3 flex flex-col gap-1">
                  <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 group-hover:text-[#FF4500] transition-colors">{item.name}</h3>
                  <p className="text-sm font-extrabold text-gray-900">{item.price}</p>
                  <p className="text-[9px] text-gray-400">Incl. taxes</p>
                  <span className="mt-1 w-full bg-gradient-to-r from-[#FF4500] to-orange-600 text-white text-xs font-bold py-2 rounded-lg text-center">
                    View in Shop
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 border-2 border-[#FF4500] text-[#FF4500] hover:bg-[#FF4500] hover:text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="text-gray-400 text-xs hidden sm:block">·</span>
          <p className="text-xs text-gray-500">
            Need help choosing?{' '}
            <a href="tel:+919445675619" className="text-[#FF4500] font-semibold hover:underline">
              Call +91 94456 75619
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
