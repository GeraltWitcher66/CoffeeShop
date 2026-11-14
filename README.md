# کافه دان — قالب فروشگاهی Next.js

قالب فروشگاه قهوه با Next.js 15 (App Router)، Tailwind CSS و خروجی کاملاً استاتیک برای GitHub Pages.
سبد خرید، کاتالوگ، صفحهٔ محصول، مرتب‌سازی/جست‌وجو و تسویه حساب همه سمت کلاینت هستند و هیچ بک‌اند یا
پایگاه‌داده‌ای لازم نیست.

## اجرا

```bash
npm install
npm run dev        # http://localhost:3000/CoffeeShop/
npm run build      # خروجی استاتیک در out/
npm run smoke      # تست دود روی خروجی out/ (بعد از build)
```

## ساختار

```
app/
  page.jsx                  صفحهٔ اصلی (Hero، دسته‌بندی‌ها، محصولات ویژه، داستان، راهنما، نظرات، پرسش‌ها)
  products/page.jsx         کاتالوگ کامل با جست‌وجو، فیلتر دسته و سقف قیمت
  product/[id]/page.jsx     صفحهٔ محصول (SSG + JSON-LD + محصولات مرتبط)
  category/[slug]/page.jsx  صفحهٔ هر دسته (SSG)
  favorites/page.jsx        علاقه‌مندی‌های ذخیره‌شده در مرورگر
  cart/page.jsx             سبد خرید
  checkout/page.jsx         ثبت سفارش بدون درگاه پرداخت
  not-found.jsx, error.jsx  صفحات ۴۰۴ و خطا
  sitemap.js, robots.js     نقشهٔ سایت و robots.txt
  icon.png, apple-icon.png  فاوآیکون‌ها
components/                 کامپوننت‌های UI (Header، ProductCard، ProductBrowser، ...)
lib/store-data.js           تمام دادهٔ فروشگاه (محصولات، دسته‌ها، اطلاعات تماس)
lib/format.js               اعداد و قیمت فارسی
scripts/smoke.mjs           تست دود خروجی استاتیک
public/images/*.webp        تصاویر (placeholder برند)
```

## تغییر داده‌ها

همهٔ محصولات در `lib/store-data.js` هستند. هر محصول این فیلدها را دارد:

```js
{
  id, createdAt, name, englishName, category, categoryId,
  price, oldPrice, unit, badge, rating, reviews, stock, description, image
}
```

- `stock: 0` محصول را «ناموجود» می‌کند: دکمهٔ افزودن غیرفعال، کارت خاکستری و سبد اجازهٔ افزودن
  بیش از موجودی را نمی‌دهد.
- `categoryId` باید یکی از `beans` / `ground` / `equipment` / `cold` باشد.
- تصاویر در `public/images` قرار می‌گیرند و مسیرشان به‌صورت `/images/name.webp` نوشته می‌شود.
- شمارندهٔ محصولات دسته‌ها از روی داده محاسبه می‌شود.

## سبد خرید و تسویه حساب

- سبد در `localStorage` (کلید `cafedan-cart`) ذخیره می‌شود، بین تب‌ها همگام است و تعداد هر کالا با
  موجودی انبار محدود می‌شود.
- افزودن به سبد با toast و ناحیهٔ `aria-live` اعلام می‌شود.
- علاقه‌مندی‌ها در `localStorage` (کلید `cafedan-favorites`) نگه‌داری می‌شوند؛ قلب روی هر کارت و
  صفحهٔ `/favorites/` به آن وصل است.
- `/checkout/` فرم نام/موبایل/آدرس را اعتبارسنجی می‌کند، کد سفارش می‌سازد، خلاصهٔ سفارش را در
  `localStorage` (کلید `cafedan-last-order`) نگه می‌دارد و امکان کپی متن سفارش را می‌دهد. هیچ
  پرداختی انجام نمی‌شود.

## تصاویر و فونت

- تصاویر فعلی placeholder برند هستند؛ برای استفادهٔ واقعی فایل‌های `public/images/*.webp` را با عکس
  محصولات جایگزین کنید (نسبت ۴:۵ برای کارت‌ها مناسب است).
- فونت Vazirmatn به‌صورت محلی از `public/fonts/Vazirmatn-Variable.woff2` بارگذاری می‌شود (بدون
  وابستگی به Google Fonts).

## تغییر مسیر انتشار

`basePath` روی `/CoffeeShop` تنظیم شده (نام ریپوی GitHub Pages). اگر نام ریپو را عوض کردید:

1. مقدار `basePath` و `assetPrefix` را در `next.config.mjs` تغییر دهید.
2. مسیر `manifest`، تصویر OG و `@font-face` را در `app/layout.jsx` و `app/globals.css` به‌روز کنید.
3. ثابت `basePath` را در کامپوننت‌ها و `app/sitemap.js` / `app/robots.js` هماهنگ کنید.

## انتشار روی GitHub Pages

workflow در `.github/workflows/deploy.yml` بعد از هر push روی `main` نصب، build، تست دود و انتشار
را انجام می‌دهد. تنظیم Pages روی گزینهٔ **GitHub Actions** کافی است.

برای آدرس‌های مطلق (sitemap/OG) متغیر `NEXT_PUBLIC_SITE_URL` را در workflow تنظیم کنید؛ پیش‌فرض
`https://cafedan.ir` است.

## محدودیت‌ها

- بدون بک‌اند: سفارش‌ها جایی ارسال نمی‌شوند و فقط در مرورگر ذخیره می‌شوند.
- تصاویر و متن‌ها نمونه‌اند و باید با محتوای واقعی جایگزین شوند.
