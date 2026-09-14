import { SITE_URL, absoluteUrl } from '@/lib/site';

export default function robots() {
  const host = SITE_URL.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/repairs'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host,
  };
}
