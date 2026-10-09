import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { SITE_NAME, SITE_URL, absoluteUrl } from '@/lib/site';
import QuizClient from './QuizClient';

const QUIZ_DESCRIPTION =
  'Take our 60-second personality quiz to find out which watch category matches your vibe. 40 possible results across Dive, Dress, Chronograph, Field, and Pilot watches.';

export const metadata = createPageMetadata({
  title: 'What Watch Are You?',
  description: QUIZ_DESCRIPTION,
  path: '/quiz',
});

const quizJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'What Watch Are You?',
  url: absoluteUrl('/quiz'),
  description: QUIZ_DESCRIPTION,
  isPartOf: { '@id': `${SITE_URL}/#website` },
  publisher: { '@id': `${SITE_URL}/#person` },
  mainEntity: {
    '@type': 'Quiz',
    name: 'What Watch Are You?',
    description: QUIZ_DESCRIPTION,
    educationalUse: 'Personality quiz',
    about: [
      { '@type': 'Thing', name: 'Dive watches' },
      { '@type': 'Thing', name: 'Dress watches' },
      { '@type': 'Thing', name: 'Chronograph watches' },
      { '@type': 'Thing', name: 'Field watches' },
      { '@type': 'Thing', name: 'Pilot watches' },
    ],
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  },
};

export default function QuizPage() {
  return (
    <main id="main-content" className="quiz-main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizJsonLd) }}
      />
      <noscript>
        <div className="quiz-noscript">
          <p>
            This quiz requires JavaScript. Enable it to find your watch.
          </p>
          <p>
            In the meantime, browse <Link href="/collection">the collection</Link> or learn the
            lingo in <Link href="/glossary">the glossary</Link>.
          </p>
        </div>
      </noscript>
      <QuizClient />
    </main>
  );
}
