'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { formatPrice, storeInfo } from '@/lib/store-data';
import { CartIcon, CloseIcon } from '@/components/Icons';
import { useCart } from '@/components/CartProvider';

const basePath = '/CoffeeShop';

const navLinks = [
  { label: 'خانه', href: `${basePath}/` },
  { label: 'همهٔ محصولات', href: `${basePath}/products/` },
  { label: 'دسته‌بندی‌ها', href: `${basePath}/#categories` },
  { label: 'داستان ما', href: `${basePath}/#story` },
  { label: 'علاقه‌مندی‌ها', href: `${basePath}/favorites/` },
  { label: 'تماس با ما', href: `${basePath}/#contact` },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { items, totalCount, subtotal, updateQuantity, removeItem, isOpen, setIsOpen } = useCart();
  const drawerRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    function handleEscape(event) {
      if (event.key === 'Escape') setIsMenuOpen(false);
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      drawerRef.current?.querySelector('[data-autofocus]')?.focus();
    }, 0);

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !drawerRef.current) return;

      const focusables = drawerRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [isOpen, setIsOpen]);
  const countLabel = new Intl.NumberFormat('fa-IR').format(totalCount);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-brown text-cream">
        <div className="container-page flex items-center justify-between gap-4 py-2 text-[11px] sm:text-xs">
          <p className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-caramel" />
            ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان
          </p>
          <a href={`tel:${storeInfo.phone}`} className="hidden transition hover:text-caramel sm:block">
            {storeInfo.phone}
          </a>
        </div>
      </div>

      <div className="border-b border-brown/10 bg-cream/90 backdrop-blur-md">
        <div className="container-page flex h-20 items-center justify-between gap-6">
          <a href={`${basePath}/`} className="flex items-center gap-3">
            <span className="relative grid h-14 w-14 shrink-0 place-items-center">
              <Image
                src={`${basePath}/images/logo.png`}
                alt={`لوگوی ${storeInfo.name}`}
                width={56}
                height={56}
                className="h-full w-full object-contain"
                priority
              />
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-black text-brown">{storeInfo.name}</span>
              <span className="block text-[11px] font-medium text-brown-light">{storeInfo.tagline}</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-bold text-brown-light lg:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-caramel-dark">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`${basePath}/products/`}
              className="btn-primary hidden !px-5 !py-2.5 text-xs sm:inline-flex"
            >
              سفارش قهوه
            </a>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className="relative flex h-11 items-center gap-2 rounded-full border border-brown/15 px-3 text-brown transition hover:border-caramel hover:text-caramel-dark"
                aria-label={`سبد خرید، ${countLabel} کالا`}
                aria-expanded={isOpen}
              >
                <CartIcon />
                <span className="hidden text-xs font-black sm:block">{formatPrice(subtotal)}</span>
                <span className="absolute -top-1.5 -left-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-caramel px-1 text-[10px] font-black text-white">
                  {countLabel}
                </span>
              </button>

              {isOpen && isMounted && createPortal(
                <>
                  <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                  />

                  <aside
                    ref={drawerRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label="سبد خرید"
                    tabIndex={-1}
                    className="fixed left-3 top-1/2 z-[60] flex max-h-[85vh] w-[min(400px,calc(100vw-1.5rem))] -translate-y-1/2 flex-col overflow-hidden rounded-[1.75rem] bg-cream shadow-2xl"
                  >
                    <div className="flex shrink-0 items-start justify-between gap-3 border-b border-brown/10 p-5">
                      <div>
                        <p className="text-base font-black text-brown">سبد خرید</p>
                        <p className="mt-1 text-[11px] text-brown-light">{countLabel} کالا</p>
                      </div>
                      <button
                        type="button"
                        data-autofocus
                        onClick={() => setIsOpen(false)}
                        aria-label="بستن سبد خرید"
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-brown/10 bg-white text-brown shadow-md transition hover:bg-cream-dark hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caramel"
                      >
                        <CloseIcon />
                      </button>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto p-5">
                      {items.length === 0 ? (
                        <p className="rounded-xl bg-brown/5 px-4 py-8 text-center text-xs text-brown-light">
                          هنوز محصولی اضافه نکرده‌اید.
                        </p>
                      ) : (
                        <ul className="space-y-4">
                          {items.map(({ product, quantity }) => (
                            <li
                              key={product.id}
                              className="border-b border-brown/10 pb-4 last:border-0 last:pb-0"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <p className="text-xs font-black text-brown">{product.name}</p>
                                  <p className="mt-1 text-[11px] text-brown-light">
                                    {product.unit} — {formatPrice(product.price)}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeItem(product.id)}
                                  className="shrink-0 text-[11px] font-bold text-brown-light/70 transition hover:text-caramel-dark"
                                  aria-label={`حذف ${product.name}`}
                                >
                                  حذف
                                </button>
                              </div>

                              <div className="mt-3 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-1 rounded-full border border-brown/15 bg-white/40 p-1">
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(product.id, -1)}
                                    disabled={quantity === 1}
                                    className="grid h-7 w-7 place-items-center rounded-full text-brown transition hover:bg-brown/5 disabled:cursor-not-allowed disabled:opacity-30"
                                    aria-label={`کاهش تعداد ${product.name}`}
                                  >
                                    −
                                  </button>
                                  <span className="w-7 text-center text-[11px] font-black text-brown">
                                    {new Intl.NumberFormat('fa-IR').format(quantity)}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(product.id, 1)}
                                    className="grid h-7 w-7 place-items-center rounded-full text-brown transition hover:bg-brown/5"
                                    aria-label={`افزایش تعداد ${product.name}`}
                                  >
                                    +
                                  </button>
                                </div>

                                <span className="shrink-0 text-xs font-black text-brown">
                                  {formatPrice(product.price * quantity)}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="shrink-0 border-t border-brown/10 p-5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-brown-light">جمع سبد</span>
                        <span className="text-sm font-black text-brown">{formatPrice(subtotal)}</span>
                      </div>

                      <a
                        href={`${basePath}/cart/`}
                        onClick={() => setIsOpen(false)}
                        className="btn-primary mt-4 w-full !py-2.5 text-xs"
                      >
                        مشاهدهٔ سبد خرید
                      </a>
                      <a
                        href={`${basePath}/checkout/`}
                        onClick={() => setIsOpen(false)}
                        className="mt-3 block text-center text-[11px] font-bold text-brown-light transition hover:text-caramel-dark"
                      >
                        تسویه حساب سریع
                      </a>
                    </div>
                  </aside>
                </>,
                document.body
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="grid h-11 w-11 place-items-center rounded-full border border-brown/15 text-brown transition hover:border-caramel lg:hidden"
              aria-label="منو"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                {isMenuOpen ? (
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M4 7h16M4 12h16M4 17h12"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav id="mobile-nav" className="border-t border-brown/10 bg-cream lg:hidden">
            <div className="container-page flex flex-col py-4 text-sm font-bold text-brown">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-3 py-3 transition hover:bg-brown/5 hover:text-caramel-dark"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
