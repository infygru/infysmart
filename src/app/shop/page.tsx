import { Suspense } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { directus } from '@/lib/directus';
import { readItems } from '@directus/sdk';
import type { Product, ProductCategory, ProductBrand } from '@/lib/directus';
import ProductCard from '@/components/shop/ProductCard';
import ShopFilters from '@/components/shop/ShopFilters';
import { Search, SlidersHorizontal } from 'lucide-react';
import ShopSearchBar from '@/components/shop/ShopSearchBar';
import MobileFilterDrawer from '@/components/shop/MobileFilterDrawer';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Buy CCTV Cameras Online | Hikvision, Dahua, CP Plus — Best Price | Infysmart',
  description:
    'Buy Hikvision, Dahua, CP Plus CCTV cameras, NVR, DVR, PoE switches & access control products online at best prices. Authorized dealer, GST invoice, 1-year warranty, pan-India delivery from Hosur.',
  keywords: [
    'buy CCTV camera online',
    'CCTV camera price India',
    'Hikvision camera price',
    'Dahua camera buy online',
    'CP Plus camera online',
    'NVR buy online India',
    'DVR buy online India',
    'CCTV camera for home',
    'IP camera price India',
    'dome camera price',
    'bullet camera price',
    'PTZ camera price India',
    'PoE switch buy India',
    'security camera online shopping',
    'CCTV camera Chennai',
    'surveillance camera price',
  ],
  alternates: { canonical: 'https://infysmart.com/shop' },
  openGraph: {
    title: 'Buy CCTV Cameras Online | Hikvision, Dahua, CP Plus | Infysmart',
    description: 'Best price on Hikvision, Dahua, CP Plus CCTV cameras, NVR, DVR. Authorized dealer. GST invoice. Pan-India delivery.',
    url: 'https://infysmart.com/shop',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Buy CCTV Cameras Online — Infysmart Shop' }],
  },
  twitter: {
    title: 'Buy CCTV Cameras Online | Best Price | Infysmart',
    description: 'Hikvision, Dahua, CP Plus cameras at best prices. Authorized dealer. Pan-India delivery.',
    images: ['/og-image.png'],
  },
};

function buildProductFilter(params: URLSearchParams) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: Record<string, any> = { status: { _eq: 'published' } };
  const category = params.get('category');
  if (category) filter['category'] = { slug: { _eq: category } };
  const brands = params.getAll('brand');
  if (brands.length === 1) filter['brand'] = { slug: { _eq: brands[0] } };
  else if (brands.length > 1) filter['brand'] = { slug: { _in: brands } };
  const minPrice = params.get('min_price');
  const maxPrice = params.get('max_price');
  if (minPrice) filter['price'] = { ...filter['price'], _gte: Number(minPrice) };
  if (maxPrice && maxPrice !== '0') filter['price'] = { ...filter['price'], _lte: Number(maxPrice) };
  if (params.get('in_stock') === '1') filter['stock_quantity'] = { _gt: 0 };
  const q = params.get('q');
  if (q) filter['_or'] = [{ name: { _icontains: q } }, { sku: { _icontains: q } }, { short_description: { _icontains: q } }];
  return filter;
}

function buildProductSort(params: URLSearchParams): string[] {
  switch (params.get('sort') ?? 'featured') {
    case 'price_asc':  return ['price'];
    case 'price_desc': return ['-price'];
    case 'newest':     return ['-date_created'];
    case 'name_asc':   return ['name'];
    default:           return ['-is_featured', '-date_created'];
  }
}

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ShopPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const params = new URLSearchParams();
  Object.entries(resolvedParams).forEach(([key, value]) => {
    if (Array.isArray(value)) value.forEach((v) => params.append(key, v));
    else if (value) params.set(key, value);
  });

  const pageNum = Math.max(1, Number(params.get('page') ?? 1));
  const limit = 12;
  const offset = (pageNum - 1) * limit;
  const filter = buildProductFilter(params);
  const sort = buildProductSort(params);
  const activeCategory = params.get('category') ?? '';

  const [products, totalResult, categories, brands] = await Promise.all([
    directus.request(readItems('products', {
      filter, sort, limit, offset,
      fields: ['id','name','slug','sku','price','sale_price','short_description','thumbnail','stock_quantity','track_inventory','is_featured','status','category.id','category.name','category.slug','brand.id','brand.name','brand.slug'],
    } as never)) as unknown as Product[],
    directus.request(readItems('products', { filter, aggregate: { count: ['id'] } } as never)) as unknown as [{ count: { id: number } }],
    directus.request(readItems('product_categories', { filter: { status: { _eq: 'published' } }, sort: ['sort', 'name'], fields: ['id','name','slug','sort'] } as never)) as unknown as ProductCategory[],
    directus.request(readItems('product_brands', { filter: { status: { _eq: 'published' } }, sort: ['name'], fields: ['id','name','slug'] } as never)) as unknown as ProductBrand[],
  ]);

  const totalCount = totalResult[0]?.count?.id ?? products.length;
  const totalPages = Math.ceil(totalCount / limit);
  const currentSearch = params.get('q') ?? '';

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'CCTV & Networking Products — Infysmart Shop',
    numberOfItems: totalCount,
    itemListElement: products.slice(0, 10).map((p, idx) => ({
      '@type': 'ListItem',
      position: offset + idx + 1,
      url: `https://infysmart.com/shop/${p.slug}`,
      name: p.name,
    })),
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      {/* ── PAGE HEADER ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto max-w-7xl px-3 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl font-extrabold text-gray-900 truncate">
                {activeCategory
                  ? (categories.find((c) => c.slug === activeCategory)?.name ?? 'Products')
                  : 'Buy CCTV Cameras, NVR & Security Equipment Online'}
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">{totalCount} products · Authorized dealer · Pan-India delivery</p>
            </div>
            <div className="w-full max-w-[200px] sm:max-w-xs">
              <Suspense>
                <ShopSearchBar initialValue={currentSearch} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="container mx-auto max-w-7xl px-3 sm:px-6 py-4 sm:py-8">
        <div className="flex gap-6">

          {/* Sidebar filters */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sticky top-20">
              <Suspense>
                <ShopFilters categories={categories} brands={brands} totalCount={totalCount} />
              </Suspense>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {/* Mobile toolbar */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <p className="text-xs sm:text-sm text-gray-500 shrink-0">
                <span className="font-semibold text-gray-800">{Math.min(offset + 1, totalCount)}–{Math.min(offset + limit, totalCount)}</span>
                {' '}<span className="hidden sm:inline">of </span><span className="font-semibold text-gray-800">{totalCount}</span>
                {currentSearch && <span className="text-gray-400 hidden sm:inline"> for &quot;{currentSearch}&quot;</span>}
              </p>
              <div className="lg:hidden">
                <Suspense>
                  <MobileFilterDrawer categories={categories} brands={brands} totalCount={totalCount} />
                </Suspense>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4 text-center bg-white rounded-2xl border border-gray-200">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <Search className="w-6 h-6 text-gray-300" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-1">No products found</p>
                  <p className="text-xs text-gray-400">Try adjusting filters or search.</p>
                </div>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-[#FF4500] hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-bold text-sm transition-all"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" /> Clear Filters
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
                {products.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            )}

            {totalPages > 1 && <Pagination currentPage={pageNum} totalPages={totalPages} searchParams={params} />}
          </div>
        </div>
      </div>

      {/* ── SEO FOOTER ── */}
      <div className="border-t border-gray-200 bg-white py-10 px-6 mt-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Buy CCTV Cameras Online — Authorized Dealer, Best Prices</h2>
          <p className="text-sm text-gray-400 leading-relaxed max-w-4xl mb-4">
            Infysmart is an authorized dealer for Hikvision, Dahua, CP Plus, Honeywell, Essl, and Matrix products across India.
            All products carry full manufacturer warranty and are dispatched from our Hosur warehouse with insured shipping and GST invoice.
            We supply to installers, system integrators, enterprises, and individual buyers across Tamil Nadu, Karnataka, and all major cities in India.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-6 mb-6">
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-2">CCTV Camera Brands</h3>
              <div className="flex flex-wrap gap-2">
                {['Hikvision', 'Dahua', 'CP Plus', 'Honeywell', 'Panasonic', 'Bosch'].map((b) => (
                  <span key={b} className="bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">{b}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-2">Networking & Access Control</h3>
              <div className="flex flex-wrap gap-2">
                {['Essl', 'Matrix', 'D-Link', 'TP-Link', 'Netgear', 'Moxa'].map((b) => (
                  <span key={b} className="bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">{b}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-2">Need Professional Installation?</h3>
              <p className="text-xs text-gray-400 mb-2">We install what we sell. Get professional CCTV installation from ₹12,000 across Tamil Nadu & Karnataka.</p>
              <a href="/get-quote/cctv" className="inline-block text-xs font-bold text-[#FF4500] hover:underline">Get Free Installation Quote →</a>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              <strong className="text-gray-600">Popular searches:</strong>{' '}
              {[
                'Hikvision 2MP dome camera price', 'Dahua 5MP bullet camera', 'CP Plus 8 camera DVR kit',
                'Hikvision ColorVu camera', '4K security camera price', 'solar CCTV camera 4G',
                'PTZ camera price India', 'NVR 16 channel price', 'PoE switch 8 port',
              ].join(' · ')}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function Pagination({ currentPage, totalPages, searchParams }: { currentPage: number; totalPages: number; searchParams: URLSearchParams }) {
  const getPageUrl = (page: number) => {
    const p = new URLSearchParams(searchParams.toString());
    p.set('page', String(page));
    return `/shop?${p.toString()}`;
  };
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2);
  const withEllipsis: (number | '...')[] = [];
  let prev = 0;
  for (const p of pages) {
    if (p - prev > 1) withEllipsis.push('...');
    withEllipsis.push(p);
    prev = p;
  }
  return (
    <nav className="flex items-center justify-center gap-1.5 mt-10" aria-label="Pagination">
      {currentPage > 1 && (
        <a href={getPageUrl(currentPage - 1)} className="px-3 py-2 text-sm font-medium rounded-xl border border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:text-[#FF4500] transition-colors">← Prev</a>
      )}
      {withEllipsis.map((p, idx) =>
        p === '...' ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 text-sm">…</span>
        ) : (
          <a
            key={p}
            href={getPageUrl(p as number)}
            aria-current={p === currentPage ? 'page' : undefined}
            className={`w-9 h-9 flex items-center justify-center text-sm font-semibold rounded-xl border transition-colors ${
              p === currentPage
                ? 'bg-[#FF4500] text-white border-[#FF4500]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-[#FF4500]'
            }`}
          >
            {p}
          </a>
        )
      )}
      {currentPage < totalPages && (
        <a href={getPageUrl(currentPage + 1)} className="px-3 py-2 text-sm font-medium rounded-xl border border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:text-[#FF4500] transition-colors">Next →</a>
      )}
    </nav>
  );
}
