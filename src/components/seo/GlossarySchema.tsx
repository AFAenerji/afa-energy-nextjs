import type { GlossaryTerm } from '@/types/homepage';
import { slugify } from '@/lib/slugify';
import { SITE_URL } from '@/lib/env';
import { safeJsonLd } from '@/lib/security/safeJsonLd';

type Props = {
  terms: GlossaryTerm[];
  locale: string;
};

export default function GlossarySchema({ terms, locale }: Props) {
  if (!terms?.length) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'AFA Energy Technical Glossary',
    description: 'Key technical terms for renewable energy investment in Romania.',
    url: `${SITE_URL}/${locale}#glossary`,
    hasDefinedTerm: terms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.definition,
      url: `${SITE_URL}/${locale}#${slugify(t.term)}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
    >
      {safeJsonLd(schema as Record<string, unknown>)}
    </script>
  );
}
