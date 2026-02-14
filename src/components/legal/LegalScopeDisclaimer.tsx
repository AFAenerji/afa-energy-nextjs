'use client';

interface LegalScopeDisclaimerProps {
  className?: string;
}

export default function LegalScopeDisclaimer({ className = '' }: LegalScopeDisclaimerProps) {
  return (
    <div className={`bg-[#F5F5F5] p-4 text-xs leading-relaxed ${className}`}>
      <p className="text-[#333333] font-normal">
        Değerlendirmeler teknik ve ticari niteliktedir. Hukuki tavsiye niteliği taşımaz. Nihai yatırım kararı yatırımcı sorumluluğundadır.
      </p>
    </div>
  );
}
