// src/lib/routes.ts
// AFA Energy Romania - Route Definitions v2.0
// User-facing localized URLs (middleware rewrites to canonical directories)

export const LOCALE_PATHS = {
  home: {
    tr: "/tr",
    en: "/en",
    ro: "/ro",
  },

  about: {
    tr: "/tr/hakkimizda",
    en: "/en/about",
    ro: "/ro/despre-noi",
  },

  services: {
    tr: "/tr/hizmetler",
    en: "/en/services",
    ro: "/ro/servicii",
  },

  assessment: {
    tr: "/tr/teknik-on-degerlendirme",
    en: "/en/technical-assessment",
    ro: "/ro/evaluare-tehnica",
  },

  methodology: {
    tr: "/tr/metodoloji",
    en: "/en/metodoloji",
    ro: "/ro/metodoloji",
  },

  knowledgeCenter: {
    tr: "/tr/bilgi-merkezi",
    en: "/en/knowledge-center",
    ro: "/ro/centrul-cunostintelor",
  },

  investor: {
    tr: "/tr/yatirimci",
    en: "/en/investor",
    ro: "/ro/investitor",
  },

  developer: {
    tr: "/tr/gelistirici",
    en: "/en/developer",
    ro: "/ro/dezvoltator",
  },

  atrMatrix: {
    tr: "/tr/atr-matrix",
    en: "/en/atr-matrix",
    ro: "/ro/atr-matrix",
  },

  cases: {
    tr: "/tr/vakalar",
    en: "/en/cases",
    ro: "/ro/cazuri",
  },

  contact: {
    tr: "/tr/iletisim",
    en: "/en/contact",
    ro: "/ro/contact",
  },
} as const;

export type Locale = keyof typeof LOCALE_PATHS.home;
export type RouteKey = keyof typeof LOCALE_PATHS;

export function getPath(key: RouteKey, locale: Locale): string {
  return LOCALE_PATHS[key][locale];
}