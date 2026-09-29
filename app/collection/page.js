import Link from 'next/link';
import PlaceholderPage from '@/components/PlaceholderPage';
import WatchCard from '@/components/WatchCard';
import { listWatches } from '@/lib/db';
import { createPageMetadata } from '@/lib/seo';
import { SOCIAL, absoluteUrl } from '@/lib/site';

export const metadata = createPageMetadata({
  title: 'My Collection',
  description:
    'Every watch I own. Photos, specs, and the story behind each piece from Regul8d Caffein8d.',
  path: '/collection',
});

export const dynamic = 'force-dynamic';

export default async function CollectionPage() {
  const watches = await listWatches();

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'My Watch Collection',
    url: absoluteUrl('/collection'),
    numberOfItems: watches.length,
    itemListElement: watches.map((w, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(`/collection/${w.slug}`),
      name: `${w.brand} ${w.model}`,
    })),
  };

  if (!watches.length) {
    return (
      <PlaceholderPage
        title="My Collection"
        subhead="Every watch I own. Every story behind it."
        body="This page is coming soon. In the meantime browse the watches and gear I actually recommend as a 28-year collector."
        ctaHref={SOCIAL.benable}
        ctaLabel="Browse My Picks on Benable"
      />
    );
  }

  return (
    <main id="main-content" className="collection-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <header className="collection-header">
        <p className="collection-eyebrow">My Collection</p>
        <h1>Watches on the wrist and on the bench</h1>
        <p className="collection-intro">
          Photo-first looks at each piece: what it is, how it wears, and the specs that
          matter.
        </p>
      </header>

      <ul className="collection-grid">
        {watches.map((watch) => (
          <li key={watch.id}>
            <WatchCard watch={watch} />
          </li>
        ))}
      </ul>

      <p className="collection-footer-note">
        Looking for gear I actually use?{' '}
        <Link href="/affiliatelinks">See affiliate picks</Link>.
      </p>
    </main>
  );
}
