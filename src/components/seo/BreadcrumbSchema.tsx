import { safeJsonLd } from '@/lib/security/safeJsonLd';

type Crumb = {
  name: string;
  url: string;
};

type Props = {
  items: readonly Crumb[];
};

export default function BreadcrumbSchema({ items }: Props) {
  if (items.length === 0) return null;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
    />
  );
}
