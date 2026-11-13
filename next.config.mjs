/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/CoffeeShop',
  assetPrefix: '/CoffeeShop/',
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
