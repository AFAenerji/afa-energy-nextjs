import type { Locale } from './i18n';
import { locales } from './i18n';

/**
 * Locale-based slug mapping system.
 * Canonical keys (English) map to localized URL slugs per locale.
 * English (`en`) uses the canonical key as-is unless overridden.
 */

type SlugEntry = Partial<Record<Locale, string>>;

const slugMap: Record<string, SlugEntry> = {
  services:               { tr: 'hizmetler',                ro: 'servicii' },
  about:                  { tr: 'hakkimizda',               ro: 'despre-noi' },
  cases:                  { tr: 'vakalar',                  ro: 'cazuri' },
  contact:                { tr: 'iletisim',                 ro: 'contact' },
  'knowledge-center':     { tr: 'bilgi-merkezi',            ro: 'centrul-cunostintelor' },
  'technical-assessment': { tr: 'teknik-on-degerlendirme',  ro: 'evaluare-tehnica' },
  investor:               { tr: 'yatirimci',                ro: 'investitor' },
  developer:              { tr: 'gelistirici',              ro: 'dezvoltator' },
  'atr-matrix':           {},
};

/**
 * Resolve the localized slug for a given locale.
 * Falls back to the canonical key when no override exists.
 */
function resolveSlug(canonical: string, locale: Locale): string {
  return slugMap[canonical]?.[locale] ?? canonical;
}

/**
 * Build a reverse lookup: localized slug → canonical key, scoped to a locale.
 */
function buildReverseLookup(locale: Locale): Map<string, string> {
  const map = new Map<string, string>();
  for (const canonical of Object.keys(slugMap)) {
    map.set(resolveSlug(canonical, locale), canonical);
  }
  return map;
}

const reverseLookups = new Map<Locale, Map<string, string>>();

function getReverseLookup(locale: Locale): Map<string, string> {
  if (!reverseLookups.has(locale)) {
    reverseLookups.set(locale, buildReverseLookup(locale));
  }
  return reverseLookups.get(locale)!;
}

/**
 * Convert a localized slug back to its canonical (internal) key.
 * Returns `undefined` if the slug is not recognized for the given locale.
 *
 * @example getInternalSlug('hizmetler', 'tr') → 'services'
 * @example getInternalSlug('servicii', 'ro')  → 'services'
 */
export function getInternalSlug(localizedSlug: string, locale: Locale): string | undefined {
  return getReverseLookup(locale).get(localizedSlug);
}

/**
 * Convert a canonical key to the localized slug for a specific locale.
 * Returns `undefined` if the canonical key is not in the slug map.
 *
 * @example getLocalizedSlug('services', 'tr') → 'hizmetler'
 * @example getLocalizedSlug('services', 'en') → 'services'
 */
export function getLocalizedSlug(canonical: string, locale: Locale): string | undefined {
  if (!(canonical in slugMap)) return undefined;
  return resolveSlug(canonical, locale);
}

/**
 * Generate alternate URLs for all locales (useful for hreflang tags).
 * Returns a record of locale → full path (e.g., `/tr/hizmetler`).
 *
 * @example getAlternateUrls('services') → { tr: '/tr/hizmetler', en: '/en/services', ro: '/ro/servicii' }
 */
export function getAlternateUrls(canonical: string): Record<Locale, string> | undefined {
  if (!(canonical in slugMap)) return undefined;

  const urls = {} as Record<Locale, string>;
  for (const locale of locales) {
    urls[locale] = `/${locale}/${resolveSlug(canonical, locale)}`;
  }
  return urls;
}
