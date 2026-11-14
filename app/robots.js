export const dynamic = 'force-static';

const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://cafedan.ir';

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${site}/CoffeeShop/sitemap.xml`,
  };
}
