'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus, CheckCircle, AlertTriangle, ShoppingCart } from 'lucide-react';
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
    <div className="group bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all duration-200 flex flex-col">

      {/* Image */}
      <Link href={`/shop/${product.slug}`} className="relative block aspect-[4/3] bg-gray-50 overflow-hidden">
        {thumbnailSrc ? (
          <Image
            src={thumbnailSrc}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-400"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-gray-200">
            <ShoppingCart className="w-8 h-8" />
          </div>
        )}

        {hasDiscount && !isOutOfStock && (
          <span className="absolute top-2 left-2 bg-[#FF4500] text-white text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded-md">
            -{discountPercent}%
          </span>
        )}
        {isOutOfStock && (
          <span className="absolute top-2 left-2 bg-gray-500 text-white text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded-md">
            Out of Stock
          </span>
        )}
        {inCart && !isOutOfStock && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
            ×{qtyInCart}
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-2.5 sm:p-4 gap-1.5 sm:gap-2">
        {brandName && (
          <span className="text-[9px] sm:text-[10px] font-bold text-[#FF4500] uppercase tracking-widest leading-none">{brandName}</span>
        )}

        <Link href={`/shop/${product.slug}`} className="flex-1">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug line-clamp-2 group-hover:text-[#FF4500] transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-1.5">
          <span className="text-sm sm:text-base font-extrabold text-gray-900">{formatPrice(effectivePrice)}</span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(product.price)}</span>
          )}
        </div>
        <p className="text-[9px] sm:text-[10px] text-gray-400 -mt-0.5">Incl. taxes</p>

        {isLowStock && !isOutOfStock && (
          <div className="flex items-center gap-1 text-amber-600 text-[10px] font-medium">
            <AlertTriangle className="w-2.5 h-2.5" /> Only {product.stock_quantity} left
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-1.5 sm:gap-2 mt-auto pt-1">
          <Link
            href={`/shop/${product.slug}`}
            className={`flex-1 py-2.5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold text-center transition-all active:scale-95 ${
              isOutOfStock
                ? 'bg-gray-100 text-gray-400 pointer-events-none'
                : 'bg-gradient-to-r from-[#FF4500] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-sm shadow-orange-200/60'
            }`}
          >
            {isOutOfStock ? 'Sold Out' : 'Buy Now'}
          </Link>

          {!isOutOfStock && (
            <button
              onClick={() => addToCart(cartProduct)}
              title={inCart ? `In cart (${qtyInCart})` : 'Add to cart'}
              className={`w-10 h-10 rounded-lg sm:rounded-xl flex items-center justify-center border transition-all active:scale-90 flex-shrink-0 ${
                inCart
                  ? 'bg-orange-50 border-orange-300 text-[#FF4500]'
                  : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-orange-300 hover:text-[#FF4500] hover:bg-orange-50'
              }`}
            >
              {inCart ? <CheckCircle className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
