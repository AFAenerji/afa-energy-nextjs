import { SECTION_REGISTRY } from "./registry";
import type { HomepageContentV95, SectionBase } from "@/types/homepage";
import type { Locale } from "@/lib/i18n";

interface Props {
  sections: SectionBase[];
  data: HomepageContentV95;
  locale: Locale;
}

export default function HomepageRenderer({ sections, data, locale }: Props) {
  // 1. Filter enabled and sort by order
  const activeSections = sections
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);

  // 2. Dedupe by component + dataKey (Safety logic)
  const seen = new Set<string>();
  const uniqueSections = activeSections.filter((s) => {
    const key = `${s.component}::${s.dataKey}`;
    if (seen.has(key)) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`Duplicate section skipped: ${key} (id=${s.id})`);
      }
      return false;
    }
    seen.add(key);
    return true;
  });

  return (
    <div className="flex flex-col w-full">
      {uniqueSections.map((section) => {
        const Component = SECTION_REGISTRY[section.component as keyof typeof SECTION_REGISTRY];
        if (!Component) {
          if (process.env.NODE_ENV !== "production") {
            console.warn(`Component not found for: ${section.component}`);
          }
          return null;
        }

        const sectionData = data[section.dataKey as keyof HomepageContentV95];
        return (
          <div key={section.id} className="w-full">
            <Component data={sectionData} locale={locale} />
          </div>
        );
      })}
    </div>
  );
}
