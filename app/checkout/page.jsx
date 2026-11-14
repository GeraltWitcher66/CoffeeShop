import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutForm from '@/components/CheckoutForm';
import { storeInfo } from '@/lib/store-data';

const basePath = '/CoffeeShop';

export const metadata = {
  title: 'تسویه حساب',
  description: 'ثبت سفارش کافه دان بدون درگاه پرداخت؛ هماهنگی نهایی تلفنی انجام می‌شود.',
};

export default function CheckoutPage() {
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
              <a href={`${basePath}/cart/`} className="transition hover:text-caramel-dark">
                سبد خرید
              </a>
              <span>/</span>
              <span className="font-bold text-brown">تسویه حساب</span>
            </nav>

            <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="eyebrow">مرحلهٔ نهایی</span>
                <h1 className="mt-4 text-3xl font-black text-brown sm:text-4xl">تسویه حساب</h1>
                <p className="mt-3 max-w-xl text-sm leading-7 text-brown-light">
                  اطلاعات تحویل را وارد کنید؛ سفارش ثبت می‌شود و برای هماهنگی پرداخت و ارسال با شما تماس
                  می‌گیریم.
                </p>
              </div>
              <p className="text-xs text-brown-light">
                پشتیبانی: <span className="font-bold text-brown">{storeInfo.phone}</span>
              </p>
            </div>

            <div className="mt-8">
              <CheckoutForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
