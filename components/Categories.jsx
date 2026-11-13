import Image from 'next/image';
import { categories, productsInCategory } from '@/lib/store-data';

const basePath = '/CoffeeShop';
const cardScrim = 'absolute inset-0 bg-gradient-to-t from-brown via-brown/60 to-brown/5';
const countLabel = (categoryId) =>
  `${new Intl.NumberFormat('fa-IR').format(productsInCategory(categoryId).length)} محصول`;

export default function Categories() {
  const [featured, ...rest] = categories;

  return (
    <section id="categories" className="py-16 sm:py-24">
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">دسته‌بندی‌ها</span>
            <h2 className="section-title">راهی که به فنجان می‌رسد</h2>
            <p className="section-subtitle">از انتخاب دانه تا آخرین جرعه؛ هر مرحله یک دسته‌بندی جداگانه دارد.</p>
          </div>
          <a href="#products" className="text-sm font-bold text-caramel-dark transition hover:text-brown">
            همهٔ محصولات ←
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          <a
            href={`${basePath}/category/${featured.id}/`}
            className="group relative min-h-[300px] overflow-hidden rounded-[2rem] bg-brown sm:col-span-2 lg:row-span-2"
          >
            <Image
              src={`${basePath}${featured.image}`}
              alt={featured.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className={cardScrim} />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <span className="rounded-full bg-caramel px-3 py-1 text-[10px] font-bold text-white">
                محبوب‌ترین انتخاب
              </span>
              <h3 className="mt-4 text-3xl font-black text-cream sm:text-4xl">{featured.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-7 text-cream/70">{featured.description}</p>
              <div className="mt-6 flex items-center gap-4 text-xs font-bold text-cream/80">
                <span>{countLabel(featured.id)}</span>
                <span className="grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-white/20 text-cream shadow-lg shadow-brown/30 backdrop-blur-md transition group-hover:border-caramel group-hover:bg-caramel group-hover:text-white">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                    <path
                      d="M19 12H5m6-6-6 6 6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </a>

          {rest.map((category, index) => (
            <a
              key={category.id}
              href={`${basePath}/category/${category.id}/`}
              className={`group relative min-h-[220px] overflow-hidden rounded-[2rem] bg-brown ${
                index === 0 ? 'sm:col-span-2' : ''
              }`}
            >
              <Image
                src={`${basePath}${category.image}`}
                alt={category.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className={cardScrim} />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <div>
                  <h3 className="text-lg font-black text-cream">{category.title}</h3>
                  <p className="mt-1 text-[11px] text-cream/65">{category.description}</p>
                </div>
                <span className="rounded-full border border-cream/25 px-3 py-1 text-[10px] font-bold text-cream/80">
                  {countLabel(category.id)}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
