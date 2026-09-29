import AboutContainer from '@/components/AboutContainer';
import AboutMeIntro from '@/components/AboutMeIntro';
import { createPageMetadata } from '@/lib/seo';
import { SITE_URL, SOCIAL } from '@/lib/site';

export const metadata = createPageMetadata({
  title: 'About T1NKER',
  description:
    'Meet T1NKER — 28 years collecting watches in Brooklyn. Vintage watches, regulation, homage watches, and honest hobby commentary.',
  path: '/about',
});

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Gonzalo Romero',
  alternateName: 'T1NKER',
  url: SITE_URL,
  description:
    'Watch collector and content creator with 28 years of collecting experience. Based in Brooklyn, NY. Creator of Regul8d Caffein8d.',
  knowsAbout: [
    'Watch collecting',
    'Vintage watches',
    'Mechanical watch regulation',
    'Homage watches',
    'Watch bench work',
    'Franken builds',
  ],
  sameAs: [SOCIAL.instagram, SOCIAL.substack, SOCIAL.tiktok, SOCIAL.benable],
};

export default function AboutPage() {
  return (
    <main id="main-content" className="about-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <AboutMeIntro />
      <AboutContainer />
    </main>
  );
}
