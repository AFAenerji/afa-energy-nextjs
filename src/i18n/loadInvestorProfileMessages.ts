export type InvestorProfileMessages = {
  heroBadge: string;
  heroHeading: string;
  heroSubheading: string;

  framingHeading: string;
  framingQuote: string;
  framingChecklist: string[];
  framingClosing: string;

  validationHeading: string;
  validationIntro: string;
  validationRisks: string[];
  validationWithout: string;
  validationWith: string;

  profilesHeading: string;
  profilesIntro: string;
  profiles: Array<{
    type: string;
    subtitle: string;
    colorRole: 'deep' | 'primary' | 'coral';
    thinking: string[];
    preferences: string[];
    threshold: string;
    thresholdDetail: string;
  }>;

  riskHeading: string;
  riskIntro: string;
  riskRows: Array<{ investor: string; approach: string }>;
  riskClosing: string;

  motivationHeading: string;
  motivationIntro: string;
  motivations: Array<{ title: string; desc: string }>;
  motivationATRNote: string;
  motivationATRLink: string;

  ctaHeading: string;
  ctaSubtext: string;
  ctaPrimary: string;
  ctaSecondary: string;
  disclaimer: string;

  motto: string;
};

export async function loadInvestorProfileMessages(
  locale: 'tr' | 'en'
): Promise<InvestorProfileMessages> {
  switch (locale) {
    case 'en':
      return (await import('./messages/en/investor-profile.json'))
        .default as unknown as InvestorProfileMessages;
    case 'tr':
    default:
      return (await import('./messages/tr/investor-profile.json'))
        .default as unknown as InvestorProfileMessages;
  }
}
