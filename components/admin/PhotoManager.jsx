'use client';

import { useId, useState } from 'react';

function isValidHttpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
}

export default function PhotoManager({ photos, onChange }) {
  const baseId = useId();
  const [urlInput, setUrlInput] = useState('');
  const [urlError, setUrlError] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [uploading, setUploading] = useState(false);

  function updatePhotos(next) {
    onChange(next);
  }

  function addUrl(event) {
    event.preventDefault();
    setUrlError('');
    const trimmed = urlInput.trim();
    if (!trimmed) {
      setUrlError('Enter an image URL.');
      return;
    }
    if (!isValidHttpsUrl(trimmed)) {
      setUrlError('URL must start with https://');
      return;
    }
    if (photos.some((p) => p.url === trimmed)) {
      setUrlError('That URL is already in the list.');
      return;
    }
    updatePhotos([...photos, { url: trimmed, alt: '' }]);
    setUrlInput('');
  }

  async function onFileChange(event) {
    const files = Array.from(event.target.files || []);
    event.target.value = '';
    if (!files.length) return;

    setUploadError('');
    setUploading(true);

    const uploaded = [];
    try {
      for (const file of files) {
        const body = new FormData();
        body.append('file', file);
        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body,
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(data.error || 'Upload failed.');
        }
        uploaded.push({ url: data.url, alt: '' });
      }
      updatePhotos([...photos, ...uploaded]);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  function setHero(index) {
    if (index === 0) return;
    const next = [...photos];
    const [item] = next.splice(index, 1);
    next.unshift(item);
    updatePhotos(next);
  }

  function move(index, direction) {
    const target = index + direction;
    if (target < 0 || target >= photos.length) return;
    const next = [...photos];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    updatePhotos(next);
  }

  function remove(index) {
    updatePhotos(photos.filter((_, i) => i !== index));
  }

  function updateAlt(index, alt) {
    updatePhotos(
      photos.map((photo, i) => (i === index ? { ...photo, alt } : photo))
    );
  }

  return (
    <section className="admin-section" aria-labelledby={`${baseId}-photos-heading`}>
      <h2 id={`${baseId}-photos-heading`}>Photos</h2>
      <p className="admin-section-intro">
        Add photos by uploading from your device or pasting an HTTPS image URL. The
        first photo is the hero on the collection card.
      </p>

      <div className="admin-photo-actions">
        <div className="admin-field">
          <label htmlFor={`${baseId}-file`}>Upload images</label>
          <input
            id={`${baseId}-file`}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            onChange={onFileChange}
            disabled={uploading}
            aria-describedby={uploadError ? `${baseId}-upload-error` : `${baseId}-upload-hint`}
          />
          <p id={`${baseId}-upload-hint`} className="admin-field-hint">
            JPEG, PNG, WebP, or GIF up to 5 MB each.
          </p>
          {uploadError ? (
            <p id={`${baseId}-upload-error`} className="admin-error" role="alert">
              {uploadError}
            </p>
          ) : null}
          {uploading ? <p className="admin-field-hint">Uploading…</p> : null}
        </div>

        <div className="admin-url-row">
          <div className="admin-field" style={{ flex: 1 }}>
            <label htmlFor={`${baseId}-url`}>Image URL</label>
            <input
              id={`${baseId}-url`}
              type="url"
              inputMode="url"
              placeholder="https://"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              aria-describedby={urlError ? `${baseId}-url-error` : undefined}
              aria-invalid={urlError ? 'true' : undefined}
            />
            {urlError ? (
              <p id={`${baseId}-url-error`} className="admin-error" role="alert">
                {urlError}
              </p>
            ) : null}
          </div>
          <button type="button" className="admin-secondary-btn" onClick={addUrl}>
            Add URL
          </button>
        </div>
      </div>

      {photos.length === 0 ? (
        <p className="admin-empty">No photos yet. At least one is required.</p>
      ) : (
        <ul className="admin-photo-list">
          {photos.map((photo, index) => (
            <li key={`${photo.url}-${index}`} className="admin-photo-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="admin-photo-preview" />
              <div className="admin-photo-controls">
                <p className="admin-photo-badge">
                  {index === 0 ? 'Hero' : `Photo ${index + 1}`}
                </p>
                <label htmlFor={`${baseId}-alt-${index}`} className="visually-hidden">
                  Alt text for photo {index + 1}
                </label>
                <input
                  id={`${baseId}-alt-${index}`}
                  type="text"
                  placeholder="Optional alt text"
                  value={photo.alt || ''}
                  onChange={(e) => updateAlt(index, e.target.value)}
                />
                <div className="admin-photo-buttons">
                  <button
                    type="button"
                    className="admin-secondary-btn"
                    onClick={() => setHero(index)}
                    disabled={index === 0}
                  >
                    Set as hero
                  </button>
                  <button
                    type="button"
                    className="admin-secondary-btn"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    aria-label={`Move photo ${index + 1} earlier`}
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    className="admin-secondary-btn"
                    onClick={() => move(index, 1)}
                    disabled={index === photos.length - 1}
                    aria-label={`Move photo ${index + 1} later`}
                  >
                    Down
                  </button>
                  <button
                    type="button"
                    className="admin-danger-btn"
                    onClick={() => remove(index)}
                    aria-label={`Remove photo ${index + 1}`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
