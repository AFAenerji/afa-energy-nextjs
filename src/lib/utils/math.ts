/**
 * AFA Energy Romania — Utility: Weighted Moving Average (WMA)
 * Energy Trend Analysis & Data Smoothing
 *
 * Calculates a Weighted Moving Average over a numeric dataset using
 * the supplied weight vector. Useful for smoothing energy production
 * time-series and identifying trend direction before applying the
 * ATR Matrix™ risk scoring layer.
 *
 * Note: This utility is part of AFA's ATR Matrix™ methodology for
 * future data-driven validation modules.
 *
 * @module lib/utils/math
 */

/**
 * Compute the Weighted Moving Average (WMA) of a numeric dataset.
 *
 * For each valid window position the function multiplies every data
 * point in the window by its corresponding weight, sums the products,
 * and divides by the sum of the weights.
 *
 * @param data    - Ordered numeric values (e.g. daily kWh readings).
 * @param weights - Weight vector applied to each window. The first
 *                  element corresponds to the oldest value in the window.
 * @returns An array of WMA values whose length equals
 *          `data.length - weights.length + 1`.
 * @throws {Error} If `data` has fewer elements than `weights`.
 * @throws {Error} If `weights` is empty.
 *
 * @example
 * ```ts
 * const daily = [120, 135, 128, 142, 138, 150, 145];
 * const w     = [1, 2, 3];
 * const wma   = calculateWMA(daily, w);
 * // wma → [130.17, 137.33, 137.33, 145.33, 145.17]
 * ```
 */
export function calculateWMA(data: number[], weights: number[]): number[] {
  if (weights.length === 0) {
    throw new Error("[calculateWMA] weights array must not be empty.");
  }

  if (data.length < weights.length) {
    throw new Error(
      `[calculateWMA] data length (${data.length}) must be >= weights length (${weights.length}).`
    );
  }

  const weightSum = weights.reduce((sum, w) => sum + w, 0);

  if (weightSum === 0) {
    throw new Error("[calculateWMA] sum of weights must not be zero.");
  }

  const resultLength = data.length - weights.length + 1;
  const result: number[] = new Array(resultLength);

  for (let i = 0; i < resultLength; i++) {
    let windowSum = 0;
    for (let j = 0; j < weights.length; j++) {
      windowSum += data[i + j] * weights[j];
    }
    result[i] = windowSum / weightSum;
  }

  return result;
}
