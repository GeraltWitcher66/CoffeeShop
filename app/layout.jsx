import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import { FavoritesProvider } from '@/components/FavoritesProvider';
import CartToast from '@/components/CartToast';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cafedan.ir';
const description =
  'کافه دان؛ فروشگاه قهوهٔ تخصصی با دانه‌های تازه‌برشته، نوشیدنی‌های گرم و سرد و لوازم دم‌آوری، با ارسال سریع در تهران.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'کافه دان | فروشگاه تخصصی قهوه',
    template: '%s | کافه دان',
  },
  description,
  applicationName: 'کافه دان',
  manifest: '/CoffeeShop/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    siteName: 'کافه دان',
    title: 'کافه دان | فروشگاه تخصصی قهوه',
    description,
    images: [
      {
        url: '/CoffeeShop/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'کافه دان، فروشگاه تخصصی قهوه',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'کافه دان | فروشگاه تخصصی قهوه',
    description,
    images: ['/CoffeeShop/og-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link
          rel="preload"
          href="/CoffeeShop/fonts/Vazirmatn-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <CartProvider>
          <FavoritesProvider>
            <a href="#main-content" className="skip-link">
              رفتن به محتوای اصلی
            </a>
            {children}
            <CartToast />
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
