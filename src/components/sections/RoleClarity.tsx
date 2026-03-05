import type { RoleClarityData } from "@/types/homepage";

type Props = {
  data: RoleClarityData;
};

export default function RoleClarity({ data }: Props) {
  return (
    <section className="w-full bg-afa-neutral-50 py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 w-full">
        
        {/* Header */}
        <div className="max-w-xl mb-12">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-afa-accent mb-3">
            BAĞIMSIZLIK SINIRI
          </p>
          <h2 className="text-2xl font-bold text-afa-deep tracking-tight">
            {data.title}
          </h2>
        </div>

        {/* 2 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* AFA YAPAR — White/Gold */}
          <div className="bg-white border border-afa-border border-l-[3px] border-l-afa-gold rounded-[4px] p-8 h-full shadow-sm">
            <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-afa-primary mb-6 pb-4 border-b border-slate-100">
              {data.do.title}
            </h3>
            <ul className="flex flex-col gap-4">
              {data.do.items.map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <svg aria-hidden="true" className="w-5 h-5 shrink-0 mt-0.5 text-afa-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-afa-neutral-800 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* AFA YAPMAZ — Gray/Dashed */}
          <div className="bg-gray-50/80 border border-dashed border-gray-300 rounded-[4px] p-8 h-full">
            <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-afa-neutral-500 mb-6 pb-4 border-b border-slate-100">
              {data.dont.title}
            </h3>
            <ul className="flex flex-col gap-4">
              {data.dont.items.map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <svg aria-hidden="true" className="w-5 h-5 shrink-0 mt-0.5 text-afa-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-sm text-afa-neutral-500 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Closing Sentence - Plain */}
        <p className="mt-10 text-sm text-afa-neutral-500 leading-relaxed max-w-2xl border-l-4 border-afa-neutral-200 pl-4">
          {data.closing}
        </p>

      </div>
    </section>
  );
}
