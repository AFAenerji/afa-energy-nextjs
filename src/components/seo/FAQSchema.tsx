import type { FAQGroup } from '@/types/homepage';
import { safeJsonLd } from '@/lib/security/safeJsonLd';

type Props = {
  groups: FAQGroup[];
};

export default function FAQSchema({ groups }: Props) {
  const items = groups.flatMap((group) =>
    group.items.map((item) => ({
      '@type': 'Question' as const,
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: item.answer,
      },
    }))
  );

  if (items.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items,
  };

  return (
    <script
      type="application/ld+json"
    >
      {safeJsonLd(schema as Record<string, unknown>)}
    </script>
  );
}
