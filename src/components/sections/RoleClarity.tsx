import type { RoleClarityData } from "@/types/homepage";

type Props = {
  data: RoleClarityData;
};

export default function RoleClarity({ data }: Props) {
  return (
    <section className="w-full bg-[#F5F5F5] py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-xl mb-12">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#28AFB0] mb-3">
            BAĞIMSIZLIK SINIRI
          </p>
          <h2 className="text-2xl font-bold text-[#0B1F1E] tracking-tight">
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
                  <svg aria-hidden="true" className="w-5 h-5 shrink-0 mt-0.5 text-[#FFCB00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-[#333333] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* AFA YAPMAZ */}
          <div className="bg-gray-50/50 border border-[#E0E0E0] rounded-[4px] p-8 h-full">
            <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-[#666666] mb-6 pb-4 border-b border-slate-100">
              {data.dont.title}
            </h3>
            <ul className="flex flex-col gap-4">
              {data.dont.items.map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <svg aria-hidden="true" className="w-5 h-5 shrink-0 mt-0.5 text-[#999999]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
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
