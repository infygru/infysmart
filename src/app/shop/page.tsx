import { Suspense } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { directus } from '@/lib/directus';
import { readItems } from '@directus/sdk';
import type { Product, ProductCategory, ProductBrand } from '@/lib/directus';
import ProductCard from '@/components/shop/ProductCard';
import ShopFilters from '@/components/shop/ShopFilters';
import { Search, ShoppingBag, SlidersHorizontal } from 'lucide-react';
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
  if (q) {
    filter['_or'] = [
      { name: { _icontains: q } },
      { sku: { _icontains: q } },
      { short_description: { _icontains: q } },
    ];
  }

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
    directus.request(
      readItems('products', {
        filter, sort, limit, offset,
        fields: [
          'id', 'name', 'slug', 'sku', 'price', 'sale_price',
          'short_description', 'thumbnail', 'stock_quantity',
          'track_inventory', 'is_featured', 'status',
          'category.id', 'category.name', 'category.slug',
          'brand.id', 'brand.name', 'brand.slug',
        ],
      } as never)
    ) as unknown as Product[],

    directus.request(
      readItems('products', { filter, aggregate: { count: ['id'] } } as never)
    ) as unknown as [{ count: { id: number } }],

    directus.request(
      readItems('product_categories', {
        filter: { status: { _eq: 'published' } },
        sort: ['sort', 'name'],
        fields: ['id', 'name', 'slug', 'sort'],
      } as never)
    ) as unknown as ProductCategory[],

    directus.request(
      readItems('product_brands', {
        filter: { status: { _eq: 'published' } },
        sort: ['name'],
        fields: ['id', 'name', 'slug'],
      } as never)
    ) as unknown as ProductBrand[],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Page Header */}
      <section className="bg-white border-b border-gray-100 py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-2 mb-3">
            <ShoppingBag className="w-5 h-5 text-[#16a34a]" />
            <span className="text-[#16a34a] font-semibold text-xs uppercase tracking-widest">
              Security Products
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            CCTV &amp; Networking Products
          </h1>
          <p className="text-gray-500 text-base max-w-2xl">
            Hikvision, Dahua &amp; CP Plus cameras, recorders, PoE switches, access control
            devices and structured cabling. Pan-India delivery with warranty.
          </p>
          <div className="mt-6 max-w-lg">
            <Suspense>
              <ShopSearchBar initialValue={currentSearch} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto max-w-7xl px-6 py-3">
          <nav className="text-xs text-gray-400" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5">
              <li><Link href="/" className="hover:text-[#16a34a] transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-gray-700 font-medium">Shop</li>
              {params.get('category') && (
                <>
                  <li>/</li>
                  <li className="text-gray-700 font-medium capitalize">
                    {categories.find((c) => c.slug === params.get('category'))?.name ?? params.get('category')}
                  </li>
                </>
              )}
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Layout */}
      <div className="container mx-auto max-w-7xl px-6 py-8">
        <div className="flex gap-8">

          {/* Sidebar */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-20 shadow-sm">
              <Suspense>
                <ShopFilters categories={categories} brands={brands} totalCount={totalCount} />
              </Suspense>
            </div>
          </aside>

          {/* Products area */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
              <p className="text-sm text-gray-500">
                Showing{' '}
                <span className="font-semibold text-gray-800">
                  {Math.min(offset + 1, totalCount)}–{Math.min(offset + limit, totalCount)}
                </span>{' '}
                of <span className="font-semibold text-gray-800">{totalCount}</span> products
                {currentSearch && (
                  <span className="text-gray-400"> for &quot;{currentSearch}&quot;</span>
                )}
              </p>

              <div className="lg:hidden">
                <Suspense>
                  <MobileFilterDrawer categories={categories} brands={brands} totalCount={totalCount} />
                </Suspense>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-300" />
                </div>
                <p className="text-lg font-semibold text-gray-700">No products found</p>
                <p className="text-gray-400 text-sm max-w-xs">
                  Try adjusting your filters or search query.
                </p>
                <Link
                  href="/shop"
                  className="mt-2 inline-flex items-center gap-2 bg-[#16a34a] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#15803d] transition-colors text-sm"
                >
                  <SlidersHorizontal className="w-4 h-4" /> Clear All Filters
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <Pagination currentPage={pageNum} totalPages={totalPages} searchParams={params} />
            )}
          </div>
        </div>
      </div>

      {/* SEO strip */}
      <section className="bg-white border-t border-gray-100 py-10 px-6">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            CCTV &amp; Security Products — Pan-India Delivery
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed max-w-4xl">
            Infysmart supplies Hikvision, Dahua, CP Plus, Honeywell, Essl, and Matrix products
            across Tamil Nadu and Karnataka. All products carry full manufacturer warranty. We supply
            to industrial factories, government institutions, commercial complexes, and residential
            projects. Every order is dispatched from our Hosur warehouse with insured shipping.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {['Hikvision', 'Dahua', 'CP Plus', 'Honeywell', 'Essl', 'Matrix', 'D-Link', 'TP-Link', 'Netgear', 'Moxa'].map((b) => (
              <span key={b} className="bg-gray-100 text-gray-500 text-xs font-semibold px-3 py-1 rounded-full">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: {
  currentPage: number;
  totalPages: number;
  searchParams: URLSearchParams;
}) {
  const getPageUrl = (page: number) => {
    const p = new URLSearchParams(searchParams.toString());
    p.set('page', String(page));
    return `/shop?${p.toString()}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2
  );

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
        <a
          href={getPageUrl(currentPage - 1)}
          className="px-3 py-2 text-sm font-medium rounded-xl border border-gray-200 bg-white text-gray-600 hover:border-[#16a34a] hover:text-[#16a34a] transition-colors"
        >
          ← Prev
        </a>
      )}

      {withEllipsis.map((p, idx) =>
        p === '...' ? (
          <span key={`ellipsis-${idx}`} className="px-2 py-2 text-gray-400 text-sm">…</span>
        ) : (
          <a
            key={p}
            href={getPageUrl(p as number)}
            aria-current={p === currentPage ? 'page' : undefined}
            className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-xl border transition-colors ${
              p === currentPage
                ? 'bg-[#16a34a] text-white border-[#16a34a]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#16a34a] hover:text-[#16a34a]'
            }`}
          >
            {p}
          </a>
        )
      )}

      {currentPage < totalPages && (
        <a
          href={getPageUrl(currentPage + 1)}
          className="px-3 py-2 text-sm font-medium rounded-xl border border-gray-200 bg-white text-gray-600 hover:border-[#16a34a] hover:text-[#16a34a] transition-colors"
        >
          Next →
        </a>
      )}
    </nav>
  );
}
