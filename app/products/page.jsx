import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductBrowser from '@/components/ProductBrowser';
import { products } from '@/lib/store-data';

const basePath = '/CoffeeShop';

export const metadata = {
  title: 'همهٔ محصولات',
  description: 'کاتالوگ کامل کافه دان: دانهٔ قهوه، نوشیدنی گرم و سرد و لوازم دم‌آوری.',
};

export default function ProductsPage() {
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
              <span className="font-bold text-brown">همهٔ محصولات</span>
            </nav>

            <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="eyebrow">کاتالوگ کافه دان</span>
                <h1 className="mt-4 text-3xl font-black text-brown sm:text-4xl">همهٔ محصولات</h1>
                <p className="mt-3 max-w-xl text-sm leading-7 text-brown-light">
                  بین دانه‌های تک‌خاستگاه، نوشیدنی‌های گرم و سرد و لوازم دم‌آوری جست‌وجو کنید؛ با فیلتر
                  دسته و سقف قیمت.
                </p>
              </div>
              <a
                href={`${basePath}/#categories`}
                className="text-sm font-bold text-caramel-dark transition hover:text-brown"
              >
                مرور دسته‌بندی‌ها ←
              </a>
            </div>

            <ProductBrowser products={products} showCategories />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
