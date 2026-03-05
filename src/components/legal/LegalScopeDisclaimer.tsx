'use client';

interface LegalScopeDisclaimerProps {
  className?: string;
}

export default function LegalScopeDisclaimer({ className = '' }: LegalScopeDisclaimerProps) {
  return (
    <div className={`bg-afa-neutral-50 p-4 text-xs leading-relaxed ${className}`}>
      <p className="text-afa-neutral-800 font-normal">
        Değerlendirmeler teknik ve ticari niteliktedir. Hukuki tavsiye niteliği taşımaz. Nihai yatırım kararı yatırımcı sorumluluğundadır.
      </p>
    </div>
  );
}
