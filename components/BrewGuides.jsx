import { ArrowLeftIcon } from '@/components/Icons';

const basePath = '/CoffeeShop';

const guides = [
  {
    id: 'v60',
    title: 'V60؛ فنجان شفاف',
    meta: '۳ دقیقه · آسیاب متوسط',
    steps: '۱۵ گرم قهوه، ۲۵۰ گرم آب ۹۳ درجه؛ دم‌آوری پله‌ای در سه مرحله.',
  },
  {
    id: 'moka',
    title: 'موکاپات؛ غلیظ و گرم',
    meta: '۵ دقیقه · آسیاب ریز',
    steps: '۱۷ گرم قهوه، آب گرم در مخزن پایین و شعلهٔ ملایم تا اولین فوران.',
  },
  {
    id: 'french',
    title: 'فرنچ‌پرس؛ بدنهٔ پر',
    meta: '۴ دقیقه · آسیاب درشت',
    steps: '۲۰ گرم قهوه، ۳۰۰ گرم آب ۹۵ درجه و چهار دقیقه دم کشیدن پیش از فشار.',
  },
];

export default function BrewGuides() {
  return (
    <section className="pb-16 sm:pb-20">
      <div className="container-page">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">راهنمای دم‌آوری</span>
            <h2 className="section-title">سه روش ساده برای فنجان خانه</h2>
            <p className="section-subtitle">
              نسبت، آسیاب و دمای درست، بیشتر از دستگاه گران‌قیمت در طعم فنجان اثر دارد.
            </p>
          </div>
          <a
            href={`${basePath}/category/equipment/`}
            className="text-sm font-bold text-caramel-dark transition hover:text-brown"
          >
            لوازم دم‌آوری ←
          </a>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {guides.map((guide, index) => (
            <article
              key={guide.id}
              className="card-surface rounded-[1.75rem] p-6 transition hover:-translate-y-1 hover:border-brown/30 hover:shadow-soft"
            >
              <span className="text-3xl font-black text-caramel/40">
                {new Intl.NumberFormat('fa-IR').format(index + 1)}
              </span>
              <h3 className="mt-3 text-base font-black text-brown">{guide.title}</h3>
              <p className="mt-1 text-[11px] font-bold text-caramel-dark">{guide.meta}</p>
              <p className="mt-3 text-xs leading-7 text-brown-light">{guide.steps}</p>
              <a
                href={`${basePath}/products/`}
                className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold text-brown-light transition hover:text-caramel-dark"
              >
                دانهٔ مناسب این روش
                <ArrowLeftIcon className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
