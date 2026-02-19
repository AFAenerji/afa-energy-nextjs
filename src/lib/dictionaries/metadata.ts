import type { Locale } from '@/lib/i18n';

export type SiteMetadata = {
  title: string;
  description: string;
  keywords: string[];
};

const metadataDictionary: Record<Locale, SiteMetadata> = {
  tr: {
    title: 'AFA Energy Romania | Yenilikçi Enerji Çözümleri',
    description:
      'Romanya yenilenebilir enerji yatırımları için bağımsız teknik danışmanlık ve yatırım kararı desteği.',
    keywords: [
      'enerji danışmanlık',
      'yenilenebilir enerji',
      'Romanya enerji',
      'teknik due diligence',
      'ATR analizi',
      'rüzgar enerjisi',
      'güneş enerjisi',
    ],
  },
  en: {
    title: 'AFA Energy Romania | Innovative Energy Solutions',
    description:
      'Independent technical advisory and investment decision support for renewable energy investments in Romania.',
    keywords: [
      'energy advisory',
      'renewable energy',
      'Romania energy',
      'technical due diligence',
      'ATR analysis',
      'wind energy',
      'solar energy',
    ],
  },
  ro: {
    title: 'AFA Energy Romania | Soluții Energetice Inovatoare',
    description:
      'Consultanță tehnică independentă și suport pentru decizii de investiții în energie regenerabilă în România.',
    keywords: [
      'consultanță energetică',
      'energie regenerabilă',
      'energie România',
      'due diligence tehnic',
      'analiză ATR',
      'energie eoliană',
      'energie solară',
    ],
  },
};

export function getMetadata(locale: Locale): SiteMetadata {
  return metadataDictionary[locale] ?? metadataDictionary.tr;
}
