import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/seo.config';

const ROUTES: { path: string; changeFrequency: 'weekly' | 'monthly'; priority: number }[] = [
  { path: '',          changeFrequency: 'weekly',  priority: 1.0 },
  { path: '/contact',  changeFrequency: 'monthly', priority: 0.7 },
  { path: '/investor', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/developer',       changeFrequency: 'monthly', priority: 0.8 },
  { path: '/hizmetler',     changeFrequency: 'monthly', priority: 0.9 },
  { path: '/teknik-on-degerlendirme', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/bilgi-merkezi', changeFrequency: 'monthly', priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of ROUTES) {
    for (const locale of siteConfig.locales) {
      entries.push({
        url: `${siteConfig.url}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            siteConfig.locales.map((l) => [l, `${siteConfig.url}/${l}${route.path}`])
          ),
        },
      });
    }
  }

  return entries;
}
