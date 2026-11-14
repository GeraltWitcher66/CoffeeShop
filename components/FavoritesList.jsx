'use client';

import ProductCard from '@/components/ProductCard';
import { useFavorites } from '@/components/FavoritesProvider';
import { products } from '@/lib/store-data';

const basePath = '/CoffeeShop';

export default function FavoritesList() {
  const { ids } = useFavorites();
  const favorites = products.filter((product) => ids.includes(product.id));

  if (favorites.length === 0) {
    return (
      <div className="card-surface mt-8 rounded-[2rem] px-6 py-16 text-center">
        <p className="text-base font-black text-brown">هنوز محصولی را نشان نکرده‌اید</p>
        <p className="mt-2 text-xs leading-6 text-brown-light">
          روی قلب کنار هر محصول بزنید تا اینجا ذخیره شود و بعداً راحت پیدایش کنید.
        </p>
        <a href={`${basePath}/products/`} className="btn-primary mt-6 !py-2.5 text-xs">
          مشاهدهٔ محصولات
        </a>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {favorites.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
