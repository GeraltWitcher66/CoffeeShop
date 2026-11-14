'use client';

import Image from 'next/image';
import { formatPrice, storeInfo } from '@/lib/store-data';
import { useCart } from '@/components/CartProvider';

const basePath = '/CoffeeShop';

export default function CartView() {
  const { items, totalCount, subtotal, shipping, totalPrice, updateQuantity, removeItem, clearCart } =
    useCart();

  const countLabel = new Intl.NumberFormat('fa-IR').format(totalCount);

  if (items.length === 0) {
    return (
      <section className="py-16 sm:py-24">
        <div className="container-page">
          <div className="card-surface mx-auto flex max-w-lg flex-col items-center rounded-[2rem] px-6 py-16 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-caramel/15 text-caramel-dark">
              <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
                <path
                  d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21 8H6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="20" r="1.3" fill="currentColor" />
                <circle cx="17" cy="20" r="1.3" fill="currentColor" />
              </svg>
            </span>
            <h1 className="mt-6 text-2xl font-black text-brown">سبد خرید شما خالی است</h1>
            <p className="mt-3 text-sm leading-7 text-brown-light">
              هنوز محصولی انتخاب نکرده‌اید. دانه‌های تازه‌برشتهٔ این هفته منتظر شما هستند.
            </p>
            <a href={`${basePath}/#products`} className="btn-primary mt-7">
              مشاهدهٔ محصولات
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="container-page">
        <nav className="flex items-center gap-2 text-xs text-brown-light">
          <a href={`${basePath}/`} className="transition hover:text-caramel-dark">
            خانه
          </a>
          <span>/</span>
          <span className="font-bold text-brown">سبد خرید</span>
        </nav>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <h1 className="text-3xl font-black text-brown sm:text-4xl">سبد خرید</h1>
          <p className="text-sm text-brown-light">{countLabel} کالا در سبد شما</p>
        </div>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map(({ product, quantity }) => (
              <article
                key={product.id}
                className="card-surface flex gap-4 rounded-3xl p-4 sm:gap-5 sm:p-5"
              >
                <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-cream-dark to-caramel/40 sm:h-32 sm:w-28">
                  <Image
                    src={`${basePath}${product.image}`}
                    alt={product.name}
                    fill
                    sizes="120px"
                    className="object-cover mix-blend-multiply"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-bold text-caramel-dark">{product.category}</p>
                      <h2 className="mt-1 text-sm font-black text-brown sm:text-base">{product.name}</h2>
                      <p className="mt-1 text-[11px] text-brown-light">{product.unit}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      className="text-[11px] font-bold text-brown-light/70 transition hover:text-caramel-dark"
                      aria-label={`حذف ${product.name} از سبد`}
                    >
                      حذف
                    </button>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-5">
                    <div className="flex items-center gap-1.5 rounded-full border border-brown/15 bg-white/40 p-1.5">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, -1)}
                        disabled={quantity === 1}
                        className="grid h-7 w-7 place-items-center rounded-full text-brown transition hover:bg-brown/5 disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label={`کاهش تعداد ${product.name}`}
                      >
                        −
                      </button>
                      <span className="w-9 text-center text-xs font-black text-brown">
                        {new Intl.NumberFormat('fa-IR').format(quantity)}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, 1)}
                        disabled={quantity >= product.stock}
                        className="grid h-7 w-7 place-items-center rounded-full text-brown transition hover:bg-brown/5 disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label={`افزایش تعداد ${product.name}`}
                      >
                        +
                      </button>
                    </div>

                    <p className="shrink-0 text-sm font-black text-brown">
                      {formatPrice(product.price * quantity)}
                    </p>
                  </div>
                </div>
              </article>
            ))}

            <div className="flex items-center justify-between pt-1">
              <a href={`${basePath}/#products`} className="text-sm font-bold text-caramel-dark transition hover:text-brown">
                ← ادامهٔ خرید
              </a>
              <button
                type="button"
                onClick={clearCart}
                className="text-xs font-bold text-brown-light/70 transition hover:text-brown"
              >
                خالی کردن سبد
              </button>
            </div>
          </div>

          <aside className="card-surface rounded-3xl p-6 lg:sticky lg:top-32 lg:col-span-1">
            <h2 className="text-base font-black text-brown">خلاصهٔ سفارش</h2>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between text-brown-light">
                <dt>جمع کالاها</dt>
                <dd className="font-bold text-brown">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between text-brown-light">
                <dt>هزینهٔ ارسال</dt>
                <dd className={shipping === 0 ? 'font-bold text-caramel-dark' : 'font-bold text-brown'}>
                  {shipping === 0 ? 'رایگان' : formatPrice(shipping)}
                </dd>
              </div>
              {shipping > 0 && (
                <p className="rounded-xl bg-caramel/10 px-3 py-2 text-[11px] leading-5 text-caramel-dark">
                  با {formatPrice(500000 - subtotal)} خرید بیشتر، ارسال رایگان می‌شود.
                </p>
              )}
            </dl>

            <div className="mt-5 flex items-center justify-between border-t border-brown/10 pt-4">
              <span className="text-sm font-bold text-brown-light">مبلغ قابل پرداخت</span>
              <span className="text-lg font-black text-brown">{formatPrice(totalPrice)}</span>
            </div>

            <a href={`${basePath}/checkout/`} className="btn-primary mt-6 w-full">
              ادامهٔ فرآیند خرید
            </a>

            <p className="mt-3 rounded-xl bg-brown/5 px-3 py-2 text-center text-[11px] leading-5 text-brown-light">
              ثبت سفارش بدون درگاه پرداخت انجام می‌شود؛ برای هماهنگی نهایی با شما تماس می‌گیریم.
            </p>

            <p className="mt-4 text-center text-[11px] leading-5 text-brown-light/80">
              پشتیبانی {storeInfo.phone} — هر روز ۹ تا ۲۱
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
