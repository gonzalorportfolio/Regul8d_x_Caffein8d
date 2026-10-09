#!/usr/bin/env node
/**
 * Downloads the main product image from each quiz watch source page
 * into public/quiz/. CJS on purpose, matching other repo scripts.
 */

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'public', 'quiz');
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const WATCHES = [
  { slug: 'seiko-pogue-6139', source: 'https://www.seikowatches.com/au-en/special/chronograph_historical' },
  { slug: 'seagull-1963', source: 'https://seagullwatches.com/products/seagull-1963-classic-aviation-pilots-watches' },
  { slug: 'seiko-speedtimer', source: 'https://www.seikowatches.com/global-en/products/prospex/special/speedtimer/solar/' },
  { slug: 'moonswatch', source: 'https://www.swatch.com/en-us/mission-to-the-moon-so33m100/SO33M100.html' },
  { slug: 'paul-newman-daytona', source: 'https://www.phillips.com/detail/rolex/NY080117/8' },
  { slug: 'omega-speedmaster-moonwatch', source: 'https://www.omegawatches.com/en-us/watches/speedmaster/moonwatch-professional/product' },
  { slug: 'rolex-daytona', source: 'https://www.rolex.com/en-us/watches/cosmograph-daytona/m126500ln-0001' },
  { slug: 'bulova-lunar-pilot', source: 'https://www.bulova.com/us/en/product/96A225.html' },
  { slug: 'orient-bambino-v2', source: 'https://www.orientwatchusa.com/products/ra-ac0027s30b' },
  { slug: 'casio-mtp-1370l-7av', source: 'https://www.casio.com/intl/watches/casio/product.MTP-1370L-7AV/' },
  { slug: 'seiko-presage', source: 'https://www.seikowatches.com/global-en/products/presage/special/cocktailtime/' },
  { slug: 'baltic-hms', source: 'https://baltic-watches.com/en/products/hms-002-silver' },
  { slug: 'patek-philippe-calatrava', source: 'https://www.patek.com/en/collection/calatrava/5226g-001' },
  { slug: 'jlc-reverso-classic', source: 'https://www.jaeger-lecoultre.com/us-en/watches/reverso/reverso-classic' },
  { slug: 'rolex-cellini', source: 'https://www.rolex.com/en-us/watches/cellini/m50515-0008.html' },
  { slug: 'tank-must-de-cartier', source: 'https://www.cartier.com/en-us/watches/collections/tank/tank-must-de-cartier-watch-CRWSTA0106.html' },
  { slug: 'vostok-amphibia', source: 'https://meranom.com/en/amfibia/amphibia-1967/vostok-watch-amphibia-1967-196500.html' },
  { slug: 'casio-duro', source: 'https://www.casio.com/us/watches/casio/product.MDV-106-1AV/' },
  { slug: 'seiko-captain-willard', source: 'https://watchbase.com/seiko/prospex-divers/spb151' },
  { slug: 'seiko-turtle-srp', source: 'https://watchbase.com/seiko/prospex-divers/srp777' },
  { slug: 'blancpain-fifty-fathoms', source: 'https://www.blancpain.com/en/fifty-fathoms/fifty-fathoms-automatique-5015-3630-52a' },
  { slug: 'doxa-sub-200', source: 'https://doxawatches.com/products/sub-200-professional' },
  { slug: 'omega-seamaster-diver-300m', source: 'https://www.omegawatches.com/en-us/watches/seamaster/diver-300-m/gents-collection/product' },
  { slug: 'rolex-submariner', source: 'https://www.rolex.com/en-us/watches/submariner/m124060-0001' },
  { slug: 'benrus-military-field', source: 'https://benrus.com/en-us/products/dtu-2a-p' },
  { slug: 'timex-expedition', source: 'https://timex.com/products/expedition-field-post-solar-36mm-eco-friendly-leather-strap-watch-tw2v00200' },
  { slug: 'seiko-spb121', source: 'https://www.seikowatches.com/us-en/products/prospex/spb121j1' },
  { slug: 'hamilton-murph', source: 'https://www.hamiltonwatch.com/en-us/h70605731-khaki-field-murph-auto.html' },
  { slug: 'omega-railmaster', source: 'https://www.omegawatches.com/en-us/watches/seamaster/heritage-models/railmaster/product' },
  { slug: 'weiss-38mm-standard-issue', source: 'https://weisswatchcompany.com/products/38mm-automatic-issue-field-watch' },
  { slug: 'rolex-explorer', source: 'https://www.rolex.com/en-us/watches/explorer/m124270-0001' },
  { slug: 'tudor-ranger', source: 'https://www.tudorwatch.com/en/watches/ranger/m79950-0001' },
  { slug: 'laco-aachen-42', source: 'https://www.laco-watches.com/en/watches/pilot-watches-basic/aachen-42/861690.2' },
  { slug: 'seiko-5-sports-srph29', source: 'https://www.seikowatches.com/es-es/products/5sports/srph29' },
  { slug: 'citizen-promaster-skyhawk', source: 'https://www.citizenwatch.com/us/en/product/JY8078-52L.html' },
  { slug: 'hamilton-khaki-aviation-pilot', source: 'https://www.hamiltonwatch.com/en-us/h64615135-khaki-aviation-pilot-day-date-auto.html' },
  { slug: 'iwc-pilots-watch-mark-xx', source: 'https://www.iwc.com/us-en/watches/pilot-watches/iw328201-pilots-watch-mark-xx' },
  { slug: 'tissot-telemeter', source: 'https://www.tissotwatches.com/en-us/T1424621603200.html' },
  { slug: 'breitling-navitimer-b01', source: 'https://www.breitling.com/us-en/watches/navitimer/navitimer-b01-chronograph-41/AB0139631C1/' },
  { slug: 'rolex-air-king', source: 'https://www.rolex.com/en-us/watches/air-king/m126900-0001' },
];

function decode(html) {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&#x2F;/gi, '/')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function absUrl(candidate, base) {
  if (!candidate) return '';
  const cleaned = decode(candidate.trim().replace(/^['"]|['"]$/g, ''));
  if (!cleaned || cleaned.startsWith('data:')) return '';
  try {
    return new URL(cleaned, base).href;
  } catch {
    return '';
  }
}

function pickMeta(html, attr, key) {
  const re = new RegExp(
    `<meta[^>]+${attr}=["']${key}["'][^>]+content=["']([^"']+)["']`,
    'i'
  );
  const reFlip = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+${attr}=["']${key}["']`,
    'i'
  );
  const match = html.match(re) || html.match(reFlip);
  return match ? match[1] : '';
}

function extractImageUrl(html, pageUrl) {
  const candidates = [
    pickMeta(html, 'property', 'og:image'),
    pickMeta(html, 'property', 'og:image:secure_url'),
    pickMeta(html, 'name', 'twitter:image'),
    pickMeta(html, 'name', 'twitter:image:src'),
    pickMeta(html, 'itemprop', 'image'),
  ];

  const jsonLd = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const block of jsonLd) {
    try {
      const data = JSON.parse(block[1]);
      const nodes = Array.isArray(data) ? data : data['@graph'] ? data['@graph'] : [data];
      for (const node of nodes) {
        const image = node.image;
        if (typeof image === 'string') candidates.push(image);
        else if (Array.isArray(image)) {
          for (const item of image) {
            if (typeof item === 'string') candidates.push(item);
            else if (item?.url) candidates.push(item.url);
          }
        } else if (image?.url) candidates.push(image.url);
      }
    } catch {
      // Ignore malformed JSON-LD.
    }
  }

  const shopify = html.match(/"featured_image"\s*:\s*"([^"]+)"/);
  if (shopify) candidates.push(shopify[1].replace(/\\u002F/g, '/').replace(/\\/g, ''));

  const productImg = html.match(/<img[^>]+(?:class|id)=["'][^"']*(?:product|hero|main)[^"']*["'][^>]+src=["']([^"']+)["']/i);
  if (productImg) candidates.push(productImg[1]);

  for (const raw of candidates) {
    const url = absUrl(raw, pageUrl);
    if (!url) continue;
    const pathOnly = url.split('?')[0];
    if (
      /\.(jpe?g|png|webp|avif)$/i.test(pathOnly) ||
      url.includes('/image') ||
      url.includes('cdn') ||
      url.includes('media')
    ) {
      return url;
    }
  }

  for (const raw of candidates) {
    const url = absUrl(raw, pageUrl);
    if (url) return url;
  }
  return '';
}

function curl(args) {
  return execFileSync('curl', args, {
    encoding: 'buffer',
    maxBuffer: 20 * 1024 * 1024,
    timeout: 30000,
  });
}

function fetchHtml(url) {
  const buf = curl([
    '-sL',
    '-A',
    UA,
    '-H',
    'Accept: text/html,application/xhtml+xml',
    '--max-time',
    '25',
    '--compressed',
    url,
  ]);
  return buf.toString('utf8');
}

function extensionFrom(url, bytes) {
  const clean = url.split('?')[0].toLowerCase();
  if (clean.endsWith('.png')) return '.png';
  if (clean.endsWith('.webp')) return '.webp';
  if (clean.endsWith('.avif')) return '.avif';
  if (clean.endsWith('.jpg') || clean.endsWith('.jpeg')) return '.jpg';
  if (bytes[0] === 0x89 && bytes[1] === 0x50) return '.png';
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return '.jpg';
  if (bytes[0] === 0x52 && bytes[1] === 0x49) return '.webp';
  return '.jpg';
}

function download(url, destNoExt) {
  const buf = curl([
    '-sL',
    '-A',
    UA,
    '-H',
    'Accept: image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    '--max-time',
    '25',
    url,
  ]);
  if (!buf || buf.length < 2000) {
    throw new Error(`tiny or empty download (${buf ? buf.length : 0} bytes)`);
  }
  const ext = extensionFrom(url, buf);
  const dest = destNoExt + ext;
  fs.writeFileSync(dest, buf);
  return { dest, bytes: buf.length, ext };
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const results = [];

  for (const watch of WATCHES) {
    process.stdout.write(`${watch.slug} ... `);
    try {
      const html = fetchHtml(watch.source);
      const imageUrl = extractImageUrl(html, watch.source);
      if (!imageUrl) throw new Error('no image found');
      const destNoExt = path.join(OUT_DIR, watch.slug);
      const saved = download(imageUrl, destNoExt);
      const rel = `/quiz/${path.basename(saved.dest)}`;
      console.log(`ok ${rel} (${saved.bytes} bytes) from ${imageUrl.slice(0, 90)}`);
      results.push({ slug: watch.slug, ok: true, imageUrl: rel, sourceImage: imageUrl });
    } catch (error) {
      console.log(`FAIL ${error.message}`);
      results.push({ slug: watch.slug, ok: false, error: error.message });
    }
  }

  const failed = results.filter((r) => !r.ok);
  console.log(`\nDownloaded ${results.length - failed.length}/${results.length}`);
  if (failed.length) {
    console.log('Failed:');
    for (const item of failed) console.log(`  ${item.slug}: ${item.error}`);
  }
  fs.writeFileSync(path.join(OUT_DIR, 'manifest.json'), JSON.stringify(results, null, 2));
}

main();
