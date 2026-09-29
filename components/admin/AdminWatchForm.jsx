'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  MultiSelectWithOther,
  NumberField,
  SelectWithOther,
  SilhouetteSelect,
  TextField,
} from '@/components/admin/FormFields';
import PhotoManager from '@/components/admin/PhotoManager';
import {
  BEZEL_ACTION_OPTIONS,
  BEZEL_MATERIAL_OPTIONS,
  BEZEL_SCALE_OPTIONS,
  CASE_BACK_FASTENING_OPTIONS,
  CASE_BACK_OPTIONS,
  CASE_FINISH_OPTIONS,
  CASE_MATERIAL_OPTIONS,
  CASE_SHAPE_OPTIONS,
  CERTIFICATION_OPTIONS,
  CLASP_TYPE_OPTIONS,
  COMPLICATION_OPTIONS,
  CROWN_TYPE_OPTIONS,
  CRYSTAL_OPTIONS,
  DIAL_MARKERS_OPTIONS,
  HANDS_OPTIONS,
  LUG_STYLE_OPTIONS,
  LUME_OPTIONS,
  MOVEMENT_TYPE_OPTIONS,
  STRAP_TYPE_OPTIONS,
  STYLE_OPTIONS,
  slugify,
} from '@/lib/watchFields';

function emptyWatch() {
  return {
    brand: '',
    model: '',
    slug: '',
    year: '',
    reference: '',
    style: '',
    styleOther: '',
    caseDiameter: '',
    thickness: '',
    lugToLug: '',
    lugWidth: '',
    weight: '',
    waterResistance: '',
    caseMaterial: '',
    caseMaterialOther: '',
    caseMaterialGrade: '',
    caseFinish: '',
    caseFinishOther: '',
    caseShape: '',
    caseShapeOther: '',
    caseBack: '',
    caseBackOther: '',
    caseBackFastening: '',
    caseBackFasteningOther: '',
    crownType: '',
    crownTypeOther: '',
    lugStyle: '',
    lugStyleOther: '',
    dialColor: '',
    crystal: '',
    crystalOther: '',
    crystalNotes: '',
    lume: '',
    lumeOther: '',
    lumePlacement: '',
    hands: '',
    handsOther: '',
    dialMarkers: '',
    dialMarkersOther: '',
    hasBezel: false,
    bezelMaterial: '',
    bezelMaterialOther: '',
    bezelColor: '',
    bezelAction: '',
    bezelActionOther: '',
    bezelScale: '',
    bezelScaleOther: '',
    movementType: '',
    movementTypeOther: '',
    caliber: '',
    powerReserve: '',
    jewels: '',
    complications: [],
    complicationsOther: '',
    certifications: [],
    certificationsOther: '',
    strapType: '',
    strapTypeOther: '',
    strapMaterial: '',
    strapColor: '',
    claspType: '',
    claspTypeOther: '',
    photos: [],
    notes: '',
    acquiredAt: '',
  };
}

export default function AdminWatchForm({ initialWatch = null, mode = 'create' }) {
  const router = useRouter();
  const [watch, setWatch] = useState(() =>
    initialWatch
      ? {
          ...emptyWatch(),
          ...initialWatch,
          year: initialWatch.year ?? '',
          caseDiameter: initialWatch.caseDiameter ?? '',
          thickness: initialWatch.thickness ?? '',
          lugToLug: initialWatch.lugToLug ?? '',
          lugWidth: initialWatch.lugWidth ?? '',
          weight: initialWatch.weight ?? '',
          waterResistance: initialWatch.waterResistance ?? '',
          powerReserve: initialWatch.powerReserve ?? '',
          jewels: initialWatch.jewels ?? '',
          acquiredAt: initialWatch.acquiredAt
            ? String(initialWatch.acquiredAt).slice(0, 10)
            : '',
          photos: initialWatch.photos || [],
          complications: initialWatch.complications || [],
          certifications: initialWatch.certifications || [],
        }
      : emptyWatch()
  );
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function setField(key, value) {
    setWatch((prev) => {
      const next = { ...prev, [key]: value };
      if ((key === 'brand' || key === 'model') && mode === 'create') {
        next.slug = slugify(
          key === 'brand' ? value : next.brand,
          key === 'model' ? value : next.model
        );
      }
      return next;
    });
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError('');
    setPending(true);

    const payload = { ...watch };
    const url =
      mode === 'edit'
        ? `/api/admin/watches/${initialWatch.id}`
        : '/api/admin/watches';
    const method = mode === 'edit' ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error || 'Could not save watch.');
        setPending(false);
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch {
      setError('Could not reach the server.');
      setPending(false);
    }
  }

  async function onDelete() {
    if (!initialWatch?.id) return;
    const confirmed = window.confirm(
      `Delete ${initialWatch.brand} ${initialWatch.model}? This cannot be undone.`
    );
    if (!confirmed) return;

    setDeleting(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/watches/${initialWatch.id}`, {
        method: 'DELETE',
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error || 'Could not delete watch.');
        setDeleting(false);
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch {
      setError('Could not reach the server.');
      setDeleting(false);
    }
  }

  return (
    <form className="admin-watch-form" onSubmit={onSubmit} noValidate>
      {error ? (
        <p className="admin-error" role="alert">
          {error}
        </p>
      ) : null}

      <PhotoManager
        photos={watch.photos}
        onChange={(photos) => setField('photos', photos)}
      />

      <section className="admin-section" aria-labelledby="identity-heading">
        <h2 id="identity-heading">Identity</h2>
        <div className="admin-grid">
          <TextField
            label="Brand"
            value={watch.brand}
            onChange={(v) => setField('brand', v)}
            required
          />
          <TextField
            label="Collection / Model name"
            value={watch.model}
            onChange={(v) => setField('model', v)}
            required
          />
          <TextField
            label="Slug"
            value={watch.slug}
            onChange={(v) => setField('slug', v)}
            hint="Used in the public URL. Auto-filled from brand and model."
          />
          <TextField
            label="Reference number"
            value={watch.reference}
            onChange={(v) => setField('reference', v)}
          />
          <NumberField
            label="Year"
            value={watch.year}
            onChange={(v) => setField('year', v)}
            step="1"
            min="1800"
          />
          <SelectWithOther
            label="Style"
            value={watch.style}
            otherValue={watch.styleOther}
            options={STYLE_OPTIONS}
            onChange={(v) => setField('style', v)}
            onOtherChange={(v) => setField('styleOther', v)}
          />
          <TextField
            label="Acquired date"
            value={watch.acquiredAt}
            onChange={(v) => setField('acquiredAt', v)}
            hint="Optional. Format YYYY-MM-DD."
          />
        </div>
      </section>

      <section className="admin-section" aria-labelledby="case-heading">
        <h2 id="case-heading">Case</h2>
        <div className="admin-grid">
          <NumberField
            label="Case diameter"
            value={watch.caseDiameter}
            onChange={(v) => setField('caseDiameter', v)}
            unit="mm"
          />
          <NumberField
            label="Thickness"
            value={watch.thickness}
            onChange={(v) => setField('thickness', v)}
            unit="mm"
          />
          <NumberField
            label="Lug-to-lug"
            value={watch.lugToLug}
            onChange={(v) => setField('lugToLug', v)}
            unit="mm"
          />
          <NumberField
            label="Lug width"
            value={watch.lugWidth}
            onChange={(v) => setField('lugWidth', v)}
            unit="mm"
          />
          <NumberField
            label="Weight"
            value={watch.weight}
            onChange={(v) => setField('weight', v)}
            unit="g"
          />
          <NumberField
            label="Water resistance"
            value={watch.waterResistance}
            onChange={(v) => setField('waterResistance', v)}
            unit="m"
          />
          <SelectWithOther
            label="Case material"
            value={watch.caseMaterial}
            otherValue={watch.caseMaterialOther}
            options={CASE_MATERIAL_OPTIONS}
            onChange={(v) => setField('caseMaterial', v)}
            onOtherChange={(v) => setField('caseMaterialOther', v)}
          />
          <TextField
            label="Case material grade"
            value={watch.caseMaterialGrade}
            onChange={(v) => setField('caseMaterialGrade', v)}
            hint="Optional, for example 316L."
          />
          <SelectWithOther
            label="Case finish"
            value={watch.caseFinish}
            otherValue={watch.caseFinishOther}
            options={CASE_FINISH_OPTIONS}
            onChange={(v) => setField('caseFinish', v)}
            onOtherChange={(v) => setField('caseFinishOther', v)}
          />
          <SilhouetteSelect
            label="Case shape"
            fieldKey="caseShape"
            value={watch.caseShape}
            otherValue={watch.caseShapeOther}
            options={CASE_SHAPE_OPTIONS}
            onChange={(v) => setField('caseShape', v)}
            onOtherChange={(v) => setField('caseShapeOther', v)}
          />
          <SilhouetteSelect
            label="Case back"
            fieldKey="caseBack"
            value={watch.caseBack}
            otherValue={watch.caseBackOther}
            options={CASE_BACK_OPTIONS}
            onChange={(v) => setField('caseBack', v)}
            onOtherChange={(v) => setField('caseBackOther', v)}
          />
          <SelectWithOther
            label="Case back fastening"
            value={watch.caseBackFastening}
            otherValue={watch.caseBackFasteningOther}
            options={CASE_BACK_FASTENING_OPTIONS}
            onChange={(v) => setField('caseBackFastening', v)}
            onOtherChange={(v) => setField('caseBackFasteningOther', v)}
          />
          <SilhouetteSelect
            label="Crown type"
            fieldKey="crownType"
            value={watch.crownType}
            otherValue={watch.crownTypeOther}
            options={CROWN_TYPE_OPTIONS}
            onChange={(v) => setField('crownType', v)}
            onOtherChange={(v) => setField('crownTypeOther', v)}
          />
          <SilhouetteSelect
            label="Lug style"
            fieldKey="lugStyle"
            value={watch.lugStyle}
            otherValue={watch.lugStyleOther}
            options={LUG_STYLE_OPTIONS}
            onChange={(v) => setField('lugStyle', v)}
            onOtherChange={(v) => setField('lugStyleOther', v)}
          />
        </div>
      </section>

      <section className="admin-section" aria-labelledby="dial-heading">
        <h2 id="dial-heading">Dial and crystal</h2>
        <div className="admin-grid">
          <TextField
            label="Dial color"
            value={watch.dialColor}
            onChange={(v) => setField('dialColor', v)}
          />
          <SelectWithOther
            label="Crystal"
            value={watch.crystal}
            otherValue={watch.crystalOther}
            options={CRYSTAL_OPTIONS}
            onChange={(v) => setField('crystal', v)}
            onOtherChange={(v) => setField('crystalOther', v)}
          />
          <TextField
            label="Crystal notes"
            value={watch.crystalNotes}
            onChange={(v) => setField('crystalNotes', v)}
          />
          <SelectWithOther
            label="Lume"
            value={watch.lume}
            otherValue={watch.lumeOther}
            options={LUME_OPTIONS}
            onChange={(v) => setField('lume', v)}
            onOtherChange={(v) => setField('lumeOther', v)}
          />
          <TextField
            label="Lume placement"
            value={watch.lumePlacement}
            onChange={(v) => setField('lumePlacement', v)}
          />
          <SilhouetteSelect
            label="Hands"
            fieldKey="hands"
            value={watch.hands}
            otherValue={watch.handsOther}
            options={HANDS_OPTIONS}
            onChange={(v) => setField('hands', v)}
            onOtherChange={(v) => setField('handsOther', v)}
          />
          <SilhouetteSelect
            label="Dial markers"
            fieldKey="dialMarkers"
            value={watch.dialMarkers}
            otherValue={watch.dialMarkersOther}
            options={DIAL_MARKERS_OPTIONS}
            onChange={(v) => setField('dialMarkers', v)}
            onOtherChange={(v) => setField('dialMarkersOther', v)}
          />
        </div>
      </section>

      <section className="admin-section" aria-labelledby="bezel-heading">
        <h2 id="bezel-heading">Bezel</h2>
        <label className="admin-checkbox-label admin-checkbox-label-block" htmlFor="has-bezel">
          <input
            id="has-bezel"
            type="checkbox"
            checked={watch.hasBezel}
            onChange={(e) => setField('hasBezel', e.target.checked)}
          />
          <span>This watch has a bezel.</span>
        </label>
        {watch.hasBezel ? (
          <div className="admin-grid">
            <SelectWithOther
              label="Bezel material"
              value={watch.bezelMaterial}
              otherValue={watch.bezelMaterialOther}
              options={BEZEL_MATERIAL_OPTIONS}
              onChange={(v) => setField('bezelMaterial', v)}
              onOtherChange={(v) => setField('bezelMaterialOther', v)}
            />
            <TextField
              label="Bezel color"
              value={watch.bezelColor}
              onChange={(v) => setField('bezelColor', v)}
            />
            <SelectWithOther
              label="Bezel action"
              value={watch.bezelAction}
              otherValue={watch.bezelActionOther}
              options={BEZEL_ACTION_OPTIONS}
              onChange={(v) => setField('bezelAction', v)}
              onOtherChange={(v) => setField('bezelActionOther', v)}
            />
            <SilhouetteSelect
              label="Bezel scale"
              fieldKey="bezelScale"
              value={watch.bezelScale}
              otherValue={watch.bezelScaleOther}
              options={BEZEL_SCALE_OPTIONS}
              onChange={(v) => setField('bezelScale', v)}
              onOtherChange={(v) => setField('bezelScaleOther', v)}
            />
          </div>
        ) : null}
      </section>

      <section className="admin-section" aria-labelledby="movement-heading">
        <h2 id="movement-heading">Movement</h2>
        <div className="admin-grid">
          <SelectWithOther
            label="Movement type"
            value={watch.movementType}
            otherValue={watch.movementTypeOther}
            options={MOVEMENT_TYPE_OPTIONS}
            onChange={(v) => setField('movementType', v)}
            onOtherChange={(v) => setField('movementTypeOther', v)}
          />
          <TextField
            label="Caliber"
            value={watch.caliber}
            onChange={(v) => setField('caliber', v)}
          />
          <NumberField
            label="Power reserve"
            value={watch.powerReserve}
            onChange={(v) => setField('powerReserve', v)}
            unit="hours"
          />
          <NumberField
            label="Jewels"
            value={watch.jewels}
            onChange={(v) => setField('jewels', v)}
            step="1"
            min="0"
          />
        </div>
      </section>

      <section className="admin-section" aria-labelledby="features-heading">
        <h2 id="features-heading">Features</h2>
        <MultiSelectWithOther
          label="Complications"
          options={COMPLICATION_OPTIONS}
          values={watch.complications}
          otherValue={watch.complicationsOther}
          onChange={(v) => setField('complications', v)}
          onOtherChange={(v) => setField('complicationsOther', v)}
        />
        <MultiSelectWithOther
          label="Certifications"
          options={CERTIFICATION_OPTIONS}
          values={watch.certifications}
          otherValue={watch.certificationsOther}
          onChange={(v) => setField('certifications', v)}
          onOtherChange={(v) => setField('certificationsOther', v)}
        />
      </section>

      <section className="admin-section" aria-labelledby="strap-heading">
        <h2 id="strap-heading">Strap / bracelet</h2>
        <div className="admin-grid">
          <SelectWithOther
            label="Strap type"
            value={watch.strapType}
            otherValue={watch.strapTypeOther}
            options={STRAP_TYPE_OPTIONS}
            onChange={(v) => setField('strapType', v)}
            onOtherChange={(v) => setField('strapTypeOther', v)}
          />
          <TextField
            label="Strap material"
            value={watch.strapMaterial}
            onChange={(v) => setField('strapMaterial', v)}
          />
          <TextField
            label="Strap color"
            value={watch.strapColor}
            onChange={(v) => setField('strapColor', v)}
          />
          <SelectWithOther
            label="Clasp / buckle type"
            value={watch.claspType}
            otherValue={watch.claspTypeOther}
            options={CLASP_TYPE_OPTIONS}
            onChange={(v) => setField('claspType', v)}
            onOtherChange={(v) => setField('claspTypeOther', v)}
          />
        </div>
      </section>

      <section className="admin-section" aria-labelledby="notes-heading">
        <h2 id="notes-heading">Notes</h2>
        <TextField
          label="Notes"
          value={watch.notes}
          onChange={(v) => setField('notes', v)}
          multiline
          hint="Optional. Purchase year, story, mods."
        />
      </section>

      <div className="admin-form-actions">
        <button type="submit" className="cta-btn" disabled={pending || deleting}>
          {pending ? 'Saving…' : mode === 'edit' ? 'Save changes' : 'Create watch'}
        </button>
        {mode === 'edit' ? (
          <button
            type="button"
            className="admin-danger-btn"
            onClick={onDelete}
            disabled={pending || deleting}
          >
            {deleting ? 'Deleting…' : 'Delete watch'}
          </button>
        ) : null}
      </div>
    </form>
  );
}
