import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FavoritesList from '@/components/FavoritesList';

const basePath = '/CoffeeShop';

export const metadata = {
  title: 'علاقه‌مندی‌ها',
  description: 'محصولات نشان‌شدهٔ شما در کافه دان؛ ذخیره‌شده در همین مرورگر.',
};

export default function FavoritesPage() {
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
              <span className="font-bold text-brown">علاقه‌مندی‌ها</span>
            </nav>

            <div className="mt-4">
              <span className="eyebrow">لیست شما</span>
              <h1 className="mt-4 text-3xl font-black text-brown sm:text-4xl">علاقه‌مندی‌ها</h1>
              <p className="mt-3 max-w-xl text-sm leading-7 text-brown-light">
                این فهرست در همین مرورگر ذخیره می‌شود؛ نیازی به حساب کاربری نیست.
              </p>
            </div>

            <FavoritesList />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
