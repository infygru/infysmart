'use client';

import { useState } from 'react';
import { SlidersHorizontal, X, CheckCircle2 } from 'lucide-react';
import ShopFilters from './ShopFilters';
import type { ProductCategory, ProductBrand } from '@/lib/directus';
import { useSearchParams } from 'next/navigation';

interface Props {
  categories: ProductCategory[];
  brands: ProductBrand[];
  totalCount: number;
}

export default function MobileFilterDrawer({ categories, brands, totalCount }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get('category') ?? '';
  const activeBrands = searchParams.getAll('brand');
  const activeMinPrice = searchParams.get('min_price') ?? '';
  const inStockOnly = searchParams.get('in_stock') === '1';
  const activeFilterCount = [activeCategory, ...activeBrands, activeMinPrice, inStockOnly ? '1' : ''].filter(Boolean).length;

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-orange-300 hover:text-[#FF4500] transition-colors shadow-sm active:scale-95"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters &amp; Sort
        {activeFilterCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-br from-[#FF4500] to-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      )}

      {/* Bottom sheet */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ maxHeight: '88vh' }}>

        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-gray-900">Filters &amp; Sort</h2>
            {activeFilterCount > 0 && (
              <span className="bg-gradient-to-r from-[#FF4500] to-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">
                {activeFilterCount}
              </span>
            )}
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-5 pb-28" style={{ maxHeight: 'calc(88vh - 120px)' }}>
          <ShopFilters
            categories={categories}
            brands={brands}
            totalCount={totalCount}
            onApply={() => setIsOpen(false)}
          />
        </div>

        {/* Sticky footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-4">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-2xl transition-all text-sm active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            Show {totalCount} Results
          </button>
        </div>
      </div>
    </>
  );
}
