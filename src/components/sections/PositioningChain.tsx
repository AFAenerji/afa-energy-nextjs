import type { PositioningChainData } from "@/types/homepage";

type Props = {
  data: PositioningChainData;
};

export default function PositioningChain({ data }: Props) {
  return (
    <section className="w-full bg-[#F5F5F5] py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 w-full">
        
        {/* Header Left-Aligned */}
        <div className="max-w-xl mb-14">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#28AFB0] mb-3">
            METODOLOJİ
          </p>
          <h2 className="text-3xl font-bold text-[#0B1F1E] tracking-tight mb-4">
            {data.title}
          </h2>
          <p className="text-base text-[#666666] leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* 4-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {data.cards.map((card) => (
            <div 
              key={card.id}
              className="bg-white border border-[#E0E0E0] rounded-[4px] p-6 lg:p-8 flex flex-col flex-grow hover:border-[#CCCCCC] hover:scale-[1.02] hover:shadow-lg transition-all duration-300"
            >
              {/* Card Header */}
              <div className="mb-4">
                <span className="text-sm font-mono font-bold text-[#28AFB0] mb-3 block">
                  {card.id}
                </span>
                <h3 className="text-lg font-bold text-[#0B1F1E] leading-snug tracking-tight whitespace-normal min-h-[64px]">
                  {card.title}
                </h3>
              </div>
              
              {/* Description */}
              <p className="text-sm text-[#5A5A5A] leading-relaxed flex-grow">
                {card.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
