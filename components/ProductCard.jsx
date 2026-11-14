'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatNumber, formatPrice } from '@/lib/format';
import { useCart } from '@/components/CartProvider';
import { useFavorites } from '@/components/FavoritesProvider';
import { HeartIcon, PlusIcon } from '@/components/Icons';

const basePath = '/CoffeeShop';
const faNumber = new Intl.NumberFormat('fa-IR');

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const {
    id,
    name,
    englishName,
    category,
    description,
    image,
    price,
    oldPrice,
    unit,
    badge,
    rating,
    reviews,
    stock,
  } = product;
  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : null;
  const inStock = stock > 0;
  const favorite = isFavorite(id);
  // next/link adds basePath automatically, so keep the href relative to the app root
  const productHref = `/product/${id}/`;

  return (
    <article className="card-surface group flex h-full flex-col overflow-hidden rounded-[1.75rem] transition duration-300 hover:-translate-y-1 hover:border-brown/30 hover:shadow-soft">
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-cream-dark via-[#E9D8C3] to-caramel/45">
        <Image
          src={`${basePath}${image}`}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={`object-cover opacity-95 mix-blend-multiply transition duration-700 group-hover:scale-105 ${
            inStock ? '' : 'grayscale'
          }`}
        />

        <Link href={productHref} className="absolute inset-0 z-10" aria-label={`مشاهدهٔ ${name}`} />

        <div className="pointer-events-none absolute right-3 top-3 z-20 flex flex-col items-end gap-1.5">
          {!inStock && (
            <span className="rounded-full bg-brown px-3 py-1 text-[10px] font-bold text-cream">ناموجود</span>
          )}
          {badge && inStock && (
            <span className="rounded-full bg-brown/90 px-3 py-1 text-[10px] font-bold text-cream backdrop-blur">
              {badge}
            </span>
          )}
          {discount && (
            <span className="rounded-full bg-caramel px-3 py-1 text-[10px] font-bold text-white">
              {faNumber.format(discount)}٪ تخفیف
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => toggleFavorite(id)}
          aria-pressed={favorite}
          aria-label={favorite ? `حذف ${name} از علاقه‌مندی‌ها` : `افزودن ${name} به علاقه‌مندی‌ها`}
          className={`absolute left-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full border shadow-md backdrop-blur transition hover:scale-105 ${
            favorite
              ? 'border-caramel bg-caramel text-white'
              : 'border-white/60 bg-white/85 text-brown hover:text-caramel-dark'
          }`}
        >
          <HeartIcon filled={favorite} />
        </button>

        <button
          type="button"
          onClick={() => addItem(product)}
          disabled={!inStock}
          aria-label={inStock ? `افزودن ${name} به سبد خرید` : `${name} ناموجود است`}
          className="absolute bottom-3 left-3 z-20 grid h-11 w-11 place-items-center rounded-full bg-caramel text-white shadow-lg shadow-brown/25 transition hover:scale-110 hover:bg-caramel-dark active:scale-95 disabled:cursor-not-allowed disabled:bg-brown/30 disabled:hover:scale-100"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-[11px] font-bold text-caramel-dark">{category}</span>
        <h3 className="mt-1.5 text-base font-black text-brown">
          <Link href={productHref} className="transition hover:text-caramel-dark">
            {name}
          </Link>
        </h3>
        <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-brown-light/60">{englishName}</p>
        <p className="mt-2 line-clamp-2 flex-1 text-xs leading-6 text-brown-light">{description}</p>

        <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-brown-light">
          <span className="text-caramel">★</span>
          {new Intl.NumberFormat('fa-IR', { minimumFractionDigits: 1 }).format(rating)}
          <span className="font-normal text-brown-light/60">({faNumber.format(reviews)} نظر)</span>
        </div>

        <div className="flex items-end justify-between gap-3 border-t border-brown/10 pt-4">
          <div>
            <p className="text-xl font-black leading-none text-brown">{formatPrice(price)}</p>
            <p className="mt-2 flex items-center gap-2 text-[11px] text-brown-light">
              {unit}
              {oldPrice && <span className="text-brown-light/50 line-through">{formatPrice(oldPrice)}</span>}
            </p>
          </div>
          <span
            className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] font-bold ${
              inStock ? 'bg-brown/5 text-brown-light' : 'bg-brown/10 text-brown-light/70'
            }`}
          >
            {inStock ? (stock <= 3 ? `${formatNumber(stock)} عدد باقی` : 'موجود') : 'ناموجود'}
          </span>
        </div>
      </div>
    </article>
  );
}
