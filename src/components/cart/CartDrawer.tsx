'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight, PackageOpen } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatPrice, getEffectivePrice } from '@/lib/utils';
import { getAssetUrl } from '@/lib/directus';

export default function CartDrawer() {
  const { items, totals, isDrawerOpen, closeDrawer, removeFromCart, updateQuantity } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    if (isDrawerOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isDrawerOpen, closeDrawer]);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isDrawerOpen]);

  return (
    <>
      {/* Backdrop */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-[#FF4500]" />
            </div>
            <h2 className="text-base font-bold text-gray-900">Your Cart</h2>
            {totals.itemCount > 0 && (
              <span className="bg-[#FF4500] text-white text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">
                {totals.itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center">
                <PackageOpen className="w-9 h-9 text-orange-200" />
              </div>
              <div>
                <p className="text-gray-700 font-bold mb-1">Your cart is empty</p>
                <p className="text-gray-400 text-sm">Add products to get started.</p>
              </div>
              <Link
                href="/shop"
                onClick={closeDrawer}
                className="mt-1 inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100 px-4">
              {items.map(({ product, quantity }) => {
                const effectivePrice = getEffectivePrice(product.price, product.sale_price);
                const thumbSrc = product.thumbnail
                  ? getAssetUrl(product.thumbnail, { width: '120', height: '120', fit: 'cover' })
                  : null;

                return (
                  <li key={product.id} className="py-4 flex gap-3">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                      {thumbSrc ? (
                        <Image
                          src={thumbSrc}
                          alt={product.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingCart className="w-5 h-5 text-gray-200" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/shop/${product.slug}`}
                        onClick={closeDrawer}
                        className="text-sm font-semibold text-gray-900 hover:text-[#FF4500] transition-colors line-clamp-2 leading-snug"
                      >
                        {product.name}
                      </Link>
                      <p className="text-xs text-gray-400 mt-0.5">{product.sku}</p>

                      <div className="flex items-center justify-between mt-2.5">
                        {/* Qty stepper */}
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-orange-50 hover:text-[#FF4500] transition-colors text-gray-500 active:scale-90"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-sm font-bold text-gray-900 min-w-[1.5rem] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            disabled={product.track_inventory && quantity >= product.stock_quantity}
                            className="w-8 h-8 flex items-center justify-center hover:bg-orange-50 hover:text-[#FF4500] transition-colors text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed active:scale-90"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">
                            {formatPrice(effectivePrice * quantity)}
                          </p>
                          {quantity > 1 && (
                            <p className="text-[10px] text-gray-400">
                              {formatPrice(effectivePrice)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="flex-shrink-0 p-1.5 text-gray-300 hover:text-red-500 transition-colors self-start active:scale-90"
                      aria-label={`Remove ${product.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-4 py-4 space-y-3 bg-gray-50/80">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({totals.itemCount} item{totals.itemCount !== 1 ? 's' : ''})</span>
                <span className="font-medium">{formatPrice(totals.subtotal)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount</span>
                  <span>−{formatPrice(totals.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={totals.shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                  {totals.shipping === 0 ? 'FREE' : formatPrice(totals.shipping)}
                </span>
              </div>
            </div>

            <div className="flex justify-between font-extrabold text-gray-900 text-base pt-2 border-t border-gray-200">
              <span>Total</span>
              <span className="text-[#FF4500]">{formatPrice(totals.total)}</span>
            </div>
            <p className="text-[11px] text-gray-400 text-center">
              Incl. 18% GST · ₹{totals.gst.toLocaleString('en-IN')}
            </p>

            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all text-sm active:scale-95 shadow-lg shadow-orange-200"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/cart"
              onClick={closeDrawer}
              className="flex items-center justify-center w-full py-2 text-gray-500 font-semibold text-sm hover:text-[#FF4500] transition-colors"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
