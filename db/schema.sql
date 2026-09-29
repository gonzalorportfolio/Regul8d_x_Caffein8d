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
  reference text,
  style text,
  style_other text,
  case_diameter numeric,
  thickness numeric,
  lug_to_lug numeric,
  lug_width numeric,
  weight numeric,
  water_resistance numeric,
  case_material text,
  case_material_other text,
  case_material_grade text,
  case_finish text,
  case_finish_other text,
  case_shape text,
  case_shape_other text,
  case_back text,
  case_back_other text,
  case_back_fastening text,
  case_back_fastening_other text,
  crown_type text,
  crown_type_other text,
  lug_style text,
  lug_style_other text,
  dial_color text,
  crystal text,
  crystal_other text,
  crystal_notes text,
  lume text,
  lume_other text,
  lume_placement text,
  hands text,
  hands_other text,
  dial_markers text,
  dial_markers_other text,
  has_bezel boolean not null default false,
  bezel_material text,
  bezel_material_other text,
  bezel_color text,
  bezel_action text,
  bezel_action_other text,
  bezel_scale text,
  bezel_scale_other text,
  movement_type text,
  movement_type_other text,
  caliber text,
  power_reserve numeric,
  jewels integer,
  complications text[] not null default '{}',
  complications_other text,
  certifications text[] not null default '{}',
  certifications_other text,
  strap_type text,
  strap_type_other text,
  strap_material text,
  strap_color text,
  clasp_type text,
  clasp_type_other text,
  photos jsonb not null default '[]'::jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Migrate existing minimal watches tables (idempotent)
alter table watches add column if not exists reference text;
alter table watches add column if not exists style text;
alter table watches add column if not exists style_other text;
alter table watches add column if not exists case_diameter numeric;
alter table watches add column if not exists thickness numeric;
alter table watches add column if not exists lug_to_lug numeric;
alter table watches add column if not exists lug_width numeric;
alter table watches add column if not exists weight numeric;
alter table watches add column if not exists water_resistance numeric;
alter table watches add column if not exists case_material text;
alter table watches add column if not exists case_material_other text;
alter table watches add column if not exists case_material_grade text;
alter table watches add column if not exists case_finish text;
alter table watches add column if not exists case_finish_other text;
alter table watches add column if not exists case_shape text;
alter table watches add column if not exists case_shape_other text;
alter table watches add column if not exists case_back text;
alter table watches add column if not exists case_back_other text;
alter table watches add column if not exists case_back_fastening text;
alter table watches add column if not exists case_back_fastening_other text;
alter table watches add column if not exists crown_type text;
alter table watches add column if not exists crown_type_other text;
alter table watches add column if not exists lug_style text;
alter table watches add column if not exists lug_style_other text;
alter table watches add column if not exists dial_color text;
alter table watches add column if not exists crystal text;
alter table watches add column if not exists crystal_other text;
alter table watches add column if not exists crystal_notes text;
alter table watches add column if not exists lume text;
alter table watches add column if not exists lume_other text;
alter table watches add column if not exists lume_placement text;
alter table watches add column if not exists hands text;
alter table watches add column if not exists hands_other text;
alter table watches add column if not exists dial_markers text;
alter table watches add column if not exists dial_markers_other text;
alter table watches add column if not exists has_bezel boolean;
alter table watches add column if not exists bezel_material text;
alter table watches add column if not exists bezel_material_other text;
alter table watches add column if not exists bezel_color text;
alter table watches add column if not exists bezel_action text;
alter table watches add column if not exists bezel_action_other text;
alter table watches add column if not exists bezel_scale text;
alter table watches add column if not exists bezel_scale_other text;
alter table watches add column if not exists movement_type text;
alter table watches add column if not exists movement_type_other text;
alter table watches add column if not exists caliber text;
alter table watches add column if not exists power_reserve numeric;
alter table watches add column if not exists jewels integer;
alter table watches add column if not exists complications text[];
alter table watches add column if not exists complications_other text;
alter table watches add column if not exists certifications text[];
alter table watches add column if not exists certifications_other text;
alter table watches add column if not exists strap_type text;
alter table watches add column if not exists strap_type_other text;
alter table watches add column if not exists strap_material text;
alter table watches add column if not exists strap_color text;
alter table watches add column if not exists clasp_type text;
alter table watches add column if not exists clasp_type_other text;
alter table watches add column if not exists photos jsonb;
alter table watches add column if not exists notes text;

update watches
set has_bezel = false
where has_bezel is null;

update watches
set complications = '{}'
where complications is null;

update watches
set certifications = '{}'
where certifications is null;

update watches
set photos = '[]'::jsonb
where photos is null;

update watches
set photos = jsonb_build_array(jsonb_build_object('url', image_url))
where image_url is not null
  and image_url <> ''
  and photos = '[]'::jsonb;

update watches
set notes = story
where (notes is null or notes = '')
  and story is not null
  and story <> '';

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
