import type { Locale } from '@/lib/i18n';
import type { AssessmentDictionary } from '@/app/[locale]/teknik-on-degerlendirme/components/pageContract';

const dictionaries: Record<Locale, () => Promise<AssessmentDictionary>> = {
  tr: () => import('@/content/tr/assessment.json').then((m) => m.default as unknown as AssessmentDictionary),
  en: () => import('@/content/en/assessment.json').then((m) => m.default as unknown as AssessmentDictionary),
  ro: () => import('@/content/ro/assessment.json').then((m) => m.default as unknown as AssessmentDictionary),
};

export async function getAssessmentDictionary(locale: Locale): Promise<AssessmentDictionary> {
  try {
    const loader = dictionaries[locale];
    if (!loader) {
      throw new Error(`[Assessment] No dictionary loader for locale: ${locale}`);
    }
    return await loader();
  } catch (error) {
    console.warn(`[Assessment] Failed to load dictionary for locale "${locale}", falling back to "tr".`, error);
    return await dictionaries.tr();
  }
}
