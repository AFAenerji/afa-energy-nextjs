# Claude Code Fix: B2 Status Card Pill Redesign
# Component: B2BizKimiz.tsx
# Date: March 2026
# Do NOT modify: globals.css, Header.tsx, Footer.tsx

---

## OVERVIEW

Replace the current status card bar design in B2BizKimiz.tsx with the
approved pill (inset) style. Only the status bar element changes —
card layout, content, and photo column are untouched.

---

## STATUS BAR — REPLACE EXISTING IMPLEMENTATION

Find the status bar element inside each status card.
Replace with this exact spec:

```tsx
<div style={{
  width: '36px',
  minHeight: '76px',
  borderRadius: '50px',
  flexShrink: 0,
  marginRight: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: BAR_GRADIENT,   // see color matrix below
  boxShadow: `
    inset 0 3px 6px rgba(0,0,0,0.30),
    inset 0 -1px 3px rgba(255,255,255,0.15),
    inset 2px 0 5px rgba(0,0,0,0.20)
  `
}}>
  <span style={{
    writingMode: 'vertical-rl',
    transform: 'rotate(180deg)',
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: LABEL_COLOR   // see color matrix below
  }}>
    {bar.label}
  </span>
</div>
```

---

## COLOR MATRIX

Card 1 — İlerlenebilir (ONAY):
  BAR_GRADIENT:  'linear-gradient(180deg, #1E9A9B 0%, #34C5C6 100%)'
  LABEL_COLOR:   '#FFFFFF'
  border-left:   4px solid #28AFB0
  title color:   #28AFB0
  hover bg:      rgba(40,175,176,0.06)

Card 2 — Koşullu (BEKLE):
  BAR_GRADIENT:  'linear-gradient(180deg, #E6B800 0%, #FFD740 100%)'
  LABEL_COLOR:   '#0F2E2C'   ← ANCHOR-4 Gold Zone rule
  border-left:   4px solid #FFCB00
  title color:   #C9950A
  hover bg:      rgba(255,203,0,0.06)

Card 3 — Olumsuz (RET):
  BAR_GRADIENT:  'linear-gradient(180deg, #D94542 0%, #F47572 100%)'
  LABEL_COLOR:   '#FFFFFF'
  border-left:   4px solid #F25F5C
  title color:   #F25F5C
  hover bg:      rgba(242,95,92,0.06)

---

## BAR LABELS (from JSON)

TR:  ONAY / BEKLE / RET
EN:  VIABLE / CONDITIONAL / NEGATIVE
RO:  VIABIL / CONDIȚIONAT / NEGATIV

Update messages/tr/hakkimizda.json, messages/en/hakkimizda.json,
messages/ro/hakkimizda.json — add or update bar label fields.

---

## CARD STRUCTURE (unchanged)

```tsx
<div style={{
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  minHeight: '120px',
  padding: '22px',
  marginBottom: '16px',
  borderRadius: '12px',
  border: '1px solid #E5E7EB',
  borderLeft: '4px solid BORDER_COLOR',
  background: '#FFFFFF',
  maxWidth: '480px',
  transition: 'background-color 120ms linear, box-shadow 120ms linear'
}}>
  {/* pill bar */}
  {/* card content */}
</div>
```

Hover (apply via onMouseEnter/onMouseLeave or CSS class):
  background-color: HOVER_BG
  box-shadow: 0 2px 4px rgba(0,0,0,0.06), 0 8px 16px rgba(0,0,0,0.08)

---

## RULES

1. Gradient direction: 180deg (dark → light) — do NOT reverse
2. box-shadow: inset only — no outer shadow on the bar
3. BEKLE label color: #0F2E2C — Gold Zone rule applies
4. border-left: 4px — overrides the 1px general border
5. Hover: background-color + box-shadow / 120ms linear only
6. transform: FORBIDDEN on hover
7. All colors via inline style — no Tailwind opacity modifiers
8. minHeight: 120px on card — three cards equal height

---

## BUILD

1. Run: `npm run build`
2. Report: files changed, build result, page count, TypeScript errors
3. If build fails: STOP. Report exact error. Make no further changes.
