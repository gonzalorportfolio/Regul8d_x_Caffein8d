import Link from 'next/link';
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

      <section className="home-explore" aria-label="Explore">
        <h2 className="home-explore-heading">Explore</h2>
        <div className="home-explore-links">
          <Link href="/start-here" className="home-explore-card">
            <h3>Start Here</h3>
            <p>New to the hobby? This is your entry point.</p>
          </Link>
          <Link href="/glossary" className="home-explore-card">
            <h3>Watch Glossary</h3>
            <p>Every term you need to know as a collector.</p>
          </Link>
          <Link href="/collection" className="home-explore-card">
            <h3>My Collection</h3>
            <p>Every watch I own. Photos, specs, stories.</p>
          </Link>
          <Link href="/about" className="home-explore-card">
            <h3>About T1NKER</h3>
            <p>28 years on the wrist.</p>
          </Link>
          <Link href="/quiz" className="home-explore-card home-explore-card-wide">
            <h3>What Watch Are You?</h3>
            <p>Take our 60-second personality quiz</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
