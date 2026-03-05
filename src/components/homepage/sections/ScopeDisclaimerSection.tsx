import type { ScopeDisclaimerData } from "@/types/homepage";

type Props = { 
  data: ScopeDisclaimerData 
};

export default function ScopeDisclaimerSection({ data }: Props) {
  if (!data?.text) return null;

  return (
    <section className="w-full bg-afa-neutral-50 py-10 md:py-12">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <p className="text-sm text-afa-neutral-500 leading-relaxed">{data.text}</p>
      </div>
    </section>
  );
}
