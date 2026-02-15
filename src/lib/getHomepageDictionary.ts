import type { Locale } from '@/lib/i18n';
import type { HomepageDictionary, HomepageContentV5 } from '@/types/homepage';

const dictionaries: Record<Locale, () => Promise<HomepageContentV5>> = {
  tr: () => import('@/content/tr/homepage.json').then((m) => m.default as unknown as HomepageContentV5),
  en: () => import('@/content/en/homepage.json').then((m) => m.default as unknown as HomepageContentV5),
  ro: () => import('@/content/ro/homepage.json').then((m) => m.default as unknown as HomepageContentV5),
};

export async function getHomepageDictionary(locale: Locale): Promise<HomepageDictionary> {
  const loader = dictionaries[locale];
  if (!loader) {
    throw new Error(`[Governance] No dictionary loader for locale: ${locale}`);
  }

  const json = await loader();

  if (!json.meta?.version) {
    throw new Error(`[Governance] Missing meta.version in dictionary for locale: ${locale}`);
  }

  return {
    meta: json.meta,
    sections: json.sections,
    data: json.data,
    locale,
  };
}
