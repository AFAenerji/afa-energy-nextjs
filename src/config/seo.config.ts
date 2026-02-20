const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://afaenergy.eu';

export const siteConfig = {
  name: 'AFA Energy Romania',
  url: SITE_URL,
  ogImage: `${SITE_URL}/images/og-image.jpg`,
  locales: ['tr', 'en', 'ro'] as const,
  defaultLocale: 'tr' as const,
  pages: ['/', '/contact', '/investor', '/developer', '/hizmetler', '/teknik-on-degerlendirme', '/bilgi-merkezi'],
};

export const seoTranslations = {
  tr: {
    title: 'AFA Energy Romania | Yenilikçi Enerji Çözümleri',
    description:
      'Romanya yenilenebilir enerji yatırımları için bağımsız teknik danışmanlık ve yatırım kararı desteği.',
    keywords: [
      'enerji danışmanlık',
      'yenilenebilir enerji',
      'Romanya enerji yatırımı',
      'teknik değerlendirme',
      'bağımsız danışmanlık',
      'güneş enerjisi',
      'rüzgar enerjisi',
      'ATR analizi',
      'banka finansmanı',
    ],
  },
  en: {
    title: 'AFA Energy Romania | Independent Technical Due Diligence',
    description:
      'Professional technical advisory, ATR analysis, and investment-grade reporting for the Romanian renewable energy market.',
    keywords: [
      'Renewable Energy Romania',
      'Technical Due Diligence',
      'ATR Analysis',
      'Investment Advisory',
      'independent advisory',
      'solar energy',
      'wind energy',
      'bankability',
    ],
  },
  ro: {
    title: 'AFA Energy Romania | Soluții Energetice Inovatoare',
    description:
      'Consultanță tehnică independentă și suport pentru decizii de investiții în energie regenerabilă în România.',
    keywords: [
      'consultanță energetică',
      'energie regenerabilă',
      'investiții energie România',
      'evaluare tehnică',
      'consultanță independentă',
      'energie solară',
      'energie eoliană',
      'analiză ATR',
      'bancabilitate',
    ],
  },
} as const;

export const ogLocales = {
  tr: 'tr_TR',
  en: 'en_US',
  ro: 'ro_RO',
} as const;

export type SeoLocale = keyof typeof seoTranslations;
