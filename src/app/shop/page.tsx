import { Suspense } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { directus } from '@/lib/directus';
import { readItems } from '@directus/sdk';
import type { Product, ProductCategory, ProductBrand } from '@/lib/directus';
import ProductCard from '@/components/shop/ProductCard';
import ShopFilters from '@/components/shop/ShopFilters';
import { Search, SlidersHorizontal, Zap, Shield, Truck, Award } from 'lucide-react';
import ShopSearchBar from '@/components/shop/ShopSearchBar';
import MobileFilterDrawer from '@/components/shop/MobileFilterDrawer';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Shop CCTV Cameras, NVR, DVR & Networking Products | Infysmart',
  description:
    'Buy Hikvision, Dahua, CP Plus CCTV cameras, NVR, DVR, network switches, access control devices and security equipment online. Pan-India delivery.',
  alternates: { canonical: 'https://infysmart.com/shop' },
  openGraph: {
    title: 'Shop CCTV & Networking Products | Infysmart',
    description: 'Buy security cameras, NVR, DVR, PoE switches and more with pan-India delivery.',
    url: 'https://infysmart.com/shop',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Infysmart Online Shop' }],
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
  const activeCategory = params.get('category') ?? '';

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
    <main className="min-h-screen bg-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 border-b border-slate-800">
        {/* Background glow blobs */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-0 w-[400px] h-[400px] rounded-full bg-orange-600/8 blur-3xl pointer-events-none" />

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#FF4500 1px, transparent 1px), linear-gradient(90deg, #FF4500 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative container mx-auto max-w-7xl px-6 py-16 md:py-20">
          {/* Label */}
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-6">
            <Zap className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-orange-400 text-xs font-bold uppercase tracking-widest">Security Store</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Pro-Grade Security &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Networking Gear
            </span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
            Hikvision · Dahua · CP Plus cameras, NVR, DVR, PoE switches &amp; access control.
            Factory-direct pricing with pan-India delivery.
          </p>

          {/* Search */}
          <div className="max-w-xl">
            <Suspense>
              <ShopSearchBar initialValue={currentSearch} />
            </Suspense>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { icon: Shield, label: 'Genuine Products' },
              { icon: Truck,  label: 'Pan-India Shipping' },
              { icon: Award,  label: 'Manufacturer Warranty' },
              { icon: Zap,    label: 'Same-Day Dispatch' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-orange-400" />
                <span className="text-slate-400 text-xs font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORY CHIPS ───────────────────────────────── */}
      {categories.length > 0 && (
        <div className="bg-slate-900 border-b border-slate-800">
          <div className="container mx-auto max-w-7xl px-6 py-3 overflow-x-auto">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <Link
                href="/shop"
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  !activeCategory
                    ? 'bg-[#FF4500] text-white shadow-md shadow-orange-500/20'
                    : 'bg-slate-800 text-slate-400 hover:text-orange-400 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                All Products
              </Link>
              {categories.map((cat) => {
                const catParams = new URLSearchParams(params.toString());
                catParams.set('category', cat.slug);
                catParams.delete('page');
                return (
                  <Link
                    key={cat.id}
                    href={`/shop?${catParams.toString()}`}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      activeCategory === cat.slug
                        ? 'bg-[#FF4500] text-white shadow-md shadow-orange-500/20'
                        : 'bg-slate-800 text-slate-400 hover:text-orange-400 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── BREADCRUMB ───────────────────────────────────── */}
      <div className="bg-slate-900/50 border-b border-slate-800/50">
        <div className="container mx-auto max-w-7xl px-6 py-2.5">
          <nav className="text-xs text-slate-600" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5">
              <li><Link href="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
              <li className="text-slate-700">/</li>
              <li className="text-slate-400 font-medium">Shop</li>
              {activeCategory && (
                <>
                  <li className="text-slate-700">/</li>
                  <li className="text-orange-400 font-medium capitalize">
                    {categories.find((c) => c.slug === activeCategory)?.name ?? activeCategory}
                  </li>
                </>
              )}
            </ol>
          </nav>
        </div>
      </div>

      {/* ── MAIN LAYOUT ──────────────────────────────────── */}
      <div className="container mx-auto max-w-7xl px-6 py-8">
        <div className="flex gap-8">

          {/* Sidebar */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 sticky top-20 shadow-xl shadow-slate-950/50">
              <Suspense>
                <ShopFilters categories={categories} brands={brands} totalCount={totalCount} />
              </Suspense>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
              <p className="text-sm text-slate-500">
                Showing{' '}
                <span className="font-semibold text-slate-300">{Math.min(offset + 1, totalCount)}–{Math.min(offset + limit, totalCount)}</span>{' '}
                of <span className="font-semibold text-slate-300">{totalCount}</span> products
                {currentSearch && <span className="text-slate-500"> for &quot;{currentSearch}&quot;</span>}
              </p>
              <div className="lg:hidden">
                <Suspense>
                  <MobileFilterDrawer categories={categories} brands={brands} totalCount={totalCount} />
                </Suspense>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-28 gap-5 text-center">
                <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <Search className="w-9 h-9 text-slate-700" />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-300 mb-1">No products found</p>
                  <p className="text-slate-500 text-sm max-w-xs">Try adjusting your filters or search query.</p>
                </div>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-[#FF4500] hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
                >
                  <SlidersHorizontal className="w-4 h-4" /> Clear All Filters
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {products.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            )}

            {totalPages > 1 && <Pagination currentPage={pageNum} totalPages={totalPages} searchParams={params} />}
          </div>
        </div>
      </div>

      {/* ── SEO STRIP ────────────────────────────────────── */}
      <section className="bg-slate-900 border-t border-slate-800 py-12 px-6 mt-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-lg font-bold text-slate-200 mb-3">CCTV &amp; Security Products — Pan-India Delivery</h2>
          <p className="text-sm text-slate-500 leading-relaxed max-w-4xl">
            Infysmart supplies Hikvision, Dahua, CP Plus, Honeywell, Essl, and Matrix products
            across Tamil Nadu and Karnataka. All products carry full manufacturer warranty. We supply
            to industrial factories, government institutions, commercial complexes, and residential
            projects. Every order is dispatched from our Hosur warehouse with insured shipping.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {['Hikvision', 'Dahua', 'CP Plus', 'Honeywell', 'Essl', 'Matrix', 'D-Link', 'TP-Link', 'Netgear', 'Moxa'].map((b) => (
              <span key={b} className="bg-slate-800 text-slate-500 text-xs font-semibold px-3 py-1 rounded-full border border-slate-700">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>
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
    <nav className="flex items-center justify-center gap-1.5 mt-12" aria-label="Pagination">
      {currentPage > 1 && (
        <a href={getPageUrl(currentPage - 1)} className="px-3 py-2 text-sm font-semibold rounded-xl border border-slate-700 bg-slate-900 text-slate-400 hover:border-orange-500/50 hover:text-orange-400 transition-colors">← Prev</a>
      )}
      {withEllipsis.map((p, idx) =>
        p === '...' ? (
          <span key={`ellipsis-${idx}`} className="px-2 py-2 text-slate-600 text-sm">…</span>
        ) : (
          <a
            key={p}
            href={getPageUrl(p as number)}
            aria-current={p === currentPage ? 'page' : undefined}
            className={`w-9 h-9 flex items-center justify-center text-sm font-semibold rounded-xl border transition-colors ${
              p === currentPage
                ? 'bg-[#FF4500] text-white border-[#FF4500] shadow-md shadow-orange-500/20'
                : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-orange-500/50 hover:text-orange-400'
            }`}
          >
            {p}
          </a>
        )
      )}
      {currentPage < totalPages && (
        <a href={getPageUrl(currentPage + 1)} className="px-3 py-2 text-sm font-semibold rounded-xl border border-slate-700 bg-slate-900 text-slate-400 hover:border-orange-500/50 hover:text-orange-400 transition-colors">Next →</a>
      )}
    </nav>
  );
}
