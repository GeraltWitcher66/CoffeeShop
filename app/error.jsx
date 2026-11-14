'use client';

const basePath = '/CoffeeShop';

export default function ErrorPage({ reset }) {
  return (
    <main id="main-content" className="py-20 sm:py-28">
      <div className="container-page">
        <div className="card-surface mx-auto flex max-w-xl flex-col items-center rounded-[2rem] px-6 py-16 text-center">
          <span className="text-5xl font-black text-caramel">!</span>
          <h1 className="mt-4 text-2xl font-black text-brown">مشکلی پیش آمد</h1>
          <p className="mt-3 text-sm leading-7 text-brown-light">
            بارگذاری این بخش ناموفق بود. یک‌بار دیگر تلاش کنید؛ اگر مشکل ادامه داشت به پشتیبانی پیام
            دهید.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => reset()} className="btn-primary !py-2.5 text-xs">
              تلاش دوباره
            </button>
            <a href={`${basePath}/`} className="btn-ghost !py-2.5 text-xs">
              بازگشت به خانه
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
