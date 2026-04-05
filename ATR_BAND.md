# Claude Code Instruction: ATR Matrix™ Interstitial CTA Band
# New Component: ATRBand.tsx
# Position: Between B3DegerlendirmeCercevesi and B4AfarklıYapan
# Date: April 2026
# Do NOT modify: globals.css @theme block, Header.tsx, Footer.tsx

---

## OVERVIEW

Create a new component `src/components/hakkimizda/ATRBand.tsx`.
This component renders two stacked elements:
1. Panoramic photo band (300px height, full width)
2. Text + CTA band (light background, centered content)

Then insert it into `src/app/[locale]/about/page.tsx` between
B3DegerlendirmeCercevesi and B4AfarklıYapan.

---

## FILE STRUCTURE

New file: `src/components/hakkimizda/ATRBand.tsx`
Update:   `src/app/[locale]/about/page.tsx`
Update:   `messages/tr/hakkimizda.json`
Update:   `messages/en/hakkimizda.json`
Update:   `messages/ro/hakkimizda.json`

---

## COMPONENT: ATRBand.tsx

```tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'

interface ATRBandProps {
  content: {
    kickerLabel: string
    h2: string
    body: string
    ctaLabel: string
  }
}

export default function ATRBand({ content }: ATRBandProps) {
  return (
    <>
      {/* LAYER 1 — Panoramic photo band */}
      <div style={{
        width: '100%',
        height: '300px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Image
          src="/images/atr-band-transmission.jpg"
          alt="Elektrik iletim altyapısı"
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(1.20) contrast(0.92)'
          }}
          quality={85}
        />

        {/* Top fade — exit from B3 dark background */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '70px',
          background: 'linear-gradient(to bottom, #18625F, transparent)',
          zIndex: 1,
          pointerEvents: 'none'
        }} />

        {/* Bottom fade — entry into light text band */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '70px',
          background: 'linear-gradient(to top, #F8FAFB, transparent)',
          zIndex: 1,
          pointerEvents: 'none'
        }} />
      </div>

      {/* LAYER 2 — Text + CTA band */}
      <div style={{
        background: '#F8FAFB',
        paddingTop: '56px',
        paddingBottom: '64px',
        paddingLeft: '52px',
        paddingRight: '52px',
        textAlign: 'center',
        borderBottom: '1px solid rgba(24,98,95,0.08)'
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>

          {/* Kicker */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '18px'
          }}>
            <div style={{ width: '24px', height: '1px', background: '#FFCB00' }} />
            <span style={{
              fontSize: '11px',
              letterSpacing: '0.18em',
              color: '#18625F',
              fontWeight: 600,
              textTransform: 'uppercase'
            }}>
              {content.kickerLabel}
            </span>
            <div style={{ width: '24px', height: '1px', background: '#FFCB00' }} />
          </div>

          {/* H2 */}
          <h2 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(22px, 2.8vw, 36px)',
            fontWeight: 800,
            color: '#0F2E2C',
            lineHeight: 1.15,
            margin: '0 0 16px'
          }}>
            {content.h2}
          </h2>

          {/* Body */}
          <p style={{
            fontSize: '15px',
            color: '#4A6E6C',
            lineHeight: 1.72,
            maxWidth: '520px',
            margin: '0 auto 32px'
          }}>
            {content.body}
          </p>

          {/* CTA — ANCHOR-4: gold bg → #0F2E2C text */}
          <Link href="/tr/atr-matrix" style={{
            display: 'inline-block',
            background: '#FFCB00',
            color: '#0F2E2C',
            fontSize: '15px',
            fontWeight: 700,
            padding: '14px 32px',
            borderRadius: '6px',
            textDecoration: 'none',
            letterSpacing: '0.01em',
            transition: 'background-color 120ms linear'
          }}>
            {content.ctaLabel} →
          </Link>

        </div>
      </div>
    </>
  )
}
```

---

## page.tsx — INSERT ATRBand

In `src/app/[locale]/about/page.tsx`, add the import and insert between
B3 and B4:

```tsx
import ATRBand from '@/components/hakkimizda/ATRBand'

export default function AboutPage() {
  return (
    <main>
      <B1Hero />
      <B2BizKimiz />
      <B3DegerlendirmeCercevesi />
      <ATRBand content={...} />          {/* ← INSERT HERE */}
      <B4AfarklıYapan />
      <B5PiyasaDinamikleri />
      <B6B7Kapanis />
    </main>
  )
}
```

---

## JSON CONTENT

### messages/tr/hakkimizda.json — add atrBand section:
```json
"atrBand": {
  "kickerLabel": "ATR MATRIX™",
  "h2": "ATR Matrix™ ile projelerinizi değerlendirin",
  "body": "4 eksenli analiz metodolojimizle teknik riskleri erken aşamada tespit edin, yatırım kararlarınızı güçlendirin.",
  "ctaLabel": "Metodolojiyi İnceleyin"
}
```

### messages/en/hakkimizda.json:
```json
"atrBand": {
  "kickerLabel": "ATR MATRIX™",
  "h2": "Evaluate your projects with ATR Matrix™",
  "body": "Identify technical risks at an early stage with our 4-axis analysis methodology and strengthen your investment decisions.",
  "ctaLabel": "Explore the Methodology"
}
```

### messages/ro/hakkimizda.json:
```json
"atrBand": {
  "kickerLabel": "ATR MATRIX™",
  "h2": "Evaluați-vă proiectele cu ATR Matrix™",
  "body": "Identificați riscurile tehnice în stadiu incipient cu metodologia noastră de analiză pe 4 axe și consolidați deciziile de investiție.",
  "ctaLabel": "Explorați Metodologia"
}
```

---

## PHOTO FILE

Path: `/public/images/atr-band-transmission.jpg`
If file is missing, use a placeholder div:
```tsx
<div style={{
  width: '100%',
  height: '300px',
  background: 'linear-gradient(135deg, #18625F 0%, #28AFB0 50%, #0F2E2C 100%)'
}} />
```
Do not fail the build if image is missing.

---

## RESPONSIVE

Mobile (<768px):
  Photo band height: 160px
  Text band padding: 40px 24px 48px

Tablet (768–1023px):
  Photo band height: 220px
  Text band padding: 44px 32px 52px

Desktop (≥1024px):
  Photo band height: 300px (default)
  Text band padding: 56px 52px 64px (default)

---

## ANCHOR COMPLIANCE

- ANCHOR-1: No hardcoded hex in className
- ANCHOR-2: CTA transition background-color 120ms linear only
- ANCHOR-3: Light background section — inline color values used
- ANCHOR-4: Gold CTA button → color #0F2E2C only
- ANCHOR-5: globals.css, Header.tsx, Footer.tsx not modified

---

## BUILD

1. Run: `npm run build`
2. Report: files created/modified, build result, page count, TypeScript errors
3. If build fails: STOP. Report exact error. Make no further changes.
