import { Link } from 'react-router';

const StartHereCard = ({ heading, children, linkText, href, external }) => (
  <div className="start-here-card">
    <h2 className="start-here-card-heading">{heading}</h2>
    <p className="start-here-card-body">{children}</p>
    {external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="start-here-card-link"
      >
        {linkText} →
      </a>
    ) : (
      <Link to={href} className="start-here-card-link">
        {linkText} →
      </Link>
    )}
  </div>
);

const StartHere = () => (
  <main className="start-here-page">

    <header className="start-here-header">
      <h1>Start Here</h1>
      <p className="start-here-subhead">
        New to the hobby or new to T1NKER? This is your entry point.
      </p>
      <p className="start-here-intro">
        Watch collecting has a language, a culture, and a learning curve. T1NKER exists to
        flatten that curve. Here is where to begin:
      </p>
    </header>

    <div className="start-here-cards">
      <StartHereCard
        heading="Learn the Language"
        linkText="Go to the Glossary"
        href="/glossary"
        external={false}
      >
        The T1NKER Glossary breaks down every term you need to know as a collector, from beat
        rate to franken builds.
      </StartHereCard>

      <StartHereCard
        heading="Find Your First Watch"
        linkText="Browse Benable"
        href="https://benable.com/regul8dcaffien8d"
        external={true}
      >
        28 years of collecting distilled into curated lists. No hype, no gatekeeping, just the
        picks that actually make sense.
      </StartHereCard>

      <StartHereCard
        heading="Read the Deep Dives"
        linkText="Read on Substack"
        href="https://regul8dxcaffein8d.substack.com"
        external={true}
      >
        Weekly articles on watch collecting, market dynamics, vintage references, and the real
        cost of this hobby.
      </StartHereCard>

      <StartHereCard
        heading="Follow Along"
        linkText="Follow on Instagram"
        href="https://instagram.com/regul8dcaffein8d"
        external={true}
      >
        Reels, carousels, honest takes, and wrist shots. The hobby in real time.
      </StartHereCard>
    </div>

  </main>
);

export default StartHere;
