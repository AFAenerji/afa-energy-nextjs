import type { ComponentType } from 'react';
import type { Locale } from '@/lib/i18n';
import type { SectionDataMap } from '@/types/homepage';

export type { SectionDataMap as SectionDataByComponent } from '@/types/homepage';

import HeroSection from './HeroSection';
import IntroductoryStatement from './IntroductoryStatement';
import PositioningChain from './PositioningChain';
import ExperienceMetrics from './ExperienceMetrics';
import RoleClarity from './RoleClarity';
import DecisionInterface from './DecisionInterface';
import ClosingStatement from './ClosingStatement';

// Props contract: every section receives its data slice + locale
export interface SectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  locale: Locale;
}

// SECTION_REGISTRY — Exhaustive map keyed by component name
export const SECTION_REGISTRY: Record<keyof SectionDataMap, ComponentType<SectionProps>> = {
  HeroSection,
  IntroductoryStatement,
  PositioningChain,
  ExperienceMetrics,
  RoleClarity,
  DecisionInterface,
  ClosingStatement,
};
