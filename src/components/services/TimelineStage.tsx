"use client";

import Link from "next/link";
import { ImageIcon } from "lucide-react";
import type { TimelineStageData } from "@/app/[locale]/services/types";
import WarningBox from "@/components/WarningBox";

type Props = {
  stage: TimelineStageData;
  isLast: boolean;
};

/**
 * TimelineStage v15.4 — flex row with number + vertical line + content + optional image.
 * Number box: 48x48, border 2px #28AFB0, rounded-lg.
 * Vertical line: 2px #28AFB0 opacity 0.3. Hidden on last stage.
 * Image: desktop only (>=768px), placeholder with afa-light bg.
 */
export default function TimelineStage({ stage, isLast }: Props) {
  return (
    <div className="flex gap-4 pb-8">
      {/* Left column: number + vertical connector */}
      <div className="flex flex-col items-center">
        {/* Number box */}
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "8px",
            border: "2px solid #28AFB0",
            backgroundColor: "#FFFFFF",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#28AFB0",
            }}
          >
            {stage.number}
          </span>
        </div>
        {/* Vertical line */}
        {!isLast && (
          <div
            className="flex-grow mt-2"
            style={{
              width: "2px",
              backgroundColor: "#28AFB0",
              opacity: 0.3,
              minHeight: "40px",
            }}
          />
        )}
      </div>

      {/* Right column: content + image */}
      <div className="flex-1 flex gap-6">
        {/* Content */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Title + badge row */}
          <div className="flex flex-wrap items-center gap-4">
            <h3
              style={{
                fontSize: "clamp(17px, 2.5vw, 21px)",
                fontWeight: 700,
                lineHeight: 1.3,
                color: "#0F2E2C",
              }}
            >
              {stage.title}
            </h3>
            {stage.badge && (
              <span
                style={{
                  backgroundColor: "#28AFB0",
                  color: "#FFFFFF",
                  fontSize: "12px",
                  fontWeight: 700,
                  borderRadius: "4px",
                  padding: "4px 12px",
                  whiteSpace: "nowrap",
                }}
              >
                {stage.badge}
              </span>
            )}
          </div>

          {/* Optional lead */}
          {stage.lead && (
            <p
              style={{
                color: "#18625F",
                fontWeight: 600,
                fontSize: "15px",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              {stage.lead}
            </p>
          )}

          {/* Body */}
          <p
            style={{
              color: "#4B5563",
              fontSize: "16px",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            {stage.body}
          </p>

          {/* Optional extraBody */}
          {stage.extraBody && (
            <p
              style={{
                color: "#4B5563",
                fontSize: "16px",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {stage.extraBody}
            </p>
          )}

          {/* Foot */}
          <p
            style={{
              color: "#18625F",
              fontStyle: "italic",
              fontSize: "14px",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {stage.foot}
          </p>

          {/* Optional warning */}
          {stage.warning && (
            <WarningBox
              title={stage.warning.title}
              body={stage.warning.body}
              variant={stage.warning.variant}
            />
          )}

          {/* Optional result */}
          {stage.result && (
            <div
              style={{
                backgroundColor: "#F5F5F5",
                color: "#0F2E2C",
                borderRadius: "6px",
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              {stage.result}
            </div>
          )}

          {/* Optional CTA */}
          {stage.cta && (
            <Link
              href={stage.cta.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#FFCB00",
                color: "#0F2E2C",
                fontWeight: 700,
                fontSize: "14px",
                borderRadius: "6px",
                padding: "10px 24px",
                textDecoration: "none",
                border: "none",
                width: "fit-content",
                transition: "filter 120ms linear",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.filter = "brightness(1.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.filter = "none";
              }}
            >
              {stage.cta.text}
            </Link>
          )}
        </div>

        {/* Image placeholder — desktop only */}
        <div
          className="hidden md:flex items-center justify-center flex-shrink-0"
          style={{
            width: "200px",
            aspectRatio: "16 / 10",
            backgroundColor: "#F5F5F5",
            border: "1px solid #E5E7EB",
            borderRadius: "8px",
          }}
        >
          <ImageIcon size={32} color="#28AFB0" />
        </div>
      </div>
    </div>
  );
}
