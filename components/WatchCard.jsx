import Image from 'next/image';
import Link from 'next/link';
import { formatMm, heroPhoto } from '@/lib/watchFields';

export default function WatchCard({ watch }) {
  const hero = heroPhoto(watch);
  const alt =
    hero?.alt ||
    `${watch.brand} ${watch.model}${watch.style ? `, ${watch.style}` : ''}`;
  const diameter = formatMm(watch.caseDiameter);
  const meta = [watch.style, diameter].filter(Boolean).join(' · ');

  return (
    <article className="watch-card">
      <Link href={`/collection/${watch.slug}`} className="watch-card-link">
        <div className="watch-card-media">
          {hero ? (
            <Image
              src={hero.url}
              alt={alt}
              width={400}
              height={400}
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
              style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
            />
          ) : (
            <div className="watch-card-placeholder" aria-hidden="true">
              {(watch.brand || '?').charAt(0)}
            </div>
          )}
        </div>
        <div className="watch-card-body">
          <p className="watch-card-brand">{watch.brand}</p>
          <h2 className="watch-card-title">{watch.model}</h2>
          {meta ? <p className="watch-card-meta">{meta}</p> : null}
        </div>
      </Link>
    </article>
  );
}
