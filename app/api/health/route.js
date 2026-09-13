import { checkDbHealth } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = await checkDbHealth();

  return Response.json({
    status: 'ok',
    app: 'regul8d-caffein8d',
    runtime: 'vercel-next',
    database: db,
  });
}
