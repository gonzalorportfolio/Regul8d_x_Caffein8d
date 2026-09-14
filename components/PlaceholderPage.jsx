import ExternalLink from '@/components/ExternalLink';
import { SOCIAL } from '@/lib/site';

export default function PlaceholderPage({ title, subhead, body, ctaHref, ctaLabel }) {
  return (
    <main id="main-content" className="placeholder-page">
      <div className="placeholder-content">
        <h1>{title}</h1>
        <p className="placeholder-subhead">{subhead}</p>
        <p className="placeholder-body">{body}</p>
        <ExternalLink
          href={ctaHref || SOCIAL.benable}
          className="cta-btn cta-primary"
        >
          {ctaLabel || 'Browse My Picks on Benable'}
        </ExternalLink>
      </div>
    </main>
  );
}
