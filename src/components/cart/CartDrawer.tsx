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

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    if (isDrawerOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isDrawerOpen, closeDrawer]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isDrawerOpen]);

  return (
    <>
      {/* Backdrop */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm"
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
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="w-5 h-5 text-brand-blue" />
            <h2 className="text-lg font-bold text-slate-900">Your Cart</h2>
            {totals.itemCount > 0 && (
              <span className="bg-brand-blue text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totals.itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <PackageOpen className="w-16 h-16 text-slate-200" />
              <p className="text-slate-500 font-medium">Your cart is empty</p>
              <p className="text-slate-400 text-sm">
                Browse our CCTV &amp; networking products and add items to get started.
              </p>
              <Link
                href="/shop"
                onClick={closeDrawer}
                className="mt-2 inline-flex items-center gap-2 bg-brand-blue text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 px-5">
              {items.map(({ product, quantity }) => {
                const effectivePrice = getEffectivePrice(product.price, product.sale_price);
                const thumbSrc = product.thumbnail
                  ? getAssetUrl(product.thumbnail, { width: '120', height: '120', fit: 'cover' })
                  : null;

                return (
                  <li key={product.id} className="py-4 flex gap-4">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200">
                      {thumbSrc ? (
                        <Image
                          src={thumbSrc}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingCart className="w-6 h-6 text-slate-300" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/shop/${product.slug}`}
                        onClick={closeDrawer}
                        className="text-sm font-semibold text-slate-900 hover:text-brand-blue transition-colors line-clamp-2"
                      >
                        {product.name}
                      </Link>
                      <p className="text-xs text-slate-400 mt-0.5">SKU: {product.sku}</p>

                      <div className="flex items-center justify-between mt-2">
                        {/* Qty stepper */}
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="px-2 py-1.5 hover:bg-slate-100 transition-colors text-slate-600"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 py-1.5 text-sm font-semibold text-slate-900 min-w-[2rem] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            disabled={product.track_inventory && quantity >= product.stock_quantity}
                            className="px-2 py-1.5 hover:bg-slate-100 transition-colors text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-900">
                            {formatPrice(effectivePrice * quantity)}
                          </p>
                          {quantity > 1 && (
                            <p className="text-xs text-slate-400">
                              {formatPrice(effectivePrice)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="flex-shrink-0 p-1.5 text-slate-300 hover:text-red-500 transition-colors self-start"
                      aria-label={`Remove ${product.name} from cart`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer — only shown when cart has items */}
        {items.length > 0 && (
          <div className="border-t border-slate-200 px-5 py-4 space-y-3 bg-slate-50">
            {/* Subtotal row */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({totals.itemCount} item{totals.itemCount !== 1 ? 's' : ''})</span>
                <span>{formatPrice(totals.subtotal)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount</span>
                  <span>−{formatPrice(totals.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>GST (18%)</span>
                <span>{formatPrice(totals.gst)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className={totals.shipping === 0 ? 'text-green-600 font-medium' : ''}>
                  {totals.shipping === 0 ? 'FREE' : formatPrice(totals.shipping)}
                </span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-slate-900 text-base pt-2 border-t border-slate-200">
              <span>Total</span>
              <span>{formatPrice(totals.total)}</span>
            </div>

            {/* CTAs */}
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="flex items-center justify-center gap-2 w-full py-3 bg-brand-blue text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/cart"
              onClick={closeDrawer}
              className="flex items-center justify-center w-full py-2.5 text-brand-blue font-semibold text-sm hover:underline transition-colors"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
