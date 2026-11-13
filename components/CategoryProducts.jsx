'use client';

import { useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';

const sortOptions = [
  { id: 'newest', label: 'جدیدترین', compare: (a, b) => b.createdAt.localeCompare(a.createdAt) },
  { id: 'cheapest', label: 'ارزان‌ترین', compare: (a, b) => a.price - b.price },
  { id: 'bestseller', label: 'پرفروش‌ترین', compare: (a, b) => b.reviews - a.reviews },
];

export default function CategoryProducts({ products }) {
  const [sort, setSort] = useState('newest');

  const sortedProducts = useMemo(() => {
    const { compare } = sortOptions.find((option) => option.id === sort);
    return [...products].sort(compare);
  }, [products, sort]);

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-bold text-brown-light">مرتب‌سازی:</p>
        <div role="group" aria-label="مرتب‌سازی محصولات" className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSort(option.id)}
              aria-pressed={sort === option.id}
              className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
                sort === option.id
                  ? 'border-brown bg-brown text-cream'
                  : 'border-brown/15 bg-cream text-brown-light hover:border-brown/40 hover:text-brown'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
