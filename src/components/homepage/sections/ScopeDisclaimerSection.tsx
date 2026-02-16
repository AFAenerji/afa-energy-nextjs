import type { ScopeDisclaimerData } from "@/types/homepage";

type Props = { 
  data: ScopeDisclaimerData 
};

export default function ScopeDisclaimerSection({ data }: Props) {
  if (!data?.text) return null;

  return (
    <section className="w-full bg-[#F5F5F5] py-10 md:py-12">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <p className="text-sm text-[#666666] leading-relaxed">{data.text}</p>
      </div>
    </section>
  );
}
