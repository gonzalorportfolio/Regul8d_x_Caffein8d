import { SOCIAL } from '@/lib/site';

export default function PlaceholderPage({ title, subhead, body, ctaHref, ctaLabel }) {
  return (
    <main className="placeholder-page">
      <div className="placeholder-content">
        <h1>{title}</h1>
        <p className="placeholder-subhead">{subhead}</p>
        <p className="placeholder-body">{body}</p>
        <a
          href={ctaHref || SOCIAL.benable}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-btn cta-primary"
        >
          {ctaLabel || 'Browse My Picks on Benable'}
        </a>
      </div>
    </main>
  );
}
