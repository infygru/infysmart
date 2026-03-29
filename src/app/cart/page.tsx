'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingCart, Trash2, Plus, Minus, ArrowRight,
  Tag, X, PackageOpen, ShieldCheck, Truck, RotateCcw
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import type { AppliedCoupon } from '@/lib/cart-context';
import {
  formatPrice, getEffectivePrice,
} from '@/lib/utils';
import { getAssetUrl } from '@/lib/directus';

export default function CartPage() {
  const {
    items, totals, coupon,
    removeFromCart, updateQuantity,
    applyCoupon, removeCoupon,
    freeShippingAbove, gstRate,
  } = useCart();

  const FREE_SHIPPING_ABOVE = freeShippingAbove;

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  const handleApplyCoupon = async () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    setCouponLoading(true);
    setCouponError('');

    try {
      const res = await fetch(`/api/coupons/validate?code=${encodeURIComponent(code)}&subtotal=${totals.subtotal}`);
      const data = await res.json() as { valid: boolean; coupon?: AppliedCoupon; error?: string };

      if (data.valid && data.coupon) {
        applyCoupon(data.coupon);
        setCouponInput('');
      } else {
        setCouponError(data.error ?? 'Invalid coupon code');
      }
    } catch {
      setCouponError('Failed to validate coupon. Please try again.');
    } finally {
      setCouponLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#020617] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <PackageOpen className="w-20 h-20 text-slate-700 mx-auto mb-6" />
          <h1 className="text-2xl font-extrabold text-white mb-3">Your cart is empty</h1>
          <p className="text-slate-400 mb-8">
            Add CCTV cameras, recorders, networking equipment and more from our store.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#16a34a] text-white px-7 py-3.5 rounded-xl font-bold hover:bg-[#15803d] transition-colors"
          >
            <ShoppingCart className="w-5 h-5" /> Browse Products
          </Link>
        </div>
      </main>
    );
  }

  const shippingLeft = Math.max(0, FREE_SHIPPING_ABOVE - totals.subtotal);

  return (
    <main className="min-h-screen bg-[#020617]">
      {/* Header */}
      <section className="bg-[#0f172a] border-b border-slate-800 py-5 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-xl font-extrabold text-white flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-[#16a34a]" />
            Shopping Cart
            <span className="text-base font-semibold text-slate-500">
              ({totals.itemCount} item{totals.itemCount !== 1 ? 's' : ''})
            </span>
          </h1>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 py-6">
        <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">

          {/* Left: Items */}
          <div className="space-y-4">
            {/* Free shipping nudge */}
            {shippingLeft > 0 && (
              <div className="bg-[#16a34a]/10 border border-[#16a34a]/20 rounded-xl p-4 flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5 text-[#16a34a] shrink-0" />
                <span className="text-slate-300">
                  Add <span className="font-bold text-[#16a34a]">{formatPrice(shippingLeft)}</span> more to get{' '}
                  <span className="font-bold text-green-400">FREE shipping!</span>
                </span>
              </div>
            )}
            {shippingLeft === 0 && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5 text-green-400 shrink-0" />
                <span className="text-green-400 font-semibold">
                  You&apos;ve unlocked FREE shipping!
                </span>
              </div>
            )}

            {/* Cart Items */}
            <div className="bg-[#0f172a] rounded-xl border border-slate-800 divide-y divide-slate-800">
              {items.map(({ product, quantity }) => {
                const effectivePrice = getEffectivePrice(product.price, product.sale_price);
                const hasDiscount = product.sale_price !== null && product.sale_price < product.price;
                const thumbSrc = product.thumbnail
                  ? getAssetUrl(product.thumbnail, { width: '160', height: '160', fit: 'cover' })
                  : null;

                return (
                  <div key={product.id} className="flex gap-4 p-4 sm:p-5">
                    {/* Thumbnail */}
                    <Link href={`/shop/${product.slug}`} className="flex-shrink-0">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                        {thumbSrc ? (
                          <Image
                            src={thumbSrc}
                            alt={product.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingCart className="w-8 h-8 text-slate-600" />
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/shop/${product.slug}`}
                          className="font-semibold text-white hover:text-[#16a34a] transition-colors leading-snug line-clamp-2 text-sm sm:text-base"
                        >
                          {product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="flex-shrink-0 p-1.5 text-slate-600 hover:text-red-400 transition-colors mt-0.5"
                          aria-label={`Remove ${product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-slate-500 font-mono">SKU: {product.sku}</p>

                      <div className="flex items-center justify-between gap-4 flex-wrap mt-auto pt-1">
                        {/* Quantity stepper */}
                        <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="px-3 py-2.5 hover:bg-slate-800 transition-colors text-slate-400 hover:text-white min-w-[40px] flex items-center justify-center"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 py-2 font-bold text-white min-w-[2.5rem] text-center text-sm border-x border-slate-700">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            disabled={product.track_inventory && quantity >= product.stock_quantity}
                            className="px-3 py-2.5 hover:bg-slate-800 transition-colors text-slate-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed min-w-[40px] flex items-center justify-center"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-bold text-white">
                            {formatPrice(effectivePrice * quantity)}
                          </p>
                          {hasDiscount ? (
                            <p className="text-xs text-slate-500">
                              <span className="line-through">{formatPrice(product.price)}</span>{' '}
                              <span className="text-brand-orange font-semibold">
                                {formatPrice(effectivePrice)} each
                              </span>
                            </p>
                          ) : quantity > 1 ? (
                            <p className="text-xs text-slate-500">{formatPrice(effectivePrice)} each</p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Continue shopping */}
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm text-[#16a34a] font-semibold hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Continue Shopping
            </Link>
          </div>

          {/* Right: Order Summary */}
          <div className="space-y-4 lg:sticky lg:top-24">

            {/* Coupon */}
            <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-5">
              <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-[#16a34a]" /> Apply Coupon
              </h2>

              {coupon ? (
                <div className="flex items-center justify-between bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
                  <div>
                    <p className="text-sm font-bold text-green-400">{coupon.code}</p>
                    <p className="text-xs text-green-500">
                      {coupon.discount_type === 'percentage'
                        ? `${coupon.discount_value}% off`
                        : `${formatPrice(coupon.discount_value)} off`}
                    </p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="p-1 text-green-500 hover:text-red-400 transition-colors"
                    aria-label="Remove coupon"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(''); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                    placeholder="Enter coupon code"
                    className="flex-1 text-sm bg-slate-800/60 border border-slate-700 text-white placeholder:text-slate-500 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a] transition-colors"
                    disabled={couponLoading}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={!couponInput.trim() || couponLoading}
                    className="px-4 py-2 bg-[#16a34a] text-white text-sm font-bold rounded-lg hover:bg-[#15803d] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {couponLoading ? '...' : 'Apply'}
                  </button>
                </div>
              )}

              {couponError && (
                <p className="text-xs text-red-400 mt-2">{couponError}</p>
              )}
            </div>

            {/* Totals */}
            <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-5 space-y-3">
              <h2 className="text-base font-bold text-white pb-2 border-b border-slate-800">
                Order Summary
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal ({totals.itemCount} item{totals.itemCount !== 1 ? 's' : ''})</span>
                  <span className="text-white">{formatPrice(totals.subtotal)}</span>
                </div>

                {totals.discount > 0 && (
                  <div className="flex justify-between text-green-400 font-semibold">
                    <span>Coupon Discount</span>
                    <span>− {formatPrice(totals.discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400">
                  <span>Shipping</span>
                  <span className={totals.shipping === 0 ? 'text-green-400 font-semibold' : 'text-white'}>
                    {totals.shipping === 0 ? 'FREE' : formatPrice(totals.shipping)}
                  </span>
                </div>

                {totals.shipping > 0 && (
                  <p className="text-[11px] text-slate-500">
                    Free shipping on orders above {formatPrice(FREE_SHIPPING_ABOVE)}
                  </p>
                )}
              </div>

              <div className="border-t border-slate-800 pt-3 flex justify-between font-bold text-lg text-white">
                <span>Total</span>
                <span>{formatPrice(totals.total)}</span>
              </div>

              <p className="text-[11px] text-slate-500 text-center">
                Incl. of {gstRate}% GST (₹{totals.gst.toLocaleString('en-IN')}). GST invoice provided.
              </p>

              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full py-4 bg-[#16a34a] text-white font-bold rounded-xl hover:bg-[#15803d] transition-colors"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust */}
            <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-4 space-y-2.5">
              {[
                { icon: ShieldCheck, text: 'Secure checkout with Razorpay' },
                { icon: Truck, text: `Free shipping above ${formatPrice(FREE_SHIPPING_ABOVE)}` },
                { icon: RotateCcw, text: 'Hassle-free returns & support' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-xs text-slate-500">
                  <Icon className="w-4 h-4 text-[#16a34a] shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
