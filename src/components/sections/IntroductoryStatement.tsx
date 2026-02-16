import type { IntroData } from "@/types/homepage";

type Props = {
  data: IntroData;
};

export default function IntroductoryStatement({ data }: Props) {
  // Fallback data
  const bullets = data.bullets || [
    "Şebeke Bağlantı Zekası",
    "Yatırımcı Tarafı Model",
    "IC-Ready Raporlama"
  ];

  return (
    <section className="w-full bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Yellow Line + Title + Dash List */}
          <div className="lg:col-span-5">
            <div className="w-12 h-1 bg-[#FFCB00] mb-8" />
            
            {/* Title directly (No "Değer Önerisi" label) */}
            <h2 className="text-3xl font-bold text-[#0B1F1E] leading-tight mb-8">
              {data.heading}
            </h2>

            <div className="flex flex-col gap-4">
              {bullets.map((label: string, idx: number) => (
                <div key={idx} className="flex gap-4 items-start">
                  {/* Dash Bullet */}
                  <span className="text-[#18625F] font-bold shrink-0 mt-0.5 leading-none text-lg">
                    —
                  </span>
                  <span className="text-base font-medium text-[#3A3A3A] leading-relaxed">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Paragraphs */}
          <div className="lg:col-span-7 lg:pt-2">
            <div className="space-y-6">
              {data.paragraphs.map((text, index) => (
                <p key={index} className="text-lg leading-relaxed text-slate-600">
                  {text}
                </p>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
