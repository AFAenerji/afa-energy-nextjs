// Why AFA Section — SVG Icons
// All: 32x32, stroke afa-accent (#28AFB0), fill="none", aria-hidden="true"

const iconProps = {
  width: 32,
  height: 32,
  fill: "none",
  stroke: "#28AFB0",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

export function IndependenceIcon() {
  return (
    <svg viewBox="0 0 32 32" {...iconProps}>
      <circle cx="16" cy="16" r="12" />
      <path d="M10 16l4 4 8-8" />
    </svg>
  );
}

export function GridRealityIcon() {
  return (
    <svg viewBox="0 0 32 32" {...iconProps}>
      <rect x="4" y="6" width="24" height="18" rx="2" />
      <line x1="4" y1="15" x2="28" y2="15" />
      <line x1="16" y1="6" x2="16" y2="24" />
      <circle cx="16" cy="15" r="2" fill="#28AFB0" />
    </svg>
  );
}

export function DecisionDisciplineIcon() {
  return (
    <svg viewBox="0 0 32 32" {...iconProps}>
      <path d="M16 3l3.5 9.5H29l-7.5 5.5 3 9.5L16 22l-8.5 5.5 3-9.5L3 12.5h9.5z" />
    </svg>
  );
}

export function InvestorFocusIcon() {
  return (
    <svg viewBox="0 0 32 32" {...iconProps}>
      <circle cx="16" cy="16" r="12" />
      <line x1="16" y1="8" x2="16" y2="24" />
      <line x1="8" y1="16" x2="24" y2="16" />
    </svg>
  );
}
