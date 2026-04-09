# Claude Code Instruction: ATR Matrix Interstitial Band — Final
# Component: ATRBand.tsx (EXISTING — full rewrite)
# Date: April 2026
# Do NOT modify: globals.css @theme block, Header.tsx, Footer.tsx

---

## OVERVIEW

Completely replace the current ATRBand.tsx with the two-part layout below.
Page render order is already correct — do not change page.tsx.

Position in page:
  B4 AfarklıYapan    → light bg (#F5F7F6)
  ATRBand            → white band + photo  ← this component
  B5 PiyasaDinamikleri → dark bg (#18625F)

No top/bottom gradient transitions — sharp edges are intentional.

---

## PHOTO FILE

Path: /public/images/b3-cta-photo.jpg
File is already in place — no copy needed.

---

## COMPONENT STRUCTURE

Two stacked parts inside a single <section>:

```
┌─────────────────────────────────┐
│  WHITE BAND (text content)      │
├─────────────────────────────────┤
│  PHOTO AREA (image + CTA)       │
└─────────────────────────────────┘
```

```tsx
<section style={{ width: '100%' }}>
  {/* Part 1: White band */}
  {/* Part 2: Photo area */}
</section>
```

---

## PART 1 — WHITE BAND

```tsx
<div style={{
  background: 'rgba(245,247,246,0.98)',   /* cold white — NOT pure #FFFFFF */
  padding: '40px 52px',
  textAlign: 'center',
  borderBottom: '1px solid rgba(0,0,0,0.06)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  position: 'relative',
  zIndex: 2
}}>
  <div style={{ maxWidth: '660px', margin: '0 auto' }}>

    {/* Kicker */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      marginBottom: '16px'
    }}>
      <div style={{ width: '28px', height: '1px', background: '#FFCB00', opacity: 0.9 }} />
      <span style={{
        fontSize: '11px',
        letterSpacing: '0.18em',
        color: '#FFCB00',
        fontWeight: 600,
        textTransform: 'uppercase'
      }}>
        {content.atrBand.kicker}
      </span>
      <div style={{ width: '28px', height: '1px', background: '#FFCB00', opacity: 0.9 }} />
    </div>

    {/* H2 */}
    <h2 style={{
      fontFamily: 'Montserrat, sans-serif',
      fontSize: 'clamp(26px, 3.2vw, 44px)',
      fontWeight: 800,
      color: '#0F2E2C',
      lineHeight: 1.1,
      margin: '0 0 16px'
    }}>
      {content.atrBand.h2}
    </h2>

    {/* Body */}
    <p style={{
      fontSize: '15px',
      color: 'rgba(15,46,44,0.65)',
      lineHeight: 1.72,
      margin: 0
    }}>
      {content.atrBand.body}
    </p>

  </div>
</div>
```

Background rule:
  Correct:   rgba(245,247,246,0.98)  ← cold white, approved
  Forbidden: #FFFFFF or rgba(255,255,255,1)  ← pure white, not approved

---

## PART 2 — PHOTO AREA

```tsx
<div style={{
  position: 'relative',
  minHeight: '320px',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  overflow: 'hidden'
}}>

  {/* Photo — z-index 0 */}
  <Image
    src="/images/b3-cta-photo.jpg"
    alt="Elektrik iletim direkleri"
    fill
    style={{ objectFit: 'cover', objectPosition: 'center' }}
    quality={85}
  />

  {/* Bottom gradient for CTA readability — z-index 1 */}
  <div style={{
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.20) 50%, transparent 100%)',
    zIndex: 1
  }} />

  {/* CTA wrapper — z-index 2 */}
  <div style={{
    position: 'relative',
    zIndex: 2,
    padding: '0 52px 44px',
    textAlign: 'center',
    width: '100%'
  }}>
    <Link href="/tr/atr-matrix" style={{
      display: 'inline-block',
      background: '#FFCB00',
      color: '#0F2E2C',
      fontWeight: 700,
      fontSize: '15px',
      padding: '14px 32px',
      borderRadius: '6px',
      textDecoration: 'none',
      letterSpacing: '0.01em',
      boxShadow: '0 4px 20px rgba(0,0,0,0.28), 0 2px 8px rgba(255,203,0,0.25)',
      transition: 'background-color 120ms linear'
    }}>
      {content.atrBand.cta} →
    </Link>
  </div>

</div>
```

CTA hover: background-color #E6B800 only.
NO box-shadow change on hover. NO transform. DSS ANCHOR-2.

---

## Z-INDEX LAYERS

| Layer           | z-index | Description              |
|-----------------|---------|--------------------------|
| Photo           | 0       | Bottom layer             |
| Bottom gradient | 1       | Above photo              |
| White band      | 2       | Above everything         |
| CTA wrapper     | 2       | Above gradient           |

---

## JSON CONTENT

messages/tr/hakkimizda.json — atrBand section:
```json
"atrBand": {
  "kicker": "ATR MATRİX™",
  "h2": "ATR Matrix™ ile projelerinizi değerlendirin",
  "body": "4 eksenli analiz metodolojimizle teknik riskleri erken aşamada tespit edin, yatırım kararlarınızı güçlendirin.",
  "cta": "Metodolojiyi İnceleyin"
}
```

messages/en/hakkimizda.json — atrBand section:
```json
"atrBand": {
  "kicker": "ATR MATRIX™",
  "h2": "Evaluate your projects with ATR Matrix™",
  "body": "Identify technical risks at an early stage with our 4-axis analysis methodology and strengthen your investment decisions.",
  "cta": "Explore the Methodology"
}
```

messages/ro/hakkimizda.json — atrBand section:
```json
"atrBand": {
  "kicker": "ATR MATRIX™",
  "h2": "Evaluați-vă proiectele cu ATR Matrix™",
  "body": "Identificați riscurile tehnice într-un stadiu incipient cu metodologia noastră de analiză pe 4 axe și consolidați deciziile de investiție.",
  "cta": "Explorați Metodologia"
}
```

---

## RESPONSIVE

Desktop (≥1024px):   As specified above.
Tablet (768–1023px): White band padding: '32px 40px' / Photo min-height: '280px'
Mobile (<768px):     White band padding: '28px 24px' / Photo min-height: '240px'

---

## ANCHOR COMPLIANCE

- ANCHOR-1: All colors via inline style — no hardcoded hex in className
- ANCHOR-2: CTA transition: background-color 120ms linear only. No transform. No box-shadow on hover.
- ANCHOR-3: White band uses #0F2E2C and rgba(15,46,44,0.65) — light bg, compliant
- ANCHOR-4: CTA bg #FFCB00 → text #0F2E2C. Gold Zone rule applied.
- ANCHOR-5: globals.css @theme block, Header.tsx, Footer.tsx not modified

---

## BUILD

1. Run: `npm run build`
2. Report: files changed, build result, page count, TypeScript errors
3. If build fails: STOP. Report exact error. Make no further changes.
