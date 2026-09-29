'use client';

import { useState } from 'react';
import { silhouettePath } from '@/lib/watchFields';

export default function SilhouetteIcon({ fieldKey, option, className }) {
  const [failed, setFailed] = useState(false);
  const src = silhouettePath(fieldKey, option);
  const letter = (option || '?').charAt(0).toUpperCase();

  if (failed || !option || option === 'Other') {
    return (
      <span className={`silhouette-fallback ${className || ''}`} aria-hidden="true">
        {letter}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      className={`silhouette-icon ${className || ''}`}
      width={24}
      height={24}
      onError={() => setFailed(true)}
    />
  );
}
