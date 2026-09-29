import { listWatchSlugs } from '@/lib/db';
import { PUBLIC_ROUTES, absoluteUrl } from '@/lib/site';

export default async function sitemap() {
  const lastModified = new Date();

  const staticEntries = PUBLIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));

  const watchRows = await listWatchSlugs();
  const watchEntries = watchRows.map((row) => ({
    url: absoluteUrl(`/collection/${row.slug}`),
    lastModified: row.updated_at ? new Date(row.updated_at) : lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...watchEntries];
}
