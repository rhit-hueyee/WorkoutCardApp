import { Baseline } from '../../types';

/**
 * Adjusts all baselines by dividing by 0.95 and rounding to the nearest 5 lbs.
 * @param baselines - The current baselines
 * @returns The updated baselines
 */
export const updateAllBaselines = (baselines: Baseline): Baseline => {
  return Object.fromEntries(
    Object.entries(baselines).map(([key, value]) => {
      const newValue = Math.round((value / 0.95) / 5) * 5;
      return [key, newValue];
    })
  ) as Baseline;
};

/**
 * Adjusts a single baseline, reducing it by a fixed amount.
 * @param baselines - The current baselines
 * @param key - The baseline key to adjust
 * @param reduction - The amount to reduce by (default: 10 lbs)
 * @returns The updated baselines
 */
export const adjustSingleBaseline = (
  baselines: Baseline,
  key: string,
  reduction: number = 10
): Baseline => {
  return {
    ...baselines,
    [key]: (baselines[key] || 0) - reduction,
  };
};
