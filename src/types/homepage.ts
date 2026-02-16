export interface SectionBase {
  id: string;
  order: number;
  component: string;
  dataKey: string;
  enabled: boolean;
}

export interface HeroData {
  tag: string;
  motto: string;
  subhead: string;
  primaryCta: string;
  secondaryCta: string;
  disclaimer: string;
}

export interface IntroData {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface MetricsData {
  eyebrow?: string;
  items: { 
    value: string; 
    unit: string; 
    label: string; 
  }[];
  note: string;
}

export interface PositioningChainData {
  title: string;
  description: string;
  cards: { id: string; title: string; description: string }[];
}

export interface RoleClarityData {
  title: string;
  do: { title: string; items: string[] };
  dont: { title: string; items: string[] };
  closing: string;
}

export interface DecisionData {
  title: string;
  cards: { type: string; title: string; description: string }[];
  cta: string;
}

export interface ScopeDisclaimerData {
  text: string;
}

export interface ClosingData {
  motto: string;
  principles: string[];
  legal: string;
}

// Map key names to types
export interface HomepageContentV95 {
  hero: HeroData;
  intro: IntroData;
  metrics: MetricsData;
  atrMatrix: PositioningChainData;
  roleClarity: RoleClarityData;
  decisionCards: DecisionData;
  scopeDisclaimer: ScopeDisclaimerData;
  closing: ClosingData;
}

export interface HomepageDictionary {
  meta: { version: string };
  sections: SectionBase[];
  data: HomepageContentV95;
}

// Export mapping for Registry
export interface SectionDataMap {
  HeroSection: HeroData;
  IntroductoryStatement: IntroData;
  ExperienceMetrics: MetricsData;
  PositioningChain: PositioningChainData;
  RoleClarity: RoleClarityData;
  DecisionInterface: DecisionData;
  ScopeDisclaimer: ScopeDisclaimerData;
  ClosingStatement: ClosingData;
}

export type SectionDataByComponent = SectionDataMap;