'use client';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE, products } from '@/lib/store-data';

const CartContext = createContext(null);
const STORAGE_KEY = 'cafedan-cart';

function normalizeItems(rawItems) {
  const catalog = new Map(products.map((product) => [product.id, product]));

  return rawItems.flatMap((item) => {
    const product = catalog.get(item?.product?.id);
    if (!product || product.stock <= 0) return [];
    const quantity = Math.min(Math.max(Number(item.quantity) || 1, 1), product.stock);
    return [{ product, quantity }];
  });
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const itemsRef = useRef([]);
  const toastTimer = useRef(null);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setItems(normalizeItems(parsed));
      }
    } catch {
      // ignore broken storage
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage may be unavailable
    }
  }, [items, isHydrated]);

  useEffect(() => {
    function syncFromOtherTabs(event) {
      if (event.key !== STORAGE_KEY || !event.newValue) return;
      try {
        const parsed = JSON.parse(event.newValue);
        if (Array.isArray(parsed)) setItems(normalizeItems(parsed));
      } catch {
        // ignore malformed values
      }
    }

    window.addEventListener('storage', syncFromOtherTabs);
    return () => window.removeEventListener('storage', syncFromOtherTabs);
  }, []);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  function showToast(text, tone = 'success') {
    window.clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), text, tone });
    toastTimer.current = window.setTimeout(() => setToast(null), 3500);
  }

  function addItem(product, quantity = 1) {
    if (product.stock <= 0) {
      showToast(`${product.name} فعلاً موجود نیست.`, 'info');
      return;
    }

    const existing = itemsRef.current.find((item) => item.product.id === product.id);
    if ((existing?.quantity ?? 0) + quantity > product.stock) {
      showToast(`حداکثر موجودی ${product.name} در سبد شماست.`, 'info');
      return;
    }

    setItems((current) => {
      const inCart = current.find((item) => item.product.id === product.id);
      if (inCart) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        );
      }
      return [...current, { product, quantity: Math.min(quantity, product.stock) }];
    });
    showToast(`${product.name} به سبد اضافه شد.`);
  }

  function updateQuantity(productId, delta) {
    setItems((current) =>
      current.map((item) => {
        if (item.product.id !== productId) return item;
        const nextQuantity = Math.min(Math.max(item.quantity + delta, 1), item.product.stock);
        return { ...item, quantity: nextQuantity };
      })
    );
  }

  function removeItem(productId) {
    setItems((current) => current.filter((item) => item.product.id !== productId));
  }

  function clearCart() {
    setItems([]);
  }

  const value = useMemo(() => {
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    return {
      items,
      totalCount,
      subtotal,
      shipping,
      totalPrice: subtotal + shipping,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      isOpen,
      setIsOpen,
      toast,
    };
  }, [items, isOpen, toast]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
}
