'use client';

import { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { MinusIcon, PlusIcon } from '@/components/Icons';
import { formatNumber } from '@/lib/format';

export default function AddToCart({ product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const inStock = product.stock > 0;

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex items-center justify-between gap-2 rounded-full border border-brown/15 bg-white/50 p-1.5 sm:justify-start">
        <button
          type="button"
          onClick={() => setQuantity((value) => Math.max(1, value - 1))}
          disabled={!inStock || quantity === 1}
          className="grid h-9 w-9 place-items-center rounded-full text-brown transition hover:bg-brown/5 disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="کاهش تعداد"
        >
          <MinusIcon />
        </button>
        <span className="w-10 text-center text-sm font-black text-brown" aria-live="polite">
          {formatNumber(quantity)}
        </span>
        <button
          type="button"
          onClick={() => setQuantity((value) => Math.min(product.stock, value + 1))}
          disabled={!inStock || quantity >= product.stock}
          className="grid h-9 w-9 place-items-center rounded-full text-brown transition hover:bg-brown/5 disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="افزایش تعداد"
        >
          <PlusIcon />
        </button>
      </div>

      <button
        type="button"
        onClick={() => inStock && addItem(product, quantity)}
        disabled={!inStock}
        className="btn-primary flex-1 disabled:cursor-not-allowed disabled:bg-brown/30 disabled:shadow-none disabled:hover:translate-y-0"
      >
        {inStock ? 'افزودن به سبد خرید' : 'فعلاً ناموجود'}
      </button>
    </div>
  );
}
