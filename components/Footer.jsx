import Image from 'next/image';
import { categories, storeInfo } from '@/lib/store-data';

const basePath = '/CoffeeShop';

const socials = [
  {
    label: 'اینستاگرام',
    href: '#',
    path: 'M12 8.2A3.8 3.8 0 1 0 12 15.8 3.8 3.8 0 0 0 12 8.2Zm0 6.2a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8Zm5-6.5a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0ZM8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm0 1.6A3.4 3.4 0 0 0 4.6 8v8A3.4 3.4 0 0 0 8 19.4h8a3.4 3.4 0 0 0 3.4-3.4V8A3.4 3.4 0 0 0 16 4.6H8Z',
  },
  {
    label: 'تلگرام',
    href: '#',
    path: 'M21.5 4.3 18.4 19c-.2 1-.8 1.3-1.7.8l-4.6-3.4-2.2 2.1c-.3.3-.5.5-1 .5l.4-4.7 8.5-7.7c.4-.3-.1-.5-.6-.2L7.7 12.6 3.2 11.2c-1-.3-1-1 .2-1.5l17-6.5c.8-.3 1.5.2 1.1 1.1Z',
  },
  {
    label: 'واتس‌اپ',
    href: '#',
    path: 'M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Zm4.6 12.5c-.2.6-1.2 1.1-1.7 1.2-.5 0-1 .1-2.9-.7-2.3-.9-3.7-3.3-3.8-3.5-.2-.2-1-1.3-1-2.5s.6-1.7.9-2c.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .6.5l.8 1.9c0 .2.1.4 0 .6l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.2 1.7 2 1.1.9 1.5 1 1.8 1.1.2.1.4 0 .5-.1l.8-.9c.2-.2.4-.1.6 0l1.8.8c.3.1.5.2.5.3.1.2.1.8-.1 1.4Z',
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative mt-6 overflow-hidden bg-brown text-cream">
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-caramel/20 blur-3xl" />

      <div className="container-page relative py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href={`${basePath}/`} className="flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl bg-cream p-1">
                <Image
                  src={`${basePath}/images/logo.png`}
                  alt={`لوگوی ${storeInfo.name}`}
                  width={56}
                  height={56}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="leading-tight">
                <span className="block text-lg font-black">{storeInfo.name}</span>
                <span className="block text-[11px] text-cream/60">{storeInfo.latinName}</span>
              </span>
            </a>
            <p className="mt-5 max-w-md text-sm leading-7 text-cream/70">{storeInfo.description}</p>

            <div className="mt-6 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream/80 transition hover:border-caramel hover:bg-caramel hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black text-cream">دسته‌بندی‌ها</h3>
            <ul className="mt-4 space-y-3 text-sm text-cream/70">
              {categories.map((category) => (
                <li key={category.id}>
                  <a href={`${basePath}/category/${category.id}/`} className="transition hover:text-caramel">
                    {category.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black text-cream">تماس با ما</h3>
            <ul className="mt-4 space-y-3 text-sm text-cream/70">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-caramel">•</span>
                {storeInfo.address}
              </li>
              <li>
                <a href={`tel:${storeInfo.phone}`} className="transition hover:text-caramel" dir="ltr">
                  {storeInfo.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${storeInfo.email}`} className="transition hover:text-caramel" dir="ltr">
                  {storeInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-caramel">•</span>
                {storeInfo.workingHours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-[11px] text-cream/50 sm:flex-row">
          <p>© ۱۴۰۵ {storeInfo.name} — تمام حقوق محفوظ است.</p>
          <p>طراحی و توسعه با ❤️ و قهوه</p>
        </div>
      </div>
    </footer>
  );
}
