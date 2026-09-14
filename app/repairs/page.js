import { createPageMetadata } from '@/lib/seo';
import RepairsContent from './RepairsContent';

export const metadata = createPageMetadata({
  title: 'Portfolio',
  description: 'Selected projects from Gonzalo Romero / T1NKER.',
  path: '/repairs',
  noIndex: true,
});

export default function RepairsPage() {
  return <RepairsContent />;
}
