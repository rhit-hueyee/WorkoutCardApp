import { Baseline } from '../../types';

/**
 * Calculates the weight for a workout set based on baselines, percentages, and load.
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
