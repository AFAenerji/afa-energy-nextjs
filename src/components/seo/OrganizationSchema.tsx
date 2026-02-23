import { SITE_URL } from '@/lib/env';

type Props = {
  locale?: string;
};

export default function OrganizationSchema({ locale = 'en' }: Props) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    name: 'AFA Energy Romania S.R.L.',
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/images/logo.png`,
    description:
      'Independent technical advisory and investment decision support for renewable energy investments in Romania.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calea GRIVIȚEI Nr. 84–98, THE MARK OFFICE, Floor 7',
      addressLocality: 'Bucharest',
      addressRegion: 'Sector 1',
      addressCountry: 'RO',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Romania',
    },
    serviceType: [
      'Technical Due Diligence',
      'ATR Analysis',
      'Investment Advisory',
      'Renewable Energy Consulting',
    ],
  };

  const sameAs: string[] = [
    'https://www.linkedin.com/company/afa-energy-romania',
  ];

  if (sameAs.length > 0) {
    schema.sameAs = sameAs;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
