import { notFound } from 'next/navigation';
import AdminWatchForm from '@/components/admin/AdminWatchForm';
import { getWatchById } from '@/lib/db';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Edit watch',
  description: 'Edit a collection watch.',
  path: '/admin/watches',
  noIndex: true,
});

export const dynamic = 'force-dynamic';

export default async function AdminEditWatchPage({ params }) {
  const { id } = await params;
  const watch = await getWatchById(id);
  if (!watch) notFound();

  return (
    <main id="main-content" className="admin-page">
      <h1>
        Edit {watch.brand} {watch.model}
      </h1>
      <AdminWatchForm mode="edit" initialWatch={watch} />
    </main>
  );
}
