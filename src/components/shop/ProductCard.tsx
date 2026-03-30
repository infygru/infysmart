'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus, CheckCircle, Zap, AlertTriangle } from 'lucide-react';
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

  const inCart = isInCart(String(product.id));
  const qtyInCart = getItemQuantity(String(product.id));

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
    id: String(product.id),
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    price: product.price,
    sale_price: product.sale_price,
    thumbnail: product.thumbnail,
    stock_quantity: product.stock_quantity,
    track_inventory: product.track_inventory,
    category: typeof product.category === 'string' ? product.category : String((product.category as ProductCategory)?.id ?? ''),
    brand: typeof product.brand === 'string' ? product.brand : String((product.brand as ProductBrand)?.id ?? ''),
  };

  return (
    <div className="group relative bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col">

      {/* Image area */}
      <Link href={`/shop/${product.slug}`} className="relative block aspect-[4/3] bg-slate-800 overflow-hidden">
        {thumbnailSrc ? (
          <Image
            src={thumbnailSrc}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-600">
            <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center">
              <Zap className="w-6 h-6 text-slate-500" />
            </div>
            <span className="text-xs font-medium">No Image</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges top-left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {hasDiscount && (
            <span className="bg-[#FF4500] text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-lg">
              -{discountPercent}% OFF
            </span>
          )}
          {product.is_featured && !hasDiscount && (
            <span className="bg-orange-500/20 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-orange-500/30">
              Featured
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-slate-700 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-lg">
              Out of Stock
            </span>
          )}
        </div>

        {/* Add to cart "+" button — top right */}
        {!isOutOfStock && (
          <button
            onClick={(e) => { e.preventDefault(); addToCart(cartProduct); }}
            className={`absolute top-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg shadow-xl transition-all duration-200 z-10 ${
              inCart
                ? 'bg-orange-500 text-white scale-110'
                : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-[#FF4500] hover:border-[#FF4500] hover:scale-110 opacity-0 group-hover:opacity-100'
            }`}
            title={inCart ? `In cart (${qtyInCart})` : 'Add to cart'}
          >
            {inCart ? <CheckCircle className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
        )}

        {/* Category chip — bottom */}
        {categoryName && (
          <div className="absolute bottom-2.5 left-2.5">
            <span className="bg-slate-900/80 backdrop-blur-sm text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-slate-700">
              {categoryName}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        {/* Brand + SKU */}
        <div className="flex items-center justify-between gap-2">
          {brandName ? (
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">
              {brandName}
            </span>
          ) : <span />}
          <span className="text-[10px] text-slate-600 font-mono">{product.sku}</span>
        </div>

        {/* Name */}
        <Link href={`/shop/${product.slug}`} className="flex-1">
          <h3 className="text-sm font-semibold text-slate-100 leading-snug line-clamp-2 group-hover:text-orange-400 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="text-base font-extrabold text-white">{formatPrice(effectivePrice)}</span>
          {hasDiscount && (
            <span className="text-xs text-slate-500 line-through">{formatPrice(product.price)}</span>
          )}
        </div>
        <p className="text-[10px] text-slate-600 -mt-1.5">Incl. of all taxes</p>

        {/* Low stock */}
        {isLowStock && !isOutOfStock && (
          <div className="flex items-center gap-1.5 text-amber-500 text-[11px] font-medium">
            <AlertTriangle className="w-3 h-3" />
            Only {product.stock_quantity} left
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-1">
          {/* Buy Now */}
          <Link
            href={`/shop/${product.slug}`}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
              isOutOfStock
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed pointer-events-none'
                : 'bg-[#FF4500] hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            {isOutOfStock ? 'Unavailable' : 'Buy Now'}
          </Link>

          {/* Add to cart (desktop visible full, small "+" fallback) */}
          {!isOutOfStock && (
            <button
              onClick={() => addToCart(cartProduct)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 font-bold border ${
                inCart
                  ? 'bg-orange-500/20 border-orange-500/40 text-orange-400'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-orange-500/50 hover:text-orange-400'
              }`}
              title={inCart ? `In cart (${qtyInCart})` : 'Add to cart'}
            >
              {inCart ? <CheckCircle className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
