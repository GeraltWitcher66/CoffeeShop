import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import AddToCart from '@/components/AddToCart';
import { CheckIcon } from '@/components/Icons';
import {
  categories,
  findProduct,
  formatNumber,
  formatPrice,
  isInStock,
  products,
  relatedProducts,
} from '@/lib/store-data';

const basePath = '/CoffeeShop';
const faNumber = new Intl.NumberFormat('fa-IR');

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) return { title: 'محصول یافت نشد' };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: `${basePath}${product.image}`, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) notFound();

  const category = categories.find((item) => item.id === product.categoryId);
  const inStock = isInStock(product);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;
  const related = relatedProducts(product);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    alternateName: product.englishName,
    description: product.description,
    image: `${basePath}${product.image}`,
    sku: product.id,
    category: product.category,
    brand: { '@type': 'Brand', name: 'کافه دان' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'IRR',
      price: product.price * 10,
      availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <>
      <Header />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />

        <section className="py-10 sm:py-14">
          <div className="container-page">
            <nav className="flex flex-wrap items-center gap-2 text-xs text-brown-light">
              <a href={`${basePath}/`} className="transition hover:text-caramel-dark">
                خانه
              </a>
              <span>/</span>
              <a href={`${basePath}/products/`} className="transition hover:text-caramel-dark">
                محصولات
              </a>
              {category && (
                <>
                  <span>/</span>
                  <a
                    href={`${basePath}/category/${category.id}/`}
                    className="transition hover:text-caramel-dark"
                  >
                    {category.title}
                  </a>
                </>
              )}
              <span>/</span>
              <span className="font-bold text-brown">{product.name}</span>
            </nav>

            <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-cream-dark via-[#E9D8C3] to-caramel/45">
                <Image
                  src={`${basePath}${product.image}`}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={`object-cover opacity-95 mix-blend-multiply ${inStock ? '' : 'grayscale'}`}
                />
                <div className="pointer-events-none absolute right-4 top-4 flex flex-col items-end gap-2">
                  {!inStock && (
                    <span className="rounded-full bg-brown px-3 py-1 text-[11px] font-bold text-cream">
                      ناموجود
                    </span>
                  )}
                  {product.badge && inStock && (
                    <span className="rounded-full bg-brown/90 px-3 py-1 text-[11px] font-bold text-cream backdrop-blur">
                      {product.badge}
                    </span>
                  )}
                  {discount && (
                    <span className="rounded-full bg-caramel px-3 py-1 text-[11px] font-bold text-white">
                      {faNumber.format(discount)}٪ تخفیف
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                {category && (
                  <a
                    href={`${basePath}/category/${category.id}/`}
                    className="text-[11px] font-bold text-caramel-dark transition hover:text-brown"
                  >
                    {product.category}
                  </a>
                )}
                <h1 className="mt-2 text-3xl font-black leading-tight text-brown sm:text-4xl">
                  {product.name}
                </h1>
                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-brown-light/60">
                  {product.englishName}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-bold text-brown-light">
                  <span className="flex items-center gap-1">
                    <span className="text-caramel">★</span>
                    {new Intl.NumberFormat('fa-IR', { minimumFractionDigits: 1 }).format(product.rating)}
                  </span>
                  <span className="text-brown-light/50">|</span>
                  <span className="font-normal">{formatNumber(product.reviews)} نظر ثبت‌شده</span>
                  <span className="text-brown-light/50">|</span>
                  <span className={inStock ? 'text-caramel-dark' : 'text-brown-light/70'}>
                    {inStock
                      ? product.stock <= 3
                        ? `فقط ${formatNumber(product.stock)} عدد باقی مانده`
                        : 'موجود در انبار'
                      : 'فعلاً ناموجود'}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-8 text-brown-light">{product.description}</p>

                <div className="mt-6 flex flex-wrap items-end gap-3 border-y border-brown/10 py-5">
                  <span className="text-2xl font-black text-brown">{formatPrice(product.price)}</span>
                  {product.oldPrice && (
                    <span className="text-sm text-brown-light/50 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                  <span className="rounded-full bg-brown/5 px-3 py-1 text-[11px] font-bold text-brown-light">
                    {product.unit}
                  </span>
                </div>

                <AddToCart product={product} />

                <dl className="mt-7 grid gap-3 text-xs sm:grid-cols-2">
                  <div className="card-surface rounded-2xl px-4 py-3">
                    <dt className="text-brown-light/70">دسته‌بندی</dt>
                    <dd className="mt-1 font-bold text-brown">{product.category}</dd>
                  </div>
                  <div className="card-surface rounded-2xl px-4 py-3">
                    <dt className="text-brown-light/70">واحد فروش</dt>
                    <dd className="mt-1 font-bold text-brown">{product.unit}</dd>
                  </div>
                  <div className="card-surface rounded-2xl px-4 py-3">
                    <dt className="text-brown-light/70">کد کالا</dt>
                    <dd className="mt-1 font-bold text-brown" dir="ltr">
                      {product.id}
                    </dd>
                  </div>
                  <div className="card-surface rounded-2xl px-4 py-3">
                    <dt className="text-brown-light/70">وضعیت</dt>
                    <dd className={`mt-1 font-bold ${inStock ? 'text-caramel-dark' : 'text-brown-light'}`}>
                      {inStock ? 'آمادهٔ ارسال' : 'در انتظار موجودی'}
                    </dd>
                  </div>
                </dl>

                <ul className="mt-6 space-y-2 text-xs leading-6 text-brown-light">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-caramel">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-caramel">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    بسته‌بندی یک‌طرفهٔ تازه‌برشته با تاریخ برشته‌کاری
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-caramel">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    امکان مرجوعی تا ۷ روز در صورت باز نشدن بسته
                  </li>
                </ul>
              </div>
            </div>

            {related.length > 0 && (
              <div className="mt-16">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <h2 className="text-xl font-black text-brown sm:text-2xl">محصولات مرتبط</h2>
                  <a
                    href={`${basePath}/products/`}
                    className="text-sm font-bold text-caramel-dark transition hover:text-brown"
                  >
                    همهٔ محصولات ←
                  </a>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {related.map((item) => (
                    <ProductCard key={item.id} product={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
