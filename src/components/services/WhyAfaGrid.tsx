"use client";

import Link from "next/link";
import { Shield, Zap, ClipboardCheck, GitMerge } from "lucide-react";
import type { WhyAfaCard } from "@/app/[locale]/services/types";

type Props = {
  title: string;
  cards: WhyAfaCard[];
  link: { text: string; href: string };
};

const ICON_MAP: Record<string, React.ComponentType<{ size: number; color: string }>> = {
  Shield,
  Zap,
  ClipboardCheck,
  GitMerge,
};

/**
 * WhyAfaGrid v15.4 — 4-card grid with lucide icons.
 * Cards: bg white, border-top 3px afa-primary, hover border-top → afa-primary-dark.
 * Hover: border-top-color 120ms linear. Shadow stays shadow-sm.
 */
export default function WhyAfaGrid({ title, cards, link }: Props) {
  return (
    <section
      id="why-afa"
      className="py-16 px-4 md:py-20 md:px-6 lg:py-24 lg:px-8"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
        {/* H2 */}
        <h2
          id="why-afa-title"
          className="text-center"
          style={{
            color: "#0F2E2C",
            fontWeight: 700,
            fontSize: "clamp(22px, 3vw, 32px)",
            marginBottom: "32px",
          }}
        >
          {title}
        </h2>

        {/* 4-card grid */}
        <div
          className="grid gap-5"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            marginBottom: "32px",
          }}
        >
          {cards.map((card) => {
            const Icon = ICON_MAP[card.icon];
            return (
              <div
                key={card.title}
                className="why-afa-card"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "8px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  borderTop: "3px solid #28AFB0",
                  padding: "28px 24px",
                  transition: "border-color 120ms linear",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderTopColor = "#18625F";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderTopColor = "#28AFB0";
                }}
              >
                {/* Icon */}
                {Icon && (
                  <div style={{ marginBottom: "16px" }}>
                    <Icon size={32} color="#28AFB0" />
                  </div>
                )}

                {/* Title */}
                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: 700,
                    color: "#0F2E2C",
                    marginBottom: "8px",
                  }}
                >
                  {card.title}
                </h3>

                {/* Body */}
                <p
                  style={{
                    fontSize: "14px",
                    color: "#4B5563",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {card.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Methodology link */}
        <Link
          href={link.href}
          style={{
            color: "#28AFB0",
            fontSize: "14px",
            fontWeight: 600,
            textDecoration: "none",
            transition: "text-decoration-color 120ms linear",
          }}
        >
          {link.text} &rarr;
        </Link>
      </div>
    </section>
  );
}
