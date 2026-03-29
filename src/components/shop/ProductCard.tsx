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
    <div className="group bg-[#111] rounded-xl border border-white/[0.07] overflow-hidden hover:border-[#16a34a]/50 hover:shadow-lg hover:shadow-[#16a34a]/5 transition-all duration-200 flex flex-col">
      {/* Image */}
      <Link href={`/shop/${product.slug}`} className="relative block aspect-[4/3] bg-[#0c0c0c] overflow-hidden">
        {thumbnailSrc ? (
          <Image
            src={thumbnailSrc}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-zinc-700">
            <ShoppingCart className="w-10 h-10" />
            <span className="text-xs font-medium">No Image</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {hasDiscount && (
            <span className="bg-[#ea580c] text-white text-xs font-bold px-2 py-0.5 rounded">
              -{discountPercent}%
            </span>
          )}
          {product.is_featured && (
            <span className="bg-[#16a34a] text-white text-xs font-bold px-2 py-0.5 rounded">
              Featured
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-zinc-800 text-zinc-400 text-xs font-bold px-2 py-0.5 rounded">
              Out of Stock
            </span>
          )}
        </div>

        {/* Category tag */}
        {categoryName && (
          <div className="absolute bottom-2 right-2">
            <span className="bg-black/70 backdrop-blur-sm text-zinc-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-white/10">
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
            <span className="text-xs font-bold text-[#16a34a] uppercase tracking-wide">
              {brandName}
            </span>
          )}
          <span className="text-[10px] text-zinc-600 ml-auto font-mono">
            {product.sku}
          </span>
        </div>

        {/* Name */}
        <Link href={`/shop/${product.slug}`} className="flex-1">
          <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 hover:text-[#4ade80] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Short description */}
        {product.short_description && (
          <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
            {product.short_description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-white">
            {formatPrice(effectivePrice)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-zinc-600 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <p className="text-[10px] text-zinc-600 -mt-2">Incl. of all taxes</p>

        {/* Stock status */}
        {isLowStock && !isOutOfStock && (
          <div className="flex items-center gap-1.5 text-amber-400 text-xs font-medium">
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
              ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
              : inCart
              ? 'bg-[#16a34a]/20 text-[#4ade80] border border-[#16a34a]/40 hover:bg-[#16a34a]/30'
              : 'bg-[#16a34a] text-white hover:bg-[#15803d]'
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

        <Link
          href={`/shop/${product.slug}`}
          className="flex items-center justify-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-300 transition-colors"
        >
          <Tag className="w-3 h-3" />
          View Details
        </Link>
      </div>
    </div>
  );
}
