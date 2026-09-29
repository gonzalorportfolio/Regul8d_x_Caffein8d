'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" className="error-page">
      <div className="error-content">
        <h1>Something went wrong</h1>
        <p>An unexpected error occurred. Try refreshing, or head back home.</p>
        <div className="error-actions">
          <button type="button" onClick={() => reset()} className="cta-btn cta-primary">
            Try again
          </button>
          <Link href="/" className="cta-btn cta-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
