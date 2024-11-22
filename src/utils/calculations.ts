import { Baseline } from '../types';

/**
 * Calculates weight based on baseline, percent, and load percent.
 * @param source - The baseline source (e.g., "clean", "sqt")
 * @param baselines - The current baselines
 * @param percent - The exercise's percentage (e.g., "80")
 * @param loadPercent - The load percentage (e.g., "90")
 * @returns The calculated weight rounded to the nearest 5 lbs, or null if no baseline exists
 */
export const calculateWeight = (
  source: string,
  baselines: Baseline,
  percent?: string,
  loadPercent?: string
): number | null => {
  const baseWeight = baselines[source] || 0;
  const percentValue = percent ? parseFloat(percent) / 100 : 1;
  const loadValue = loadPercent ? parseFloat(loadPercent) / 100 : 1;

  return Math.round((baseWeight * percentValue * loadValue) / 5) * 5 || null;
};

/**
 * Updates baselines by increasing each value by a factor (e.g., dividing by 0.95 and rounding to the nearest 5 lbs).
 * @param baselines - The current baselines
 * @returns The updated baselines
 */
export const updateBaselines = (baselines: Baseline): Baseline => {
  return Object.fromEntries(
    Object.entries(baselines).map(([key, value]) => {
      const newValue = Math.round((value / 0.95) / 5) * 5;
      return [key, newValue];
    })
  ) as Baseline;
};

/**
 * Adjusts a single baseline value, reducing it by a fixed amount (e.g., -10 lbs).
 * @param baselines - The current baselines
 * @param source - The baseline source to adjust (e.g., "clean", "sqt")
 * @param reduction - The amount to reduce the baseline (default is 10 lbs)
 * @returns The updated baselines
 */
export const adjustBaseline = (
  baselines: Baseline,
  source: string,
  reduction: number = 10
): Baseline => {
  return {
    ...baselines,
    [source]: (baselines[source] || 0) - reduction,
  };
};
