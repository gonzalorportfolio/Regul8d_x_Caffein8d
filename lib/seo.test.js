import { describe, expect, it } from 'vitest';
import { absoluteUrl, PUBLIC_ROUTES, SITE_NAME, SITE_URL } from '@/lib/site';
import { createPageMetadata } from '@/lib/seo';

describe('site helpers', () => {
  it('uses the production domain by default', () => {
    expect(SITE_URL).toContain('regul8dcaffein8d.com');
    expect(SITE_NAME).toBe('Regul8d Caffein8d');
  });

  it('builds absolute urls', () => {
    expect(absoluteUrl('/')).toBe(SITE_URL.replace(/\/$/, ''));
    expect(absoluteUrl('/glossary')).toBe(`${SITE_URL.replace(/\/$/, '')}/glossary`);
  });

  it('lists indexable public routes', () => {
    const paths = PUBLIC_ROUTES.map((route) => route.path);
    expect(paths).toContain('/');
    expect(paths).toContain('/glossary');
    expect(paths).not.toContain('/repairs');
  });
});

describe('createPageMetadata', () => {
  it('sets canonical and absolute OG image', () => {
    const meta = createPageMetadata({
      title: 'Watch Glossary',
      description: 'Glossary of watch terms.',
      path: '/glossary',
    });

    expect(meta.alternates.canonical).toBe('/glossary');
    expect(meta.openGraph.url).toContain('/glossary');
    expect(meta.openGraph.images[0].url).toMatch(/\/og\.jpg$/);
    expect(meta.robots).toEqual({ index: true, follow: true });
  });

  it('supports noIndex pages', () => {
    const meta = createPageMetadata({
      title: 'Portfolio',
      path: '/repairs',
      noIndex: true,
    });

    expect(meta.robots).toEqual({ index: false, follow: false });
  });
});
