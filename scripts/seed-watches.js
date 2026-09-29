#!/usr/bin/env node
/**
 * Seed the watches table with the initial collection.
 *
 * Usage:
 *   1. Create .env.local with your real DATABASE_URL
 *   2. Run: npm run db:seed
 *
 * Safe to re-run: uses ON CONFLICT (slug) DO NOTHING.
 */

require('dotenv').config({ path: '.env.local' });
require('dotenv').config();

const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL || DATABASE_URL.includes('user:password')) {
  console.error('Set a real DATABASE_URL in .env.local before running this script.');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

const watches = [
  {
    slug: 'ball-fireman-victory',
    brand: 'Ball',
    model: 'Fireman Victory',
    movement_type: 'Automatic',
    dial_color: 'Dark blue',
    case_material: 'Stainless steel',
    strap_type: 'Bracelet',
    strap_material: 'Stainless steel',
    style: 'Dress',
    has_bezel: false,
    photos: JSON.stringify([
      { url: '/images/watches/ball-fireman.jpg', alt: 'Ball Fireman Victory on wrist' },
    ]),
  },
  {
    slug: 'fossil-star-wars',
    brand: 'Fossil',
    model: 'Star Wars Limited Edition',
    movement_type: 'Quartz',
    dial_color: 'Blue',
    case_material: 'Stainless steel',
    case_finish: 'Polished',
    strap_type: 'Leather',
    strap_material: 'Leather',
    strap_color: 'Black',
    style: 'Casual',
    has_bezel: false,
    photos: JSON.stringify([
      { url: '/images/watches/fossil-star-wars.jpg', alt: 'Fossil Star Wars limited edition on wrist' },
    ]),
  },
  {
    slug: 'tissot-seastar-vintage',
    brand: 'Tissot',
    model: 'Seastar Automatic (Vintage)',
    movement_type: 'Automatic',
    dial_color: 'Champagne / patina',
    case_material: 'Gold',
    case_finish: 'Polished',
    strap_type: 'Leather',
    strap_material: 'Leather',
    strap_color: 'Brown',
    style: 'Dress',
    has_bezel: false,
    crystal: 'Acrylic (Hesalite)',
    photos: JSON.stringify([
      { url: '/images/watches/tissot-vintage.jpg', alt: 'Vintage Tissot Seastar automatic on wrist' },
    ]),
  },
  {
    slug: 'pagani-design-explorer-ii',
    brand: 'Pagani Design',
    model: 'Explorer II Homage',
    movement_type: 'Automatic',
    dial_color: 'White',
    case_material: 'Stainless steel',
    strap_type: 'Bracelet',
    strap_material: 'Stainless steel',
    style: 'GMT',
    has_bezel: true,
    bezel_scale: '24-hour / GMT',
    bezel_action: 'Fixed',
    bezel_material: 'Steel',
    photos: JSON.stringify([
      { url: '/images/watches/pagani-design-explorer.jpg', alt: 'Pagani Design Explorer II homage on wrist' },
    ]),
  },
  {
    slug: 'casio-g-shock-dw5600',
    brand: 'Casio',
    model: 'G-Shock DW-5600BB',
    movement_type: 'Quartz',
    dial_color: 'Black',
    case_material: 'Other',
    case_material_other: 'Resin',
    case_shape: 'Square',
    strap_type: 'Other',
    strap_type_other: 'Resin',
    strap_material: 'Resin',
    strap_color: 'Black',
    style: 'Sport',
    has_bezel: false,
    water_resistance: 200,
    photos: JSON.stringify([
      { url: '/images/watches/casio-g-shock-dw5600.jpg', alt: 'Casio G-Shock DW-5600BB all black on wrist' },
    ]),
  },
  {
    slug: 'hamilton-khaki-field-auto',
    brand: 'Hamilton',
    model: 'Khaki Field Automatic',
    movement_type: 'Automatic',
    dial_color: 'Black',
    case_material: 'Stainless steel',
    case_finish: 'Brushed',
    strap_type: 'Leather',
    strap_material: 'Leather',
    strap_color: 'Brown',
    style: 'Field',
    has_bezel: false,
    dial_markers: 'Arabic numerals',
    photos: JSON.stringify([
      { url: '/images/watches/hamilton-khaki-field.jpg', alt: 'Hamilton Khaki Field Automatic on wrist' },
    ]),
  },
];

async function seed() {
  console.log('Seeding watches...\n');

  for (const w of watches) {
    try {
      const rows = await sql`
        insert into watches (
          slug, brand, model, movement_type, dial_color,
          case_material, case_material_other, case_finish,
          case_shape, strap_type, strap_type_other, strap_material,
          strap_color, style, has_bezel,
          bezel_scale, bezel_action, bezel_material,
          crystal, water_resistance, dial_markers,
          photos
        ) values (
          ${w.slug}, ${w.brand}, ${w.model}, ${w.movement_type || null}, ${w.dial_color || null},
          ${w.case_material || null}, ${w.case_material_other || null}, ${w.case_finish || null},
          ${w.case_shape || null}, ${w.strap_type || null}, ${w.strap_type_other || null}, ${w.strap_material || null},
          ${w.strap_color || null}, ${w.style || null}, ${w.has_bezel || false},
          ${w.bezel_scale || null}, ${w.bezel_action || null}, ${w.bezel_material || null},
          ${w.crystal || null}, ${w.water_resistance || null}, ${w.dial_markers || null},
          ${w.photos}::jsonb
        )
        on conflict (slug) do nothing
        returning slug
      `;

      if (rows.length) {
        console.log('  + ' + w.brand + ' ' + w.model + ' (' + w.slug + ')');
      } else {
        console.log('  = ' + w.brand + ' ' + w.model + ' already exists, skipped');
      }
    } catch (err) {
      console.error('  ! ' + w.brand + ' ' + w.model + ' failed:', err.message);
    }
  }

  console.log('\nDone.');
}

seed();
