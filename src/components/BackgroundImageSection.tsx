import Image from "next/image";

type Props = {
  mode: "hero" | "break";
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
};

/**
 * BackgroundImageSection — shared hero/photo-break wrapper.
 * Hero: gradient overlay, left-aligned, full-height. Children handle own max-widths.
 * Break: solid overlay, center-aligned, fixed height.
 * Falls back to solid #0F2E2C bg when imageSrc is empty.
 */
export default function BackgroundImageSection({
  mode,
  imageSrc,
  imageAlt,
  children,
  className = "",
  id,
}: Props) {
  const isHero = mode === "hero";
  const hasImage = imageSrc.length > 0;

  const wrapperHeight = isHero
    ? "min-h-[600px] lg:min-h-screen"
    : "h-[260px] md:h-[340px] lg:h-[380px]";

  const textAlign = isHero ? "text-left" : "text-center";

  const overlayStyle: React.CSSProperties = isHero
    ? {
        background:
          "linear-gradient(to right, rgba(15,46,44,0.85) 0%, rgba(15,46,44,0.55) 50%, rgba(15,46,44,0.25) 100%)",
      }
    : {
        backgroundColor: "rgba(15,46,44,0.60)",
      };

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${isHero ? "flex flex-col justify-center" : "flex items-center"} ${wrapperHeight} ${className}`}
      style={!hasImage ? { backgroundColor: "#0F2E2C" } : undefined}
    >
      {/* Background image */}
      {hasImage && (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
          priority={isHero}
        />
      )}

      {/* Overlay */}
      {hasImage && (
        <div
          className="absolute inset-0 z-[1]"
          style={overlayStyle}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      {isHero ? (
        <div
          className={`relative z-[2] mx-auto w-full max-w-7xl px-6 lg:px-8 pt-24 pb-16 ${textAlign}`}
        >
          {children}
        </div>
      ) : (
        <div
          className={`relative z-[2] mx-auto w-full px-6 lg:px-8 max-w-[640px] ${textAlign} flex flex-col items-center justify-center h-full`}
        >
          {children}
        </div>
      )}
    </section>
  );
}
