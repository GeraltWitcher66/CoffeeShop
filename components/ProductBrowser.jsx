'use client';

import { useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { SearchIcon } from '@/components/Icons';
import { formatNumber, formatPrice } from '@/lib/format';
import { categories } from '@/lib/store-data';

const sortOptions = [
  { id: 'newest', label: 'جدیدترین', compare: (a, b) => b.createdAt.localeCompare(a.createdAt) },
  { id: 'cheapest', label: 'ارزان‌ترین', compare: (a, b) => a.price - b.price },
  { id: 'bestseller', label: 'پرفروش‌ترین', compare: (a, b) => b.reviews - a.reviews },
];

const ALL = 'all';

export default function ProductBrowser({ products, showCategories = false }) {
  const priceFloor = Math.min(...products.map((product) => product.price));
  const priceCeiling = Math.max(...products.map((product) => product.price));

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [priceCap, setPriceCap] = useState(priceCeiling);
  const [sort, setSort] = useState('newest');

  const hasFilters = query.trim() !== '' || activeCategory !== ALL || priceCap < priceCeiling;

  const visibleProducts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const { compare } = sortOptions.find((option) => option.id === sort);

    return products
      .filter((product) => {
        if (showCategories && activeCategory !== ALL && product.categoryId !== activeCategory) return false;
        if (product.price > priceCap) return false;
        if (!needle) return true;
        return [product.name, product.englishName, product.category, product.description]
          .join(' ')
          .toLowerCase()
          .includes(needle);
      })
      .sort(compare);
  }, [products, query, activeCategory, priceCap, sort, showCategories]);

  function resetFilters() {
    setQuery('');
    setActiveCategory(ALL);
    setPriceCap(priceCeiling);
  }

  return (
    <div className="mt-8">
      <div className="card-surface rounded-[1.75rem] p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative flex-1 lg:max-w-sm">
            <span className="sr-only">جست‌وجو در محصولات</span>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brown-light/60">
              <SearchIcon />
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="جست‌وجوی نام محصول…"
              className="w-full rounded-full border border-brown/15 bg-white/60 py-2.5 pe-11 ps-4 text-xs text-brown outline-none transition placeholder:text-brown-light/50 focus:border-caramel focus:bg-white"
            />
          </label>

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

        {showCategories && (
          <div className="mt-4 flex flex-wrap gap-2 border-t border-brown/10 pt-4">
            <button
              type="button"
              onClick={() => setActiveCategory(ALL)}
              aria-pressed={activeCategory === ALL}
              className={`rounded-full border px-4 py-1.5 text-[11px] font-bold transition ${
                activeCategory === ALL
                  ? 'border-caramel bg-caramel text-white'
                  : 'border-brown/15 text-brown-light hover:border-brown/40 hover:text-brown'
              }`}
            >
              همهٔ دسته‌ها
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={activeCategory === category.id}
                className={`rounded-full border px-4 py-1.5 text-[11px] font-bold transition ${
                  activeCategory === category.id
                    ? 'border-caramel bg-caramel text-white'
                    : 'border-brown/15 text-brown-light hover:border-brown/40 hover:text-brown'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        )}

        {priceCeiling > priceFloor && (
          <div className="mt-4 flex flex-col gap-2 border-t border-brown/10 pt-4 sm:flex-row sm:items-center sm:gap-4">
            <label htmlFor="price-cap" className="shrink-0 text-[11px] font-bold text-brown">
              سقف قیمت: {priceCap >= priceCeiling ? 'همهٔ قیمت‌ها' : formatPrice(priceCap)}
            </label>
            <input
              id="price-cap"
              type="range"
              min={priceFloor}
              max={priceCeiling}
              step={5000}
              value={priceCap}
              onChange={(event) => setPriceCap(Number(event.target.value))}
              className="price-range h-1.5 w-full cursor-pointer appearance-none rounded-full bg-brown/15 sm:flex-1"
            />
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-brown-light">
          {formatNumber(visibleProducts.length)} محصول
          {hasFilters ? ' با فیلترهای فعلی' : ''}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs font-bold text-caramel-dark transition hover:text-brown"
          >
            پاک کردن فیلترها
          </button>
        )}
      </div>

      {visibleProducts.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="card-surface mt-6 rounded-3xl px-6 py-14 text-center">
          <p className="text-sm font-black text-brown">محصولی با این فیلترها پیدا نشد.</p>
          <p className="mt-2 text-xs text-brown-light">جست‌وجو یا سقف قیمت را تغییر دهید.</p>
          <button type="button" onClick={resetFilters} className="btn-ghost mt-6 !py-2 text-xs">
            نمایش همهٔ محصولات
          </button>
        </div>
      )}
    </div>
  );
}
