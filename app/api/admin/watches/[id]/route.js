import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminAuth';
import { deleteWatch, getWatchById, updateWatch } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(_request, { params }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const watch = await getWatchById(id);
  if (!watch) {
    return NextResponse.json({ error: 'Watch not found.' }, { status: 404 });
  }

  return NextResponse.json({ watch });
}

export async function PUT(request, { params }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const existing = await getWatchById(id);
  const result = await updateWatch(id, body);
  if (!result.ok) {
    const status = result.error === 'Watch not found.' ? 404 : 400;
    return NextResponse.json({ error: result.error }, { status });
  }

  revalidatePath('/collection');
  revalidatePath(`/collection/${result.watch.slug}`);
  if (existing?.slug && existing.slug !== result.watch.slug) {
    revalidatePath(`/collection/${existing.slug}`);
  }
  revalidatePath('/admin');

  return NextResponse.json({ watch: result.watch });
}

export async function DELETE(_request, { params }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const existing = await getWatchById(id);
  const result = await deleteWatch(id);
  if (!result.ok) {
    const status = result.error === 'Watch not found.' ? 404 : 400;
    return NextResponse.json({ error: result.error }, { status });
  }

  revalidatePath('/collection');
  if (existing?.slug) {
    revalidatePath(`/collection/${existing.slug}`);
  }
  revalidatePath('/admin');

  return NextResponse.json({ ok: true });
}
