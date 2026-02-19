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
