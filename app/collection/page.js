import PlaceholderPage from '@/components/PlaceholderPage';
import { listWatches } from '@/lib/db';
import { createPageMetadata } from '@/lib/seo';
import { SOCIAL } from '@/lib/site';

export const metadata = createPageMetadata({
  title: 'My Collection',
  description: 'Every watch I own. Every story behind it. Coming soon from Regul8d Caffein8d.',
  path: '/collection',
});

export const dynamic = 'force-dynamic';

export default async function CollectionPage() {
  const watches = await listWatches();

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
    <main id="main-content" className="placeholder-page">
      <div className="placeholder-content" style={{ maxWidth: 960, width: '100%' }}>
        <h1>My Collection</h1>
        <p className="placeholder-subhead">Every watch I own. Every story behind it.</p>
        <ul className="about-topics" style={{ textAlign: 'left', marginTop: '2rem' }}>
          {watches.map((watch) => (
            <li key={watch.id}>
              <strong>
                {watch.brand} {watch.model}
              </strong>
              {watch.year ? ` (${watch.year})` : ''}
              {watch.story ? ` — ${watch.story}` : ''}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
