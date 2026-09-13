#!/usr/bin/env node
/**
 * Applies db/schema.sql to the Neon database pointed at by DATABASE_URL.
 * Usage: DATABASE_URL=postgres://... npm run db:push
 */
require('dotenv').config({ path: '.env.local' });
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { neon } = require('@neondatabase/serverless');

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error('DATABASE_URL is required. Set it in .env.local or the environment.');
    process.exit(1);
  }

  const schemaPath = path.join(__dirname, '..', 'db', 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');
  const sql = neon(url);

  const statements = schema
    .split(';')
    .map((s) =>
      s
        .split('\n')
        .filter((line) => !line.trim().startsWith('--'))
        .join('\n')
        .trim()
    )
    .filter((s) => s.length > 0);

  for (const statement of statements) {
    await sql.unsafe(statement);
    console.log('OK:', statement.split('\n')[0].slice(0, 72));
  }

  console.log('Schema applied successfully.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
