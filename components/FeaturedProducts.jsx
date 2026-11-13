import ProductCard from '@/components/ProductCard';
import { featuredProducts } from '@/lib/store-data';

export default function FeaturedProducts() {
  return (
    <section id="products" className="pb-20">
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">منتخب کافه</span>
            <h2 className="section-title">محصولات ویژه</h2>
            <p className="section-subtitle">پرفروش‌ترین‌های این ماه، از دانه‌های تازه‌برشته تا لوازم دم‌آوری.</p>
          </div>
          <a href="#contact" className="text-sm font-bold text-caramel-dark transition hover:text-brown">
            مشاورهٔ خرید ←
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
