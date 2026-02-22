/**
 * Locale-aware path map for all pages.
 * Used by generateMetadata for canonical/hreflang URLs
 * and by components for internal navigation.
 *
 * Format: Full paths including locale prefix.
 * v10.2 Investment Committee Standard.
 */
export const LOCALE_PATHS = {
  home: { tr: '/tr', en: '/en', ro: '/ro' },
  about: { tr: '/tr/hakkimizda', en: '/en/about', ro: '/ro/despre-noi' },
  services: { tr: '/tr/hizmetler', en: '/en/services', ro: '/ro/servicii' },
  knowledgeCenter: { tr: '/tr/bilgi-merkezi', en: '/en/bilgi-merkezi', ro: '/ro/bilgi-merkezi' },
  investor: { tr: '/tr/investor', en: '/en/investor', ro: '/ro/investor' },
  developer: { tr: '/tr/developer', en: '/en/developer', ro: '/ro/developer' },
  contact: { tr: '/tr/iletisim', en: '/en/contact', ro: '/ro/contact' },
  assessment: { tr: '/tr/teknik-on-degerlendirme', en: '/en/teknik-on-degerlendirme', ro: '/ro/teknik-on-degerlendirme' },
} as const;

export type LocalePaths = typeof LOCALE_PATHS;
