import type { Locale } from "@/lib/i18n";
import type { TimelineStageData } from "@/app/[locale]/services/types";
import TimelineStage from "./TimelineStage";

type Props = {
  locale: Locale;
  label: string;
  title: string;
  intro: string;
  stages: TimelineStageData[];
};

/**
 * ServiceTimeline v15.4 — Section label badge + H2 + intro + 6 stages.
 * bg: white. Container: max-w-4xl (960px).
 */
export default function ServiceTimeline({
  label,
  title,
  intro,
  stages,
}: Props) {
  return (
    <section
      id="technical-validation"
      className="py-16 px-4 md:py-20 md:px-6 lg:py-24 lg:px-8"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="mx-auto" style={{ maxWidth: "960px" }}>
        {/* Section label badge */}
        <div className="text-center" style={{ marginBottom: "16px" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "#F5F5F5",
              color: "#18625F",
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              borderRadius: "4px",
              padding: "4px 12px",
            }}
          >
            {label}
          </span>
        </div>

        {/* H2 */}
        <h2
          id="technical-validation-title"
          className="text-center"
          style={{
            color: "#0F2E2C",
            fontWeight: 700,
            fontSize: "clamp(22px, 3vw, 32px)",
            marginBottom: "16px",
          }}
        >
          {title}
        </h2>

        {/* Intro */}
        {intro && (
          <p
            className="text-center mx-auto"
            style={{
              color: "#4B5563",
              fontSize: "16px",
              lineHeight: 1.75,
              maxWidth: "640px",
              marginBottom: "40px",
            }}
          >
            {intro}
          </p>
        )}

        {/* Timeline stages */}
        <div className="flex flex-col" style={{ marginTop: "32px" }}>
          {stages.map((stage, index) => (
            <TimelineStage
              key={stage.number}
              stage={stage}
              isLast={index === stages.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
