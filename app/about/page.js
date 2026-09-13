import AboutContainer from '@/components/AboutContainer';
import AboutMeIntro from '@/components/AboutMeIntro';

export const metadata = {
  title: 'About T1NKER',
  description:
    'Meet T1NKER — 28 years collecting watches in Brooklyn. Vintage watches, regulation, homage watches, and honest hobby commentary.',
};

export default function AboutPage() {
  return (
    <section className="about-page">
      <AboutMeIntro />
      <AboutContainer />
    </section>
  );
}
