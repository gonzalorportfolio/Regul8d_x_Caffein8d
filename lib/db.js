import { neon } from '@neondatabase/serverless';
import {
  normalizePhotos,
  rowToWatch,
  slugify,
} from '@/lib/watchFields';

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

function emptyToNull(value) {
  if (value === undefined || value === null) return null;
  if (typeof value === 'string' && value.trim() === '') return null;
  return value;
}

function toNumberOrNull(value) {
  if (value === undefined || value === null || value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function toIntOrNull(value) {
  const n = toNumberOrNull(value);
  return n == null ? null : Math.round(n);
}

function toStringArray(value) {
  if (!Array.isArray(value)) return [];
  return value.filter((v) => typeof v === 'string' && v.trim()).map((v) => v.trim());
}

/** Normalize inbound watch payload from admin form / API. */
export function normalizeWatchInput(input = {}) {
  const brand = String(input.brand || '').trim();
  const model = String(input.model || '').trim();
  let slug = String(input.slug || '').trim();
  if (!slug && brand && model) slug = slugify(brand, model);

  const photos = normalizePhotos(input.photos);

  return {
    slug,
    brand,
    model,
    year: toIntOrNull(input.year),
    reference: emptyToNull(input.reference),
    style: emptyToNull(input.style),
    styleOther: emptyToNull(input.styleOther),
    caseDiameter: toNumberOrNull(input.caseDiameter),
    thickness: toNumberOrNull(input.thickness),
    lugToLug: toNumberOrNull(input.lugToLug),
    lugWidth: toNumberOrNull(input.lugWidth),
    weight: toNumberOrNull(input.weight),
    waterResistance: toNumberOrNull(input.waterResistance),
    caseMaterial: emptyToNull(input.caseMaterial),
    caseMaterialOther: emptyToNull(input.caseMaterialOther),
    caseMaterialGrade: emptyToNull(input.caseMaterialGrade),
    caseFinish: emptyToNull(input.caseFinish),
    caseFinishOther: emptyToNull(input.caseFinishOther),
    caseShape: emptyToNull(input.caseShape),
    caseShapeOther: emptyToNull(input.caseShapeOther),
    caseBack: emptyToNull(input.caseBack),
    caseBackOther: emptyToNull(input.caseBackOther),
    caseBackFastening: emptyToNull(input.caseBackFastening),
    caseBackFasteningOther: emptyToNull(input.caseBackFasteningOther),
    crownType: emptyToNull(input.crownType),
    crownTypeOther: emptyToNull(input.crownTypeOther),
    lugStyle: emptyToNull(input.lugStyle),
    lugStyleOther: emptyToNull(input.lugStyleOther),
    dialColor: emptyToNull(input.dialColor),
    crystal: emptyToNull(input.crystal),
    crystalOther: emptyToNull(input.crystalOther),
    crystalNotes: emptyToNull(input.crystalNotes),
    lume: emptyToNull(input.lume),
    lumeOther: emptyToNull(input.lumeOther),
    lumePlacement: emptyToNull(input.lumePlacement),
    hands: emptyToNull(input.hands),
    handsOther: emptyToNull(input.handsOther),
    dialMarkers: emptyToNull(input.dialMarkers),
    dialMarkersOther: emptyToNull(input.dialMarkersOther),
    hasBezel: Boolean(input.hasBezel),
    bezelMaterial: emptyToNull(input.bezelMaterial),
    bezelMaterialOther: emptyToNull(input.bezelMaterialOther),
    bezelColor: emptyToNull(input.bezelColor),
    bezelAction: emptyToNull(input.bezelAction),
    bezelActionOther: emptyToNull(input.bezelActionOther),
    bezelScale: emptyToNull(input.bezelScale),
    bezelScaleOther: emptyToNull(input.bezelScaleOther),
    movementType: emptyToNull(input.movementType),
    movementTypeOther: emptyToNull(input.movementTypeOther),
    caliber: emptyToNull(input.caliber),
    powerReserve: toNumberOrNull(input.powerReserve),
    jewels: toIntOrNull(input.jewels),
    complications: toStringArray(input.complications),
    complicationsOther: emptyToNull(input.complicationsOther),
    certifications: toStringArray(input.certifications),
    certificationsOther: emptyToNull(input.certificationsOther),
    strapType: emptyToNull(input.strapType),
    strapTypeOther: emptyToNull(input.strapTypeOther),
    strapMaterial: emptyToNull(input.strapMaterial),
    strapColor: emptyToNull(input.strapColor),
    claspType: emptyToNull(input.claspType),
    claspTypeOther: emptyToNull(input.claspTypeOther),
    photos,
    notes: emptyToNull(input.notes),
    acquiredAt: emptyToNull(input.acquiredAt),
  };
}

export function validateWatchInput(data) {
  const errors = [];
  if (!data.brand) errors.push('Brand is required.');
  if (!data.model) errors.push('Collection / model name is required.');
  if (!data.slug) errors.push('Slug could not be generated.');
  if (!data.photos.length) errors.push('At least one photo is required.');
  return errors;
}

export async function listWatches() {
  const sql = getSql();
  if (!sql) return [];

  try {
    const rows = await sql`
      select *
      from watches
      order by coalesce(acquired_at, created_at) desc nulls last
    `;
    return rows.map(rowToWatch);
  } catch {
    return [];
  }
}

export async function listWatchSlugs() {
  const sql = getSql();
  if (!sql) return [];

  try {
    return await sql`
      select slug, updated_at
      from watches
      order by coalesce(acquired_at, created_at) desc nulls last
    `;
  } catch {
    return [];
  }
}

export async function getWatchBySlug(slug) {
  const sql = getSql();
  if (!sql || !slug) return null;

  try {
    const rows = await sql`
      select *
      from watches
      where slug = ${slug}
      limit 1
    `;
    return rowToWatch(rows[0]);
  } catch {
    return null;
  }
}

export async function getWatchById(id) {
  const sql = getSql();
  if (!sql || !id) return null;

  try {
    const rows = await sql`
      select *
      from watches
      where id = ${id}
      limit 1
    `;
    return rowToWatch(rows[0]);
  } catch {
    return null;
  }
}

async function ensureUniqueSlug(sql, baseSlug, excludeId = null) {
  let candidate = baseSlug;
  let n = 2;
  while (true) {
    const rows = excludeId
      ? await sql`
          select id from watches
          where slug = ${candidate} and id <> ${excludeId}
          limit 1
        `
      : await sql`
          select id from watches
          where slug = ${candidate}
          limit 1
        `;
    if (!rows.length) return candidate;
    candidate = `${baseSlug}-${n}`;
    n += 1;
  }
}

export async function createWatch(input) {
  const sql = getSql();
  if (!sql) {
    return { ok: false, error: 'Database is not configured.' };
  }

  const data = normalizeWatchInput(input);
  const errors = validateWatchInput(data);
  if (errors.length) {
    return { ok: false, error: errors.join(' ') };
  }

  try {
    data.slug = await ensureUniqueSlug(sql, data.slug);
    const photosJson = JSON.stringify(data.photos);

    const rows = await sql`
      insert into watches (
        slug, brand, model, year, reference, style, style_other,
        case_diameter, thickness, lug_to_lug, lug_width, weight, water_resistance,
        case_material, case_material_other, case_material_grade,
        case_finish, case_finish_other,
        case_shape, case_shape_other,
        case_back, case_back_other,
        case_back_fastening, case_back_fastening_other,
        crown_type, crown_type_other,
        lug_style, lug_style_other,
        dial_color, crystal, crystal_other, crystal_notes,
        lume, lume_other, lume_placement,
        hands, hands_other,
        dial_markers, dial_markers_other,
        has_bezel,
        bezel_material, bezel_material_other, bezel_color,
        bezel_action, bezel_action_other,
        bezel_scale, bezel_scale_other,
        movement_type, movement_type_other,
        caliber, power_reserve, jewels,
        complications, complications_other,
        certifications, certifications_other,
        strap_type, strap_type_other, strap_material, strap_color,
        clasp_type, clasp_type_other,
        photos, notes, acquired_at,
        updated_at
      ) values (
        ${data.slug}, ${data.brand}, ${data.model}, ${data.year},
        ${data.reference}, ${data.style}, ${data.styleOther},
        ${data.caseDiameter}, ${data.thickness}, ${data.lugToLug}, ${data.lugWidth},
        ${data.weight}, ${data.waterResistance},
        ${data.caseMaterial}, ${data.caseMaterialOther}, ${data.caseMaterialGrade},
        ${data.caseFinish}, ${data.caseFinishOther},
        ${data.caseShape}, ${data.caseShapeOther},
        ${data.caseBack}, ${data.caseBackOther},
        ${data.caseBackFastening}, ${data.caseBackFasteningOther},
        ${data.crownType}, ${data.crownTypeOther},
        ${data.lugStyle}, ${data.lugStyleOther},
        ${data.dialColor}, ${data.crystal}, ${data.crystalOther}, ${data.crystalNotes},
        ${data.lume}, ${data.lumeOther}, ${data.lumePlacement},
        ${data.hands}, ${data.handsOther},
        ${data.dialMarkers}, ${data.dialMarkersOther},
        ${data.hasBezel},
        ${data.bezelMaterial}, ${data.bezelMaterialOther}, ${data.bezelColor},
        ${data.bezelAction}, ${data.bezelActionOther},
        ${data.bezelScale}, ${data.bezelScaleOther},
        ${data.movementType}, ${data.movementTypeOther},
        ${data.caliber}, ${data.powerReserve}, ${data.jewels},
        ${data.complications}, ${data.complicationsOther},
        ${data.certifications}, ${data.certificationsOther},
        ${data.strapType}, ${data.strapTypeOther}, ${data.strapMaterial}, ${data.strapColor},
        ${data.claspType}, ${data.claspTypeOther},
        ${photosJson}::jsonb, ${data.notes}, ${data.acquiredAt},
        now()
      )
      returning *
    `;

    return { ok: true, watch: rowToWatch(rows[0]) };
  } catch (error) {
    console.error('createWatch failed', error);
    return { ok: false, error: 'Could not create watch.' };
  }
}

export async function updateWatch(id, input) {
  const sql = getSql();
  if (!sql) {
    return { ok: false, error: 'Database is not configured.' };
  }
  if (!id) {
    return { ok: false, error: 'Watch id is required.' };
  }

  const data = normalizeWatchInput(input);
  const errors = validateWatchInput(data);
  if (errors.length) {
    return { ok: false, error: errors.join(' ') };
  }

  try {
    data.slug = await ensureUniqueSlug(sql, data.slug, id);
    const photosJson = JSON.stringify(data.photos);

    const rows = await sql`
      update watches set
        slug = ${data.slug},
        brand = ${data.brand},
        model = ${data.model},
        year = ${data.year},
        reference = ${data.reference},
        style = ${data.style},
        style_other = ${data.styleOther},
        case_diameter = ${data.caseDiameter},
        thickness = ${data.thickness},
        lug_to_lug = ${data.lugToLug},
        lug_width = ${data.lugWidth},
        weight = ${data.weight},
        water_resistance = ${data.waterResistance},
        case_material = ${data.caseMaterial},
        case_material_other = ${data.caseMaterialOther},
        case_material_grade = ${data.caseMaterialGrade},
        case_finish = ${data.caseFinish},
        case_finish_other = ${data.caseFinishOther},
        case_shape = ${data.caseShape},
        case_shape_other = ${data.caseShapeOther},
        case_back = ${data.caseBack},
        case_back_other = ${data.caseBackOther},
        case_back_fastening = ${data.caseBackFastening},
        case_back_fastening_other = ${data.caseBackFasteningOther},
        crown_type = ${data.crownType},
        crown_type_other = ${data.crownTypeOther},
        lug_style = ${data.lugStyle},
        lug_style_other = ${data.lugStyleOther},
        dial_color = ${data.dialColor},
        crystal = ${data.crystal},
        crystal_other = ${data.crystalOther},
        crystal_notes = ${data.crystalNotes},
        lume = ${data.lume},
        lume_other = ${data.lumeOther},
        lume_placement = ${data.lumePlacement},
        hands = ${data.hands},
        hands_other = ${data.handsOther},
        dial_markers = ${data.dialMarkers},
        dial_markers_other = ${data.dialMarkersOther},
        has_bezel = ${data.hasBezel},
        bezel_material = ${data.bezelMaterial},
        bezel_material_other = ${data.bezelMaterialOther},
        bezel_color = ${data.bezelColor},
        bezel_action = ${data.bezelAction},
        bezel_action_other = ${data.bezelActionOther},
        bezel_scale = ${data.bezelScale},
        bezel_scale_other = ${data.bezelScaleOther},
        movement_type = ${data.movementType},
        movement_type_other = ${data.movementTypeOther},
        caliber = ${data.caliber},
        power_reserve = ${data.powerReserve},
        jewels = ${data.jewels},
        complications = ${data.complications},
        complications_other = ${data.complicationsOther},
        certifications = ${data.certifications},
        certifications_other = ${data.certificationsOther},
        strap_type = ${data.strapType},
        strap_type_other = ${data.strapTypeOther},
        strap_material = ${data.strapMaterial},
        strap_color = ${data.strapColor},
        clasp_type = ${data.claspType},
        clasp_type_other = ${data.claspTypeOther},
        photos = ${photosJson}::jsonb,
        notes = ${data.notes},
        acquired_at = ${data.acquiredAt},
        updated_at = now()
      where id = ${id}
      returning *
    `;

    if (!rows.length) {
      return { ok: false, error: 'Watch not found.' };
    }

    return { ok: true, watch: rowToWatch(rows[0]) };
  } catch (error) {
    console.error('updateWatch failed', error);
    return { ok: false, error: 'Could not update watch.' };
  }
}

export async function deleteWatch(id) {
  const sql = getSql();
  if (!sql) {
    return { ok: false, error: 'Database is not configured.' };
  }
  if (!id) {
    return { ok: false, error: 'Watch id is required.' };
  }

  try {
    const rows = await sql`
      delete from watches
      where id = ${id}
      returning id
    `;
    if (!rows.length) {
      return { ok: false, error: 'Watch not found.' };
    }
    return { ok: true };
  } catch (error) {
    console.error('deleteWatch failed', error);
    return { ok: false, error: 'Could not delete watch.' };
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
