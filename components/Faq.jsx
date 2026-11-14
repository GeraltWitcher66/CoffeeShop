const basePath = '/CoffeeShop';

const faqs = [
  {
    question: 'قهوه‌ها چه زمانی برشته می‌شوند؟',
    answer:
      'هر هفته دو بچ تازه برشته می‌کنیم و تاریخ برشته‌کاری روی هر بسته درج می‌شود. سفارش‌ها حداکثر ۴۸ ساعت پس از برشته‌کاری ارسال می‌شوند.',
  },
  {
    question: 'هزینه و زمان ارسال چقدر است؟',
    answer:
      'ارسال در تهران ۲۴ ساعته و برای سفارش‌های بالای ۵۰۰ هزار تومان رایگان است؛ زیر این مبلغ ۴۵ هزار تومان هزینهٔ ارسال اضافه می‌شود.',
  },
  {
    question: 'قهوه را آسیاب‌شده بفرستم یا دانه؟',
    answer:
      'اگر تازه‌ترین طعم را می‌خواهید دانه سفارش دهید؛ در غیر این صورت در یادداشت سفارش روش دم‌آوری‌تان را بنویسید تا آسیاب مناسب انجام شود.',
  },
  {
    question: 'امکان مرجوعی وجود دارد؟',
    answer:
      'بستهٔ باز نشده تا ۷ روز قابل مرجوعی است. اگر بسته آسیب‌دیده به دست شما رسید، با پشتیبانی تماس بگیرید تا جایگزین شود.',
  },
  {
    question: 'چطور سفارش را نهایی کنم؟',
    answer:
      'در صفحهٔ تسویه حساب اطلاعات تحویل را وارد می‌کنید؛ سفارش ثبت می‌شود و برای هماهنگی پرداخت و ارسال با شما تماس می‌گیریم.',
  },
];

export default function Faq() {
  return (
    <section className="pb-16 sm:pb-24">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <span className="eyebrow">سؤالات متداول</span>
            <h2 className="section-title">هر چیزی که پیش از خرید می‌پرسید</h2>
            <p className="section-subtitle">
              پاسخ پرتکرارترین سؤال‌ها را اینجا جمع کرده‌ایم؛ اگر جوابتان نبود، تلفنی در دسترس هستیم.
            </p>
            <a href={`${basePath}/#contact`} className="btn-ghost mt-6 !py-2.5 text-xs">
              تماس با پشتیبانی
            </a>
          </div>

          <div className="card-surface divide-y divide-brown/10 overflow-hidden rounded-[1.75rem]">
            {faqs.map((faq) => (
              <details key={faq.question} className="group px-5 py-4 sm:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-brown marker:content-none">
                  {faq.question}
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-brown/15 text-brown-light transition group-open:rotate-45 group-open:border-caramel group-open:text-caramel-dark">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-xs leading-7 text-brown-light">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
