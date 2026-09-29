import { affiliateProducts } from '@/lib/affiliateData';
import { createPageMetadata } from '@/lib/seo';
import { absoluteUrl } from '@/lib/site';
import AffiliateLinksContent from './AffiliateLinksContent';

export const metadata = createPageMetadata({
  title: 'Gear & Picks',
  description:
    'Affiliate picks for watches, tools, coffee, and collector essentials from Regul8d Caffein8d.',
  path: '/affiliatelinks',
});

const affiliateJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Gear & Picks',
  url: absoluteUrl('/affiliatelinks'),
  numberOfItems: affiliateProducts.length,
  itemListElement: affiliateProducts.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Product',
      name: p.name,
      description: p.description,
      image: p.imageUrl,
      url: p.link,
      category: p.category,
    },
  })),
};

export default function AffiliateLinksPage() {
  return (
    <main id="main-content" className="affiliate-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(affiliateJsonLd) }}
      />
      <AffiliateLinksContent />
    </main>
  );
}
