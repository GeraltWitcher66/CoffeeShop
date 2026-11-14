import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import FeaturedProducts from '@/components/FeaturedProducts';
import Story from '@/components/Story';
import BrewGuides from '@/components/BrewGuides';
import Testimonials from '@/components/Testimonials';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import { storeInfo } from '@/lib/store-data';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cafedan.ir';

const storeSchema = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: storeInfo.name,
  description: storeInfo.description,
  url: `${siteUrl}/CoffeeShop/`,
  image: `${siteUrl}/CoffeeShop/og-image.jpg`,
  telephone: storeInfo.phone,
  email: storeInfo.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: storeInfo.address,
    addressLocality: 'تهران',
    addressCountry: 'IR',
  },
  openingHours: storeInfo.workingHours,
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
        />
        <Hero />
        <Categories />
        <FeaturedProducts />
        <Story />
        <BrewGuides />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
