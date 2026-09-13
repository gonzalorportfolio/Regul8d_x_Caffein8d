import PlaceholderPage from '@/components/PlaceholderPage';
import { SOCIAL } from '@/lib/site';

export const metadata = {
  title: 'Substack',
  description:
    'Longer reads and deeper dives on watch collecting from Regul8d Caffein8d (T1NKER) on Substack.',
};

export default function SubstackPage() {
  return (
    <PlaceholderPage
      title="The T1NKER Substack"
      subhead="Longer reads. Deeper dives. The stuff the algorithm won't let me say in 30 seconds."
      body="Articles are published weekly. Head over to Substack to read, subscribe, and never miss a drop."
      ctaHref={SOCIAL.substackHome}
      ctaLabel="Read on Substack"
    />
  );
}
