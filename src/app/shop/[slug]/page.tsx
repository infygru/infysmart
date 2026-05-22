import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { directus, getAssetUrl } from '@/lib/directus';
import { readItems, readSingleton } from '@directus/sdk';
import type { Product, ProductCategory, ProductBrand, ProductImage, GlobalSettings, ProductReview } from '@/lib/directus';
import ProductGallery from '@/components/shop/ProductGallery';
import AddToCartSection from '@/components/shop/AddToCartSection';
import ProductCard from '@/components/shop/ProductCard';
import ProductReviews from '@/components/shop/ProductReviews';
import { formatPrice, getEffectivePrice, extractGST, extractBasePrice } from '@/lib/utils';
import { CheckCircle2, Package, ShieldCheck, Truck, ChevronRight, Tag, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const products = await directus.request(readItems('products', { filter: { status: { _eq: 'published' } }, fields: ['slug'], limit: 500 } as never)) as unknown as { slug: string }[];
    return products.map((p) => ({ slug: p.slug }));
  } catch { return []; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const products = await directus.request(readItems('products', { filter: { slug: { _eq: slug }, status: { _eq: 'published' } }, fields: ['name','short_description','meta_title','meta_description','meta_keywords','og_image','thumbnail','sku','tags','brand.name','category.name'], limit: 1 } as never)) as unknown as Product[];
    const p = products[0];
    if (!p) return {};
    const title = p.meta_title ?? `${p.name} — Buy Online | Infysmart`;
    const description = p.meta_description ?? p.short_description;
    // OG image: prefer dedicated og_image field, then thumbnail, then site default
    const ogImageUrl = p.og_image
      ? getAssetUrl(p.og_image, { width: '1200', height: '630', fit: 'cover' })
      : p.thumbnail
        ? getAssetUrl(p.thumbnail, { width: '1200', height: '630', fit: 'cover' })
        : '/og-image.png';
    // Keywords: prefer meta_keywords field, fall back to tags array
    const keywords = p.meta_keywords
      ? p.meta_keywords.split(',').map((k) => k.trim()).filter(Boolean)
      : (p.tags ?? undefined);
    const canonicalUrl = `https://infysmart.com/shop/${slug}`;
    return {
      title,
      description,
      keywords,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        type: 'website',
        images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [ogImageUrl],
      },
    };
  } catch { return {}; }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const products = await directus.request(readItems('products', {
    filter: { slug: { _eq: slug }, status: { _eq: 'published' } },
    fields: ['id','name','slug','sku','price','sale_price','short_description','description','specifications','features','thumbnail','og_image','stock_quantity','track_inventory','is_featured','status','weight','dimensions','tags','meta_title','meta_description','meta_keywords','date_created','date_updated','category.id','category.name','category.slug','brand.id','brand.name','brand.slug','brand.website','images.id','images.image','images.alt_text','images.sort'],
    limit: 1,
  } as never)) as unknown as Product[];

  const product = products[0];
  if (!product) notFound();

  let gstRate = 18;
  try {
    const settings = await directus.request(readSingleton('global_settings', { fields: ['gst_rate'] } as never)) as GlobalSettings;
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

  const priceNum = Number(product.price);
  const salePriceNum = product.sale_price !== null ? Number(product.sale_price) : null;
  const effectivePrice = getEffectivePrice(priceNum, salePriceNum);
  const hasDiscount = salePriceNum !== null && salePriceNum < priceNum;
  const discountPercent = hasDiscount ? Math.round(((priceNum - effectivePrice) / priceNum) * 100) : 0;
  const gstAmount = extractGST(effectivePrice, gstRate);
  const basePrice = extractBasePrice(effectivePrice, gstRate);
  const isOutOfStock = product.track_inventory && product.stock_quantity <= 0;
  const isLowStock = product.track_inventory && product.stock_quantity > 0 && product.stock_quantity <= 5;

  const relatedProducts = category
    ? await directus.request(readItems('products', {
        filter: { status: { _eq: 'published' }, category: { id: { _eq: typeof product.category === 'string' ? product.category : category.id } }, id: { _neq: product.id } },
        fields: ['id','name','slug','sku','price','sale_price','short_description','thumbnail','stock_quantity','track_inventory','is_featured','status','category.id','category.name','category.slug','brand.id','brand.name','brand.slug'],
        limit: 4, sort: ['-is_featured', '-date_created'],
      } as never)).catch(() => []) as unknown as Product[]
    : [];

  // Strip HTML tags from rich description for schema
  const plainDescription = product.description
    ? product.description.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    : product.short_description;

  // Fetch reviews for schema
  let reviews: Pick<ProductReview, 'rating' | 'content' | 'date_created'>[] = [];
  try {
    reviews = await directus.request(readItems('product_reviews', {
      filter: { product: { _eq: product.id }, status: { _eq: 'published' } },
      fields: ['rating', 'content', 'date_created'],
      limit: 5,
    } as never)) as unknown as Pick<ProductReview, 'rating' | 'content' | 'date_created'>[];
  } catch {
    // collection might not exist yet
  }
  
  const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
  const avgRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : undefined;

  // priceValidUntil = 1 year from today (not from date_created)
  // eslint-disable-next-line react-hooks/purity
  const priceValidUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://infysmart.com/shop/${product.slug}`,
    name: product.name,
    description: plainDescription,
    sku: product.sku,
    mpn: product.sku,
    brand: brand ? { '@type': 'Brand', name: brand.name, url: brand.website ?? undefined } : undefined,
    category: category?.name ?? undefined,
    image: galleryImages.slice(0, 5).map((img) => getAssetUrl(img.image, { width: '800', height: '600', fit: 'cover' })),
    url: `https://infysmart.com/shop/${product.slug}`,
    ...(product.weight ? { weight: { '@type': 'QuantitativeValue', value: product.weight, unitCode: 'KGM' } } : {}),
    ...(product.tags?.length ? { keywords: product.tags.join(', ') } : {}),
    ...(avgRating ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: avgRating,
        reviewCount: reviews.length,
      },
      review: reviews.map((r) => ({
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: r.rating },
        author: { '@type': 'Person', name: 'Verified Buyer' },
        reviewBody: r.content
      }))
    } : {}),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: effectivePrice,
      priceValidUntil,
      itemCondition: 'https://schema.org/NewCondition',
      availability: isOutOfStock ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
      seller: { '@id': 'https://infysmart.com/#organization' },
      url: `https://infysmart.com/shop/${product.slug}`,
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'IN',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 7,
        returnMethod: 'https://schema.org/ReturnByMail',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', currency: 'INR', value: 0 },
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'IN' },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 5, unitCode: 'DAY' },
        },
      },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://infysmart.com' },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://infysmart.com/shop' },
      ...(category ? [{ '@type': 'ListItem', position: 3, name: category.name, item: `https://infysmart.com/shop?category=${category.slug}` }] : []),
      { '@type': 'ListItem', position: category ? 4 : 3, name: product.name, item: `https://infysmart.com/shop/${product.slug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-7xl px-6 py-3">
          <nav className="text-xs text-gray-400" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 flex-wrap">
              <li><Link href="/" className="hover:text-[#FF4500] transition-colors">Home</Link></li>
              <li><ChevronRight className="w-3 h-3 text-gray-300" /></li>
              <li><Link href="/shop" className="hover:text-[#FF4500] transition-colors">Shop</Link></li>
              {category && (
                <>
                  <li><ChevronRight className="w-3 h-3 text-gray-300" /></li>
                  <li>
                    <Link href={`/shop?category=${category.slug}`} className="hover:text-[#FF4500] transition-colors">
                      {category.name}
                    </Link>
                  </li>
                </>
              )}
              <li><ChevronRight className="w-3 h-3 text-gray-300" /></li>
              <li className="text-gray-600 font-medium line-clamp-1 max-w-[200px]">{product.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main product section */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-7xl px-6 py-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

            {/* Gallery */}
            <ProductGallery images={galleryImages} productName={product.name} />

            {/* Info */}
            <div className="flex flex-col gap-5">

              {/* Brand + category */}
              <div className="flex items-center gap-2 flex-wrap">
                {brand && (
                  <span className="text-xs font-bold text-[#FF4500] uppercase tracking-wider bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
                    {brand.name}
                  </span>
                )}
                {category && (
                  <Link href={`/shop?category=${category.slug}`} className="text-xs text-gray-400 hover:text-[#FF4500] transition-colors flex items-center gap-1">
                    <Tag className="w-3 h-3" /> {category.name}
                  </Link>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">{product.name}</h1>

              <p className="text-xs text-gray-400 font-mono -mt-2">
                SKU: <span className="text-gray-600 font-semibold">{product.sku}</span>
              </p>

              {product.short_description && (
                <p className="text-gray-500 leading-relaxed border-l-4 border-[#FF4500] pl-4 text-sm">
                  {product.short_description}
                </p>
              )}

              {/* Price block */}
              <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl font-extrabold text-gray-900">{formatPrice(effectivePrice)}</span>
                  {hasDiscount && (
                    <>
                      <span className="text-lg text-gray-400 line-through">{formatPrice(priceNum)}</span>
                      <span className="bg-gradient-to-r from-[#FF4500] to-orange-500 text-white text-sm font-bold px-2.5 py-0.5 rounded-lg">
                        {discountPercent}% OFF
                      </span>
                    </>
                  )}
                </div>
                <div className="mt-2 text-xs text-gray-500 space-y-0.5">
                  <p>Incl. {gstRate}% GST — Base: {formatPrice(basePrice)} + Tax: {formatPrice(gstAmount)}</p>
                  {isLowStock && !isOutOfStock && (
                    <p className="flex items-center gap-1 text-amber-600 font-semibold">
                      <AlertTriangle className="w-3 h-3" /> Only {product.stock_quantity} units remaining
                    </p>
                  )}
                  {isOutOfStock && <p className="text-gray-400 font-semibold">Currently out of stock</p>}
                </div>
              </div>

              <AddToCartSection product={product} />

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: ShieldCheck, label: 'Warranty Included', sub: 'Manufacturer warranty' },
                  { icon: Truck, label: 'Pan-India Delivery', sub: 'Insured shipment' },
                  { icon: Package, label: 'Secure Packaging', sub: 'Factory-sealed' },
                  { icon: CheckCircle2, label: 'GST Invoice', sub: 'For B2B billing' },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex items-start gap-2.5 bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <Icon className="w-4 h-4 text-[#FF4500] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-700">{label}</p>
                      <p className="text-[10px] text-gray-400">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {brand?.website && (
                <p className="text-xs text-gray-400">
                  Official brand:{' '}
                  <a href={brand.website} target="_blank" rel="noopener noreferrer nofollow" className="text-[#FF4500] hover:underline">{brand.website}</a>
                </p>
              )}

              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-500 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Specs / Description / Features */}
      <section className="container mx-auto max-w-7xl px-6 py-10">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

          {product.description && (
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Product Description</h2>
              <div className="prose prose-sm prose-gray max-w-none text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          )}

          {product.specifications && product.specifications.length > 0 && (
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Technical Specifications</h2>
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    {product.specifications.map((spec, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="py-2.5 px-4 font-semibold text-gray-700 w-1/3 border-b border-gray-100">{spec.label}</td>
                        <td className="py-2.5 px-4 text-gray-500 border-b border-gray-100">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {product.features && product.features.length > 0 && (
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Key Features</h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#FF4500] shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(product.weight || product.dimensions) && (
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <h3 className="text-sm font-bold text-gray-600 mb-3">Shipping Information</h3>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                {product.weight && <span><span className="font-semibold text-gray-700">Weight:</span> {product.weight} kg</span>}
                {product.dimensions && <span><span className="font-semibold text-gray-700">Dimensions:</span> {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} cm</span>}
              </div>
            </div>
          )}

          <ProductReviews productId={product.id} />
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="container mx-auto max-w-7xl px-6 pb-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">Related Products</h2>
            {category && (
              <Link href={`/shop?category=${category.slug}`} className="text-sm text-[#FF4500] font-semibold hover:underline flex items-center gap-1">
                View all {category.name} <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </main>
  );
}
