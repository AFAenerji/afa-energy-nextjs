import type { Locale } from '@/lib/i18n';
import LegalScopeDisclaimer from '@/components/legal/LegalScopeDisclaimer';

interface InvestorPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function InvestorPage({ params }: InvestorPageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <h1 className="text-3xl font-bold text-slate-900 font-heading mb-4">
        Investor Portal
      </h1>
      <p className="text-slate-600 mb-12">
        This page is under construction. Coming soon.
      </p>
      <LegalScopeDisclaimer className="max-w-xl mx-auto rounded-sm" />
    </div>
  );
}
