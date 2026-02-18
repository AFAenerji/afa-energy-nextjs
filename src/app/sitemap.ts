import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/seo.config';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of siteConfig.pages) {
    for (const locale of siteConfig.locales) {
      const path = page === '/' ? '' : page;

      entries.push({
        url: `${siteConfig.url}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: page === '/' ? 'weekly' : 'monthly',
        priority: page === '/' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            siteConfig.locales.map((l) => [l, `${siteConfig.url}/${l}${path}`])
          ),
        },
      });
    }
  }

  return entries;
}
