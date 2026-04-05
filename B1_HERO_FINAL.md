# Claude Code Instruction: B1 Hero — Full Redesign
# Component: B1Hero.tsx
# Date: April 2026
# Do NOT modify: globals.css, Header.tsx, Footer.tsx

---

## OVERVIEW

Completely replace the current B1Hero.tsx layout with a two-column composition:
- LEFT: Content column (kicker + H1 + subhead + body + CTA + metric cards), max-width 56%
- RIGHT: Absolute-positioned photo with gradient overlay

---

## SECTION STRUCTURE

```tsx
<section style={{
  position: 'relative',
  background: '#18625F',
  minHeight: '540px',
  overflow: 'hidden'
}}>
  {/* Layer 1: Grid texture — z-index 0 */}
  {/* Layer 2: Photo + gradient — z-index 1 */}
  {/* Layer 3: Content — z-index 3 */}
</section>
```

---

## LAYER 1 — GRID TEXTURE (z-index: 0)

```tsx
<div style={{
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  backgroundImage: `
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
  `,
  backgroundSize: '40px 40px',
  pointerEvents: 'none'
}} />
```

---

## LAYER 2 — PHOTO + GRADIENT (z-index: 1)

```tsx
<div style={{
  position: 'absolute',
  right: 0,
  top: 0,
  width: '52%',
  height: '100%',
  zIndex: 1,
  overflow: 'hidden'
}}>
  <Image
    src="/images/hero-romania-flag.jpg"
    alt="Romanya bayrağı, Karpatlar"
    fill
    style={{ objectFit: 'cover', objectPosition: 'center' }}
    priority
    quality={85}
  />
  {/* Gradient overlay — left edge blends into teal */}
  <div style={{
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(
      to right,
      #18625F 0%,
      rgba(24,98,95,0.92) 18%,
      rgba(24,98,95,0.58) 42%,
      rgba(24,98,95,0.15) 72%,
      rgba(24,98,95,0.00) 100%
    )`
  }} />
</div>
```

---

## LAYER 3 — CONTENT (z-index: 3)

```tsx
<div style={{
  position: 'relative',
  zIndex: 3,
  padding: '60px 52px',
  maxWidth: '56%'
}}>
  {/* Kicker */}
  {/* H1 */}
  {/* Subheadline */}
  {/* Body */}
  {/* CTA */}
  {/* Metric cards */}
</div>
```

### Kicker
```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
  <div style={{ width: '28px', height: '2px', background: '#FFCB00', flexShrink: 0 }} />
  <span style={{
    fontSize: '11px',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#FFCB00',
    fontWeight: 600
  }}>
    {content.sloganLabel}
  </span>
</div>
```

### H1
```tsx
<h1 style={{
  fontFamily: 'Montserrat, sans-serif',
  fontSize: 'clamp(32px, 3.5vw, 50px)',
  fontWeight: 800,
  color: '#FFFFFF',
  lineHeight: 1.1,
  margin: '0 0 20px'
}}>
  {content.h1}
</h1>
```

### Subheadline
```tsx
<p style={{
  fontFamily: 'Montserrat, sans-serif',
  fontSize: 'clamp(15px, 1.5vw, 19px)',
  fontWeight: 700,
  color: 'rgba(255,255,255,0.90)',
  margin: '0 0 16px'
}}>
  {content.subtitle}
</p>
```

### Body text
```tsx
<p style={{
  fontSize: '15px',
  color: 'rgba(255,255,255,0.76)',
  lineHeight: 1.75,
  maxWidth: '400px',
  margin: '0 0 32px'
}}>
  {content.heroBody}
</p>
```

### CTA Button
```tsx
<Link href="/tr/atr-matrix" style={{
  display: 'inline-block',
  background: '#FFCB00',
  color: '#0F2E2C',
  fontWeight: 700,
  fontSize: '15px',
  padding: '14px 28px',
  borderRadius: '6px',
  textDecoration: 'none',
  marginBottom: '48px',
  letterSpacing: '0.01em',
  transition: 'background-color 120ms linear'
}}>
  {content.heroCta} →
</Link>
```

Hover: background-color #E6B800 only. No box-shadow. No transform.

### Metric Cards Grid
```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '12px',
  maxWidth: '520px'
}}>
  {content.metrics.map((metric, index) => (
    <div key={index} style={{
      background: 'linear-gradient(160deg, #1E7A77 0%, #175E5C 100%)',
      border: '1px solid rgba(255,255,255,0.18)',
      borderRadius: '10px',
      borderBottom: '2px solid #28AFB0',
      padding: '20px 22px',
      boxShadow: `
        0 2px 4px rgba(0,0,0,0.20),
        0 8px 20px rgba(0,0,0,0.30),
        0 20px 40px rgba(0,0,0,0.20),
        inset 0 1px 0 rgba(255,255,255,0.15)
      `
    }}>
      <p style={{
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '28px',
        fontWeight: 800,
        color: '#FFCB00',
        margin: '0 0 6px',
        lineHeight: 1
      }}>
        {metric.value}
      </p>
      <p style={{
        fontSize: '11px',
        color: 'rgba(255,255,255,0.78)',
        margin: 0,
        lineHeight: 1.4
      }}>
        {metric.label}
      </p>
    </div>
  ))}
</div>
```

---

## JSON CONTENT (messages/tr/hakkimizda.json — hero section)

```json
"hero": {
  "sloganLabel": "YATIRIMDAN ÖNCE NETLİK.",
  "h1": "Romanya'da Her Proje Yatırıma Hazır Görünür.",
  "subtitle": "Teknik Doğrulama Başka Bir Tablo Gösterir.",
  "heroBody": "Bir projenin yatırım değeri dosyasında değil — şebekeye bağlanabilirliğinde ve izin zincirinin gerçek sağlamlığında saklıdır.",
  "heroCta": "ATR Matrix™ Nasıl Çalışır",
  "metrics": [
    { "value": "1,3 GW", "label": "Analiz edilen proje kapasitesi" },
    { "value": "500+",   "label": "Değerlendirilen ATR belgesi" },
    { "value": "10",     "label": "AB Ülkesi Deneyimi" }
  ]
}
```

messages/en/hakkimizda.json:
```json
"hero": {
  "sloganLabel": "CLARITY BEFORE INVESTMENT.",
  "h1": "Every Project in Romania Looks Investment-Ready.",
  "subtitle": "Technical Validation Shows a Different Picture.",
  "heroBody": "A project's investment value lies not in its documents — but in its grid connectivity and the true integrity of its permit chain.",
  "heroCta": "How ATR Matrix™ Works",
  "metrics": [
    { "value": "1.3 GW", "label": "Project capacity analysed" },
    { "value": "500+",   "label": "ATR documents reviewed" },
    { "value": "10",     "label": "EU Countries Experience" }
  ]
}
```

messages/ro/hakkimizda.json:
```json
"hero": {
  "sloganLabel": "CLARITATE ÎNAINTE DE INVESTIȚIE.",
  "h1": "Fiecare Proiect din România Pare Gata de Investiție.",
  "subtitle": "Validarea Tehnică Arată un Alt Tablou.",
  "heroBody": "Valoarea de investiție a unui proiect nu stă în documente — ci în conectivitatea la rețea și soliditatea reală a lanțului de autorizare.",
  "heroCta": "Cum Funcționează ATR Matrix™",
  "metrics": [
    { "value": "1,3 GW", "label": "Capacitate de proiecte analizată" },
    { "value": "500+",   "label": "Documente ATR evaluate" },
    { "value": "10",     "label": "Țări UE Experiență" }
  ]
}
```

---

## PHOTO FILE

Path: `/public/images/hero-romania-flag.jpg`
User confirms this file is already in place.
If file is missing, use a dark teal placeholder:
  background: linear-gradient(135deg, #18625F 0%, #0F2E2C 100%)
Do not fail the build if image is missing.

---

## RESPONSIVE

Desktop (≥1024px): Full two-column layout as specified.

Tablet (768–1023px):
  Photo width: 45%
  Content max-width: 58%
  Font sizes scale via clamp

Mobile (<768px):
  Photo: position absolute, opacity 0.25, full width (background layer)
  Content: full width, padding 40px 24px
  Metric cards: grid-template-columns repeat(3, 1fr) maintained
    or collapse to repeat(1, 1fr) if space is too tight

---

## ANCHOR COMPLIANCE

- ANCHOR-1: No hardcoded hex in className — all via inline style
- ANCHOR-2: CTA uses transition background-color 120ms linear only
- ANCHOR-3: All text on dark bg uses inline rgba() — never Tailwind modifiers
- ANCHOR-4: CTA gold bg uses color #0F2E2C — never white on gold
- ANCHOR-5: globals.css, Header.tsx, Footer.tsx not modified

---

## BUILD

1. Run: `npm run build`
2. Report: files changed, build result, page count, TypeScript errors
3. If build fails: STOP. Report exact error. Make no further changes.
