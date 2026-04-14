'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getAssetUrl } from '@/lib/directus';
import type { ProductBrand } from '@/lib/directus';

interface Props {
  brands: ProductBrand[];
}

export default function AuthorizedBrands({ brands }: Props) {
  // Fallback to empty array if no brands yet
  const list = brands.length > 0 ? brands : [];

  // Duplicate enough times to fill the marquee seamlessly
  const scrollingBrands = [...list, ...list, ...list, ...list];

  return (
    <section className="py-8 bg-white border-b border-slate-100 overflow-hidden">
      <div className="container mx-auto px-4 mb-6">
        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
          Authorized Technology Partners
        </p>
      </div>

      <div className="relative flex w-full overflow-hidden">
        {/* Soft fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <motion.div
          className="flex items-center gap-16 md:gap-24 flex-nowrap pl-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 40 }}
        >
          {scrollingBrands.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="relative h-10 w-32 shrink-0 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              {brand.logo ? (
                <Image
                  src={getAssetUrl(brand.logo, { height: '40', fit: 'contain' })}
                  alt={brand.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              ) : (
                <span className="text-sm font-bold text-slate-400 uppercase tracking-tight whitespace-nowrap">
                  {brand.name}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
