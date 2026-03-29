'use client';

import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import ShopFilters from './ShopFilters';
import type { ProductCategory, ProductBrand } from '@/lib/directus';

interface Props {
  categories: ProductCategory[];
  brands: ProductBrand[];
  totalCount: number;
}

export default function MobileFilterDrawer({ categories, brands, totalCount }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm font-semibold text-zinc-300 hover:border-[#16a34a]/50 hover:text-white transition-colors"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters &amp; Sort
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-[#111] rounded-t-2xl max-h-[85vh] overflow-y-auto transform transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="sticky top-0 bg-[#111] flex items-center justify-between px-5 py-4 border-b border-white/[0.06] z-10">
          <h2 className="font-bold text-white">Filters &amp; Sort</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-5 pb-8">
          <ShopFilters categories={categories} brands={brands} totalCount={totalCount} />
        </div>
      </div>
    </>
  );
}
