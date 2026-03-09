import { loadInvestorProfileMessages } from '@/i18n/loadInvestorProfileMessages';
import InvestorProfileClient from './InvestorProfileClient';
import { Locale, locales } from '@/lib/i18n';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function InvestorProfilePage({ params }: PageProps) {
  const { locale } = await params;
  const normalizedLocale = locale === 'en' ? 'en' : 'tr';
  const initialMessages = await loadInvestorProfileMessages(normalizedLocale);

  return (
    <InvestorProfileClient
      initialLocale={normalizedLocale}
      initialMessages={initialMessages}
    />
  );
}
