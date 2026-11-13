import './globals.css';
import { CartProvider } from '@/components/CartProvider';

export const metadata = {
  title: 'کافه دان | فروشگاه تخصصی قهوه',
  description:
    'کافه دان؛ فروشگاه قهوهٔ تخصصی با دانه‌های تازه‌برشته، قهوهٔ آسیاب‌شده، لوازم دم‌آوری و نوشیدنی‌های سرد.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
