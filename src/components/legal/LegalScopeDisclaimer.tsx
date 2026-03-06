import { Locale, getTranslation } from '@/lib/i18n';

interface LegalScopeDisclaimerProps {
  locale: Locale;
}

export default function LegalScopeDisclaimer({ locale }: LegalScopeDisclaimerProps) {
  const t = (key: keyof import('@/lib/i18n').Translations) => getTranslation(locale, key);

  return (
    <div className="max-w-3xl mx-auto my-8 px-6 py-4 border border-white/10 rounded bg-white/5">
      <p className="text-sm text-white/70 text-center leading-relaxed">
        {t('pageDisclaimer')}
      </p>
    </div>
  );
}
