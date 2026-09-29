import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { isAdminAuthenticated, isAdminConfigured } from '@/lib/adminAuth';
import { createPageMetadata } from '@/lib/seo';
import AdminLoginForm from './LoginForm';

export const metadata = createPageMetadata({
  title: 'Admin login',
  description: 'Sign in to manage the watch collection.',
  path: '/admin/login',
  noIndex: true,
});

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect('/admin');
  }

  return (
    <main id="main-content" className="admin-page">
      <h1>Admin login</h1>
      {!isAdminConfigured() ? (
        <p className="admin-error" role="alert">
          Admin is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET in
          the environment.
        </p>
      ) : (
        <Suspense fallback={<p>Loading login form…</p>}>
          <AdminLoginForm />
        </Suspense>
      )}
    </main>
  );
}
