import { SECTION_REGISTRY } from "./registry";
import type { SectionBase, HomepageContentV95 } from "@/types/homepage";
import type { Locale } from "@/lib/i18n";

type Props = {
  sections: SectionBase[];
  data: HomepageContentV95;
  locale: Locale;
};

export default function HomepageRenderer({ sections, data, locale }: Props) {
  // Filter enabled sections and sort by order
  const activeSections = sections
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="flex flex-col w-full">
      {activeSections.map((section) => {
        const Component = SECTION_REGISTRY[section.component as keyof typeof SECTION_REGISTRY];

        if (!Component) {
          console.warn(`Component not found for: ${section.component}`);
          return null;
        }

        const sectionData = data[section.dataKey as keyof HomepageContentV95];

        return (
          <Component 
            key={section.id} 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data={sectionData as any}
            locale={locale} 
          />
        );
      })}
    </div>
  );
}
