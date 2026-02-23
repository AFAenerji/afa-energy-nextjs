/**
 * Escapes HTML special characters to prevent XSS injection
 * in server-rendered email templates and other HTML contexts.
 *
 * Replaces: & < > " ' ` / with their HTML entity equivalents.
 * This is functionally equivalent to `he.encode()` without
 * requiring an external dependency.
 */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/`/g, '&#x60;')
    .replace(/\//g, '&#x2F;');
}
