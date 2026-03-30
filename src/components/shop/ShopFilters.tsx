'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useTransition, useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import type { ProductCategory, ProductBrand } from '@/lib/directus';
import { formatPrice } from '@/lib/utils';

interface ShopFiltersProps {
  categories: ProductCategory[];
  brands: ProductBrand[];
  totalCount: number;
  onApply?: () => void;
}

const PRICE_RANGES = [
  { label: 'Under ₹5,000', min: 0, max: 5000 },
  { label: '₹5,000 – ₹15,000', min: 5000, max: 15000 },
  { label: '₹15,000 – ₹50,000', min: 15000, max: 50000 },
  { label: '₹50,000 – ₹1,00,000', min: 50000, max: 100000 },
  { label: 'Above ₹1,00,000', min: 100000, max: 0 },
];

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Newest First', value: 'newest' },
  { label: 'Name: A–Z', value: 'name_asc' },
];

export default function ShopFilters({ categories, brands, totalCount, onApply }: ShopFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [expandedSections, setExpandedSections] = useState({
    categories: true, brands: true, price: true, availability: true,
  });

  const toggleSection = (key: keyof typeof expandedSections) =>
    setExpandedSections((s) => ({ ...s, [key]: !s[key] }));

  const activeCategory = searchParams.get('category') ?? '';
  const activeBrands = searchParams.getAll('brand');
  const activeMinPrice = searchParams.get('min_price') ?? '';
  const activeMaxPrice = searchParams.get('max_price') ?? '';
  const activeSort = searchParams.get('sort') ?? 'featured';
  const inStockOnly = searchParams.get('in_stock') === '1';
  const activeSearch = searchParams.get('q') ?? '';

  const activeFilterCount = [activeCategory, ...activeBrands, activeMinPrice, inStockOnly ? '1' : ''].filter(Boolean).length;

  const updateParams = useCallback(
    (updates: Record<string, string | string[] | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        params.delete(key);
        if (value === null) return;
        if (Array.isArray(value)) value.forEach((v) => params.append(key, v));
        else if (value) params.set(key, value);
      });
      params.delete('page');
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
        onApply?.();
      });
    },
    [searchParams, pathname, router, onApply]
  );

  const clearAllFilters = () => {
    const params = new URLSearchParams();
    if (activeSearch) params.set('q', activeSearch);
    if (activeSort !== 'featured') params.set('sort', activeSort);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      onApply?.();
    });
  };

  return (
    <aside className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-gray-900 text-sm">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="bg-[#FF4500] text-white text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button onClick={clearAllFilters} className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#FF4500] font-semibold transition-colors">
            <X className="w-3 h-3" /> Clear All
          </button>
        )}
      </div>

      {/* Sort */}
      <div className="mb-4">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Sort By</label>
        <select
          value={activeSort}
          onChange={(e) => updateParams({ sort: e.target.value })}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <p className="text-xs text-gray-400 mb-4">{totalCount} product{totalCount !== 1 ? 's' : ''} found</p>

      {/* Category */}
      <FilterSection title="Category" expanded={expandedSections.categories} onToggle={() => toggleSection('categories')}>
        <ul className="space-y-0.5">
          <li>
            <button
              onClick={() => updateParams({ category: null })}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors font-medium ${!activeCategory ? 'bg-orange-50 text-[#FF4500] font-semibold border border-orange-200' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              All Categories
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => updateParams({ category: activeCategory === cat.slug ? null : cat.slug })}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors font-medium ${activeCategory === cat.slug ? 'bg-orange-50 text-[#FF4500] font-semibold border border-orange-200' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </FilterSection>

      {/* Brand */}
      {brands.length > 0 && (
        <FilterSection title="Brand" expanded={expandedSections.brands} onToggle={() => toggleSection('brands')}>
          <ul className="space-y-1">
            {brands.map((brand) => {
              const checked = activeBrands.includes(brand.slug);
              return (
                <li key={brand.id}>
                  <label className={`flex items-center gap-2.5 cursor-pointer px-2 py-1.5 rounded-lg transition-colors ${checked ? 'bg-orange-50' : 'hover:bg-gray-50'}`}>
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${checked ? 'bg-[#FF4500] border-[#FF4500]' : 'border-gray-300'}`}>
                      {checked && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                          <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        const next = checked ? activeBrands.filter((b) => b !== brand.slug) : [...activeBrands, brand.slug];
                        updateParams({ brand: next.length > 0 ? next : null });
                      }}
                      className="sr-only"
                    />
                    <span className={`text-sm transition-colors ${checked ? 'text-[#FF4500] font-semibold' : 'text-gray-600'}`}>
                      {brand.name}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </FilterSection>
      )}

      {/* Price Range */}
      <FilterSection title="Price Range" expanded={expandedSections.price} onToggle={() => toggleSection('price')}>
        <ul className="space-y-0.5">
          <li>
            <button
              onClick={() => updateParams({ min_price: null, max_price: null })}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors font-medium ${!activeMinPrice && !activeMaxPrice ? 'bg-orange-50 text-[#FF4500] font-semibold border border-orange-200' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Any Price
            </button>
          </li>
          {PRICE_RANGES.map((range) => {
            const isActive = activeMinPrice === String(range.min) && activeMaxPrice === String(range.max);
            return (
              <li key={range.label}>
                <button
                  onClick={() => updateParams({ min_price: isActive ? null : String(range.min), max_price: isActive ? null : String(range.max) })}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors font-medium ${isActive ? 'bg-orange-50 text-[#FF4500] font-semibold border border-orange-200' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {range.label}
                </button>
              </li>
            );
          })}
        </ul>
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability" expanded={expandedSections.availability} onToggle={() => toggleSection('availability')}>
        <label className={`flex items-center gap-2.5 cursor-pointer px-2 py-1.5 rounded-lg transition-colors ${inStockOnly ? 'bg-orange-50' : 'hover:bg-gray-50'}`}>
          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${inStockOnly ? 'bg-[#FF4500] border-[#FF4500]' : 'border-gray-300'}`}>
            {inStockOnly && (
              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={() => updateParams({ in_stock: inStockOnly ? null : '1' })}
            className="sr-only"
          />
          <span className={`text-sm ${inStockOnly ? 'text-[#FF4500] font-semibold' : 'text-gray-600'}`}>In Stock Only</span>
        </label>
      </FilterSection>

      {/* Active filter chips */}
      {activeFilterCount > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Active Filters</p>
          <div className="flex flex-wrap gap-1.5">
            {activeCategory && (
              <FilterChip label={categories.find((c) => c.slug === activeCategory)?.name ?? activeCategory} onRemove={() => updateParams({ category: null })} />
            )}
            {activeBrands.map((b) => (
              <FilterChip key={b} label={brands.find((br) => br.slug === b)?.name ?? b} onRemove={() => updateParams({ brand: activeBrands.filter((ab) => ab !== b) })} />
            ))}
            {activeMinPrice && (
              <FilterChip
                label={`${formatPrice(Number(activeMinPrice))} – ${activeMaxPrice !== '0' && activeMaxPrice ? formatPrice(Number(activeMaxPrice)) : '+'}`}
                onRemove={() => updateParams({ min_price: null, max_price: null })}
              />
            )}
            {inStockOnly && <FilterChip label="In Stock" onRemove={() => updateParams({ in_stock: null })} />}
          </div>
        </div>
      )}
    </aside>
  );
}

function FilterSection({ title, expanded, onToggle, children }: { title: string; expanded: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="border-t border-gray-100 py-3">
      <button onClick={onToggle} className="flex items-center justify-between w-full text-left mb-2 group">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide group-hover:text-gray-800 transition-colors">{title}</span>
        {expanded ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
      </button>
      {expanded && children}
    </div>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 bg-orange-50 text-[#FF4500] text-xs font-semibold px-2 py-1 rounded-full border border-orange-200">
      {label}
      <button onClick={onRemove} className="hover:text-orange-700 transition-colors" aria-label={`Remove ${label} filter`}>
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}
