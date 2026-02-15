// AFA Energy Romania — Homepage Type Contracts (v5.2 Governance)

import type { Locale } from '@/lib/i18n';

// ─── Section Data Types ───────────────────────────────────────

export interface HeroContent {
  motto: string;
  subhead: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface DecisionCard {
  title: string;
  description: string;
  cta: string;
}

export interface DecisionCardsContent {
  investor: DecisionCard;
  developer: DecisionCard;
}

export interface ValuePropositionContent {
  title: string;
  body: string;
}

export interface AtrMatrixItem {
  id: string;
  title: string;
  description: string;
}

export interface AtrMatrixContent {
  title: string;
  framework: AtrMatrixItem[];
}

export interface Metric {
  number: string;
  label: string;
  detail: string;
}

export interface MetricGroup {
  name: string;
  title: string;
  metrics: Metric[];
}

export interface MetricsContent {
  title: string;
  groups: MetricGroup[];
}

export interface RoleClarityContent {
  roleTitle: string;
  does: string[];
  doesNot: string[];
  boundaryNote: string;
}

export interface ClosingContent {
  motto: string;
  subhead: string;
  primaryCta: string;
}

export interface FormSuccessContent {
  message: string;
}

export interface ScopeDisclaimerContent {
  text: string;
}

export interface FooterContent {
  formsOnly: string;
}

// ─── Strict Data Aliases (Component ↔ Data contract) ──────────

export type HeroData = HeroContent;
export type IntroData = ValuePropositionContent;
export type PositioningChainData = AtrMatrixContent;
export type MetricsData = MetricsContent;
export type RoleClarityData = RoleClarityContent;
export type DecisionData = DecisionCardsContent;
export type ClosingData = ClosingContent;

// ─── Component Name Registry (exhaustive union) ──────────────

export type SectionComponentName =
  | 'HeroSection'
  | 'IntroductoryStatement'
  | 'PositioningChain'
  | 'ExperienceMetrics'
  | 'RoleClarity'
  | 'DecisionInterface'
  | 'ClosingStatement';

// ─── Component → Data Type Map ───────────────────────────────

export interface SectionDataMap {
  HeroSection: HeroData;
  IntroductoryStatement: IntroData;
  PositioningChain: PositioningChainData;
  ExperienceMetrics: MetricsData;
  RoleClarity: RoleClarityData;
  DecisionInterface: DecisionData;
  ClosingStatement: ClosingData;
}

export type SectionDataByComponent = SectionDataMap;

// ─── Section & Dictionary Contracts ──────────────────────────

export interface SectionBase {
  id: string;
  order: number;
  component: SectionComponentName;
  dataKey: string;
  enabled: boolean;
}

export interface DictionaryMeta {
  version: string;
  expectedSectionCount: number;
  expectedSectionIds: string[];
}

export interface HomepageDictionary {
  meta: DictionaryMeta;
  sections: SectionBase[];
  data: Record<string, unknown>;
  locale: Locale;
}

// ─── Raw JSON shape (v5.2 Dictionary Format) ─────────────────

export interface HomepageContentV5 {
  meta: DictionaryMeta;
  sections: SectionBase[];
  data: Record<string, unknown>;
}
