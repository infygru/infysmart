'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, CheckCircle, Tag, AlertTriangle } from 'lucide-react';
import { formatPrice, getEffectivePrice } from '@/lib/utils';
import { getAssetUrl } from '@/lib/directus';
import { useCart } from '@/lib/cart-context';
import type { CartProduct } from '@/lib/cart-context';
import type { Product, ProductCategory, ProductBrand } from '@/lib/directus';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInCart, getItemQuantity } = useCart();

  const effectivePrice = getEffectivePrice(product.price, product.sale_price);
  const hasDiscount = product.sale_price !== null && product.sale_price < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - effectivePrice) / product.price) * 100)
    : 0;

  const isOutOfStock = product.track_inventory && product.stock_quantity <= 0;
  const isLowStock = product.track_inventory && product.stock_quantity > 0 && product.stock_quantity <= 5;

  const inCart = isInCart(product.id);
  const qtyInCart = getItemQuantity(product.id);

  const thumbnailSrc = product.thumbnail
    ? getAssetUrl(product.thumbnail, { width: '400', height: '300', fit: 'cover', quality: '80' })
    : null;

  const categoryName =
    typeof product.category === 'object' && product.category !== null
      ? (product.category as ProductCategory).name
      : null;

  const brandName =
    typeof product.brand === 'object' && product.brand !== null
      ? (product.brand as ProductBrand).name
      : null;

  const cartProduct: CartProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    price: product.price,
    sale_price: product.sale_price,
    thumbnail: product.thumbnail,
    stock_quantity: product.stock_quantity,
    track_inventory: product.track_inventory,
    category: typeof product.category === 'string' ? product.category : (product.category as ProductCategory)?.id ?? '',
    brand: typeof product.brand === 'string' ? product.brand : (product.brand as ProductBrand)?.id ?? '',
  };

  return (
    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-brand-blue hover:shadow-lg transition-all duration-200 flex flex-col">
      {/* Image */}
      <Link href={`/shop/${product.slug}`} className="relative block aspect-[4/3] bg-slate-100 overflow-hidden">
        {thumbnailSrc ? (
          <Image
            src={thumbnailSrc}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-300">
            <ShoppingCart className="w-10 h-10" />
            <span className="text-xs font-medium">No Image</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {hasDiscount && (
            <span className="bg-brand-orange text-white text-xs font-bold px-2 py-0.5 rounded">
              -{discountPercent}%
            </span>
          )}
          {product.is_featured && (
            <span className="bg-brand-blue text-white text-xs font-bold px-2 py-0.5 rounded">
              Featured
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-slate-700 text-white text-xs font-bold px-2 py-0.5 rounded">
              Out of Stock
            </span>
          )}
        </div>

        {/* Category tag */}
        {categoryName && (
          <div className="absolute bottom-2 right-2">
            <span className="bg-white/90 backdrop-blur-sm text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200">
              {categoryName}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Brand + SKU */}
        <div className="flex items-center justify-between gap-2">
          {brandName && (
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wide">
              {brandName}
            </span>
          )}
          <span className="text-[10px] text-slate-400 ml-auto font-mono">
            {product.sku}
          </span>
        </div>

        {/* Name */}
        <Link href={`/shop/${product.slug}`} className="flex-1">
          <h3 className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2 hover:text-brand-blue transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Short description */}
        {product.short_description && (
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.short_description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-slate-900">
            {formatPrice(effectivePrice)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-slate-400 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <p className="text-[10px] text-slate-400 -mt-2">+ 18% GST applicable</p>

        {/* Stock status */}
        {isLowStock && !isOutOfStock && (
          <div className="flex items-center gap-1.5 text-amber-600 text-xs font-medium">
            <AlertTriangle className="w-3.5 h-3.5" />
            Only {product.stock_quantity} left in stock
          </div>
        )}

        {/* Add to Cart */}
        <button
          onClick={() => !isOutOfStock && addToCart(cartProduct)}
          disabled={isOutOfStock}
          className={`mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${
            isOutOfStock
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : inCart
              ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
              : 'bg-brand-blue text-white hover:bg-blue-700 shadow-sm shadow-blue-200'
          }`}
        >
          {isOutOfStock ? (
            'Out of Stock'
          ) : inCart ? (
            <>
              <CheckCircle className="w-4 h-4" />
              In Cart ({qtyInCart})
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </button>

        {/* Quick compare / wishlist placeholder for future */}
        {!isOutOfStock && (
          <Link
            href={`/shop/${product.slug}`}
            className="flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-brand-blue transition-colors"
          >
            <Tag className="w-3 h-3" />
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}
