'use client';

import { useState } from 'react';

const WIDTH = 1080;
const HEIGHT = 1920;
const POST_SIZE = 1080;
const PADDING_X = 90;
const PERSONALITY_PAD_X = 80;
const MAX_TEXT_WIDTH = WIDTH - PADDING_X * 2;
const PERSONALITY_MAX_WIDTH = WIDTH - PERSONALITY_PAD_X * 2;
const WATCH_PAD_X = Math.round(WIDTH * 0.15);
const WATCH_BOX_W = WIDTH - WATCH_PAD_X * 2;
const RULE_H = 8;

const TYPE = {
  brand: { size: 36, weight: 600, lineHeight: 1.2 },
  youre: { size: 38, weight: 500, lineHeight: 1.2 },
  tagline: { size: 72, weight: 700, lineHeight: 1.08 },
  category: { size: 32, weight: 600, lineHeight: 1.2 },
  name: { size: 40, weight: 700, lineHeight: 1.15 },
  personality: { size: 29, weight: 400, lineHeight: 1.4 },
  cta: { size: 27, weight: 500, lineHeight: 1.2 },
};

const COLORS = {
  coffeeBean: '#1C0A05',
  burntTangerine: '#CA3C25',
  lightCaramel: '#E6AA68',
  skyBlue: '#8AC5DC',
  floralWhite: '#FFF9F2',
};

const WHITE_THRESHOLD = 225;
const SOFT_THRESHOLD = 200;

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function resultFilename(result, variant = 'story') {
  return `my-watch-result-${slugify(result.watch.tagline)}-${variant}.png`;
}

function personalitySnippet(personality) {
  const sentences = personality.split(/(?<=[.!?])\s+/);
  return sentences.slice(0, 4).join(' ');
}

function measureBlock(ctx, text, { size, weight, lineHeight = 1.2, family, maxWidth = MAX_TEXT_WIDTH }) {
  ctx.font = `${weight} ${size}px ${family}`;
  return wrapLines(ctx, text, maxWidth).length * size * lineHeight;
}

function fitWatchSize(img, boxW, boxH) {
  if (!img || !img.width || !img.height) return { dw: 0, dh: 0 };
  const scale = Math.min(boxW / img.width, boxH / img.height);
  return { dw: img.width * scale, dh: img.height * scale };
}

function wrapLines(ctx, text, maxWidth) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** Draws wrapped, centered text and returns the y position below the block. */
function drawBlock(ctx, text, { y, size, weight, color, lineHeight = 1.2, family, maxWidth = MAX_TEXT_WIDTH }) {
  ctx.font = `${weight} ${size}px ${family}`;
  ctx.fillStyle = color;
  const lines = wrapLines(ctx, text, maxWidth);
  const step = size * lineHeight;
  lines.forEach((line, i) => {
    ctx.fillText(line, WIDTH / 2, y + i * step);
  });
  return y + lines.length * step;
}

function drawRule(ctx, y, width) {
  ctx.fillStyle = COLORS.burntTangerine;
  ctx.fillRect((WIDTH - width) / 2, y, width, RULE_H);
}

function loadWatchImage(src) {
  if (!src) return Promise.resolve(null);
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function removeWhiteBackground(ctx, img, x, y, width, height) {
  const drawW = Math.max(1, Math.round(width));
  const drawH = Math.max(1, Math.round(height));
  const offscreen = document.createElement('canvas');
  offscreen.width = drawW;
  offscreen.height = drawH;
  const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
  offCtx.drawImage(img, 0, 0, drawW, drawH);

  try {
    const imageData = offCtx.getImageData(0, 0, drawW, drawH);
    const data = imageData.data;
    const softRange = WHITE_THRESHOLD - SOFT_THRESHOLD;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (r > WHITE_THRESHOLD && g > WHITE_THRESHOLD && b > WHITE_THRESHOLD) {
        data[i + 3] = 0;
      } else if (r > SOFT_THRESHOLD && g > SOFT_THRESHOLD && b > SOFT_THRESHOLD) {
        const avg = (r + g + b) / 3;
        const alpha = Math.max(
          0,
          Math.min(255, 255 - ((avg - SOFT_THRESHOLD) / softRange) * 255)
        );
        data[i + 3] = Math.min(data[i + 3], alpha);
      }
    }

    offCtx.putImageData(imageData, 0, 0);
  } catch {
    // Tainted or unsupported canvases keep the original pixels.
  }

  ctx.drawImage(offscreen, x, y, drawW, drawH);
}

function drawWatchImage(ctx, img, x, y, boxW, boxH) {
  const scale = Math.min(boxW / img.width, boxH / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  removeWhiteBackground(ctx, img, x + (boxW - dw) / 2, y + (boxH - dh) / 2, dw, dh);
}

async function loadFontFamily() {
  const family = getComputedStyle(document.body).fontFamily || 'Poppins, sans-serif';
  if (document.fonts?.load) {
    try {
      await Promise.all([
        document.fonts.load(`700 72px ${family}`),
        document.fonts.load(`600 36px ${family}`),
        document.fonts.load(`500 38px ${family}`),
        document.fonts.load(`400 29px ${family}`),
      ]);
    } catch {
      // Fall back to whatever font the browser already has.
    }
  }
  return family;
}

function generatePostCard(storyCanvas, postTop) {
  const cropY = Math.max(0, Math.min(HEIGHT - POST_SIZE, Math.round(postTop)));
  const postCanvas = document.createElement('canvas');
  postCanvas.width = POST_SIZE;
  postCanvas.height = POST_SIZE;
  const postCtx = postCanvas.getContext('2d');

  postCtx.fillStyle = COLORS.coffeeBean;
  postCtx.fillRect(0, 0, POST_SIZE, POST_SIZE);
  postCtx.drawImage(
    storyCanvas,
    0,
    cropY,
    POST_SIZE,
    POST_SIZE,
    0,
    0,
    POST_SIZE,
    POST_SIZE
  );

  return postCanvas;
}

function postCropTop(contentTop, contentBottom) {
  const pad = 28;
  const top = contentTop - pad;
  const bottom = contentBottom + pad;
  const span = bottom - top;
  if (span <= POST_SIZE) {
    const mid = (top + bottom) / 2;
    return Math.max(0, Math.min(HEIGHT - POST_SIZE, Math.round(mid - POST_SIZE / 2)));
  }
  return Math.max(0, Math.min(HEIGHT - POST_SIZE, Math.round(bottom - POST_SIZE - 20)));
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Canvas export failed'))), 'image/png');
  });
}

function layoutCard(ctx, family, watchImage, result) {
  const category = result.watch.category.toUpperCase();
  const personality = personalitySnippet(result.watch.personality);
  const cta = 'Take the quiz at regul8dcaffein8d.com/quiz';

  if ('letterSpacing' in ctx) ctx.letterSpacing = '5px';
  const brandH = measureBlock(ctx, 'REGUL8D x CAFFEIN8D', { ...TYPE.brand, family });
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';

  const textH = {
    youre: measureBlock(ctx, "You're", { ...TYPE.youre, family }),
    tagline: measureBlock(ctx, result.watch.tagline, { ...TYPE.tagline, family }),
    category: measureBlock(ctx, category, { ...TYPE.category, family }),
    name: measureBlock(ctx, result.watch.name, { ...TYPE.name, family }),
    personality: measureBlock(ctx, personality, {
      ...TYPE.personality,
      family,
      maxWidth: PERSONALITY_MAX_WIDTH,
    }),
    cta: measureBlock(ctx, cta, { ...TYPE.cta, family }),
  };

  const brandY = 76;
  const brandRuleY = brandY + 22 + Math.max(0, brandH - TYPE.brand.size * TYPE.brand.lineHeight);
  const watchY = brandRuleY + RULE_H + 50;

  const ctaLast = HEIGHT - 90;
  const ctaStep = TYPE.cta.size * TYPE.cta.lineHeight;
  const ctaLines = Math.max(1, Math.round(textH.cta / ctaStep));
  const ctaY = ctaLast - (ctaLines - 1) * ctaStep;
  const ctaRuleY = ctaY - 44;

  const minGaps = {
    watchToYoure: 36,
    youreToTagline: 14,
    taglineToRule: 14,
    ruleToCategory: 28,
    categoryToName: 14,
    nameToPersonality: 22,
    personalityToCta: 28,
  };

  const copyHeight =
    textH.youre +
    minGaps.youreToTagline +
    textH.tagline +
    minGaps.taglineToRule +
    RULE_H +
    minGaps.ruleToCategory +
    textH.category +
    minGaps.categoryToName +
    textH.name +
    minGaps.nameToPersonality +
    textH.personality;

  const watchRoom = ctaRuleY - minGaps.personalityToCta - copyHeight - watchY - minGaps.watchToYoure;
  const natural = watchImage
    ? fitWatchSize(watchImage, WATCH_BOX_W, Number.POSITIVE_INFINITY).dh
    : 0;
  const minWatch = watchImage ? 240 : 0;
  const watchH = Math.max(minWatch, Math.min(natural, Math.max(minWatch, watchRoom)));

  const leftover = Math.max(0, watchRoom - watchH);
  const gaps = {
    watchToYoure: minGaps.watchToYoure + leftover * 0.12,
    youreToTagline: minGaps.youreToTagline,
    taglineToRule: minGaps.taglineToRule,
    ruleToCategory: minGaps.ruleToCategory + leftover * 0.1,
    categoryToName: minGaps.categoryToName,
    nameToPersonality: minGaps.nameToPersonality + leftover * 0.1,
    personalityToCta: minGaps.personalityToCta + leftover * 0.68,
  };

  const fitted = fitWatchSize(watchImage, WATCH_BOX_W, watchH);
  const youreY = watchY + fitted.dh + gaps.watchToYoure;
  const taglineY = youreY + textH.youre + gaps.youreToTagline;
  const midRuleY = taglineY + textH.tagline + gaps.taglineToRule;
  const categoryY = midRuleY + RULE_H + gaps.ruleToCategory;
  const nameY = categoryY + textH.category + gaps.categoryToName;
  const personalityY = nameY + textH.name + gaps.nameToPersonality;
  const personalityBottom = personalityY + textH.personality;

  const contentTop = watchImage ? watchY : youreY - 24;
  const contentBottom = personalityBottom;
  const postTop = postCropTop(contentTop, contentBottom);

  return {
    brandY,
    brandRuleY,
    watchY,
    watchH,
    fitted,
    youreY,
    taglineY,
    midRuleY,
    categoryY,
    nameY,
    personalityY,
    ctaY,
    ctaRuleY,
    category,
    personality,
    cta,
    postTop,
    contentMid: (contentTop + contentBottom) / 2,
  };
}

export async function drawStoryCanvas(result) {
  const [family, watchImage] = await Promise.all([
    loadFontFamily(),
    loadWatchImage(result.watch.imageUrl),
  ]);
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d');

  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  const layout = layoutCard(ctx, family, watchImage, result);

  ctx.fillStyle = COLORS.coffeeBean;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const glow = ctx.createRadialGradient(WIDTH / 2, layout.contentMid, 60, WIDTH / 2, layout.contentMid, 780);
  glow.addColorStop(0, 'rgba(26, 39, 68, 0.85)');
  glow.addColorStop(1, 'rgba(26, 39, 68, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  if ('letterSpacing' in ctx) ctx.letterSpacing = '5px';
  drawBlock(ctx, 'REGUL8D x CAFFEIN8D', {
    y: layout.brandY,
    ...TYPE.brand,
    color: COLORS.floralWhite,
    family,
  });
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
  drawRule(ctx, layout.brandRuleY, 140);

  if (watchImage && layout.fitted.dh > 0) {
    drawWatchImage(ctx, watchImage, WATCH_PAD_X, layout.watchY, WATCH_BOX_W, layout.fitted.dh);
  }

  drawBlock(ctx, "You're", {
    y: layout.youreY,
    ...TYPE.youre,
    color: COLORS.floralWhite,
    family,
  });
  drawBlock(ctx, result.watch.tagline, {
    y: layout.taglineY,
    ...TYPE.tagline,
    color: COLORS.floralWhite,
    family,
  });

  drawRule(ctx, layout.midRuleY, 100);

  drawBlock(ctx, layout.category, {
    y: layout.categoryY,
    ...TYPE.category,
    color: COLORS.skyBlue,
    family,
  });
  drawBlock(ctx, result.watch.name, {
    y: layout.nameY,
    ...TYPE.name,
    color: COLORS.lightCaramel,
    family,
  });
  drawBlock(ctx, layout.personality, {
    y: layout.personalityY,
    ...TYPE.personality,
    color: 'rgba(255, 249, 242, 0.88)',
    family,
    maxWidth: PERSONALITY_MAX_WIDTH,
  });

  drawRule(ctx, layout.ctaRuleY, WIDTH - PADDING_X * 2);
  drawBlock(ctx, layout.cta, {
    y: layout.ctaY,
    ...TYPE.cta,
    color: COLORS.skyBlue,
    family,
  });

  canvas.postTop = layout.postTop;
  return canvas;
}

export async function drawResultCard(result, variant = 'story') {
  const storyCanvas = await drawStoryCanvas(result);
  const canvas = variant === 'post' ? generatePostCard(storyCanvas, storyCanvas.postTop) : storyCanvas;
  return canvasToBlob(canvas);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function ShareResultButton({ result }) {
  const [busy, setBusy] = useState('');
  const [status, setStatus] = useState('');

  async function handleExport(variant) {
    setBusy(variant);
    setStatus('Creating your image...');
    try {
      const blob = await drawResultCard(result, variant);
      const filename = resultFilename(result, variant);
      const file = new File([blob], filename, { type: 'image/png' });

      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: `I'm ${result.watch.tagline}` });
          setStatus('Image shared.');
          return;
        } catch (error) {
          if (error?.name === 'AbortError') {
            setStatus('Sharing cancelled.');
            return;
          }
        }
      }

      downloadBlob(blob, filename);
      setStatus('Image ready. Check your downloads.');
    } catch {
      setStatus('Sorry, we could not create your image. Please try again.');
    } finally {
      setBusy('');
    }
  }

  const creating = Boolean(busy);

  return (
    <div className="quiz-share-actions">
      <button
        type="button"
        className="quiz-btn quiz-btn-primary quiz-share-btn"
        onClick={() => handleExport('story')}
        disabled={creating}
        aria-busy={busy === 'story'}
      >
        {busy === 'story' ? 'Creating Image...' : 'Share to Story'}
      </button>
      <button
        type="button"
        className="quiz-btn quiz-btn-ghost quiz-share-btn"
        onClick={() => handleExport('post')}
        disabled={creating}
        aria-busy={busy === 'post'}
      >
        {busy === 'post' ? 'Creating Image...' : 'Save for Post'}
      </button>
      <p className="visually-hidden" role="status">
        {status}
      </p>
    </div>
  );
}
