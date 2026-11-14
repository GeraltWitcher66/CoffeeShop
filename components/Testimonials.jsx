const basePath = '/CoffeeShop';

const testimonials = [
  {
    name: 'سارا محمدی',
    role: 'مشتری وفادار، تهران',
    quote:
      'بستهٔ کنیا هنوز باز نشده بوی شکوفه می‌داد. برای من که هر هفته یک بچ تازه می‌خرم، تاریخ برشته‌کاری روی بسته مهم‌ترین چیز بود.',
  },
  {
    name: 'امیر رستگار',
    role: 'خانه‌قهوه‌ساز',
    quote: 'موکاپات و قهوهٔ ترک را با هم گرفتم؛ راهنمای دم‌آوری روی سایت واقعاً به کارم آمد.',
  },
  {
    name: 'نگار کیانی',
    role: 'کافه‌دار',
    quote: 'سفارش‌های کافه‌ام را هفتگی می‌دهم. کیفیت یکنواخت بچ‌ها و ارسال سر وقت، دلیل برگشتنم است.',
  },
];

export default function Testimonials() {
  return (
    <section className="pb-16 sm:pb-20">
      <div className="container-page">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">از زبان مشتریان</span>
            <h2 className="section-title">فنجان‌هایی که تکرار شدند</h2>
          </div>
          <a
            href={`${basePath}/products/`}
            className="text-sm font-bold text-caramel-dark transition hover:text-brown"
          >
            محصولات پرفروش ←
          </a>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="card-surface flex h-full flex-col rounded-[1.75rem] p-6"
            >
              <span className="text-2xl leading-none text-caramel">”</span>
              <blockquote className="mt-2 flex-1 text-xs leading-7 text-brown-light">
                {item.quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-brown/10 pt-4">
                <p className="text-xs font-black text-brown">{item.name}</p>
                <p className="mt-1 text-[11px] text-brown-light/70">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
