import { createPageMetadata } from '@/lib/seo';
import AffiliateLinksContent from './AffiliateLinksContent';

export const metadata = createPageMetadata({
  title: 'Gear & Picks',
  description:
    'Affiliate picks for watches, tools, coffee, and collector essentials from Regul8d Caffein8d.',
  path: '/affiliatelinks',
});

export default function AffiliateLinksPage() {
  return <AffiliateLinksContent />;
}
