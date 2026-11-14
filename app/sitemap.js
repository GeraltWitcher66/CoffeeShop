import { categories, products } from '@/lib/store-data';

export const dynamic = 'force-static';

const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://cafedan.ir';
const base = `${site}/CoffeeShop`;

export default function sitemap() {
  const lastModified = new Date();
  const routes = ['/', '/products/', '/cart/', '/checkout/'];

  return [
    ...routes.map((route) => ({
      url: `${base}${route}`,
      lastModified,
      changeFrequency: route === '/' ? 'weekly' : 'monthly',
      priority: route === '/' ? 1 : 0.7,
    })),
    ...categories.map((category) => ({
      url: `${base}/category/${category.id}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: `${base}/product/${product.id}/`,
      lastModified: new Date(product.createdAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    })),
  ];
}
