// src/lib/routes.ts
// AFA Energy Romania - Rota Tanımları v1.1
// Fiziksel klasör yapısıyla birebir uyumlu
// Not: Tüm dillerde segment aynıdır (rewrite yok)

export const LOCALE_PATHS = {
  home: {
    tr: "/tr",
    en: "/en",
    ro: "/ro",
  },

  about: {
    tr: "/tr/hakkimizda",
    en: "/en/hakkimizda",
    ro: "/ro/hakkimizda",
  },

  services: {
    tr: "/tr/hizmetler",
    en: "/en/hizmetler",
    ro: "/ro/hizmetler",
  },

  assessment: {
    tr: "/tr/teknik-on-degerlendirme",
    en: "/en/teknik-on-degerlendirme",
    ro: "/ro/teknik-on-degerlendirme",
  },

  methodology: {
    tr: "/tr/metodoloji",
    en: "/en/metodoloji",
    ro: "/ro/metodoloji",
  },

  knowledgeCenter: {
    tr: "/tr/bilgi-merkezi",
    en: "/en/bilgi-merkezi",
    ro: "/ro/bilgi-merkezi",
  },

  investor: {
    tr: "/tr/investor",
    en: "/en/investor",
    ro: "/ro/investor",
  },

  developer: {
    tr: "/tr/developer",
    en: "/en/developer",
    ro: "/ro/developer",
  },

  contact: {
    tr: "/tr/iletisim",
    en: "/en/iletisim",
    ro: "/ro/iletisim",
  },
} as const;

export type Locale = keyof typeof LOCALE_PATHS.home;
export type RouteKey = keyof typeof LOCALE_PATHS;

export function getPath(key: RouteKey, locale: Locale): string {
  return LOCALE_PATHS[key][locale];
}