import Image from 'next/image';
import { stats, storeInfo } from '@/lib/store-data';

const basePath = '/CoffeeShop';

export default function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[calc(100svh-7.5rem)] items-center overflow-hidden">
      <Image
        src={`${basePath}/images/hero.jpg`}
        alt="دانه‌های قهوهٔ تازه‌برشته"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-brown/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-brown/80 via-brown/45 to-brown/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(46,29,24,0.65)_100%)]" />

      <div className="container-page relative z-10 flex flex-col items-center py-24 text-center text-cream">
        <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 bg-white/5 px-4 py-1.5 text-xs font-bold text-cream/90 backdrop-blur">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-caramel" />
          برشته‌کاری تازه، هر هفته در تهران
        </span>

        <h1 className="mt-7 max-w-3xl text-balance text-4xl font-black leading-[1.3] sm:text-6xl lg:text-7xl">
          از دل دانه‌های تازه،
          <br />
          <span className="text-caramel">یک فنجان بی‌نقص.</span>
        </h1>

        <p className="mt-6 max-w-xl text-sm leading-8 text-cream/75 sm:text-base">
          {storeInfo.description} برشته‌کاری کوچک، دانه‌های انتخابی و ارسال در همان هفته؛ این‌جاست که قهوهٔ
          روزانه‌ات معنا پیدا می‌کند.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="#products" className="btn-primary">
            خرید قهوه
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
              <path
                d="M19 12H5m6-6-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#story"
            className="btn border border-cream/35 text-cream hover:border-cream/70 hover:bg-white/10"
          >
            داستان ما
          </a>
        </div>

        <dl className="mt-9 grid w-full max-w-2xl grid-cols-3 gap-4 border-t border-cream/15 pt-6 sm:mt-12 sm:gap-8 sm:pt-8 lg:max-w-3xl">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-3xl font-black leading-none text-caramel tabular-nums sm:text-[2.75rem]">
                {stat.value}
              </dt>
              <dd className="mt-2 text-[11px] leading-5 text-cream/65 sm:text-xs">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <a
        href="#categories"
        aria-label="ادامهٔ صفحه"
        className="absolute bottom-6 left-1/2 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border border-cream/30 text-cream/70 transition hover:border-caramel hover:text-caramel"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
          <path d="M12 5v14m0 0-5-5m5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </a>
    </section>
  );
}
