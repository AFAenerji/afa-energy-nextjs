"use client";

import Link from "next/link";
import type { ServicesContent } from "@/content/services";
import BackgroundImageSection from "@/components/BackgroundImageSection";

type Props = {
  content: ServicesContent["hero"];
};

/**
 * ServicesHero v15.4 — BackgroundImageSection mode="hero".
 * Gradient overlay left-to-right. Badge + H1 + Desc + CTA + Pillar bar.
 * Pillar bar: semi-transparent band with 3 columns + gold dot separators.
 */
export default function ServicesHero({ content }: Props) {
  return (
    <BackgroundImageSection
      mode="hero"
      imageSrc="/images/services-hero.jpeg"
      imageAlt="Renewable energy infrastructure in Romania with wind turbines and solar panels"
      id="hero"
    >
      {/* Text content — max-w-[720px] */}
      <div style={{ maxWidth: "720px" }}>
        {/* Badge */}
        <span
          style={{
            display: "inline-block",
            backgroundColor: "#FFCB00",
            color: "#0F2E2C",
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            borderRadius: "6px",
            padding: "6px 16px",
            marginBottom: "24px",
          }}
        >
          {content.badge}
        </span>

        {/* H1 */}
        <h1
          id="hero-title"
          style={{
            color: "#FFFFFF",
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: "24px",
            maxWidth: "720px",
          }}
        >
          {content.title}
        </h1>

        {/* Description */}
        <p
          style={{
            color: "rgba(255,255,255,0.88)",
            fontSize: "clamp(15px, 2vw, 18px)",
            lineHeight: 1.7,
            maxWidth: "640px",
            marginBottom: "32px",
          }}
        >
          {content.description}
        </p>

        {/* Primary CTA */}
        <Link
          href={content.ctaHref}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFCB00",
            color: "#0F2E2C",
            fontWeight: 700,
            borderRadius: "6px",
            padding: "16px 32px",
            fontSize: "16px",
            textDecoration: "none",
            border: "none",
            transition: "filter 120ms linear",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.filter = "brightness(1.05)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.filter = "none";
          }}
        >
          {content.cta}
        </Link>
      </div>

      {/* Pillar bar — full width within max-w-7xl container, marginTop 48px */}
      <div
        style={{
          backgroundColor: "rgba(15,46,44,0.65)",
          padding: "16px 24px",
          minHeight: "72px",
          marginTop: "48px",
          borderRadius: "6px",
        }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {content.pillars.map((pillar, i) => (
            <div key={pillar.label} className="flex items-center gap-4">
              {/* Gold dot separator (not before first) */}
              {i > 0 && (
                <div
                  className="hidden md:block flex-shrink-0"
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#FFCB00",
                  }}
                />
              )}
              <div>
                <p
                  style={{
                    color: "#FFFFFF",
                    fontSize: "14px",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    margin: 0,
                    marginBottom: "2px",
                  }}
                >
                  {pillar.label}
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.80)",
                    fontSize: "13px",
                    margin: 0,
                  }}
                >
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BackgroundImageSection>
  );
}
