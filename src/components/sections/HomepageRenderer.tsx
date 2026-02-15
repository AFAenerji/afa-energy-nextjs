import { SECTION_REGISTRY } from './registry';
import type { HomepageDictionary, SectionComponentName, SectionDataMap } from '@/types/homepage';

interface HomepageRendererProps {
  dictionary: HomepageDictionary;
}

export default function HomepageRenderer({ dictionary }: HomepageRendererProps) {
  const { sections, data, locale, meta } = dictionary;

  // Filter enabled sections, then sort by order
  const sorted = sections
    .filter((s) => s.enabled !== false)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      {sorted.map((section) => {
        const componentName: SectionComponentName = section.component;
        const Component = SECTION_REGISTRY[componentName];

        // Governance: fail-fast if component is missing
        if (!Component) {
          throw new Error(
            `[Governance v${meta.version}] Component "${componentName}" not found in SECTION_REGISTRY. ` +
            `Registered: ${Object.keys(SECTION_REGISTRY).join(', ')}`
          );
        }

        const sectionData = data[section.dataKey] as SectionDataMap[typeof componentName];

        // Governance: fail-fast if data key is missing
        if (sectionData === undefined) {
          throw new Error(
            `[Governance v${meta.version}] Data key "${section.dataKey}" not found for "${componentName}". ` +
            `Available: ${Object.keys(data).join(', ')}`
          );
        }

        return (
          <Component
            key={`${section.id}-${section.order}`}
            data={sectionData}
            locale={locale}
          />
        );
      })}
    </>
  );
}
