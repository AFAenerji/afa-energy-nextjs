import { locales, type Locale } from '@/lib/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://afaenergy.eu';

/**
 * Generate a canonical URL for a given locale and path.
 * Cleans leading/trailing slashes to avoid double-slash issues.
 */
export function generateCanonical(locale: Locale, path = ''): string {
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  return cleanPath
    ? `${SITE_URL}/${locale}/${cleanPath}`
    : `${SITE_URL}/${locale}`;
}

/**
 * Generate hreflang alternate URLs for all supported locales.
 */
export function generateAlternates(path = ''): Record<string, string> {
  return Object.fromEntries(
    locales.map((locale) => [locale, generateCanonical(locale as Locale, path)])
  );
}

/**
 * Build a canonical URL from a LOCALE_PATHS full path (already includes locale prefix).
 */
export function canonicalFromFullPath(fullPath: string): string {
  const clean = fullPath.replace(/^\/+|\/+$/g, '');
  return `${SITE_URL}/${clean}`;
}

/**
 * Generate hreflang alternates from a LOCALE_PATHS entry.
 * Each value is a full path like '/tr/hakkimizda', '/en/about', '/ro/despre-noi'.
 */
export function alternatesFromLocalePaths(
  paths: Record<Locale, string>,
): Record<string, string> {
  return Object.fromEntries(
    locales.map((locale) => [
      locale,
      canonicalFromFullPath(paths[locale as Locale]),
    ]),
  );
}
