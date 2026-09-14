import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';

export default function manifest() {
  return {
    name: SITE_NAME,
    short_name: 'T1NKER',
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#1C0A05',
    theme_color: '#1C0A05',
    lang: 'en',
    icons: [
      {
        src: 'https://fav.farm/%F0%9F%95%91',
        sizes: 'any',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
