import PlaceholderPage from '@/components/PlaceholderPage';
import { listReviews } from '@/lib/db';
import { SOCIAL } from '@/lib/site';

export const metadata = {
  title: 'Reviews',
  description: 'Honest watch reviews. No sponsorships. No hype. From Regul8d Caffein8d (T1NKER).',
};

export const dynamic = 'force-dynamic';

export default async function ReviewsPage() {
  const reviews = await listReviews();

  if (!reviews.length) {
    return (
      <PlaceholderPage
        title="Reviews"
        subhead="Honest takes. No sponsorships. No hype."
        body="Full reviews are coming soon. In the meantime check out the watches and gear I actually stand behind."
        ctaHref={SOCIAL.benable}
        ctaLabel="Browse My Picks on Benable"
      />
    );
  }

  return (
    <main className="placeholder-page">
      <div className="placeholder-content" style={{ maxWidth: 960, width: '100%' }}>
        <h1>Reviews</h1>
        <p className="placeholder-subhead">Honest takes. No sponsorships. No hype.</p>
        <ul className="about-topics" style={{ textAlign: 'left', marginTop: '2rem' }}>
          {reviews.map((review) => (
            <li key={review.id}>
              <strong>{review.title}</strong>
              {review.excerpt ? ` — ${review.excerpt}` : ''}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
