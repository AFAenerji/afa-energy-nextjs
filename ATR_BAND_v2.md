# Claude Code Instruction: ATR Matrix™ Interstitial Band
# Component: ATRBand.tsx
# Version: 2.0 — Corrected layer order
# Position: Between B3DegerlendirmeCercevesi and B4AfarklıYapan
# Date: April 2026
# Do NOT modify: globals.css @theme block, Header.tsx, Footer.tsx

---

## CRITICAL: DUPLICATE COMPONENT FIX

Before creating anything, check `src/app/[locale]/about/page.tsx`:
- If `<ATRBand />` or any ATRBand import appears MORE THAN ONCE → remove all
  instances and their imports completely, then follow instructions below.
- The component must appear EXACTLY ONCE between B3 and B4.

---

## CORRECT LAYER ORDER

```
B3DegerlendirmeCercevesi  ← dark background #18625F ends here
────────────────────────────────────────────────────────
LAYER 1: Text band        ← light background #F8FAFB
          kicker + H2 + body + CTA
          (top fade: #18625F → transparent, covers B3 exit)

LAYER 2: Panoramic photo  ← full width, 300px height
          (bottom fade: transparent → #F8FAFB, blends into B4)
────────────────────────────────────────────────────────
B4AfarklıYapan            ← light background #F8FAFB continues
```

**Rule:** Metin bandı her zaman fotoğraftan ÖNCE gelir.
Koyu zeminden çıkarken açık zemin üzerinde metin okunur,
ardından panoramik fotoğraf geçiş görseli olarak gelir.

---

## FILE STRUCTURE

```
New file:   src/components/hakkimizda/ATRBand.tsx
Update:     src/app/[locale]/about/page.tsx
Update:     messages/tr/hakkimizda.json
Update:     messages/en/hakkimizda.json
Update:     messages/ro/hakkimizda.json
```

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
    ctaHref: string
  }
}

export default function ATRBand({ content }: ATRBandProps) {
  return (
    <>
      {/* ─── LAYER 1: Text band — light background ─── */}
      {/* Sits directly after dark B3 section */}
      <div style={{
        background: '#F8FAFB',
        paddingTop: '64px',
        paddingBottom: '56px',
        paddingLeft: '52px',
        paddingRight: '52px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Top fade: masks the hard edge from B3 dark background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '80px',
          background: 'linear-gradient(to bottom, #18625F, transparent)',
          pointerEvents: 'none',
          zIndex: 2,
        }} />

        <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 3 }}>

          {/* Kicker */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '18px',
          }}>
            <div style={{ width: '24px', height: '1px', background: '#FFCB00' }} />
            <span style={{
              fontSize: '11px',
              letterSpacing: '0.18em',
              color: '#18625F',
              fontWeight: 600,
              textTransform: 'uppercase' as const,
            }}>
              {content.kickerLabel}
            </span>
            <div style={{ width: '24px', height: '1px', background: '#FFCB00' }} />
          </div>

          {/* H2 */}
          <h2 style={{
            fontSize: 'clamp(22px, 2.8vw, 36px)',
            fontWeight: 800,
            color: '#0F2E2C',
            lineHeight: 1.15,
            margin: '0 0 16px',
          }}>
            {content.h2}
          </h2>

          {/* Body */}
          <p style={{
            fontSize: '15px',
            color: '#4A6E6C',
            lineHeight: 1.72,
            maxWidth: '520px',
            margin: '0 auto 32px',
          }}>
            {content.body}
          </p>

          {/* CTA — gold bg, afa-deep text */}
          <Link
            href={content.ctaHref}
            style={{
              display: 'inline-block',
              background: '#FFCB00',
              color: '#0F2E2C',
              fontSize: '15px',
              fontWeight: 700,
              padding: '14px 32px',
              borderRadius: '6px',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              transition: 'background-color 120ms linear',
            }}
          >
            {content.ctaLabel} →
          </Link>

        </div>
      </div>

      {/* ─── LAYER 2: Panoramic photo band ─── */}
      {/* Sits between text band and B4 */}
      <div style={{
        width: '100%',
        height: '300px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Image
          src="/images/atr-band-transmission.jpg"
          alt="Elektrik iletim altyapısı"
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(0.80) contrast(0.95)',
          }}
          quality={85}
        />

        {/* Top fade: blends out of text band */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '80px',
          background: 'linear-gradient(to bottom, #F8FAFB, transparent)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />

        {/* Bottom fade: blends into B4 light background */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '80px',
          background: 'linear-gradient(to top, #F8FAFB, transparent)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />
      </div>
    </>
  )
}
```

---

## page.tsx — EXACT INSERTION

```tsx
// 1. Import — add with other hakkimizda imports
import ATRBand from '@/components/hakkimizda/ATRBand'

// 2. Usage — EXACTLY ONCE between B3 and B4
export default function AboutPage() {
  const t = useTranslations('hakkimizda')

  return (
    <main>
      <B1Hero content={...} />
      <B2BizKimiz content={...} />
      <B3DegerlendirmeCercevesi content={...} />

      <ATRBand content={{                          {/* ← INSERT HERE, ONCE */}
        kickerLabel: t('atrBand.kickerLabel'),
        h2: t('atrBand.h2'),
        body: t('atrBand.body'),
        ctaLabel: t('atrBand.ctaLabel'),
        ctaHref: '/tr/atr-matrix',
      }} />

      <B4AfarklıYapan content={...} />
      <B5PiyasaDinamikleri content={...} />
      <B6B7Kapanis content={...} />
    </main>
  )
}
```

---

## JSON CONTENT

### messages/tr/hakkimizda.json
```json
"atrBand": {
  "kickerLabel": "ATR MATRIX™",
  "h2": "ATR Matrix™ ile projelerinizi değerlendirin",
  "body": "4 eksenli analiz metodolojimizle teknik riskleri erken aşamada tespit edin, yatırım kararlarınızı güçlendirin.",
  "ctaLabel": "Metodolojiyi İnceleyin",
  "ctaHref": "/tr/atr-matrix"
}
```

### messages/en/hakkimizda.json
```json
"atrBand": {
  "kickerLabel": "ATR MATRIX™",
  "h2": "Evaluate your projects with ATR Matrix™",
  "body": "Identify technical risks at an early stage with our 4-axis analysis methodology and strengthen your investment decisions.",
  "ctaLabel": "Explore the Methodology",
  "ctaHref": "/en/atr-matrix"
}
```

### messages/ro/hakkimizda.json
```json
"atrBand": {
  "kickerLabel": "ATR MATRIX™",
  "h2": "Evaluați-vă proiectele cu ATR Matrix™",
  "body": "Identificați riscurile tehnice în stadiu incipient cu metodologia noastră de analiză pe 4 axe și consolidați deciziile de investiție.",
  "ctaLabel": "Explorați Metodologia",
  "ctaHref": "/ro/atr-matrix"
}
```

---

## PHOTO FALLBACK

If `/public/images/atr-band-transmission.jpg` does not exist:

```tsx
{/* Replace <Image> with: */}
<div style={{
  width: '100%',
  height: '100%',
  background: 'linear-gradient(135deg, #18625F 0%, #1E7A77 50%, #0F2E2C 100%)',
}} />
```

Build must not fail if image is missing.

---

## RESPONSIVE

| Breakpoint | Photo height | Text padding |
|------------|-------------|--------------|
| ≥ 1024px | 300px | `64px 52px 56px` |
| 768–1023px | 220px | `48px 32px 44px` |
| < 768px | 160px | `40px 24px 40px` |

```tsx
// Tailwind responsive classes for photo height:
// className="h-[160px] md:h-[220px] lg:h-[300px]"

// Tailwind responsive classes for text padding:
// className="px-6 py-10 md:px-8 md:py-11 lg:px-[52px] lg:pt-16 lg:pb-14"
```

---

## DSS v8.0 COMPLIANCE

| Kural | Durum |
|-------|-------|
| Transition: yalnızca `background-color`, 120ms linear | ✓ CTA'da uygulandı |
| Transform animasyon | ✓ Yok |
| Hardcoded hex → context | ✓ Tüm değerler açıkça tanımlı |
| Gold Zone: `#FFCB00` bg → `#0F2E2C` text | ✓ CTA butonu |
| globals.css, Header.tsx, Footer.tsx | ✓ Dokunulmadı |

---

## BUILD

1. Önce duplicate kontrolü yap — `page.tsx`'de ATRBand kaç kez var?
2. Varsa tümünü temizle, import dahil
3. Yeni bileşeni oluştur
4. page.tsx'e tek kez ekle
5. JSON dosyalarını güncelle
6. `npm run build` çalıştır
7. Sonucu raporla: oluşturulan/değiştirilen dosyalar, build sonucu, TypeScript hataları
8. Build başarısız olursa: DUR. Hata mesajını raporla. Başka değişiklik yapma.

---

## VISUAL RESULT

Doğru render sonucu şöyle görünmeli:

```
┌─────────────────────────────────────┐
│  B3 (koyu teal #18625F)             │
│  ... kartlar ...                    │
├─────────────────────────────────────┤  ← Gradient geçiş
│  [açık zemin #F8FAFB]               │
│                                     │
│    — ATR MATRIX™ —                  │
│    ATR Matrix™ ile projelerinizi    │
│    değerlendirin                    │
│                                     │
│    [Metodolojiyi İnceleyin →]       │
│                                     │
├─────────────────────────────────────┤  ← Panoramik fotoğraf
│  [Fotoğraf: iletim hattı]           │
│  (top fade: #F8FAFB → transparent)  │
│  (bottom fade: transparent → #F8FAFB│
├─────────────────────────────────────┤  ← Gradient geçiş
│  B4 (açık #F8FAFB)                  │
│  AFA'yı Farklı Yapan                │
└─────────────────────────────────────┘
```
