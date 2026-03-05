import type { Locale } from '@/lib/i18n';

export interface InvestorDictionary {
  heroHeading: string;
  heroSubheading: string;
  approachTitle: string;
  approachIntro: string;
  approachClosing: string;
  trustSignals: Array<{ label: string; value: string }>;
  assetIntakeTitle: string;
  assetIntakeIntro: string;
  operationalCard: {
    heading: string;
    description: string;
    timeline: string;
    primaryCTA: string;
    secondaryLink: string;
  };
  rtbCard: {
    heading: string;
    description: string;
    timeline: string;
    primaryCTA: string;
    badge: string;
    secondaryLink: string;
    comingSoon: string;
    comingSoonNote: string;
  };
  portfolioTitle: string;
  portfolioSubheading: string;
  portfolioFeatures: Array<{ title: string; description: string }>;
  portfolioCTA: string;
  trustTitle: string;
  trustPoints: Array<{ title: string; description: string }>;
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  nextStepsTitle: string;
  ctaCards: Array<{ title: string; description: string; cta: string }>;
  motto: string;
  closingText: string;
  contactEmail: string;
  contactPhone: string;
  footerLine: string;
}

const dictionaries: Record<Locale, () => Promise<InvestorDictionary>> = {
  tr: () => import('@/content/tr/investor.json').then((m) => m.default as unknown as InvestorDictionary),
  en: () => import('@/content/en/investor.json').then((m) => m.default as unknown as InvestorDictionary),
  ro: () => import('@/content/ro/investor.json').then((m) => m.default as unknown as InvestorDictionary),
};

export async function getInvestorDictionary(locale: Locale): Promise<InvestorDictionary> {
  try {
    const loader = dictionaries[locale];
    if (!loader) {
      throw new Error(`[Investor] No dictionary loader for locale: ${locale}`);
    }
    return await loader();
  } catch (error) {
    console.warn(`[Investor] Failed to load dictionary for locale "${locale}", falling back to "tr".`, error);
    return await dictionaries.tr();
  }
}
