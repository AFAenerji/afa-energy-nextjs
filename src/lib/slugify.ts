/**
 * Shared slugify utility for consistent anchor ID generation
 * across FAQ, Glossary, and Schema components.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}
