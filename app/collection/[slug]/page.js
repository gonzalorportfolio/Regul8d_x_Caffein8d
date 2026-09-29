import Link from 'next/link';
import { notFound } from 'next/navigation';
import WatchDetailContent from '@/components/WatchDetailContent';
import { getWatchBySlug } from '@/lib/db';
import { createPageMetadata } from '@/lib/seo';
import { SITE_NAME, SITE_URL, absoluteUrl } from '@/lib/site';
import { heroPhoto } from '@/lib/watchFields';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const watch = await getWatchBySlug(slug);
  if (!watch) {
    return createPageMetadata({
      title: 'Watch not found',
      description: 'This watch is not in the collection.',
      path: `/collection/${slug}`,
      noIndex: true,
    });
  }

  const hero = heroPhoto(watch);
  return createPageMetadata({
    title: `${watch.brand} ${watch.model}`,
    description:
      watch.notes ||
      `${watch.brand} ${watch.model} from the Regul8d Caffein8d collection.`,
    path: `/collection/${watch.slug}`,
    ...(hero?.url ? { image: hero.url } : {}),
  });
}

function buildWatchJsonLd(watch) {
  const hero = heroPhoto(watch);
  const watchUrl = absoluteUrl(`/collection/${watch.slug}`);

  const product = {
    '@type': 'IndividualProduct',
    '@id': `${watchUrl}#product`,
    name: `${watch.brand} ${watch.model}`,
    url: watchUrl,
    brand: { '@type': 'Brand', name: watch.brand },
    category: 'Watches',
    description:
      watch.notes ||
      `${watch.brand} ${watch.model} from the Regul8d Caffein8d collection.`,
  };

  if (hero?.url) {
    product.image = hero.url.startsWith('http') ? hero.url : absoluteUrl(hero.url);
  }

  if (watch.reference) {
    product.mpn = watch.reference;
  }

  if (watch.style) {
    product.additionalProperty = [
      { '@type': 'PropertyValue', name: 'Style', value: watch.style },
    ];
  }

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'My Collection',
        item: absoluteUrl('/collection'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${watch.brand} ${watch.model}`,
        item: watchUrl,
      },
    ],
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [product, breadcrumb],
  };
}

export default async function WatchDetailPage({ params }) {
  const { slug } = await params;
  const watch = await getWatchBySlug(slug);
  if (!watch) notFound();

  const jsonLd = buildWatchJsonLd(watch);

  return (
    <main id="main-content" className="watch-detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="watch-detail-nav" aria-label="Breadcrumb">
        <Link href="/collection">My Collection</Link>
        <span aria-hidden="true"> / </span>
        <span>
          {watch.brand} {watch.model}
        </span>
      </nav>
      <WatchDetailContent watch={watch} />
    </main>
  );
}
