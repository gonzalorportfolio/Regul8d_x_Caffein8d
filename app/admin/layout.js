import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';

export const metadata = {
  ...createPageMetadata({
    title: 'Admin',
    description: 'Collection admin for Regul8d Caffein8d.',
    path: '/admin',
    noIndex: true,
  }),
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return (
    <div className="admin-shell">
      <header className="admin-header">
        <Link href="/admin" className="admin-brand">
          Collection admin
        </Link>
        <nav className="admin-nav" aria-label="Admin">
          <Link href="/admin">Watches</Link>
          <Link href="/admin/watches/new">Add watch</Link>
          <Link href="/collection">View collection</Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
