import Image from 'next/image';
import { storeInfo } from '@/lib/store-data';

const basePath = '/CoffeeShop';

const steps = [
  {
    number: '۰۱',
    title: 'انتخاب دانه',
    text: 'هر سال با کشاورزان اتیوپی، کلمبیا و برزیل مذاکره می‌کنیم و فقط لات‌هایی را می‌خریم که نمرهٔ کاپینگ بالای ۸۵ بگیرند.',
  },
  {
    number: '۰۲',
    title: 'برشته‌کاری کوچک',
    text: 'در برشته‌کن ۱۲ کیلویی، هر بچ (Batch) با پروفایل اختصاصی خودش برشته می‌شود تا شیرینی و اسیدیتهٔ دانه حفظ شود.',
  },
  {
    number: '۰۳',
    title: 'بسته‌بندی تازه',
    text: 'حداکثر ۴۸ ساعت پس از برشته‌کاری، با شیر یک‌طرفه و تاریخ برشته بسته‌بندی و ارسال می‌شود.',
  },
];

export default function Story() {
  return (
    <section id="story" className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-caramel/10 blur-3xl" />

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-cream-dark shadow-soft">
            <Image
              src={`${basePath}/images/story-roaster.webp`}
              alt="برشته‌کردن دانه‌های قهوه در برشته‌کن کافه دان"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="absolute -left-3 bottom-8 rounded-3xl bg-brown px-5 py-4 text-cream shadow-soft sm:-left-6">
            <p className="text-[10px] text-cream/60">هر هفته</p>
            <p className="mt-1 text-xl font-black text-caramel">۳ بچ تازه</p>
            <p className="mt-1 text-[10px] text-cream/60">برشته‌کاری‌شده در کارگاه</p>
          </div>

          <div className="absolute -right-4 top-8 hidden rounded-2xl bg-cream/95 px-4 py-3 shadow-soft backdrop-blur sm:block">
            <p className="text-[10px] font-bold text-brown-light">نمرهٔ کاپینگ</p>
            <p className="mt-1 text-sm font-black text-brown">۸۵+ / ۱۰۰</p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <span className="eyebrow">داستان کافه دان</span>
          <h2 className="section-title">
            دانه‌ای که مسیرش را
            <span className="text-caramel-dark"> با ما </span>
            طی می‌کند
          </h2>
          <p className="mt-5 text-sm leading-8 text-brown-light sm:text-base">
            {storeInfo.name} از یک کارگاه کوچک در تهران شروع شد؛ با یک برشته‌کن دست‌ساز و این باور که قهوهٔ
            خوب از مزرعه آغاز می‌شود، نه از دستگاه. امروز هم همان وسواس را داریم: خرید مستقیم از کشاورز،
            برشته‌کاری در بچ‌های کوچک و بسته‌بندی در همان هفته‌ای که دانه برشته شده است.
          </p>

          <ul className="mt-8 space-y-5">
            {steps.map((step) => (
              <li key={step.number} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-caramel/15 text-sm font-black text-caramel-dark">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-sm font-black text-brown">{step.title}</h3>
                  <p className="mt-1 text-xs leading-6 text-brown-light">{step.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <blockquote className="mt-9 rounded-2xl border-r-4 border-caramel bg-white/50 px-5 py-4">
            <p className="text-sm leading-7 text-brown">«قهوهٔ تازه، حق هر صبح است؛ نه یک تجمل.»</p>
            <footer className="mt-2 text-[11px] font-bold text-brown-light">— تیم {storeInfo.name}</footer>
          </blockquote>

          <a href="#products" className="btn-primary mt-8">
            دانه‌های این هفته را ببینید
          </a>
        </div>
      </div>
    </section>
  );
}
