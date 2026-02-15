// AFA Energy Romania — Homepage Type Contracts (v5.2.1 Governance)

import type { Locale } from '@/lib/i18n';

// ─── Section Data Types ───────────────────────────────────────

export interface HeroContent {
  motto: string;
  subhead: string; // supporting değil
  primaryCta: string;
  secondaryCta: string;
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

export interface RegulatoryCitation {
  reference: string;
  description: string;
}

export interface RegulatoryContent {
  atrFull: string;
  anreFull: string;
  citations: RegulatoryCitation[];
}

export interface LegalContent {
  disclaimer: string;
}

export interface FormsContent {
  labels: Record<string, string>;
  placeholders: Record<string, string>;
  status: Record<string, string>;
  validation: Record<string, string>;
}

export interface NavigationContent {
  [key: string]: string;
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

export interface DecisionCard {
  title: string;
  description: string;
  cta: string;
}

export interface DecisionCardsContent {
  investor: DecisionCard;
  developer: DecisionCard;
}

export interface ClosingContent {
  motto: string;
  subhead: string;
  primaryCta: string;
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
  HeroSection: HeroContent;
  IntroductoryStatement: ValuePropositionContent;
  PositioningChain: AtrMatrixContent;

  ExperienceMetrics: MetricsData;
  RoleClarity: RoleClarityData;
  DecisionInterface: DecisionData;
  ClosingStatement: ClosingData;
}

// Registry’nin import ettiği isimle uyum kilidi
export type SectionDataByComponent = SectionDataMap;

// ─── Section & Dictionary Contracts ──────────────────────────

export interface SectionBase {
  id: string;
  order: number;
  component: SectionComponentName;
  dataKey: string;
  enabled?: boolean;
}

export interface HomepageDictionary {
  meta: {
    version: string;
  };
  sections: SectionBase[];
  // HomepageRenderer data[section.dataKey] okuyor; burada key/value serbest ama içerik bizim sözleşmemize göre gelecek
  data: Record<string, unknown>;
  locale: Locale;
}

// ─── Raw JSON shape (v5.2 Dictionary Format) ─────────────────

export interface HomepageContentV5 {
  meta: {
    version: string;
    expectedSectionCount?: number;
    expectedSectionIds?: string[];
  };
  sections: SectionBase[];
  data: Record<string, unknown>;
}

// ─── Flat Content Shape (data{} içindeki içerik) ─────────────

export interface HomepageContent {
  hero: HeroContent;
  valueProposition: ValuePropositionContent;
  atrMatrix: AtrMatrixContent;
  regulatory: RegulatoryContent;
  legal: LegalContent;
  forms: FormsContent;
  navigation: NavigationContent;
}
