import { describe, expect, it } from 'vitest';
import {
  displaySelectValue,
  formatWaterResistance,
  optionToFilename,
  silhouettePath,
  slugify,
} from '@/lib/watchFields';

describe('watchFields helpers', () => {
  it('slugifies brand and model', () => {
    expect(slugify('Omega', 'Seamaster Diver 300M')).toBe('omega-seamaster-diver-300m');
  });

  it('maps option labels to silhouette filenames', () => {
    expect(optionToFilename('Screw-down with guards')).toBe('screw-down-with-guards');
    expect(optionToFilename('Dot / Round')).toBe('dot-round');
    expect(optionToFilename('Minutes (dive)')).toBe('minutes-dive');
  });

  it('builds silhouette paths with Other fallback', () => {
    expect(silhouettePath('caseShape', 'Round')).toBe('/silhouettes/case-shape/round.svg');
    expect(silhouettePath('hands', 'Other')).toBe('/silhouettes/other.svg');
  });

  it('prefers custom Other text for display', () => {
    expect(displaySelectValue('Other', 'Rounded octagon')).toBe('Rounded octagon');
    expect(displaySelectValue('Round', '')).toBe('Round');
    expect(displaySelectValue('Other', '')).toBe(null);
  });

  it('formats water resistance with feet', () => {
    expect(formatWaterResistance(100)).toBe('100 m / 328 ft');
  });
});
