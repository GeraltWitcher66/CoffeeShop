'use client';

import { useState } from 'react';
import { formatNumber, formatPrice, toEnglishDigits } from '@/lib/format';
import { FREE_SHIPPING_THRESHOLD, storeInfo } from '@/lib/store-data';
import { useCart } from '@/components/CartProvider';
import { CheckIcon } from '@/components/Icons';

const basePath = '/CoffeeShop';
const faNumber = new Intl.NumberFormat('fa-IR');
const LAST_ORDER_KEY = 'cafedan-last-order';

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 3) errors.name = 'نام و نام خانوادگی را کامل بنویسید.';

  const phone = toEnglishDigits(values.phone).replace(/\D/g, '');
  if (!/^09\d{9}$/.test(phone)) errors.phone = 'شمارهٔ موبایل باید ۱۱ رقم و با ۰۹ شروع شود.';
  if (values.address.trim().length < 10) errors.address = 'آدرس را با جزئیات بیشتری وارد کنید.';

  return errors;
}

export default function CheckoutForm() {
  const { items, totalCount, subtotal, shipping, totalPrice, clearCart } = useCart();
  const [values, setValues] = useState({ name: '', phone: '', address: '', note: '' });
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);
  const [copied, setCopied] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const orderCode = `CD-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const snapshot = {
      code: orderCode,
      createdAt: new Date().toISOString(),
      customer: { ...values, note: values.note.trim() },
      items: items.map((item) => ({
        name: item.product.name,
        unit: item.product.unit,
        quantity: item.quantity,
        price: item.product.price,
      })),
      subtotal,
      shipping,
      totalPrice,
    };

    try {
      window.localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(snapshot));
    } catch {
      // storage may be unavailable
    }

    setOrder(snapshot);
    clearCart();
    setCopied(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function copyOrder() {
    if (!order) return;
    const lines = [
      `سفارش ${order.code} — ${storeInfo.name}`,
      `نام: ${order.customer.name}`,
      `موبایل: ${order.customer.phone}`,
      `آدرس: ${order.customer.address}`,
      order.customer.note ? `یادداشت: ${order.customer.note}` : null,
      '---',
      ...order.items.map((item) => `${item.name} × ${item.quantity} — ${formatPrice(item.price * item.quantity)}`),
      '---',
      `جمع کالاها: ${formatPrice(order.subtotal)}`,
      `ارسال: ${order.shipping === 0 ? 'رایگان' : formatPrice(order.shipping)}`,
      `مبلغ کل: ${formatPrice(order.totalPrice)}`,
    ].filter(Boolean);

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  if (order) {
    return (
      <div className="card-surface rounded-[2rem] p-6 sm:p-10">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-caramel/15 text-caramel-dark">
          <CheckIcon className="h-6 w-6" />
        </span>
        <h2 className="mt-5 text-2xl font-black text-brown">سفارش شما ثبت شد</h2>
        <p className="mt-2 text-sm leading-7 text-brown-light">
          کد سفارش <span className="font-black text-brown">{order.code}</span> — برای هماهنگی نهایی و
          پرداخت با شما تماس می‌گیریم. مبلغ قابل پرداخت{' '}
          <span className="font-black text-brown">{formatPrice(order.totalPrice)}</span> است.
        </p>

        <ul className="mt-6 space-y-2 border-y border-brown/10 py-5 text-xs text-brown-light">
          {order.items.map((item) => (
            <li key={item.name} className="flex items-center justify-between gap-3">
              <span>
                {item.name} × {faNumber.format(item.quantity)}
              </span>
              <span className="font-bold text-brown">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={copyOrder} className="btn-primary !py-2.5 text-xs">
            {copied ? 'متن سفارش کپی شد' : 'کپی متن سفارش'}
          </button>
          <a href={`tel:${storeInfo.phone}`} className="btn-ghost !py-2.5 text-xs">
            تماس با پشتیبانی
          </a>
          <a href={`${basePath}/products/`} className="btn-ghost !py-2.5 text-xs">
            ادامهٔ خرید
          </a>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="card-surface rounded-[2rem] px-6 py-14 text-center">
        <p className="text-base font-black text-brown">سبد خرید شما خالی است</p>
        <p className="mt-2 text-xs leading-6 text-brown-light">
          برای ثبت سفارش ابتدا محصولی به سبد اضافه کنید.
        </p>
        <a href={`${basePath}/products/`} className="btn-primary mt-6 !py-2.5 text-xs">
          مشاهدهٔ محصولات
        </a>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-3">
      <form onSubmit={handleSubmit} noValidate className="card-surface space-y-5 rounded-[2rem] p-6 lg:col-span-2">
        <div>
          <label htmlFor="name" className="field-label">
            نام و نام خانوادگی
          </label>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={updateField}
            className="field"
            placeholder="مثلاً سارا محمدی"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-[11px] font-bold text-caramel-dark">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="field-label">
            شمارهٔ موبایل
          </label>
          <input
            id="phone"
            name="phone"
            value={values.phone}
            onChange={updateField}
            className="field"
            placeholder="۰۹۱۲۱۲۳۴۵۶۷"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-2 text-[11px] font-bold text-caramel-dark">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="address" className="field-label">
            آدرس تحویل
          </label>
          <textarea
            id="address"
            name="address"
            value={values.address}
            onChange={updateField}
            rows={3}
            className="field resize-none leading-7"
            placeholder="خیابان، کوچه، پلاک و واحد"
            autoComplete="street-address"
            aria-invalid={Boolean(errors.address)}
            aria-describedby={errors.address ? 'address-error' : undefined}
          />
          {errors.address && (
            <p id="address-error" className="mt-2 text-[11px] font-bold text-caramel-dark">
              {errors.address}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="note" className="field-label">
            یادداشت سفارش (اختیاری)
          </label>
          <input
            id="note"
            name="note"
            value={values.note}
            onChange={updateField}
            className="field"
            placeholder="مثلاً آسیاب مخصوص موکاپات"
          />
        </div>

        <p className="rounded-2xl bg-brown/5 px-4 py-3 text-[11px] leading-6 text-brown-light">
          این نسخه بدون درگاه پرداخت است: سفارش شما ذخیره و برای هماهنگی نهایی با شما تماس گرفته می‌شود.
        </p>

        <button type="submit" className="btn-primary w-full">
          ثبت سفارش
        </button>
      </form>

      <aside className="card-surface rounded-[2rem] p-6 lg:sticky lg:top-32">
        <h2 className="text-base font-black text-brown">خلاصهٔ سفارش</h2>
        <p className="mt-1 text-[11px] text-brown-light">{formatNumber(totalCount)} کالا</p>

        <ul className="mt-4 space-y-3 border-y border-brown/10 py-4 text-xs">
          {items.map(({ product, quantity }) => (
            <li key={product.id} className="flex items-start justify-between gap-3">
              <span className="text-brown-light">
                {product.name}
                <span className="mt-0.5 block text-[10px] text-brown-light/70">
                  {product.unit} × {faNumber.format(quantity)}
                </span>
              </span>
              <span className="shrink-0 font-bold text-brown">{formatPrice(product.price * quantity)}</span>
            </li>
          ))}
        </ul>

        <dl className="mt-4 space-y-2 text-xs">
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
        </dl>

        {shipping > 0 && (
          <p className="mt-3 rounded-xl bg-caramel/10 px-3 py-2 text-[11px] leading-5 text-caramel-dark">
            با {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} خرید بیشتر، ارسال رایگان می‌شود.
          </p>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-brown/10 pt-4">
          <span className="text-xs font-bold text-brown-light">مبلغ قابل پرداخت</span>
          <span className="text-lg font-black text-brown">{formatPrice(totalPrice)}</span>
        </div>
      </aside>
    </div>
  );
}
