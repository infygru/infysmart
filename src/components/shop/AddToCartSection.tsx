'use client';

import { useState } from 'react';
import { ShoppingCart, Plus, Minus, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import type { CartProduct } from '@/lib/cart-context';
import type { Product, ProductCategory, ProductBrand } from '@/lib/directus';

interface Props {
  product: Product;
}

export default function AddToCartSection({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isInCart, getItemQuantity } = useCart();

  const inCart = isInCart(String(product.id));
  const qtyInCart = getItemQuantity(String(product.id));
  const isOutOfStock = product.track_inventory && product.stock_quantity <= 0;
  const maxQty = product.track_inventory ? product.stock_quantity : 99;

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

  const handleAdd = () => { if (!isOutOfStock) addToCart(cartProduct, quantity); };

  return (
    <div className="space-y-3">
      {!isOutOfStock && (
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-gray-700">Quantity:</span>
          <div className="flex items-center border border-gray-200 bg-white rounded-xl overflow-hidden">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="px-3 py-2.5 hover:bg-gray-50 transition-colors text-gray-600 disabled:opacity-40"
              aria-label="Decrease"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2.5 font-bold text-gray-900 min-w-[3rem] text-center border-x border-gray-200">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
              disabled={quantity >= maxQty}
              className="px-3 py-2.5 hover:bg-gray-50 transition-colors text-gray-600 disabled:opacity-40"
              aria-label="Increase"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {product.track_inventory && (
            <span className="text-xs text-gray-400">{product.stock_quantity} available</span>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAdd}
          disabled={isOutOfStock}
          className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
            isOutOfStock
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : inCart
              ? 'bg-orange-50 text-[#FF4500] border border-orange-200 hover:bg-orange-100'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300 hover:text-[#FF4500]'
          }`}
        >
          {isOutOfStock ? (
            'Out of Stock'
          ) : inCart ? (
            <><CheckCircle className="w-4 h-4" /> Add More ({qtyInCart} in cart)</>
          ) : (
            <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
          )}
        </button>

        {!isOutOfStock && (
          <Link
            href="/checkout"
            onClick={() => addToCart(cartProduct, quantity)}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#FF4500] to-orange-500 text-white hover:from-orange-600 hover:to-orange-400 transition-all shadow-md shadow-orange-200/50"
          >
            Buy Now <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {inCart && (
        <Link href="/cart" className="flex items-center justify-center gap-1.5 text-sm text-[#FF4500] hover:underline font-semibold">
          View Cart ({qtyInCart} item{qtyInCart !== 1 ? 's' : ''}) →
        </Link>
      )}
    </div>
  );
}
