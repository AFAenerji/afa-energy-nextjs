import type { PhotoBreakData } from "@/app/[locale]/services/types";
import BackgroundImageSection from "@/components/BackgroundImageSection";

type Props = {
  data: PhotoBreakData;
};

/**
 * PhotoBreak v15.4 — BackgroundImageSection mode="break".
 * Solid overlay rgba(15,46,44,0.60). Center-aligned text.
 * Falls back to solid #0F2E2C bg when image doesn't exist.
 */
export default function PhotoBreak({ data }: Props) {
  // TODO: Replace solid fallback with actual image files when available
  // photo-break-transition.jpg and photo-break-breathe.jpg
  const hasImage = data.imageSrc.length > 0;

  return (
    <BackgroundImageSection
      mode="break"
      imageSrc={hasImage ? data.imageSrc : ""}
      imageAlt={data.imageAlt}
      id={data.id}
    >
      {/* Main text */}
      <p
        style={{
          color: "#FFFFFF",
          fontWeight: 700,
          fontSize: "clamp(20px, 3vw, 26px)",
          margin: 0,
          marginBottom: data.subText ? "12px" : 0,
        }}
      >
        {data.mainText}
      </p>

      {/* Optional sub text */}
      {data.subText && (
        <p
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: "15px",
            fontStyle: "italic",
            margin: 0,
          }}
        >
          {data.subText}
        </p>
      )}
    </BackgroundImageSection>
  );
}
