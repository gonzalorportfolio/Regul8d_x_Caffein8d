import { Poppins } from 'next/font/google';
import NavBar from '@/components/NavBar';
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL } from '@/lib/site';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Watch Collecting Content | Vintage Watches & Mechanical Watch Reviews`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'watch collecting',
    'vintage watches',
    'mechanical watch regulation',
    'homage watches',
    'watch bench work',
    'franken builds',
    'watch content creator',
    'Brooklyn',
    'T1NKER',
    'Gonzalo Romero',
  ],
  authors: [{ name: 'Gonzalo Romero' }],
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: `${SITE_NAME} | Watch Collecting Content | Vintage Watches & Mechanical Watch Reviews`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: 'en_US',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Watch Collecting Content | Vintage Watches & Mechanical Watch Reviews`,
    description:
      'Regul8d Caffein8d (T1NKER) - vintage watches, mechanical watch regulation, homage watches, bench work, and honest hobby commentary. Based in Brooklyn, NY.',
    images: [OG_IMAGE],
  },
  appleWebApp: {
    title: 'Regul8d & Caffein8d',
    capable: true,
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Gonzalo Romero',
      alternateName: 'T1NKER',
      url: SITE_URL,
      description:
        'Watch collector and content creator with 28 years of collecting experience. Based in Brooklyn, NY.',
      sameAs: [SOCIAL.instagram, SOCIAL.substack, SOCIAL.tiktok, SOCIAL.benable],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
