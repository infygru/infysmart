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
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all duration-200 flex flex-col">

      {/* Image */}
      <Link href={`/shop/${product.slug}`} className="relative block aspect-[4/3] bg-gray-50 overflow-hidden">
        {thumbnailSrc ? (
          <Image
            src={thumbnailSrc}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-400"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300">
            <ShoppingCart className="w-10 h-10" />
            <span className="text-xs">No Image</span>
          </div>
        )}

        {/* Discount badge */}
        {hasDiscount && (
          <span className="absolute top-2.5 left-2.5 bg-[#FF4500] text-white text-[11px] font-bold px-2 py-0.5 rounded-lg">
            -{discountPercent}%
          </span>
        )}
        {isOutOfStock && (
          <span className="absolute top-2.5 left-2.5 bg-gray-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-lg">
            Out of Stock
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Brand */}
        {brandName && (
          <span className="text-[10px] font-bold text-[#FF4500] uppercase tracking-widest">{brandName}</span>
        )}

        {/* Name */}
        <Link href={`/shop/${product.slug}`} className="flex-1">
          <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 group-hover:text-[#FF4500] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-gray-900">{formatPrice(effectivePrice)}</span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(product.price)}</span>
          )}
        </div>
        <p className="text-[10px] text-gray-400 -mt-1">Incl. of all taxes</p>

        {isLowStock && !isOutOfStock && (
          <div className="flex items-center gap-1 text-amber-600 text-[11px] font-medium">
            <AlertTriangle className="w-3 h-3" /> Only {product.stock_quantity} left
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2 mt-1">
          <Link
            href={`/shop/${product.slug}`}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold text-center transition-all ${
              isOutOfStock
                ? 'bg-gray-100 text-gray-400 pointer-events-none'
                : 'bg-[#FF4500] hover:bg-orange-600 text-white shadow-sm shadow-orange-200'
            }`}
          >
            {isOutOfStock ? 'Unavailable' : 'Buy Now'}
          </Link>

          {!isOutOfStock && (
            <button
              onClick={() => addToCart(cartProduct)}
              title={inCart ? `In cart (${qtyInCart})` : 'Add to cart'}
              className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
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
