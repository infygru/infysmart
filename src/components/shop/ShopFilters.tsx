'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { ProductCategory, ProductBrand } from '@/lib/directus';
import { formatPrice } from '@/lib/utils';

interface ShopFiltersProps {
  categories: ProductCategory[];
  brands: ProductBrand[];
  totalCount: number;
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

export default function ShopFilters({ categories, brands, totalCount }: ShopFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: true,
    price: true,
    availability: true,
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

  const activeFilterCount = [
    activeCategory,
    ...activeBrands,
    activeMinPrice,
    inStockOnly ? '1' : '',
  ].filter(Boolean).length;

  const updateParams = useCallback(
    (updates: Record<string, string | string[] | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        params.delete(key);
        if (value === null) return;
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else if (value) {
          params.set(key, value);
        }
      });

      params.delete('page');

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [searchParams, pathname, router]
  );

  const clearAllFilters = () => {
    const params = new URLSearchParams();
    if (activeSearch) params.set('q', activeSearch);
    if (activeSort !== 'featured') params.set('sort', activeSort);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <aside className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-zinc-400" />
          <h2 className="font-bold text-white text-sm">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="bg-[#16a34a] text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1 text-xs text-zinc-500 hover:text-white font-semibold transition-colors"
          >
            <X className="w-3 h-3" /> Clear All
          </button>
        )}
      </div>

      {/* Sort */}
      <div className="mb-5">
        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1.5">
          Sort By
        </label>
        <select
          value={activeSort}
          onChange={(e) => updateParams({ sort: e.target.value })}
          className="w-full text-sm border border-white/[0.08] rounded-lg px-3 py-2 bg-white/[0.04] text-white focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#111] text-white">
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1 text-xs text-zinc-600 mb-5">
        {totalCount} product{totalCount !== 1 ? 's' : ''} found
      </div>

      {/* Category Filter */}
      <FilterSection
        title="Category"
        expanded={expandedSections.categories}
        onToggle={() => toggleSection('categories')}
      >
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => updateParams({ category: null })}
              className={`w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors ${
                !activeCategory
                  ? 'bg-[#16a34a]/20 text-[#4ade80] font-semibold'
                  : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
              }`}
            >
              All Categories
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => updateParams({ category: activeCategory === cat.slug ? null : cat.slug })}
                className={`w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors ${
                  activeCategory === cat.slug
                    ? 'bg-[#16a34a]/20 text-[#4ade80] font-semibold'
                    : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </FilterSection>

      {/* Brand Filter */}
      {brands.length > 0 && (
        <FilterSection
          title="Brand"
          expanded={expandedSections.brands}
          onToggle={() => toggleSection('brands')}
        >
          <ul className="space-y-1.5">
            {brands.map((brand) => {
              const checked = activeBrands.includes(brand.slug);
              return (
                <li key={brand.id}>
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        const next = checked
                          ? activeBrands.filter((b) => b !== brand.slug)
                          : [...activeBrands, brand.slug];
                        updateParams({ brand: next.length > 0 ? next : null });
                      }}
                      className="w-4 h-4 rounded border-zinc-700 accent-[#16a34a]"
                    />
                    <span className={`text-sm transition-colors ${checked ? 'text-[#4ade80] font-semibold' : 'text-zinc-400 group-hover:text-white'}`}>
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
      <FilterSection
        title="Price Range"
        expanded={expandedSections.price}
        onToggle={() => toggleSection('price')}
      >
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => updateParams({ min_price: null, max_price: null })}
              className={`w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors ${
                !activeMinPrice && !activeMaxPrice
                  ? 'bg-[#16a34a]/20 text-[#4ade80] font-semibold'
                  : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
              }`}
            >
              Any Price
            </button>
          </li>
          {PRICE_RANGES.map((range) => {
            const isActive =
              activeMinPrice === String(range.min) &&
              activeMaxPrice === String(range.max);
            return (
              <li key={range.label}>
                <button
                  onClick={() =>
                    updateParams({
                      min_price: isActive ? null : String(range.min),
                      max_price: isActive ? null : String(range.max),
                    })
                  }
                  className={`w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-[#16a34a]/20 text-[#4ade80] font-semibold'
                      : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  {range.label}
                </button>
              </li>
            );
          })}
        </ul>
      </FilterSection>

      {/* Availability */}
      <FilterSection
        title="Availability"
        expanded={expandedSections.availability}
        onToggle={() => toggleSection('availability')}
      >
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={() => updateParams({ in_stock: inStockOnly ? null : '1' })}
            className="w-4 h-4 rounded border-zinc-700 accent-[#16a34a]"
          />
          <span className="text-sm text-zinc-400">In Stock Only</span>
        </label>
      </FilterSection>

      {/* Active filter chips */}
      {activeFilterCount > 0 && (
        <div className="mt-4 pt-4 border-t border-white/[0.06]">
          <p className="text-xs font-bold text-zinc-600 uppercase tracking-wide mb-2">
            Active Filters
          </p>
          <div className="flex flex-wrap gap-1.5">
            {activeCategory && (
              <FilterChip
                label={categories.find((c) => c.slug === activeCategory)?.name ?? activeCategory}
                onRemove={() => updateParams({ category: null })}
              />
            )}
            {activeBrands.map((b) => (
              <FilterChip
                key={b}
                label={brands.find((br) => br.slug === b)?.name ?? b}
                onRemove={() =>
                  updateParams({ brand: activeBrands.filter((ab) => ab !== b) })
                }
              />
            ))}
            {activeMinPrice && (
              <FilterChip
                label={`${formatPrice(Number(activeMinPrice))} – ${activeMaxPrice !== '0' && activeMaxPrice ? formatPrice(Number(activeMaxPrice)) : '+'}`}
                onRemove={() => updateParams({ min_price: null, max_price: null })}
              />
            )}
            {inStockOnly && (
              <FilterChip label="In Stock" onRemove={() => updateParams({ in_stock: null })} />
            )}
          </div>
        </div>
      )}
    </aside>
  );
}

function FilterSection({
  title,
  expanded,
  onToggle,
  children,
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-white/[0.06] py-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left mb-3 group"
      >
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wide group-hover:text-white transition-colors">
          {title}
        </span>
        {expanded ? (
          <ChevronUp className="w-3.5 h-3.5 text-zinc-600" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-zinc-600" />
        )}
      </button>
      {expanded && children}
    </div>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 bg-[#16a34a]/20 text-[#4ade80] text-xs font-semibold px-2 py-1 rounded-full">
      {label}
      <button onClick={onRemove} className="hover:text-white transition-colors" aria-label={`Remove ${label} filter`}>
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}
