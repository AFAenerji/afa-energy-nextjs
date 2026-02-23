/**
 * Technical Assessment Module v12.1 — Flow Definitions
 * Flow A, B, C institutional accent colors and identifiers.
 * Actual content (titles, steps, descriptions) comes from the dictionary.
 */

/** Institutional accent color per flow */
export const FLOW_ACCENTS = {
  A: '#18625F',  // AFA Primary / Deep Green
  B: '#FFCB00',  // AFA Accent / Jonquil
  C: '#F25F5C',  // AFA Risk / Bittersweet
} as const;

/** Flow IDs in display order */
export const FLOW_IDS = ['A', 'B', 'C'] as const;

export type FlowId = (typeof FLOW_IDS)[number];
