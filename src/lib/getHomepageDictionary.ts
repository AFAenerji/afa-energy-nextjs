import type { Locale } from '@/lib/i18n';
import type { HomepageDictionary } from '@/types/homepage';

const dictionaries: Record<Locale, () => Promise<HomepageDictionary>> = {
  tr: () => import('@/content/tr/homepage.json').then((m) => m.default as unknown as HomepageDictionary),
  en: () => import('@/content/en/homepage.json').then((m) => m.default as unknown as HomepageDictionary),
  ro: () => import('@/content/ro/homepage.json').then((m) => m.default as unknown as HomepageDictionary),
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

  return json;
}
