import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, verifyAdminSessionToken } from '@/lib/adminAuth';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === '/admin/login';
  const isAdminPage = pathname.startsWith('/admin');
  const isAdminApi = pathname.startsWith('/api/admin');

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  if (isAdminApi && pathname === '/api/admin/login') {
    return NextResponse.next();
  }

  if (isLogin) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const ok = await verifyAdminSessionToken(token);

  if (ok) {
    return NextResponse.next();
  }

  if (isAdminApi) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = '/admin/login';
  loginUrl.searchParams.set('next', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/admin/:path*'],
};
