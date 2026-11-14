import Header from '@/components/Header';
import CartView from '@/components/CartView';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'سبد خرید | کافه دان',
  description: 'سبد خرید فروشگاه قهوهٔ کافه دان',
};

export default function CartPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <CartView />
      </main>
      <Footer />
    </>
  );
}
