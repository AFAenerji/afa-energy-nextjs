/**
 * AFA Energy — Dynamic Reference Code Generator
 * Format: AFA-YYYY-XXXXX
 * Where YYYY = current year, XXXXX = 5-digit random alphanumeric (uppercase)
 *
 * Used for tracking form submissions with a unique, human-readable reference.
 */

const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excludes I, O, 0, 1 to avoid ambiguity

export function generateReferenceCode(): string {
  const year = new Date().getFullYear();
  let code = '';
  for (let i = 0; i < 5; i++) {
    const idx = Math.floor(Math.random() * CHARSET.length);
    code += CHARSET[idx];
  }
  return `AFA-${year}-${code}`;
}
