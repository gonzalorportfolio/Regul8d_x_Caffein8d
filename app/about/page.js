import AboutContainer from '@/components/AboutContainer';
import AboutMeIntro from '@/components/AboutMeIntro';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'About T1NKER',
  description:
    'Meet T1NKER — 28 years collecting watches in Brooklyn. Vintage watches, regulation, homage watches, and honest hobby commentary.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <main id="main-content" className="about-page">
      <AboutMeIntro />
      <AboutContainer />
    </main>
  );
}
