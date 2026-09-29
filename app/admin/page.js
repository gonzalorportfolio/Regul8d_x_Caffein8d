import Link from 'next/link';
import { listWatches } from '@/lib/db';
import { createPageMetadata } from '@/lib/seo';
import { heroPhoto } from '@/lib/watchFields';
import AdminLogoutButton from './LogoutButton';

export const metadata = createPageMetadata({
  title: 'Admin watches',
  description: 'Manage collection watches.',
  path: '/admin',
  noIndex: true,
});

export const dynamic = 'force-dynamic';

export default async function AdminHomePage() {
  const watches = await listWatches();

  return (
    <main id="main-content" className="admin-page">
      <div className="admin-page-header">
        <h1>Watches</h1>
        <div className="admin-page-actions">
          <Link href="/admin/watches/new" className="cta-btn">
            Add watch
          </Link>
          <AdminLogoutButton />
        </div>
      </div>

      {watches.length === 0 ? (
        <p className="admin-empty">No watches yet. Add your first piece.</p>
      ) : (
        <ul className="admin-watch-list">
          {watches.map((watch) => {
            const hero = heroPhoto(watch);
            return (
              <li key={watch.id} className="admin-watch-row">
                {hero ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={hero.url}
                    alt=""
                    className="admin-watch-thumb"
                    width={72}
                    height={72}
                  />
                ) : (
                  <div className="admin-watch-thumb admin-watch-thumb-empty" aria-hidden="true" />
                )}
                <div className="admin-watch-meta">
                  <strong>
                    {watch.brand} {watch.model}
                  </strong>
                  <span>/{watch.slug}</span>
                </div>
                <Link href={`/admin/watches/${watch.id}/edit`} className="admin-text-link">
                  Edit
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
