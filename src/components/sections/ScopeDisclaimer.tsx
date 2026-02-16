import type { ScopeDisclaimerData } from "@/types/homepage";
import type { Locale } from "@/lib/i18n";

type Props = {
  data: ScopeDisclaimerData;
  locale: Locale;
};

export default function ScopeDisclaimer({ data }: Props) {
  if (!data?.text) return null;

  return (
    <section className="w-full bg-[#F5F5F5] py-10 md:py-12">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <p className="text-sm text-[#666666] leading-relaxed">{data.text}</p>
      </div>
    </section>
  );
}
