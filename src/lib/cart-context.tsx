'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { getEffectivePrice, extractGST, applyDiscount } from './utils';

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface CartProduct {
  id: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  sale_price: number | null;
  thumbnail: string | null;
  stock_quantity: number;
  track_inventory: boolean;
  category: string;
  brand: string;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

export interface AppliedCoupon {
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  minimum_order: number;
}

export interface CartTotals {
  subtotal: number;       // Sum of (unit_price × qty), prices are GST-inclusive
  discount: number;       // Coupon discount applied to subtotal
  taxable: number;        // subtotal - discount (still GST-inclusive)
  gst: number;            // GST extracted from taxable (18/118) — for invoice display only
  shipping: number;       // 0 if above threshold, else flat rate
  total: number;          // taxable + shipping (gst already included inside taxable)
  itemCount: number;      // Total units in cart
}

// ─── State & Actions ──────────────────────────────────────────────────────────

interface CartState {
  items: CartItem[];
  coupon: AppliedCoupon | null;
  isDrawerOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: CartProduct; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'APPLY_COUPON'; payload: AppliedCoupon }
  | { type: 'REMOVE_COUPON' }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_DRAWER' }
  | { type: 'CLOSE_DRAWER' }
  | { type: 'HYDRATE'; payload: Pick<CartState, 'items' | 'coupon'> };

const initialState: CartState = {
  items: [],
  coupon: null,
  isDrawerOpen: false,
};

// ─── Reducer ──────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return {
        ...state,
        items: action.payload.items,
        coupon: action.payload.coupon,
      };

    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;
      const existing = state.items.find((i) => i.product.id === product.id);

      if (existing) {
        const newQty = Math.min(
          existing.quantity + quantity,
          product.track_inventory ? product.stock_quantity : 999
        );
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === product.id ? { ...i, quantity: newQty } : i
          ),
        };
      }

      const cappedQty = product.track_inventory
        ? Math.min(quantity, product.stock_quantity)
        : quantity;

      return {
        ...state,
        items: [...state.items, { product, quantity: cappedQty }],
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i.product.id !== action.payload.productId),
      };

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.product.id !== productId),
        };
      }
      return {
        ...state,
        items: state.items.map((i) => {
          if (i.product.id !== productId) return i;
          const capped = i.product.track_inventory
            ? Math.min(quantity, i.product.stock_quantity)
            : quantity;
          return { ...i, quantity: capped };
        }),
      };
    }

    case 'APPLY_COUPON':
      return { ...state, coupon: action.payload };

    case 'REMOVE_COUPON':
      return { ...state, coupon: null };

    case 'CLEAR_CART':
      return { ...state, items: [], coupon: null };

    case 'OPEN_DRAWER':
      return { ...state, isDrawerOpen: true };

    case 'CLOSE_DRAWER':
      return { ...state, isDrawerOpen: false };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface CartContextValue {
  items: CartItem[];
  coupon: AppliedCoupon | null;
  totals: CartTotals;
  isDrawerOpen: boolean;
  shippingCharge: number;
  freeShippingAbove: number;
  gstRate: number;
  addToCart: (product: CartProduct, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  applyCoupon: (coupon: AppliedCoupon) => void;
  removeCoupon: () => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  isInCart: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

const CART_STORAGE_KEY = 'infysmart_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [shippingCharge, setShippingCharge] = useState(299);
  const [freeShippingAbove, setFreeShippingAbove] = useState(5000);
  const [gstRate, setGstRate] = useState(18);

  // Fetch all commerce settings from Directus on mount
  useEffect(() => {
    fetch('/api/shipping/rules')
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.shipping_charge === 'number') setShippingCharge(data.shipping_charge);
        if (typeof data.free_shipping_above === 'number') setFreeShippingAbove(data.free_shipping_above);
        if (typeof data.gst_rate === 'number') setGstRate(data.gst_rate);
      })
      .catch(() => { /* keep defaults on error */ });
  }, []);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as Pick<CartState, 'items' | 'coupon'>;
        if (stored.items && Array.isArray(stored.items)) {
          dispatch({ type: 'HYDRATE', payload: stored });
        }
      }
    } catch {
      // Malformed storage — ignore and start fresh
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify({ items: state.items, coupon: state.coupon })
      );
    } catch {
      // Storage full or unavailable — silently fail
    }
  }, [state.items, state.coupon]);

  // Derived totals
  const totals = useMemo<CartTotals>(() => {
    const subtotal = state.items.reduce((sum, item) => {
      const price = getEffectivePrice(item.product.price, item.product.sale_price);
      return sum + price * item.quantity;
    }, 0);

    const discount = state.coupon
      ? applyDiscount(subtotal, state.coupon.discount_type, state.coupon.discount_value)
      : 0;

    const taxable = Math.max(0, subtotal - discount);
    const gst = extractGST(taxable, gstRate);  // extracted for invoice display only
    const shipping = subtotal >= freeShippingAbove ? 0 : shippingCharge;
    const total = taxable + shipping;           // gst is already inside taxable
    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

    return { subtotal, discount, taxable, gst, shipping, total, itemCount };
  }, [state.items, state.coupon, shippingCharge, freeShippingAbove, gstRate]);

  const addToCart = useCallback((product: CartProduct, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
    dispatch({ type: 'OPEN_DRAWER' });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  }, []);

  const applyCoupon = useCallback((coupon: AppliedCoupon) => {
    dispatch({ type: 'APPLY_COUPON', payload: coupon });
  }, []);

  const removeCoupon = useCallback(() => dispatch({ type: 'REMOVE_COUPON' }), []);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);
  const openDrawer = useCallback(() => dispatch({ type: 'OPEN_DRAWER' }), []);
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), []);

  const isInCart = useCallback(
    (productId: string) => state.items.some((i) => i.product.id === productId),
    [state.items]
  );

  const getItemQuantity = useCallback(
    (productId: string) => state.items.find((i) => i.product.id === productId)?.quantity ?? 0,
    [state.items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      coupon: state.coupon,
      totals,
      isDrawerOpen: state.isDrawerOpen,
      shippingCharge,
      freeShippingAbove,
      gstRate,
      addToCart,
      removeFromCart,
      updateQuantity,
      applyCoupon,
      removeCoupon,
      clearCart,
      openDrawer,
      closeDrawer,
      isInCart,
      getItemQuantity,
    }),
    [
      state.items,
      state.coupon,
      state.isDrawerOpen,
      totals,
      shippingCharge,
      freeShippingAbove,
      gstRate,
      addToCart,
      removeFromCart,
      updateQuantity,
      applyCoupon,
      removeCoupon,
      clearCart,
      openDrawer,
      closeDrawer,
      isInCart,
      getItemQuantity,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
