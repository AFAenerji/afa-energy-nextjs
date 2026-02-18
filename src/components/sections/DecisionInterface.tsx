import Link from "next/link";
import type { DecisionData } from "@/types/homepage";

type Props = {
  data: DecisionData;
  locale: string;
};

export default function DecisionInterface({ data, locale }: Props) {
  return (
    <section className="w-full bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* Transition Bridge */}
        <div className="mb-12">
          <div className="h-px w-full bg-[#E0E0E0]" />
          <div className="mt-3 h-[3px] w-16 bg-[#FFCB00]" />
        </div>

        <h2 className="text-2xl font-bold text-[#0B1F1E] tracking-tight mb-12 text-center">
          {data.title}
        </h2>

        {/* Centered Card Grid */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-8 lg:gap-10">
          {data.cards.map((card) => {
            const isInvestor = card.type === "investor";

            return (
              <div
                key={card.type}
                className={`
                  p-8 rounded-[4px] w-full md:w-[340px]
                  flex flex-col min-h-[220px]
                  ${isInvestor
                    ? "border-2 border-[#18625F] bg-white shadow-lg"
                    : "border border-gray-300 bg-white shadow-sm"
                  }
                `}
              >
                <h3 className={`tracking-tight mb-3 ${
                  isInvestor
                    ? "text-xl font-bold text-[#18625F]"
                    : "text-lg font-semibold text-gray-700"
                }`}>
                  {card.title}
                </h3>
                <p className="text-sm text-[#5A5A5A] leading-relaxed mb-8">
                  {card.description}
                </p>
                <div className="mt-auto">
                  <Link
                    href={`/${locale}/contact`}
                    className={`inline-flex items-center justify-center w-full rounded-[4px] px-6 py-3 text-[15px] transition-colors ${
                      isInvestor
                        ? "bg-[#FFCB00] text-[#0B1F1E] font-bold hover:bg-[#E6B800]"
                        : "border-2 border-[#18625F] text-[#18625F] font-semibold bg-transparent hover:bg-[#18625F] hover:text-white"
                    }`}
                  >
                    {data.cta}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
