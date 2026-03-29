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

  // Fetch GST rate from global settings
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

  // Sort images by sort field
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
  // Prices are GST-inclusive — extract components for billing display
  const gstAmount = extractGST(effectivePrice, gstRate);
  const basePrice = extractBasePrice(effectivePrice, gstRate);
  const isOutOfStock = product.track_inventory && product.stock_quantity <= 0;
  const isLowStock = product.track_inventory && product.stock_quantity > 0 && product.stock_quantity <= 5;

  // Related products (same category, excluding current)
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

  // Schema.org Product
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
    <main className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto max-w-7xl px-6 py-3">
          <nav className="text-xs text-slate-500" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 flex-wrap">
              <li><Link href="/" className="hover:text-brand-blue transition-colors">Home</Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-300" /></li>
              <li><Link href="/shop" className="hover:text-brand-blue transition-colors">Shop</Link></li>
              {category && (
                <>
                  <li><ChevronRight className="w-3 h-3 text-slate-300" /></li>
                  <li>
                    <Link href={`/shop?category=${category.slug}`} className="hover:text-brand-blue transition-colors">
                      {category.name}
                    </Link>
                  </li>
                </>
              )}
              <li><ChevronRight className="w-3 h-3 text-slate-300" /></li>
              <li className="text-slate-900 font-medium line-clamp-1 max-w-[180px]">
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
                <span className="text-xs font-bold text-brand-blue uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                  {brand.name}
                </span>
              )}
              {category && (
                <Link
                  href={`/shop?category=${category.slug}`}
                  className="text-xs text-slate-500 hover:text-brand-blue transition-colors flex items-center gap-1"
                >
                  <Tag className="w-3 h-3" /> {category.name}
                </Link>
              )}
            </div>

            {/* Name */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* SKU */}
            <p className="text-xs text-slate-400 font-mono -mt-2">
              SKU: <span className="text-slate-600 font-semibold">{product.sku}</span>
            </p>

            {/* Short description */}
            {product.short_description && (
              <p className="text-slate-600 leading-relaxed border-l-4 border-brand-blue/30 pl-4 text-sm">
                {product.short_description}
              </p>
            )}

            {/* Price Block */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-2">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl font-extrabold text-slate-900">
                  {formatPrice(effectivePrice)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-lg text-slate-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="bg-brand-orange text-white text-sm font-bold px-2 py-0.5 rounded">
                      Save {discountPercent}%
                    </span>
                  </>
                )}
              </div>
              <div className="text-xs text-slate-500 space-y-0.5">
                <p>Incl. {gstRate}% GST — Base: {formatPrice(basePrice)} + Tax: {formatPrice(gstAmount)}</p>
                {isLowStock && !isOutOfStock && (
                  <p className="text-amber-600 font-semibold">
                    ⚠ Only {product.stock_quantity} units remaining
                  </p>
                )}
                {isOutOfStock && (
                  <p className="text-red-500 font-semibold">Currently out of stock</p>
                )}
              </div>
            </div>

            {/* Add to Cart */}
            <AddToCartSection product={product} />

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              {[
                { icon: ShieldCheck, label: 'Genuine Product', sub: 'Authorized dealer' },
                { icon: Truck, label: 'Pan-India Delivery', sub: 'Insured shipment' },
                { icon: Package, label: 'Secure Packaging', sub: 'Factory-sealed' },
                { icon: CheckCircle2, label: 'GST Invoice', sub: 'For B2B billing' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-start gap-2.5 bg-white rounded-lg p-3 border border-slate-200">
                  <Icon className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{label}</p>
                    <p className="text-[10px] text-slate-400">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Brand link */}
            {brand?.website && (
              <p className="text-xs text-slate-400">
                Official brand:{' '}
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-brand-blue hover:underline"
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
                    className="bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full border border-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tabs: Description / Specifications / Features */}
      <section className="container mx-auto max-w-7xl px-6 pb-12">
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">

          {/* Description */}
          {product.description && (
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Product Description</h2>
              <div
                className="prose prose-sm prose-slate max-w-none text-slate-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}

          {/* Specifications */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Technical Specifications</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    {product.specifications.map((spec, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}
                      >
                        <td className="py-2.5 px-4 font-semibold text-slate-700 w-1/3 border border-slate-100">
                          {spec.label}
                        </td>
                        <td className="py-2.5 px-4 text-slate-600 border border-slate-100">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Key Features</h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Physical attributes */}
          {(product.weight || product.dimensions) && (
            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-700 mb-3">Shipping Information</h3>
              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                {product.weight && (
                  <span>
                    <span className="font-semibold">Weight:</span> {product.weight} kg
                  </span>
                )}
                {product.dimensions && (
                  <span>
                    <span className="font-semibold">Dimensions:</span>{' '}
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
            <h2 className="text-xl font-bold text-slate-900">Related Products</h2>
            {category && (
              <Link
                href={`/shop?category=${category.slug}`}
                className="text-sm text-brand-blue font-semibold hover:underline flex items-center gap-1"
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
