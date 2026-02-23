/**
 * Sanitizes a JSON-serializable object for safe embedding inside a <script> tag.
 * Escapes HTML-sensitive sequences (<, >, &) that could allow script breakout
 * via crafted content (e.g. "</script>" in user-provided strings).
 *
 * @see https://html.spec.whatwg.org/multipage/scripting.html#restrictions-for-contents-of-script-elements
 */
export function safeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}
