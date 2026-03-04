// Services Page v15.4 — Type definitions

export interface StageWarning {
  title: string;
  body: string;
  variant: "important";
}

export interface StageCTA {
  text: string;
  href: string;
}

export interface StageImage {
  src: string;
  alt: string;
}

export interface TimelineStageData {
  number: string; // "01"–"06"
  title: string;
  badge?: string;
  lead?: string;
  body: string;
  extraBody?: string;
  foot: string;
  result?: string;
  cta?: StageCTA;
  warning?: StageWarning;
  image: StageImage;
}

export interface WhyAfaCard {
  icon: string; // Lucide icon name
  title: string;
  body: string;
}

export interface PositioningData {
  question1: string;
  question2: string;
  paragraphs: string[];
  closing: string;
}

export interface PhotoBreakData {
  id: string;
  imageSrc: string;
  imageAlt: string;
  mainText: string;
  subText?: string;
}
