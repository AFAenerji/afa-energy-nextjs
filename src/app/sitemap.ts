import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/seo.config';
import { getLocalizedSlug } from '@/lib/slugs';
import type { Locale } from '@/lib/i18n';

const ROUTES: { canonical: string; changeFrequency: 'weekly' | 'monthly'; priority: number }[] = [
  { canonical: '',                    changeFrequency: 'weekly',  priority: 1.0 },
  { canonical: 'contact',            changeFrequency: 'monthly', priority: 0.7 },
  { canonical: 'investor',           changeFrequency: 'monthly', priority: 0.8 },
  { canonical: 'developer',          changeFrequency: 'monthly', priority: 0.8 },
  { canonical: 'services',           changeFrequency: 'monthly', priority: 0.9 },
  { canonical: 'technical-assessment', changeFrequency: 'monthly', priority: 0.8 },
  { canonical: 'knowledge-center',   changeFrequency: 'monthly', priority: 0.9 },
  { canonical: 'cases',              changeFrequency: 'monthly', priority: 0.8 },
  { canonical: 'about',              changeFrequency: 'monthly', priority: 0.7 },
  { canonical: 'atr-matrix',         changeFrequency: 'monthly', priority: 0.8 },
];

function localizedPath(canonical: string, locale: Locale): string {
  if (!canonical) return `/${locale}`;
  const slug = getLocalizedSlug(canonical, locale) ?? canonical;
  return `/${locale}/${slug}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of ROUTES) {
    for (const locale of siteConfig.locales) {
      entries.push({
        url: `${siteConfig.url}${localizedPath(route.canonical, locale as Locale)}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            siteConfig.locales.map((l) => [
              l,
              `${siteConfig.url}${localizedPath(route.canonical, l as Locale)}`,
            ])
          ),
        },
      });
    }
  }

  return entries;
}
