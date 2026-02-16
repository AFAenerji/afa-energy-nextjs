import type { RoleClarityData } from "@/types/homepage";

type Props = {
  data: RoleClarityData;
};

export default function RoleClarity({ data }: Props) {
  return (
    <section className="w-full bg-[#F5F5F5] py-24">
      <div className="mx-auto max-w-6xl px-8">
        
        {/* Header */}
        <div className="max-w-xl mb-12">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#28AFB0] mb-3">
            BAĞIMSIZLIK SINIRI
          </p>
          <h2 className="text-2xl font-bold text-[#0B1F1E]">
            {data.title}
          </h2>
        </div>

        {/* 2 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* AFA YAPAR */}
          <div className="bg-white border border-[#E0E0E0] rounded-[4px] p-8 h-full">
            <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-[#18625F] mb-6 pb-4 border-b border-slate-100">
              {data.do.title}
            </h3>
            <ul className="flex flex-col gap-4">
              {data.do.items.map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span className="text-[#18625F] font-bold shrink-0 mt-0.5 leading-none">—</span>
                  <span className="text-sm text-[#333333] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* AFA YAPMAZ */}
          <div className="bg-white border border-[#E0E0E0] rounded-[4px] p-8 h-full">
            <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-[#666666] mb-6 pb-4 border-b border-slate-100">
              {data.dont.title}
            </h3>
            <ul className="flex flex-col gap-4">
              {data.dont.items.map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span className="text-[#999999] font-bold shrink-0 mt-0.5 leading-none">—</span>
                  <span className="text-sm text-[#666666] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Closing Sentence - Plain */}
        <p className="mt-10 text-sm text-[#666666] leading-relaxed max-w-2xl border-l-4 border-[#CCCCCC] pl-4">
          {data.closing}
        </p>

      </div>
    </section>
  );
}
