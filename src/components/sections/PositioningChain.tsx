import type { PositioningChainData } from "@/types/homepage";

type Props = {
  data: PositioningChainData;
};

export default function PositioningChain({ data }: Props) {
  return (
    <section className="w-full bg-[#F5F5F5] py-24">
      <div className="mx-auto max-w-6xl px-8">
        
        {/* Header Left-Aligned */}
        <div className="max-w-xl mb-14">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#28AFB0] mb-3">
            METODOLOJİ
          </p>
          <h2 className="text-3xl font-bold text-[#0B1F1E] mb-4">
            {data.title}
          </h2>
          <p className="text-base text-[#666666] leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.cards.map((card) => (
            <div 
              key={card.id}
              className="bg-white border border-[#E0E0E0] rounded-[4px] p-8 flex flex-col min-h-[260px] hover:border-[#CCCCCC]"
            >
              {/* Card Header (Fixed Height) */}
              <div className="min-h-[80px] mb-4">
                <span className="text-sm font-mono font-bold text-[#28AFB0] mb-3 block">
                  {card.id}
                </span>
                <h3 className="text-xl font-bold text-[#0B1F1E] leading-snug line-clamp-2">
                  {card.title}
                </h3>
              </div>
              
              {/* Description */}
              <p className="text-base text-[#5A5A5A] leading-relaxed flex-1">
                {card.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
