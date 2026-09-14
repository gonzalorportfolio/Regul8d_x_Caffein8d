import { PUBLIC_ROUTES, absoluteUrl } from '@/lib/site';

export default function sitemap() {
  const lastModified = new Date();

  return PUBLIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
