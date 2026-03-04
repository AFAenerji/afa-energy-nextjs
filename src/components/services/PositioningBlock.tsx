import type { PositioningData } from "@/app/[locale]/services/types";

type Props = {
  content: PositioningData;
};

/**
 * PositioningBlock v15.4 — Q1/Q2 format with 4 paragraphs.
 * Accessible: role="group", sr-only h2.
 * Q1: afa-deep, Q2: afa-primary-dark. 4 paragraphs in gray-600. Closing italic.
 */
export default function PositioningBlock({ content }: Props) {
  return (
    <section
      id="positioning"
      className="py-16 px-4 md:py-20 md:px-6 lg:py-24 lg:px-8"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div
        role="group"
        aria-labelledby="positioning-heading"
        className="mx-auto text-center"
        style={{ maxWidth: "680px" }}
      >
        <h2 id="positioning-heading" className="sr-only">
          {/* Accessibility-only heading */}
          {content.question1.replace("?", "")}
        </h2>

        {/* Question 1 — developer perspective */}
        <p
          style={{
            color: "#0F2E2C",
            fontSize: "clamp(22px, 3.5vw, 30px)",
            fontWeight: 700,
            margin: 0,
            marginBottom: "10px",
          }}
        >
          {content.question1}
        </p>

        {/* Question 2 — investor perspective */}
        <p
          style={{
            color: "#18625F",
            fontSize: "clamp(22px, 3.5vw, 30px)",
            fontWeight: 700,
            margin: 0,
            marginBottom: "40px",
          }}
        >
          {content.question2}
        </p>

        {/* 4 paragraphs */}
        <div className="flex flex-col" style={{ gap: "16px", marginBottom: "32px" }}>
          {content.paragraphs.map((p, i) => (
            <p
              key={i}
              style={{
                color: "#4B5563",
                fontSize: "17px",
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Closing italic */}
        <p
          style={{
            color: "#18625F",
            fontStyle: "italic",
            fontSize: "17px",
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          {content.closing}
        </p>
      </div>
    </section>
  );
}
