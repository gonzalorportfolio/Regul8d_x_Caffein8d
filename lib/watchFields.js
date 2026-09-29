/**
 * Watch collection field definitions: options, labels, silhouette keys.
 * Single source for admin form and public display.
 */

export const STYLE_OPTIONS = [
  'Dive',
  'Field',
  'Dress',
  'Pilot',
  'GMT',
  'Chronograph',
  'Racing',
  'Sport',
  'Casual',
  'Other',
];

export const CASE_MATERIAL_OPTIONS = [
  'Stainless steel',
  'Titanium',
  'Bronze',
  'Gold',
  'Ceramic',
  'Carbon',
  'Other',
];

export const CASE_FINISH_OPTIONS = [
  'Polished',
  'Brushed',
  'Mixed',
  'Bead-blasted / Matte',
  'Other',
];

export const CASE_SHAPE_OPTIONS = [
  'Round',
  'Cushion',
  'Tonneau',
  'Square',
  'Rectangular',
  'Oval',
  'Octagonal',
  'Asymmetrical',
  'Other',
];

export const CASE_BACK_OPTIONS = ['Solid', 'Exhibition', 'Other'];

export const CASE_BACK_FASTENING_OPTIONS = [
  'Screw-down',
  'Snap-on',
  'Bayonet',
  'Other',
];

export const CROWN_TYPE_OPTIONS = [
  'Push-pull',
  'Screw-down',
  'Screw-down with guards',
  'Recessed',
  'Onion',
  'Other',
];

export const LUG_STYLE_OPTIONS = [
  'Straight',
  'Curved',
  'Hooded',
  'Drilled',
  'Articulated',
  'Integrated (no lugs)',
  'Other',
];

export const CRYSTAL_OPTIONS = [
  'Sapphire',
  'Mineral',
  'Acrylic (Hesalite)',
  'Other',
];

export const LUME_OPTIONS = [
  'Super-LumiNova',
  'LumiBrite',
  'Tritium',
  'None',
  'Other',
];

export const HANDS_OPTIONS = [
  'Sword',
  'Dauphine',
  'Baton',
  'Leaf',
  'Cathedral',
  'Mercedes',
  'Snowflake',
  'Alpha',
  'Breguet',
  'Pencil',
  'Syringe',
  'Arrow',
  'Other',
];

export const DIAL_MARKERS_OPTIONS = [
  'Baton',
  'Stick',
  'Dot / Round',
  'Arabic numerals',
  'Roman numerals',
  'Dagger',
  'Triangle / Arrow',
  'Mixed',
  'None',
  'Other',
];

export const BEZEL_MATERIAL_OPTIONS = [
  'Steel',
  'Ceramic',
  'Aluminum',
  'Sapphire',
  'Other',
];

export const BEZEL_ACTION_OPTIONS = [
  'Fixed',
  'Unidirectional',
  'Bidirectional',
  'Other',
];

export const BEZEL_SCALE_OPTIONS = [
  'Plain',
  'Minutes (dive)',
  '24-hour / GMT',
  'Tachymeter',
  'Countdown',
  'Other',
];

export const MOVEMENT_TYPE_OPTIONS = [
  'Automatic',
  'Manual-winding',
  'Quartz',
  'Solar',
  'Spring Drive',
  'Kinetic',
  'Other',
];

export const COMPLICATION_OPTIONS = [
  'Date',
  'Day-date',
  'GMT / dual time',
  'Chronograph',
  'Moon phase',
  'Power reserve indicator',
  'Other',
];

export const CERTIFICATION_OPTIONS = [
  'Chronometer',
  'Master Chronometer',
  'Anti-magnetic',
  'Other',
];

export const STRAP_TYPE_OPTIONS = [
  'Bracelet',
  'Leather',
  'Rubber',
  'Nylon / NATO',
  'Canvas',
  'Other',
];

export const CLASP_TYPE_OPTIONS = [
  'Folding clasp',
  'Deployant',
  'Pin buckle',
  'Butterfly',
  'Other',
];

/** Silhouette folder name per field key (camelCase form keys). */
export const SILHOUETTE_FOLDERS = {
  caseShape: 'case-shape',
  caseBack: 'case-back',
  crownType: 'crown-type',
  lugStyle: 'lug-style',
  hands: 'hands',
  dialMarkers: 'dial-markers',
  bezelScale: 'bezel-scale',
};

/**
 * Filename rule from the collection plan:
 * lowercase, replace spaces/slashes/parentheses with hyphens, collapse, trim.
 */
export function optionToFilename(label) {
  if (!label || label === 'Other') return 'other';
  return label
    .toLowerCase()
    .replace(/[()/]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function silhouettePath(fieldKey, optionLabel) {
  if (!optionLabel || optionLabel === 'Other') {
    return '/silhouettes/other.svg';
  }
  const folder = SILHOUETTE_FOLDERS[fieldKey];
  if (!folder) return '/silhouettes/other.svg';
  return `/silhouettes/${folder}/${optionToFilename(optionLabel)}.svg`;
}

/** Display value: prefer *Other custom text when selection is Other. */
export function displaySelectValue(value, otherValue) {
  if (!value) return null;
  if (value === 'Other' && otherValue) return otherValue;
  if (value === 'Other') return null;
  return value;
}

export function formatMm(value) {
  if (value == null || value === '') return null;
  return `${value} mm`;
}

export function formatGrams(value) {
  if (value == null || value === '') return null;
  return `${value} g`;
}

export function formatHours(value) {
  if (value == null || value === '') return null;
  return `${value} hours`;
}

/** Water resistance: meters stored, show feet alongside. */
export function formatWaterResistance(meters) {
  if (meters == null || meters === '') return null;
  const ft = Math.round(Number(meters) * 3.281);
  return `${meters} m / ${ft} ft`;
}

export function slugify(brand, model) {
  const base = `${brand || ''}-${model || ''}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return base || 'watch';
}

/**
 * Form / API field map: camelCase keys used in JS ↔ snake_case DB columns.
 */
export const WATCH_COLUMN_MAP = {
  slug: 'slug',
  brand: 'brand',
  model: 'model',
  year: 'year',
  reference: 'reference',
  style: 'style',
  styleOther: 'style_other',
  caseDiameter: 'case_diameter',
  thickness: 'thickness',
  lugToLug: 'lug_to_lug',
  lugWidth: 'lug_width',
  weight: 'weight',
  waterResistance: 'water_resistance',
  caseMaterial: 'case_material',
  caseMaterialOther: 'case_material_other',
  caseMaterialGrade: 'case_material_grade',
  caseFinish: 'case_finish',
  caseFinishOther: 'case_finish_other',
  caseShape: 'case_shape',
  caseShapeOther: 'case_shape_other',
  caseBack: 'case_back',
  caseBackOther: 'case_back_other',
  caseBackFastening: 'case_back_fastening',
  caseBackFasteningOther: 'case_back_fastening_other',
  crownType: 'crown_type',
  crownTypeOther: 'crown_type_other',
  lugStyle: 'lug_style',
  lugStyleOther: 'lug_style_other',
  dialColor: 'dial_color',
  crystal: 'crystal',
  crystalOther: 'crystal_other',
  crystalNotes: 'crystal_notes',
  lume: 'lume',
  lumeOther: 'lume_other',
  lumePlacement: 'lume_placement',
  hands: 'hands',
  handsOther: 'hands_other',
  dialMarkers: 'dial_markers',
  dialMarkersOther: 'dial_markers_other',
  hasBezel: 'has_bezel',
  bezelMaterial: 'bezel_material',
  bezelMaterialOther: 'bezel_material_other',
  bezelColor: 'bezel_color',
  bezelAction: 'bezel_action',
  bezelActionOther: 'bezel_action_other',
  bezelScale: 'bezel_scale',
  bezelScaleOther: 'bezel_scale_other',
  movementType: 'movement_type',
  movementTypeOther: 'movement_type_other',
  caliber: 'caliber',
  powerReserve: 'power_reserve',
  jewels: 'jewels',
  complications: 'complications',
  complicationsOther: 'complications_other',
  certifications: 'certifications',
  certificationsOther: 'certifications_other',
  strapType: 'strap_type',
  strapTypeOther: 'strap_type_other',
  strapMaterial: 'strap_material',
  strapColor: 'strap_color',
  claspType: 'clasp_type',
  claspTypeOther: 'clasp_type_other',
  photos: 'photos',
  notes: 'notes',
  acquiredAt: 'acquired_at',
};

export function rowToWatch(row) {
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    brand: row.brand,
    model: row.model,
    year: row.year,
    reference: row.reference,
    style: row.style,
    styleOther: row.style_other,
    caseDiameter: row.case_diameter != null ? Number(row.case_diameter) : null,
    thickness: row.thickness != null ? Number(row.thickness) : null,
    lugToLug: row.lug_to_lug != null ? Number(row.lug_to_lug) : null,
    lugWidth: row.lug_width != null ? Number(row.lug_width) : null,
    weight: row.weight != null ? Number(row.weight) : null,
    waterResistance:
      row.water_resistance != null ? Number(row.water_resistance) : null,
    caseMaterial: row.case_material,
    caseMaterialOther: row.case_material_other,
    caseMaterialGrade: row.case_material_grade,
    caseFinish: row.case_finish,
    caseFinishOther: row.case_finish_other,
    caseShape: row.case_shape,
    caseShapeOther: row.case_shape_other,
    caseBack: row.case_back,
    caseBackOther: row.case_back_other,
    caseBackFastening: row.case_back_fastening,
    caseBackFasteningOther: row.case_back_fastening_other,
    crownType: row.crown_type,
    crownTypeOther: row.crown_type_other,
    lugStyle: row.lug_style,
    lugStyleOther: row.lug_style_other,
    dialColor: row.dial_color,
    crystal: row.crystal,
    crystalOther: row.crystal_other,
    crystalNotes: row.crystal_notes,
    lume: row.lume,
    lumeOther: row.lume_other,
    lumePlacement: row.lume_placement,
    hands: row.hands,
    handsOther: row.hands_other,
    dialMarkers: row.dial_markers,
    dialMarkersOther: row.dial_markers_other,
    hasBezel: Boolean(row.has_bezel),
    bezelMaterial: row.bezel_material,
    bezelMaterialOther: row.bezel_material_other,
    bezelColor: row.bezel_color,
    bezelAction: row.bezel_action,
    bezelActionOther: row.bezel_action_other,
    bezelScale: row.bezel_scale,
    bezelScaleOther: row.bezel_scale_other,
    movementType: row.movement_type,
    movementTypeOther: row.movement_type_other,
    caliber: row.caliber,
    powerReserve: row.power_reserve != null ? Number(row.power_reserve) : null,
    jewels: row.jewels != null ? Number(row.jewels) : null,
    complications: row.complications || [],
    complicationsOther: row.complications_other,
    certifications: row.certifications || [],
    certificationsOther: row.certifications_other,
    strapType: row.strap_type,
    strapTypeOther: row.strap_type_other,
    strapMaterial: row.strap_material,
    strapColor: row.strap_color,
    claspType: row.clasp_type,
    claspTypeOther: row.clasp_type_other,
    photos: normalizePhotos(row.photos),
    notes: row.notes || row.story || '',
    acquiredAt: row.acquired_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function normalizePhotos(photos) {
  if (!photos) return [];
  let parsed = photos;
  if (typeof photos === 'string') {
    try {
      parsed = JSON.parse(photos);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(parsed)) return [];
  return parsed
    .filter((p) => p && typeof p.url === 'string' && p.url.trim())
    .map((p) => ({
      url: p.url.trim(),
      alt: typeof p.alt === 'string' ? p.alt.trim() : '',
    }));
}

export function heroPhoto(watch) {
  const photos = watch?.photos || [];
  return photos[0] || null;
}

/** Attribute groups for detail display. */
export const DISPLAY_GROUPS = [
  {
    id: 'identity',
    title: 'Identity',
    fields: [
      { key: 'brand', label: 'Brand' },
      { key: 'model', label: 'Collection / Model' },
      { key: 'reference', label: 'Reference' },
      { key: 'style', label: 'Style', otherKey: 'styleOther' },
      { key: 'year', label: 'Year' },
    ],
  },
  {
    id: 'case',
    title: 'Case',
    fields: [
      { key: 'caseDiameter', label: 'Case diameter', format: formatMm },
      { key: 'thickness', label: 'Thickness', format: formatMm },
      { key: 'lugToLug', label: 'Lug-to-lug', format: formatMm },
      { key: 'lugWidth', label: 'Lug width', format: formatMm },
      { key: 'weight', label: 'Weight', format: formatGrams },
      {
        key: 'waterResistance',
        label: 'Water resistance',
        format: formatWaterResistance,
      },
      { key: 'caseMaterial', label: 'Case material', otherKey: 'caseMaterialOther' },
      { key: 'caseMaterialGrade', label: 'Case material grade' },
      { key: 'caseFinish', label: 'Case finish', otherKey: 'caseFinishOther' },
      {
        key: 'caseShape',
        label: 'Case shape',
        otherKey: 'caseShapeOther',
        silhouette: true,
      },
      {
        key: 'caseBack',
        label: 'Case back',
        otherKey: 'caseBackOther',
        silhouette: true,
      },
      {
        key: 'caseBackFastening',
        label: 'Case back fastening',
        otherKey: 'caseBackFasteningOther',
      },
      {
        key: 'crownType',
        label: 'Crown type',
        otherKey: 'crownTypeOther',
        silhouette: true,
      },
      {
        key: 'lugStyle',
        label: 'Lug style',
        otherKey: 'lugStyleOther',
        silhouette: true,
      },
    ],
  },
  {
    id: 'dial',
    title: 'Dial and crystal',
    fields: [
      { key: 'dialColor', label: 'Dial color' },
      { key: 'crystal', label: 'Crystal', otherKey: 'crystalOther' },
      { key: 'crystalNotes', label: 'Crystal notes' },
      { key: 'lume', label: 'Lume', otherKey: 'lumeOther' },
      { key: 'lumePlacement', label: 'Lume placement' },
      { key: 'hands', label: 'Hands', otherKey: 'handsOther', silhouette: true },
      {
        key: 'dialMarkers',
        label: 'Dial markers',
        otherKey: 'dialMarkersOther',
        silhouette: true,
      },
    ],
  },
  {
    id: 'bezel',
    title: 'Bezel',
    requiresBezel: true,
    fields: [
      {
        key: 'bezelMaterial',
        label: 'Bezel material',
        otherKey: 'bezelMaterialOther',
      },
      { key: 'bezelColor', label: 'Bezel color' },
      {
        key: 'bezelAction',
        label: 'Bezel action',
        otherKey: 'bezelActionOther',
      },
      {
        key: 'bezelScale',
        label: 'Bezel scale',
        otherKey: 'bezelScaleOther',
        silhouette: true,
      },
    ],
  },
  {
    id: 'movement',
    title: 'Movement',
    fields: [
      {
        key: 'movementType',
        label: 'Movement type',
        otherKey: 'movementTypeOther',
      },
      { key: 'caliber', label: 'Caliber' },
      { key: 'powerReserve', label: 'Power reserve', format: formatHours },
      { key: 'jewels', label: 'Jewels' },
    ],
  },
  {
    id: 'features',
    title: 'Features',
    fields: [
      {
        key: 'complications',
        label: 'Complications',
        otherKey: 'complicationsOther',
        multiselect: true,
      },
      {
        key: 'certifications',
        label: 'Certifications',
        otherKey: 'certificationsOther',
        multiselect: true,
      },
    ],
  },
  {
    id: 'strap',
    title: 'Strap / bracelet',
    fields: [
      { key: 'strapType', label: 'Strap type', otherKey: 'strapTypeOther' },
      { key: 'strapMaterial', label: 'Strap material' },
      { key: 'strapColor', label: 'Strap color' },
      { key: 'claspType', label: 'Clasp / buckle', otherKey: 'claspTypeOther' },
    ],
  },
];
