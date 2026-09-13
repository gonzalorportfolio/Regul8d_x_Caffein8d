import { neon } from '@neondatabase/serverless';

/**
 * Neon SQL client for serverless / Next.js route handlers and server components.
 * Returns null when DATABASE_URL is not configured so pages can fall back gracefully.
 */
export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

export async function checkDbHealth() {
  const sql = getSql();
  if (!sql) {
    return { ok: false, configured: false, message: 'DATABASE_URL is not set' };
  }

  try {
    const rows = await sql`select 1 as ok`;
    return { ok: rows?.[0]?.ok === 1, configured: true, message: 'connected' };
  } catch (error) {
    return {
      ok: false,
      configured: true,
      message: error instanceof Error ? error.message : 'Database connection failed',
    };
  }
}

export async function listWatches() {
  const sql = getSql();
  if (!sql) return [];

  try {
    return await sql`
      select id, slug, brand, model, year, story, image_url, acquired_at, created_at
      from watches
      order by coalesce(acquired_at, created_at) desc nulls last
    `;
  } catch {
    return [];
  }
}

export async function listReviews() {
  const sql = getSql();
  if (!sql) return [];

  try {
    return await sql`
      select id, slug, title, excerpt, body, watch_id, image_url, published_at, created_at
      from reviews
      where published_at is not null
      order by published_at desc
    `;
  } catch {
    return [];
  }
}

export async function listProducts() {
  const sql = getSql();
  if (!sql) return [];

  try {
    return await sql`
      select id, category, name, affiliate_url, image_url, description, sort_order
      from products
      where is_active = true
      order by sort_order asc, name asc
    `;
  } catch {
    return [];
  }
}
