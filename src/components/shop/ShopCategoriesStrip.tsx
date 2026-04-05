import Link from 'next/link';
import { Camera, Monitor, Cpu, Wifi, DoorOpen, Zap, ChevronRight } from 'lucide-react';

const categories = [
  { label: 'CCTV Cameras', slug: 'cctv-cameras', icon: Camera, color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { label: 'NVR / DVR', slug: 'nvr-dvr', icon: Monitor, color: 'bg-purple-50 text-purple-600 border-purple-100' },
  { label: 'Access Control', slug: 'access-control', icon: DoorOpen, color: 'bg-green-50 text-green-600 border-green-100' },
  { label: 'Networking', slug: 'networking', icon: Wifi, color: 'bg-cyan-50 text-cyan-600 border-cyan-100' },
  { label: 'Solar CCTV', slug: 'solar-cctv', icon: Zap, color: 'bg-yellow-50 text-yellow-600 border-yellow-100' },
  { label: 'Biometric', slug: 'biometric', icon: Cpu, color: 'bg-orange-50 text-orange-600 border-orange-100' },
];

export default function ShopCategoriesStrip() {
  return (
    <section className="bg-gray-50 py-10 border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">Shop by Category</h2>
            <p className="text-xs text-gray-500 mt-0.5">Everything for your security setup</p>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-[#FF4500] hover:underline flex items-center gap-1"
          >
            All categories <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {categories.map(({ label, slug, icon: Icon, color }) => (
            <Link
              key={slug}
              href={`/shop?category=${slug}`}
              className="group flex flex-col items-center gap-2.5 bg-white border border-gray-200 rounded-2xl p-4 hover:border-orange-300 hover:shadow-md transition-all"
            >
              <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-gray-700 text-center leading-tight group-hover:text-[#FF4500] transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
