import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductBrowser from '@/components/ProductBrowser';
import { ArrowLeftIcon } from '@/components/Icons';
import { categories, productsInCategory } from '@/lib/store-data';

const basePath = '/CoffeeShop';

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = categories.find((item) => item.id === slug);
  if (!category) return { title: 'دسته‌بندی یافت نشد | کافه دان' };
  return {
    title: `${category.title} | کافه دان`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = categories.find((item) => item.id === slug);
  if (!category) notFound();

  const categoryProducts = productsInCategory(category.id);
  const otherCategories = categories.filter((item) => item.id !== category.id);
  const countLabel = new Intl.NumberFormat('fa-IR').format(categoryProducts.length);

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="py-10 sm:py-14">
          <div className="container-page">
            <nav className="flex flex-wrap items-center gap-2 text-xs text-brown-light">
              <a href={`${basePath}/`} className="transition hover:text-caramel-dark">
                خانه
              </a>
              <span>/</span>
              <a href={`${basePath}/#categories`} className="transition hover:text-caramel-dark">
                دسته‌بندی‌ها
              </a>
              <span>/</span>
              <span className="font-bold text-brown">{category.title}</span>
            </nav>

            <div className="relative mt-5 overflow-hidden rounded-[2.5rem] bg-brown">
              <Image
                src={`${basePath}${category.image}`}
                alt={category.title}
                width={1400}
                height={700}
                priority
                className="h-[260px] w-full object-cover sm:h-[320px]"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-brown/95 via-brown/60 to-brown/20" />
              <div className="absolute inset-0 flex flex-col items-start justify-end gap-3 p-6 text-cream sm:p-10">
                <span className="rounded-full bg-caramel px-3 py-1 text-[10px] font-bold text-white">
                  {countLabel} محصول
                </span>
                <h1 className="text-3xl font-black sm:text-5xl">{category.title}</h1>
                <p className="max-w-md text-xs leading-7 text-cream/75 sm:text-sm">{category.description}</p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="eyebrow">انتخاب‌های کافه دان</span>
                <h2 className="mt-4 text-2xl font-black text-brown sm:text-3xl">محصولات {category.title}</h2>
              </div>
              <a href={`${basePath}/#products`} className="text-sm font-bold text-caramel-dark transition hover:text-brown">
                محصولات ویژهٔ صفحهٔ اصلی ←
              </a>
            </div>

            {categoryProducts.length > 0 ? (
              <ProductBrowser products={categoryProducts} />
            ) : (
              <div className="card-surface mt-8 rounded-3xl px-6 py-14 text-center">
                <p className="text-sm font-black text-brown">هنوز محصولی در این دسته ثبت نشده است.</p>
                <p className="mt-2 text-xs text-brown-light">
                  به‌زودی دانه‌های تازهٔ این دسته اضافه می‌شود.
                </p>
              </div>
            )}

            <div className="mt-16">
              <h2 className="text-xl font-black text-brown sm:text-2xl">دسته‌بندی‌های دیگر</h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {otherCategories.map((item) => (
                  <a
                    key={item.id}
                    href={`${basePath}/category/${item.id}/`}
                    className="group relative min-h-[180px] overflow-hidden rounded-[1.75rem] bg-brown"
                  >
                    <Image
                      src={`${basePath}${item.image}`}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="card-scrim" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                      <div>
                        <h3 className="text-base font-black text-cream">{item.title}</h3>
                        <p className="mt-1 text-[11px] text-cream/65">{item.description}</p>
                      </div>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-cream/30 text-cream transition group-hover:border-caramel group-hover:bg-caramel group-hover:text-white">
                        <ArrowLeftIcon />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
