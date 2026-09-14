export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://regul8dcaffein8d.com';

export const SITE_NAME = 'Regul8d Caffein8d';

export const SITE_DESCRIPTION =
  'Regul8d Caffein8d (T1NKER) is a watch collecting content brand based in Brooklyn, NY. Covering vintage watches, mechanical watch regulation, homage watches, bench work, and honest hobby commentary.';

export const OG_IMAGE = '/og.jpg';

export const SOCIAL = {
  instagram: 'https://www.instagram.com/regul8dcaffein8d/',
  substack: 'https://substack.com/@regul8dxcaffein8d',
  substackHome: 'https://regul8dxcaffein8d.substack.com',
  tiktok: 'https://www.tiktok.com/@regul8dcaffein8d',
  benable: 'https://benable.com/regul8dcaffien8d',
};

/**
 * Public indexable routes for sitemap + SEO.
 * priority: 0–1 for sitemap; changeFrequency for crawlers.
 */
export const PUBLIC_ROUTES = [
  { path: '/', title: 'Home', priority: 1, changeFrequency: 'weekly' },
  { path: '/start-here', title: 'Start Here', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/glossary', title: 'Watch Glossary', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/about', title: 'About T1NKER', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/collection', title: 'My Collection', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/reviews', title: 'Reviews', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/substack', title: 'Substack', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/affiliatelinks', title: 'Gear & Picks', priority: 0.6, changeFrequency: 'monthly' },
];

export function absoluteUrl(path = '/') {
  const base = SITE_URL.replace(/\/$/, '');
  if (!path || path === '/') return base;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
