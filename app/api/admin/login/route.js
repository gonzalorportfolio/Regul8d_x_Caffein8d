import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  createAdminSessionToken,
  isAdminConfigured,
  verifyAdminPassword,
} from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: 'Admin is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET.' },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const password = typeof body.password === 'string' ? body.password : '';
  const ok = await verifyAdminPassword(password);
  if (!ok) {
    return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
  }

  const token = await createAdminSessionToken();
  if (!token) {
    return NextResponse.json({ error: 'Could not create session.' }, { status: 500 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, token, adminCookieOptions());
  return response;
}

export async function DELETE() {
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, '', adminCookieOptions(0));
  return NextResponse.json({ ok: true });
}
