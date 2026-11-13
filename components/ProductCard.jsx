'use client';

import Image from 'next/image';
import { formatPrice } from '@/lib/store-data';
import { useCart } from '@/components/CartProvider';

const basePath = '/CoffeeShop';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { name, englishName, category, description, image, price, oldPrice, unit, badge, rating, reviews } =
    product;
  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-brown/10 bg-cream transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-cream-dark via-[#E9D8C3] to-caramel/45">
        <Image
          src={`${basePath}${image}`}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover opacity-95 mix-blend-multiply transition duration-700 group-hover:scale-105"
        />

        <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
          {badge && (
            <span className="rounded-full bg-brown/90 px-3 py-1 text-[10px] font-bold text-cream backdrop-blur">
              {badge}
            </span>
          )}
          {discount && (
            <span className="rounded-full bg-caramel px-3 py-1 text-[10px] font-bold text-white">
              {new Intl.NumberFormat('fa-IR').format(discount)}٪ تخفیف
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => addItem(product)}
          aria-label={`افزودن ${name} به سبد خرید`}
          className="absolute bottom-3 left-3 grid h-11 w-11 place-items-center rounded-full bg-caramel text-white shadow-lg shadow-brown/25 transition hover:scale-110 hover:bg-caramel-dark active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-[11px] font-bold text-caramel-dark">{category}</span>
        <h3 className="mt-1.5 text-base font-black text-brown">{name}</h3>
        <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-brown-light/60">{englishName}</p>
        <p className="mt-2 line-clamp-2 flex-1 text-xs leading-6 text-brown-light">{description}</p>

        <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-brown-light">
          <span className="text-caramel">★</span>
          {new Intl.NumberFormat('fa-IR', { minimumFractionDigits: 1 }).format(rating)}
          <span className="font-normal text-brown-light/60">
            ({new Intl.NumberFormat('fa-IR').format(reviews)} نظر)
          </span>
        </div>

        <div className="flex items-end justify-between gap-3 border-t border-brown/10 pt-4">
          <div>
            <p className="text-xl font-black leading-none text-brown">{formatPrice(price)}</p>
            <p className="mt-2 flex items-center gap-2 text-[11px] text-brown-light">
              {unit}
              {oldPrice && <span className="text-brown-light/50 line-through">{formatPrice(oldPrice)}</span>}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-brown/5 px-3 py-1.5 text-[10px] font-bold text-brown-light">
            موجود
          </span>
        </div>
      </div>
    </article>
  );
}
