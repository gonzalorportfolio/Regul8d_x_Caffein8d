import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Page Not Found',
  description: 'This page does not exist on Regul8d Caffein8d.',
  path: '/404',
  noIndex: true,
});

export default function NotFound() {
  return (
    <main id="main-content" className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>
        <p>This page does not exist. Maybe the crown fell off.</p>
        <Link href="/" className="cta-btn cta-primary">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
