'use client';

import { useId } from 'react';
import SilhouetteIcon from '@/components/SilhouetteIcon';

export function SelectWithOther({
  id,
  label,
  value,
  otherValue,
  options,
  onChange,
  onOtherChange,
  required = false,
  hint,
}) {
  const autoId = useId();
  const selectId = id || autoId;
  const otherId = `${selectId}-other`;
  const hintId = hint ? `${selectId}-hint` : undefined;
  const showOther = value === 'Other';

  return (
    <div className="admin-field">
      <label htmlFor={selectId}>{label}</label>
      <select
        id={selectId}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-describedby={hintId}
      >
        <option value="">Select…</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {hint ? (
        <p id={hintId} className="admin-field-hint">
          {hint}
        </p>
      ) : null}
      {showOther ? (
        <div className="admin-field admin-field-nested">
          <label htmlFor={otherId}>Custom {label.toLowerCase()}</label>
          <input
            id={otherId}
            type="text"
            value={otherValue || ''}
            onChange={(e) => onOtherChange(e.target.value)}
            required
          />
        </div>
      ) : null}
    </div>
  );
}

export function SilhouetteSelect({
  id,
  label,
  fieldKey,
  value,
  otherValue,
  options,
  onChange,
  onOtherChange,
}) {
  const autoId = useId();
  const selectId = id || autoId;
  const otherId = `${selectId}-other`;
  const showOther = value === 'Other';

  return (
    <div className="admin-field">
      <label htmlFor={selectId}>{label}</label>
      <div className="silhouette-select-row">
        <SilhouetteIcon fieldKey={fieldKey} option={value || options[0]} />
        <select
          id={selectId}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select…</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      {showOther ? (
        <div className="admin-field admin-field-nested">
          <label htmlFor={otherId}>Custom {label.toLowerCase()}</label>
          <input
            id={otherId}
            type="text"
            value={otherValue || ''}
            onChange={(e) => onOtherChange(e.target.value)}
            required
          />
        </div>
      ) : null}
    </div>
  );
}

export function NumberField({
  id,
  label,
  value,
  onChange,
  unit,
  step = 'any',
  min,
}) {
  const autoId = useId();
  const fieldId = id || autoId;
  const unitId = unit ? `${fieldId}-unit` : undefined;

  return (
    <div className="admin-field">
      <label htmlFor={fieldId}>{label}</label>
      <div className="admin-number-row">
        <input
          id={fieldId}
          type="number"
          inputMode="decimal"
          step={step}
          min={min}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={unitId}
        />
        {unit ? (
          <span id={unitId} className="admin-unit">
            {unit}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function TextField({
  id,
  label,
  value,
  onChange,
  required = false,
  multiline = false,
  hint,
}) {
  const autoId = useId();
  const fieldId = id || autoId;
  const hintId = hint ? `${fieldId}-hint` : undefined;

  return (
    <div className="admin-field">
      <label htmlFor={fieldId}>{label}</label>
      {multiline ? (
        <textarea
          id={fieldId}
          rows={4}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          aria-describedby={hintId}
        />
      ) : (
        <input
          id={fieldId}
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          aria-describedby={hintId}
        />
      )}
      {hint ? (
        <p id={hintId} className="admin-field-hint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function MultiSelectWithOther({
  id,
  label,
  options,
  values,
  otherValue,
  onChange,
  onOtherChange,
}) {
  const autoId = useId();
  const groupId = id || autoId;
  const selected = Array.isArray(values) ? values : [];
  const showOther = selected.includes('Other');

  function toggle(option) {
    if (selected.includes(option)) {
      onChange(selected.filter((v) => v !== option));
    } else {
      onChange([...selected, option]);
    }
  }

  return (
    <fieldset className="admin-fieldset">
      <legend>{label}</legend>
      <div className="admin-checkbox-grid" role="group" aria-labelledby={`${groupId}-legend`}>
        <span id={`${groupId}-legend`} className="visually-hidden">
          {label}
        </span>
        {options.map((option) => {
          const optionId = `${groupId}-${option.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;
          return (
            <label key={option} htmlFor={optionId} className="admin-checkbox-label">
              <input
                id={optionId}
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggle(option)}
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
      {showOther ? (
        <div className="admin-field admin-field-nested">
          <label htmlFor={`${groupId}-other`}>Custom {label.toLowerCase()}</label>
          <input
            id={`${groupId}-other`}
            type="text"
            value={otherValue || ''}
            onChange={(e) => onOtherChange(e.target.value)}
            required
          />
        </div>
      ) : null}
    </fieldset>
  );
}
