import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'out');

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
};

function fileFor(urlPath) {
  let pathname = decodeURIComponent(urlPath.split('?')[0]);
  if (pathname.endsWith('/')) pathname += 'index.html';
  const safe = normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  return join(root, safe);
}

const server = createServer(async (request, response) => {
  try {
    const file = fileFor(request.url);
    const body = await readFile(file);
    response.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
    response.end(body);
  } catch {
    response.writeHead(404).end('not found');
  }
});

await new Promise((resolveListen) => server.listen(0, '127.0.0.1', resolveListen));
const origin = `http://127.0.0.1:${server.address().port}`;

const pages = [
  ['/', ['کافه دان', 'href="/CoffeeShop/products/"', 'application/ld+json', 'سؤالات متداول', 'راهنمای دم‌آوری']],
  ['/products/', ['همهٔ محصولات', 'جست‌وجو در محصولات']],
  ['/category/beans/', ['دانه قهوه', 'مرتب‌سازی']],
  ['/category/ground/', ['نوشیدنی گرم']],
  ['/product/hot-latte/', ['لاته گرم', 'application/ld+json', 'افزودن به سبد خرید']],
  ['/product/home-roaster/', ['برشته‌کن خانگی', 'ناموجود']],
  ['/cart/', ['سبد خرید']],
  ['/checkout/', ['تسویه حساب', 'ثبت سفارش']],
  ['/favorites/', ['علاقه‌مندی‌ها']],
];

const assets = [
  ['/404.html', ['این صفحه پیدا نشد']],
  ['/sitemap.xml', ['<urlset', '/product/hot-latte/']],
  ['/robots.txt', ['Sitemap']],
  ['/site.webmanifest', ['"start_url"', 'icon-192.png']],
  ['/fonts/Vazirmatn-Variable.woff2', []],
  ['/og-image.jpg', []],
  ['/icon-192.png', []],
  ['/images/product-1.webp', []],
];

const failures = [];

async function check(url, markers) {
  const response = await fetch(`${origin}${url}`);
  if (!response.ok) {
    failures.push(`${url} → HTTP ${response.status}`);
    return null;
  }
  const body = await response.text();
  for (const marker of markers) {
    if (!body.includes(marker)) failures.push(`${url} → missing "${marker}"`);
  }
  return body;
}

for (const [url, markers] of [...pages, ...assets]) {
  await check(url, markers);
}

// every referenced image must exist in the export
const imageRefs = new Set();
for (const [url] of pages) {
  const html = await check(url, []);
  if (!html) continue;
  for (const match of html.matchAll(/\/CoffeeShop(\/images\/[^"']+?\.(?:webp|png|jpg))/g)) {
    imageRefs.add(match[1]);
  }
}
for (const image of imageRefs) {
  const response = await fetch(`${origin}${image}`);
  if (!response.ok) failures.push(`${image} → HTTP ${response.status} (referenced by a page)`);
}

server.close();

if (failures.length > 0) {
  console.error(`✗ smoke test failed (${failures.length})`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`✓ smoke test passed — ${pages.length} pages, ${assets.length} assets, ${imageRefs.size} images`);
