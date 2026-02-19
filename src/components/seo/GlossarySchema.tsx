import type { GlossaryTerm } from '@/types/homepage';

type Props = {
  terms: GlossaryTerm[];
  locale: string;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://afaenergy.eu';

function slugify(term: string): string {
  return term
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export default function GlossarySchema({ terms, locale }: Props) {
  if (!terms?.length) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'AFA Energy Technical Glossary',
    description: 'Key technical terms for renewable energy investment in Romania.',
    url: `${SITE_URL}/${locale}/knowledge-center`,
    hasDefinedTerm: terms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.definition,
      url: `${SITE_URL}/${locale}/knowledge-center#${slugify(t.term)}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
