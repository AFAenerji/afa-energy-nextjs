/**
 * Technical Assessment Module v12.1 — Page Contract
 * Interface definitions for flows, sections, form, and dictionary.
 */

/* ── Flow Step ── */
export interface FlowStep {
  number: string;
  title: string;
  description: string;
  details?: string[];
}

/* ── Service Flow (A, B, C) ── */
export interface ServiceFlow {
  id: 'A' | 'B' | 'C';
  accentColor: string;
  title: string;
  subtitle: string;
  steps: FlowStep[];
}

/* ── Hizmet Pusulası (Service Compass) ── */
export interface ServiceCompass {
  title: string;
  subtitle: string;
  description: string;
}

/* ── AFA Difference Section ── */
export interface AfaDifference {
  title: string;
  paragraphs: string[];
}

/* ── Form Content (reused from existing TechnicalAssessmentForm) ── */
export interface FormStepOption {
  value: string;
  label: string;
}

export interface FormContent {
  stepLabels: readonly string[];
  step1: {
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailHint: string;
  };
  step2: {
    title: string;
    atrLabel: string;
    atrOptions: readonly FormStepOption[];
    capacityLabel: string;
    capacityPlaceholder: string;
    phaseLabel: string;
    phaseOptions: readonly FormStepOption[];
  };
  step3: {
    title: string;
    dataLabel: string;
    dataOptions: readonly FormStepOption[];
  };
  flowLabel: string;
  flowPlaceholder: string;
  next: string;
  prev: string;
  submit: string;
  submitting: string;
  thankYou: {
    title: string;
    message: string;
    steps: readonly string[];
    backLabel: string;
  };
  validation: {
    required: string;
    emailInvalid: string;
  };
}

/* ── Hero Section ── */
export interface HeroContent {
  title: string;
  subtitle: string;
}

/* ── Meta ── */
export interface PageMeta {
  title: string;
  description: string;
}

/* ── Full Assessment Dictionary ── */
export interface AssessmentDictionary {
  meta: PageMeta;
  hero: HeroContent;
  serviceCompass: ServiceCompass;
  flows: ServiceFlow[];
  afaDifference: AfaDifference;
  form: FormContent;
  trustSignal: string;
}
