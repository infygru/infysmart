import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { directus, getAssetUrl } from '@/lib/directus';
import { readItems, readSingleton } from '@directus/sdk';
import type { Product, ProductCategory, ProductBrand, ProductImage, GlobalSettings } from '@/lib/directus';
import ProductGallery from '@/components/shop/ProductGallery';
import AddToCartSection from '@/components/shop/AddToCartSection';
import ProductCard from '@/components/shop/ProductCard';
import { formatPrice, getEffectivePrice, extractGST, extractBasePrice } from '@/lib/utils';
import { CheckCircle2, Package, ShieldCheck, Truck, Tag, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  try {
    const products = await directus.request(
      readItems('products', {
        filter: { status: { _eq: 'published' } },
        fields: ['slug'],
        limit: 500,
      } as never)
    ) as unknown as { slug: string }[];
    return products.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const products = await directus.request(
      readItems('products', {
        filter: { slug: { _eq: slug }, status: { _eq: 'published' } },
        fields: ['name', 'short_description', 'meta_title', 'meta_description', 'thumbnail', 'sku'],
        limit: 1,
      } as never)
    ) as unknown as Product[];

    const p = products[0];
    if (!p) return {};

    const title = p.meta_title ?? `${p.name} | Infysmart Shop`;
    const description = p.meta_description ?? p.short_description;
    const imageUrl = p.thumbnail
      ? getAssetUrl(p.thumbnail, { width: '1200', height: '630', fit: 'cover' })
      : '/og-image.png';

    return {
      title,
      description,
      alternates: { canonical: `https://infysmart.com/shop/${slug}` },
      openGraph: {
        title,
        description,
        url: `https://infysmart.com/shop/${slug}`,
        images: [{ url: imageUrl, width: 1200, height: 630 }],
        type: 'website',
      },
    };
  } catch {
    return {};
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const products = await directus.request(
    readItems('products', {
      filter: { slug: { _eq: slug }, status: { _eq: 'published' } },
      fields: [
        'id', 'name', 'slug', 'sku', 'price', 'sale_price',
        'short_description', 'description', 'specifications',
        'features', 'thumbnail', 'stock_quantity', 'track_inventory',
        'is_featured', 'status', 'weight', 'dimensions', 'tags',
        'meta_title', 'meta_description', 'date_created',
        'category.id', 'category.name', 'category.slug',
        'brand.id', 'brand.name', 'brand.slug', 'brand.website',
        'images.id', 'images.image', 'images.alt_text', 'images.sort',
      ],
      limit: 1,
    } as never)
  ) as unknown as Product[];

  const product = products[0];
  if (!product) notFound();

  let gstRate = 18;
  try {
    const settings = await directus.request(
      readSingleton('global_settings', { fields: ['gst_rate'] } as never)
    ) as GlobalSettings;
    gstRate = Number(settings.gst_rate ?? 18);
  } catch { /* use default */ }

  const category = product.category as ProductCategory | null;
  const brand = product.brand as ProductBrand | null;
  const images = (product.images ?? []) as ProductImage[];
  const sortedImages = [...images].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));

  const galleryImages = [
    ...(product.thumbnail ? [{ id: 'thumb', image: product.thumbnail, alt_text: product.name, sort: -1 }] : []),
    ...sortedImages.filter((img) => img.image !== product.thumbnail),
  ] as ProductImage[];

  const effectivePrice = getEffectivePrice(product.price, product.sale_price);
  const hasDiscount = product.sale_price !== null && product.sale_price < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - effectivePrice) / product.price) * 100)
    : 0;
  const gstAmount = extractGST(effectivePrice, gstRate);
  const basePrice = extractBasePrice(effectivePrice, gstRate);
  const isOutOfStock = product.track_inventory && product.stock_quantity <= 0;
  const isLowStock = product.track_inventory && product.stock_quantity > 0 && product.stock_quantity <= 5;

  const relatedProducts = category
    ? await directus.request(
        readItems('products', {
          filter: {
            status: { _eq: 'published' },
            category: { id: { _eq: typeof product.category === 'string' ? product.category : category.id } },
            id: { _neq: product.id },
          },
          fields: [
            'id', 'name', 'slug', 'sku', 'price', 'sale_price',
            'short_description', 'thumbnail', 'stock_quantity',
            'track_inventory', 'is_featured', 'status',
            'category.id', 'category.name', 'category.slug',
            'brand.id', 'brand.name', 'brand.slug',
          ],
          limit: 4,
          sort: ['-is_featured', '-date_created'],
        } as never)
      ).catch(() => []) as unknown as Product[]
    : [];

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.short_description,
    sku: product.sku,
    brand: brand ? { '@type': 'Brand', name: brand.name } : undefined,
    image: galleryImages.slice(0, 5).map((img) =>
      getAssetUrl(img.image, { width: '800', height: '600', fit: 'cover' })
    ),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: effectivePrice,
      priceValidUntil: new Date(new Date(product.date_created).getTime() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: isOutOfStock
        ? 'https://schema.org/OutOfStock'
        : 'https://schema.org/InStock',
      seller: { '@id': 'https://infysmart.com/#organization' },
      url: `https://infysmart.com/shop/${product.slug}`,
    },
  };

  return (
    <main className="min-h-screen bg-[#0c0c0c]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Breadcrumb */}
      <div className="bg-[#111] border-b border-white/[0.06]">
        <div className="container mx-auto max-w-7xl px-6 py-3">
          <nav className="text-xs text-zinc-600" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 flex-wrap">
              <li><Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link></li>
              <li><ChevronRight className="w-3 h-3 text-zinc-700" /></li>
              <li><Link href="/shop" className="hover:text-zinc-300 transition-colors">Shop</Link></li>
              {category && (
                <>
                  <li><ChevronRight className="w-3 h-3 text-zinc-700" /></li>
                  <li>
                    <Link href={`/shop?category=${category.slug}`} className="hover:text-zinc-300 transition-colors">
                      {category.name}
                    </Link>
                  </li>
                </>
              )}
              <li><ChevronRight className="w-3 h-3 text-zinc-700" /></li>
              <li className="text-zinc-300 font-medium line-clamp-1 max-w-[180px]">
                {product.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <section className="container mx-auto max-w-7xl px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">

          {/* Gallery */}
          <ProductGallery images={galleryImages} productName={product.name} />

          {/* Info Panel */}
          <div className="flex flex-col gap-5">
            {/* Brand + Category */}
            <div className="flex items-center gap-2 flex-wrap">
              {brand && (
                <span className="text-xs font-bold text-[#4ade80] uppercase tracking-wider bg-[#16a34a]/10 px-2.5 py-1 rounded-full border border-[#16a34a]/20">
                  {brand.name}
                </span>
              )}
              {category && (
                <Link
                  href={`/shop?category=${category.slug}`}
                  className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors flex items-center gap-1"
                >
                  <Tag className="w-3 h-3" /> {category.name}
                </Link>
              )}
            </div>

            {/* Name */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
              {product.name}
            </h1>

            {/* SKU */}
            <p className="text-xs text-zinc-600 font-mono -mt-2">
              SKU: <span className="text-zinc-400 font-semibold">{product.sku}</span>
            </p>

            {/* Short description */}
            {product.short_description && (
              <p className="text-zinc-400 leading-relaxed border-l-4 border-[#16a34a]/40 pl-4 text-sm">
                {product.short_description}
              </p>
            )}

            {/* Price Block */}
            <div className="bg-white/[0.03] rounded-xl p-5 border border-white/[0.07] space-y-2">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl font-extrabold text-white">
                  {formatPrice(effectivePrice)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-lg text-zinc-600 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="bg-[#ea580c] text-white text-sm font-bold px-2 py-0.5 rounded">
                      Save {discountPercent}%
                    </span>
                  </>
                )}
              </div>
              <div className="text-xs text-zinc-500 space-y-0.5">
                <p>Incl. {gstRate}% GST — Base: {formatPrice(basePrice)} + Tax: {formatPrice(gstAmount)}</p>
                {isLowStock && !isOutOfStock && (
                  <p className="text-amber-400 font-semibold">
                    ⚠ Only {product.stock_quantity} units remaining
                  </p>
                )}
                {isOutOfStock && (
                  <p className="text-zinc-500 font-semibold">Currently out of stock</p>
                )}
              </div>
            </div>

            {/* Add to Cart */}
            <AddToCartSection product={product} />

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              {[
                { icon: ShieldCheck, label: 'Warranty Included', sub: 'Manufacturer warranty' },
                { icon: Truck, label: 'Pan-India Delivery', sub: 'Insured shipment' },
                { icon: Package, label: 'Secure Packaging', sub: 'Factory-sealed' },
                { icon: CheckCircle2, label: 'GST Invoice', sub: 'For B2B billing' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-start gap-2.5 bg-white/[0.03] rounded-lg p-3 border border-white/[0.06]">
                  <Icon className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-white">{label}</p>
                    <p className="text-[10px] text-zinc-500">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Brand link */}
            {brand?.website && (
              <p className="text-xs text-zinc-600">
                Official brand:{' '}
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-[#16a34a] hover:underline"
                >
                  {brand.website}
                </a>
              </p>
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/[0.04] text-zinc-400 text-xs font-medium px-2.5 py-1 rounded-full border border-white/[0.06]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Description / Specifications / Features */}
      <section className="container mx-auto max-w-7xl px-6 pb-12">
        <div className="bg-[#111] rounded-xl border border-white/[0.06] overflow-hidden">

          {product.description && (
            <div className="p-6 border-b border-white/[0.05]">
              <h2 className="text-lg font-bold text-white mb-4">Product Description</h2>
              <div
                className="prose prose-sm prose-invert max-w-none text-zinc-400 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}

          {product.specifications && product.specifications.length > 0 && (
            <div className="p-6 border-b border-white/[0.05]">
              <h2 className="text-lg font-bold text-white mb-4">Technical Specifications</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    {product.specifications.map((spec, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'}
                      >
                        <td className="py-2.5 px-4 font-semibold text-zinc-300 w-1/3 border border-white/[0.05]">
                          {spec.label}
                        </td>
                        <td className="py-2.5 px-4 text-zinc-500 border border-white/[0.05]">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {product.features && product.features.length > 0 && (
            <div className="p-6">
              <h2 className="text-lg font-bold text-white mb-4">Key Features</h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(product.weight || product.dimensions) && (
            <div className="p-6 border-t border-white/[0.05] bg-white/[0.02]">
              <h3 className="text-sm font-bold text-zinc-300 mb-3">Shipping Information</h3>
              <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
                {product.weight && (
                  <span>
                    <span className="font-semibold text-zinc-400">Weight:</span> {product.weight} kg
                  </span>
                )}
                {product.dimensions && (
                  <span>
                    <span className="font-semibold text-zinc-400">Dimensions:</span>{' '}
                    {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} cm
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="container mx-auto max-w-7xl px-6 pb-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-white">Related Products</h2>
            {category && (
              <Link
                href={`/shop?category=${category.slug}`}
                className="text-sm text-[#16a34a] font-semibold hover:underline flex items-center gap-1"
              >
                View all {category.name} <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
