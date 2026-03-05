import type { Locale } from '@/lib/i18n';
import { getInvestorDictionary } from '@/lib/getInvestorDictionary';
import InvestorPageClient from './InvestorPageClient';

interface InvestorPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function InvestorPage({ params }: InvestorPageProps) {
  const { locale } = await params;
  const effectiveLocale = locale || 'tr';
  
  const initialMessages = await getInvestorDictionary(effectiveLocale);

  return (
    <InvestorPageClient 
      initialLocale={effectiveLocale} 
      initialMessages={initialMessages} 
    />
  );
}
