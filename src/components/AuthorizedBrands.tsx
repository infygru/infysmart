'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// Static list of brands. 
// Since these rarely change, we can hardcode them or you can fetch them from Directus if preferred.
const BRANDS = [
  { name: "Hikvision", logo: "/brands/hikvision.png" }, // Ensure you upload these to public/brands/
  { name: "Dahua", logo: "/brands/dahua.png" },
  { name: "CP Plus", logo: "/brands/cpplus.png" },
  { name: "Tata Power", logo: "/brands/tata.png" },
  { name: "Luminous", logo: "/brands/luminous.png" },
  { name: "Nice", logo: "/brands/nice.png" },
  { name: "Honeywell", logo: "/brands/honeywell.png" },
];

export default function AuthorizedBrands() {
  // Duplicate list to ensure seamless looping without gaps
  const scrollingBrands = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section className="py-8 bg-white border-b border-slate-100 overflow-hidden">
      <div className="container mx-auto px-4 mb-6">
        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
          Authorized Technology Partners
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative flex w-full overflow-hidden">
        
        {/* Soft Fade Edges (Same as ClientStrip) */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Moving Track */}
        <motion.div
          className="flex items-center gap-16 md:gap-24 flex-nowrap pl-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40, // Same speed as ClientStrip for consistency
          }}
        >
          {scrollingBrands.map((brand, index) => (
            <div 
              key={`${brand.name}-${index}`} 
              className="relative h-10 w-32 shrink-0 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              {/* Logic: If you have the image, show it. Otherwise text fallback. */}
              {/* For now, using text fallback style to match your ClientStrip screenshot if images aren't loaded yet */}
              
              <span className="text-xl font-bold text-slate-300 uppercase tracking-tight whitespace-nowrap">
                {brand.name}
              </span>
              
              {/* Once you add logos to public folder, uncomment this:
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className="object-contain"
              />
              */}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}