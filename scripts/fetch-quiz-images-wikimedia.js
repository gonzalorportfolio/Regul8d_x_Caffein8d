#!/usr/bin/env node
/**
 * Fallback downloader: pulls a representative Commons photo for watches
 * whose official product pages blocked scraping. CJS on purpose.
 */

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'public', 'quiz');
const UA = 'Regul8dCaffein8dQuiz/1.0 (https://regul8dcaffein8d.com/quiz)';

const SEARCHES = [
  { slug: 'moonswatch', q: 'Swatch MoonSwatch Mission to the Moon' },
  { slug: 'paul-newman-daytona', q: 'Rolex Daytona Paul Newman' },
  { slug: 'bulova-lunar-pilot', q: 'Bulova Lunar Pilot' },
  { slug: 'rolex-cellini', q: 'Rolex Cellini' },
  { slug: 'tank-must-de-cartier', q: 'Cartier Tank Must' },
  { slug: 'seiko-captain-willard', q: 'Seiko 6105 Willard' },
  { slug: 'seiko-turtle-srp', q: 'Seiko Turtle SRP777' },
  { slug: 'blancpain-fifty-fathoms', q: 'Blancpain Fifty Fathoms' },
  { slug: 'omega-railmaster', q: 'Omega Railmaster' },
  { slug: 'tudor-ranger', q: 'Tudor Ranger watch' },
  { slug: 'citizen-promaster-skyhawk', q: 'Citizen Promaster Skyhawk' },
  { slug: 'iwc-pilots-watch-mark-xx', q: 'IWC Pilot Mark' },
  { slug: 'benrus-military-field', q: 'Benrus military field watch' },
  { slug: 'jlc-reverso-classic', q: 'Jaeger-LeCoultre Reverso' },
  { slug: 'seiko-spb121', q: 'Seiko Alpinist SPB121' },
];

function curlJson(url) {
  const buf = execFileSync(
    'curl',
    ['-sL', '-A', UA, '--max-time', '20', url],
    { encoding: 'buffer', maxBuffer: 8 * 1024 * 1024 }
  );
  return JSON.parse(buf.toString('utf8'));
}

function download(url, dest) {
  execFileSync('curl', ['-sL', '-A', UA, '--max-time', '25', '-o', dest, url], {
    timeout: 30000,
  });
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const item of SEARCHES) {
    const existing = ['png', 'jpg', 'jpeg', 'webp'].some((ext) => {
      const p = path.join(OUT_DIR, `${item.slug}.${ext}`);
      return fs.existsSync(p) && fs.statSync(p).size > 20000;
    });
    if (existing) {
      console.log(`${item.slug}: already have a real image, skip`);
      continue;
    }
    process.stdout.write(`${item.slug} ... `);
    try {
      const search = curlJson(
        `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(item.q)}&srnamespace=6&srlimit=5&format=json`
      );
      const hits = search.query?.search || [];
      if (!hits.length) throw new Error('no commons hits');
      const title = hits[0].title;
      const info = curlJson(
        `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=1200&format=json`
      );
      const pages = Object.values(info.query.pages || {});
      const imageinfo = pages[0]?.imageinfo?.[0];
      if (!imageinfo) throw new Error('no imageinfo');
      const url = imageinfo.thumburl || imageinfo.url;
      const ext = (imageinfo.mime || '').includes('png') ? '.png' : (imageinfo.mime || '').includes('webp') ? '.webp' : '.jpg';
      const dest = path.join(OUT_DIR, item.slug + ext);
      download(url, dest);
      const size = fs.statSync(dest).size;
      if (size < 8000) throw new Error(`too small (${size})`);
      console.log(`ok ${path.basename(dest)} (${size}) from ${title}`);
    } catch (error) {
      console.log(`FAIL ${error.message}`);
    }
  }
}

main();
