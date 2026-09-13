-- Neon / Postgres schema for Regul8d Caffein8d
-- Apply with: npm run db:push  (requires DATABASE_URL)

create extension if not exists "pgcrypto";

create table if not exists watches (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  brand text not null,
  model text not null,
  year integer,
  story text,
  image_url text,
  acquired_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  body text not null default '',
  watch_id uuid references watches(id) on delete set null,
  image_url text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  category text not null default 'Other',
  name text not null,
  affiliate_url text not null,
  image_url text,
  description text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists watches_slug_idx on watches (slug);
create index if not exists reviews_slug_idx on reviews (slug);
create index if not exists reviews_published_idx on reviews (published_at desc);
create index if not exists products_category_idx on products (category, sort_order);
