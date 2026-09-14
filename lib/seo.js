import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from '@/lib/site';

/**
 * Build consistent page metadata with canonical + Open Graph + Twitter.
 */
export function createPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = '/',
  noIndex = false,
  image = OG_IMAGE,
}) {
  const url = absoluteUrl(path);
  const fullTitle =
    path === '/'
      ? `${SITE_NAME} | Watch Collecting Content | Vintage Watches & Mechanical Watch Reviews`
      : undefined;

  return {
    title: fullTitle || title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      url,
      title: fullTitle || `${title} | ${SITE_NAME}`,
      description,
      siteName: SITE_NAME,
      locale: 'en_US',
      images: [{ url: image, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle || `${title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
