import Header from '@/components/Header';
import Footer from '@/components/Footer';

const basePath = '/CoffeeShop';

export const metadata = {
  title: 'صفحه پیدا نشد',
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="py-20 sm:py-28">
          <div className="container-page">
            <div className="card-surface mx-auto flex max-w-xl flex-col items-center rounded-[2rem] px-6 py-16 text-center">
              <span className="text-6xl font-black text-caramel">۴۰۴</span>
              <h1 className="mt-4 text-2xl font-black text-brown">این صفحه پیدا نشد</h1>
              <p className="mt-3 text-sm leading-7 text-brown-light">
                شاید نشانی را اشتباه وارد کرده‌اید یا این محصول از فهرست حذف شده است. از کاتالوگ شروع
                کنید.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <a href={`${basePath}/products/`} className="btn-primary !py-2.5 text-xs">
                  همهٔ محصولات
                </a>
                <a href={`${basePath}/`} className="btn-ghost !py-2.5 text-xs">
                  بازگشت به خانه
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
