'use client';

import Image from 'next/image';
import { useState } from 'react';
import SilhouetteIcon from '@/components/SilhouetteIcon';
import {
  DISPLAY_GROUPS,
  displaySelectValue,
} from '@/lib/watchFields';

function resolveFieldValue(watch, field) {
  const raw = watch[field.key];

  if (field.multiselect) {
    const list = Array.isArray(raw) ? [...raw] : [];
    if (!list.length) return null;
    const display = list.map((item) => {
      if (item === 'Other') {
        return watch[field.otherKey] || null;
      }
      return item;
    }).filter(Boolean);
    return display.length ? display.join(', ') : null;
  }

  if (field.format) {
    return field.format(raw);
  }

  if (field.otherKey) {
    return displaySelectValue(raw, watch[field.otherKey]);
  }

  if (raw == null || raw === '') return null;
  return String(raw);
}

export default function WatchDetailContent({ watch }) {
  const photos = watch.photos || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const active = photos[activeIndex] || null;
  const activeAlt =
    active?.alt ||
    `${watch.brand} ${watch.model}${photos.length > 1 ? `, photo ${activeIndex + 1}` : ''}`;

  const groups = DISPLAY_GROUPS.map((group) => {
    if (group.requiresBezel && !watch.hasBezel) return null;
    const items = group.fields
      .map((field) => {
        const value = resolveFieldValue(watch, field);
        if (!value) return null;
        return { field, value };
      })
      .filter(Boolean);
    if (!items.length) return null;
    return { ...group, items };
  }).filter(Boolean);

  return (
    <div className="watch-detail">
      <div className="watch-detail-gallery">
        <div className="watch-detail-hero">
          {active ? (
            <Image
              src={active.url}
              alt={activeAlt}
              width={800}
              height={800}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
            />
          ) : (
            <div className="watch-card-placeholder" aria-hidden="true">
              {(watch.brand || '?').charAt(0)}
            </div>
          )}
        </div>
        {photos.length > 1 ? (
          <ul className="watch-detail-thumbs" aria-label="Watch photos">
            {photos.map((photo, index) => {
              const selected = index === activeIndex;
              return (
                <li key={`${photo.url}-${index}`}>
                  <button
                    type="button"
                    className={
                      selected
                        ? 'watch-detail-thumb watch-detail-thumb-active'
                        : 'watch-detail-thumb'
                    }
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show photo ${index + 1} of ${photos.length}`}
                    aria-pressed={selected}
                  >
                    <Image
                      src={photo.url}
                      alt=""
                      width={80}
                      height={80}
                      sizes="80px"
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>

      <div className="watch-detail-copy">
        <p className="watch-detail-brand">{watch.brand}</p>
        <h1 className="watch-detail-title">{watch.model}</h1>
        {watch.reference ? (
          <p className="watch-detail-reference">Ref. {watch.reference}</p>
        ) : null}
        {watch.notes ? <p className="watch-detail-notes">{watch.notes}</p> : null}

        {groups.map((group) => (
          <section
            key={group.id}
            className="watch-attr-group"
            aria-labelledby={`watch-group-${group.id}`}
          >
            <h2 id={`watch-group-${group.id}`}>{group.title}</h2>
            <dl className="watch-attr-list">
              {group.items.map(({ field, value }) => (
                <div key={field.key} className="watch-attr-row">
                  <dt>{field.label}</dt>
                  <dd>
                    {field.silhouette ? (
                      <span className="watch-attr-with-icon">
                        <SilhouetteIcon
                          fieldKey={field.key}
                          option={
                            watch[field.key] === 'Other'
                              ? 'Other'
                              : watch[field.key]
                          }
                        />
                        <span>{value}</span>
                      </span>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
