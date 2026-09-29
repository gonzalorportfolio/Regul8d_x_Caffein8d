import AdminWatchForm from '@/components/admin/AdminWatchForm';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Add watch',
  description: 'Add a watch to the collection.',
  path: '/admin/watches/new',
  noIndex: true,
});

export default function AdminNewWatchPage() {
  return (
    <main id="main-content" className="admin-page">
      <h1>Add watch</h1>
      <AdminWatchForm mode="create" />
    </main>
  );
}
