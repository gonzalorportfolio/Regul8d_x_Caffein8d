import ExternalLink from '@/components/ExternalLink';
import { createPageMetadata } from '@/lib/seo';
import { SITE_DESCRIPTION, SOCIAL } from '@/lib/site';

export const metadata = createPageMetadata({
  title: 'Home',
  description: SITE_DESCRIPTION,
  path: '/',
});

export default function HomePage() {
  return (
    <main id="main-content" className="home-main">
      <section className="banner" aria-label="Hero">
        <div className="landing">
          <div className="welcomeText">
            <h1>REGUL8D &amp; CAFFEIN8D</h1>
            <p className="gdev">Regulation. Accuracy. Coffee.</p>
            <p className="hero-body">
              Watch collecting content for the everyday collector. Vintage watches, mechanical watch
              regulation, homage watch talk, bench work, and honest hobby commentary. No gatekeeping.
              Just the hobby.
            </p>
            <div className="hero-cta">
              <ExternalLink href={SOCIAL.instagram} className="cta-btn cta-primary">
                Follow on Instagram
              </ExternalLink>
              <ExternalLink href={SOCIAL.substack} className="cta-btn cta-secondary">
                Read on Substack
              </ExternalLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
