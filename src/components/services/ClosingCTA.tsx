"use client";

import Link from "next/link";
import type { ServicesContent } from "@/content/services";

type Props = {
  content: ServicesContent["closing"];
};

/**
 * ClosingCTA v15.4 — bg afa-deep, center-aligned.
 * Primary CTA: gold bg, deep text. Secondary: border white/40, white text.
 * Tertiary: gold text, underline on hover.
 */
export default function ClosingCTA({ content }: Props) {
  return (
    <section
      id="get-started"
      className="py-16 px-4 md:py-20 md:px-6 lg:py-24 lg:px-8"
      style={{ backgroundColor: "#0F2E2C" }}
    >
      <div className="mx-auto text-center" style={{ maxWidth: "660px" }}>
        {/* H2 */}
        <h2
          id="get-started-title"
          style={{
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: "clamp(22px, 3vw, 32px)",
            marginBottom: "16px",
          }}
        >
          {content.title}
        </h2>

        {/* Body */}
        <p
          style={{
            color: "rgba(255,255,255,0.80)",
            fontSize: "16px",
            lineHeight: 1.75,
            marginBottom: "40px",
          }}
        >
          {content.body}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center" style={{ marginBottom: "8px" }}>
          {/* Primary — Investor */}
          <div className="flex flex-col items-center">
            <Link
              href={content.ctaInvestor.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#FFCB00",
                color: "#0F2E2C",
                fontWeight: 700,
                fontSize: "16px",
                borderRadius: "6px",
                padding: "10px 24px",
                textDecoration: "none",
                border: "none",
                marginBottom: "8px",
                transition: "filter 120ms linear",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.filter = "brightness(1.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.filter = "none";
              }}
            >
              {content.ctaInvestor.text}
            </Link>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.60)" }}>
              {content.ctaInvestor.micro}
            </span>
          </div>

          {/* Secondary — Developer */}
          <div className="flex flex-col items-center">
            <Link
              href={content.ctaDeveloper.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "16px",
                borderRadius: "6px",
                padding: "10px 24px",
                textDecoration: "none",
                border: "2px solid rgba(255,255,255,0.40)",
                marginBottom: "8px",
                transition: "border-color 120ms linear",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.70)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.40)";
              }}
            >
              {content.ctaDeveloper.text}
            </Link>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.60)" }}>
              {content.ctaDeveloper.micro}
            </span>
          </div>
        </div>

        {/* Tertiary link */}
        <div style={{ marginTop: "24px" }}>
          <Link
            href={content.ctaTertiary.href}
            style={{
              color: "#FFCB00",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "text-decoration-color 120ms linear",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.textDecoration = "underline";
              (e.currentTarget as HTMLElement).style.textUnderlineOffset = "4px";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.textDecoration = "none";
            }}
          >
            {content.ctaTertiary.text} &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
