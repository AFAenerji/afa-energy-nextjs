"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import type { ServicesContent } from "@/content/services";

type Props = {
  content: ServicesContent["block1"];
  bridge: string;
};

/**
 * ProjectSourcing v15.4 — Checklist + dual card grid + transition paragraph.
 * bg: afa-light. Cards: investor (border-top afa-primary-dark) + developer (border-top afa-primary).
 */
export default function ProjectSourcing({ content, bridge }: Props) {
  return (
    <section
      id="project-sourcing"
      className="py-16 px-4 md:py-20 md:px-6 lg:py-24 lg:px-8"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
        {/* H2 */}
        <h2
          id="project-sourcing-title"
          style={{
            color: "#0F2E2C",
            fontWeight: 700,
            fontSize: "clamp(22px, 3vw, 32px)",
            marginBottom: "16px",
          }}
        >
          {content.title}
        </h2>

        {/* Intro */}
        <p
          style={{
            color: "#4B5563",
            fontSize: "16px",
            lineHeight: 1.75,
            marginBottom: "24px",
          }}
        >
          {content.body}
        </p>

        {/* Checklist */}
        <ul className="flex flex-col gap-3" style={{ listStyle: "none", padding: 0, marginBottom: "24px" }}>
          {content.checks.map((check) => (
            <li key={check} className="flex items-start gap-3">
              <Check
                size={20}
                style={{ color: "#28AFB0", flexShrink: 0, marginTop: "2px" }}
                aria-hidden="true"
              />
              <span style={{ color: "#4B5563", fontSize: "16px", lineHeight: 1.5 }}>
                {check}
              </span>
            </li>
          ))}
        </ul>

        {/* Purpose */}
        <p
          style={{
            color: "#4B5563",
            fontSize: "16px",
            lineHeight: 1.75,
            marginBottom: "32px",
          }}
        >
          {content.purpose}
        </p>

        {/* Dual card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: "32px" }}>
          {/* Investor card */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              borderTop: "3px solid #18625F",
              padding: "28px",
            }}
          >
            <h3
              style={{
                fontWeight: 700,
                color: "#0F2E2C",
                fontSize: "18px",
                marginBottom: "12px",
              }}
            >
              {content.ctaInvestor.text === "Yatırımcı Sayfasına Git"
                ? "Yatırımcılar İçin Sunduğumuz"
                : "What We Offer Investors"}
            </h3>
            <p
              style={{
                color: "#4B5563",
                fontSize: "14px",
                lineHeight: 1.7,
                marginBottom: "20px",
              }}
            >
              {content.ctaInvestor.micro}
            </p>
            <Link
              href={content.ctaInvestor.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                backgroundColor: "#FFCB00",
                color: "#0F2E2C",
                fontWeight: 700,
                fontSize: "14px",
                borderRadius: "6px",
                padding: "10px 24px",
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
              {content.ctaInvestor.text}
            </Link>
          </div>

          {/* Developer card */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              borderTop: "3px solid #28AFB0",
              padding: "28px",
            }}
          >
            <h3
              style={{
                fontWeight: 700,
                color: "#0F2E2C",
                fontSize: "18px",
                marginBottom: "12px",
              }}
            >
              {content.ctaDeveloper.text === "Geliştirici Sayfasına Git"
                ? "Geliştirici İçin Sunduğumuz"
                : "What We Offer Developers"}
            </h3>
            <p
              style={{
                color: "#4B5563",
                fontSize: "14px",
                lineHeight: 1.7,
                marginBottom: "20px",
              }}
            >
              {content.ctaDeveloper.micro}
            </p>
            <Link
              href={content.ctaDeveloper.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                backgroundColor: "transparent",
                color: "#18625F",
                fontWeight: 700,
                fontSize: "14px",
                borderRadius: "6px",
                padding: "10px 24px",
                textDecoration: "none",
                border: "2px solid #18625F",
                transition: "border-color 120ms linear",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#28AFB0";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#18625F";
              }}
            >
              {content.ctaDeveloper.text}
            </Link>
          </div>
        </div>

        {/* Routing paragraph */}
        <p
          style={{
            color: "#4B5563",
            fontSize: "16px",
            lineHeight: 1.75,
            marginBottom: "32px",
          }}
        >
          {content.purpose}
        </p>

        {/* Transition paragraph — gold left border */}
        <div
          style={{
            borderLeft: "2px solid #FFCB00",
            paddingLeft: "24px",
            maxWidth: "780px",
          }}
        >
          <p
            style={{
              fontStyle: "italic",
              color: "#0F2E2C",
              fontSize: "16px",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            {bridge}
          </p>
        </div>
      </div>
    </section>
  );
}
