# Claude Code Instruction: B3 Section Final Redesign
# Component: B3DegerlendirmeCercevesi.tsx
# Date: March 2026
# Do NOT modify: globals.css, Header.tsx, Footer.tsx

---

## OVERVIEW

Completely replace the current B3 component with the approved two-part layout:

PART 1 — Cards section (bg-afa-primary-dark #18625F)
  - Full-width header (kicker + H2 + intro)
  - 2×2 card grid with 3D teal icon circles

PART 2 — Photo CTA band (full-width, 340px height)
  - Background photo: /images/b3-cta-photo.jpg
  - Dark overlay: rgba(15,46,44,0.78)
  - Centered text + gold CTA button

Both parts are inside the same component, rendered as a single seamless section.

---

## PART 1 — CARDS SECTION

### Outer wrapper
```tsx
<section style={{ background: '#18625F', padding: '80px 0 64px' }}>
  <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
```

### Header (full width, above cards)
```tsx
{/* Kicker */}
<div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
  <span style={{ width: '24px', height: '1px', background: '#FFCB00',
    display: 'inline-block', flexShrink: 0 }} />
  <span style={{ color: '#FFCB00', fontSize: '11px', fontWeight: 600,
    letterSpacing: '0.18em', textTransform: 'uppercase' }}>
    {content.sectionLabel}
  </span>
</div>

{/* H2 */}
<h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800,
  fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: 1.1,
  color: 'rgba(255,255,255,0.95)', marginBottom: '14px',
  letterSpacing: '-0.02em' }}>
  {content.h2}
</h2>

{/* Intro */}
<p style={{ fontSize: '15px', lineHeight: 1.65,
  color: 'rgba(255,255,255,0.75)', maxWidth: '640px',
  marginBottom: '48px' }}>
  {content.intro}
</p>
```

### 2×2 Card Grid
```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
  {content.cards.map((card, index) => (
    <div key={index} style={{
      background: 'rgba(255,255,255,0.95)',
      borderRadius: '16px',
      padding: '28px 24px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
      transition: 'box-shadow 120ms linear'
    }}>

      {/* Gold corner accent */}
      <div style={{
        position: 'absolute', width: '60px', height: '60px',
        borderRadius: '50%', background: '#FFCB00', opacity: 0.12, zIndex: 0,
        ...(index === 0 && { top: '-30px', left: '-30px' }),
        ...(index === 1 && { top: '-30px', right: '-30px' }),
        ...(index === 2 && { bottom: '-30px', left: '-30px' }),
        ...(index === 3 && { bottom: '-30px', right: '-30px' }),
      }} />

      {/* Card header: number + icon */}
      <div style={{ display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: '16px',
        position: 'relative', zIndex: 1 }}>

        <span style={{ fontFamily: 'Montserrat, sans-serif',
          fontSize: '40px', fontWeight: 800, color: '#18625F', lineHeight: 1 }}>
          {card.number}
        </span>

        {/* 3D Teal Icon Circle */}
        <div style={{
          width: '56px', height: '56px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          background: 'radial-gradient(circle at 35% 35%, #3DCDD0 0%, #28AFB0 40%, #1A8F90 100%)',
          boxShadow: `
            3px 3px 0px rgba(12,70,70,0.55),
            6px 6px 0px rgba(12,70,70,0.35),
            10px 10px 0px rgba(12,70,70,0.18),
            16px 16px 0px rgba(12,70,70,0.08),
            4px 8px 18px rgba(0,0,0,0.22),
            inset 0 2px 4px rgba(255,255,255,0.40),
            inset 0 -2px 3px rgba(0,0,0,0.15)
          `
        }}>
          <Image
            src={card.icon}
            alt=""
            width={28}
            height={28}
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>
      </div>

      {/* Title */}
      <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '15px',
        fontWeight: 700, lineHeight: 1.35, marginBottom: '8px',
        color: '#18625F', position: 'relative', zIndex: 1 }}>
        {card.title}
      </h3>

      {/* Description */}
      <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#4B5563',
        flexGrow: 1, position: 'relative', zIndex: 1 }}>
        {card.body}
      </p>
    </div>
  ))}
</div>
```

Close Part 1:
```tsx
  </div>
</section>
```

---

## PART 2 — PHOTO CTA BAND

```tsx
<div style={{ position: 'relative', width: '100%', height: '340px', overflow: 'hidden' }}>

  {/* Background photo */}
  <Image
    src="/images/b3-cta-photo.jpg"
    alt="Şebeke iletim altyapısı"
    fill
    style={{
      objectFit: 'cover',
      objectPosition: 'center 40%',
      filter: 'brightness(0.9) saturate(0.85)'
    }}
  />

  {/* Dark overlay — ANCHOR-3 */}
  <div style={{
    position: 'absolute', inset: 0,
    background: 'rgba(15,46,44,0.78)'
  }} />

  {/* Content */}
  <div style={{
    position: 'relative', zIndex: 1,
    height: '100%',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    textAlign: 'center',
    padding: '48px 40px',
    maxWidth: '1200px', margin: '0 auto'
  }}>

    {/* Label with lines */}
    <div style={{
      display: 'flex', alignItems: 'center', gap: '12px',
      marginBottom: '20px'
    }}>
      <span style={{ width: '24px', height: '1px',
        background: 'rgba(255,203,0,0.60)', display: 'inline-block' }} />
      <span style={{ color: 'rgba(255,203,0,0.90)', fontSize: '11px',
        fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        {content.ctaBandLabel}
      </span>
      <span style={{ width: '24px', height: '1px',
        background: 'rgba(255,203,0,0.60)', display: 'inline-block' }} />
    </div>

    {/* H2 */}
    <h2 style={{
      fontFamily: 'Montserrat, sans-serif',
      fontSize: 'clamp(22px, 2.8vw, 36px)', fontWeight: 800,
      lineHeight: 1.15, letterSpacing: '-0.02em',
      color: 'rgba(255,255,255,0.95)',
      marginBottom: '16px', maxWidth: '640px'
    }}>
      {content.ctaBandH2}
    </h2>

    {/* Body */}
    <p style={{
      fontSize: '15px', lineHeight: 1.65,
      color: 'rgba(255,255,255,0.78)',
      maxWidth: '520px', marginBottom: '36px'
    }}>
      {content.ctaBandBody}
    </p>

    {/* Gold CTA Button — ANCHOR-4 */}
    <Link href="/tr/atr-matrix" style={{
      display: 'inline-flex', alignItems: 'center', gap: '10px',
      padding: '15px 32px', borderRadius: '6px',
      background: '#FFCB00', color: '#0F2E2C',
      fontFamily: 'Open Sans, sans-serif',
      fontSize: '15px', fontWeight: 700,
      textDecoration: 'none',
      boxShadow: '0 4px 16px rgba(255,203,0,0.35)',
      transition: 'background-color 120ms linear, box-shadow 120ms linear'
    }}>
      {content.ctaBandButtonLabel}
    </Link>

  </div>
</div>
```

---

## ICON FILE PATHS

Icons are already in `public/icons/`:
- Card 01 → /icons/engineer.svg
- Card 02 → /icons/time-is-money.svg
- Card 03 → /icons/increase.svg
- Card 04 → /icons/approve.svg

Photo: `public/images/b3-cta-photo.jpg` — already copied by user.

---

## JSON CONTENT (messages/tr/hakkimizda.json — b3 section)

```json
"b3": {
  "sectionLabel": "DEĞERLENDİRME ÇERÇEVEMİZ",
  "h2": "Her Proje Dört Eksende İncelenir.",
  "intro": "AFA, incelediği her projeyi yatırım kararından önce aynı metodolojik disipline tabi tutar. Proje aşaması değişse de çerçeve değişmez.",
  "ctaBandLabel": "ATR Matrix™",
  "ctaBandH2": "ATR Matrix™ ile projelerinizi değerlendirin",
  "ctaBandBody": "4 eksenli analiz metodolojimizle teknik riskleri erken aşamada tespit edin, yatırım kararlarınızı güçlendirin.",
  "ctaBandButtonLabel": "Metodolojiyi İnceleyin →",
  "cards": [
    {
      "number": "01",
      "title": "Bağlantı Uygulanabilirliği",
      "body": "ATR belgesi ve bağlantı koşullarının fiili uygulanabilirliği incelenir. Belge ile saha gerçekliği arasındaki boşluklar tespit edilir.",
      "icon": "/icons/engineer.svg"
    },
    {
      "number": "02",
      "title": "Şebeke Kapasitesi ve Üretim Kısıntısı Riski",
      "body": "Bölgesel şebeke yükü, mevcut kapasite ve üretim kısıntısı olasılığı değerlendirilir. Curtailment riski yatırım kararından önce görünür kılınır.",
      "icon": "/icons/time-is-money.svg"
    },
    {
      "number": "03",
      "title": "Bağlantı Maliyeti ve Şebeke Yatırımı",
      "body": "Bağlantı bedeli, ilave şebeke işleri ve olası güçlendirme maliyetleri incelenir. ATR sonrası ortaya çıkabilecek gizli CAPEX riskleri erken aşamada görünür hale getirilir.",
      "icon": "/icons/increase.svg"
    },
    {
      "number": "04",
      "title": "İzin Zinciri ve Takvim Riski",
      "body": "Projenin izin zinciri ve düzenleyici süreçleri kronolojik tutarlılık açısından değerlendirilir. Eksik izinler ve prosedürel boşlukların yatırım takvimine etkisi analiz edilir.",
      "icon": "/icons/approve.svg"
    }
  ]
}
```

Update EN and RO JSON files with equivalent translations.

---

## RESPONSIVE

Mobile (≤768px):
- Cards grid: gridTemplateColumns: '1fr'
- Section padding: '64px 0 48px'
- Container padding: '0 24px'
- Photo CTA band height: '380px'
- Photo content padding: '40px 24px'

---

## ANCHOR COMPLIANCE

- ANCHOR-1: No hardcoded hex in className — all via inline style
- ANCHOR-2: All transitions use 120ms linear only
- ANCHOR-3: All text on dark backgrounds via inline rgba() style
- ANCHOR-4: Gold CTA button uses color #0F2E2C — never white on gold
- ANCHOR-5: globals.css, Header.tsx, Footer.tsx not modified

---

## BUILD

1. Run: `npm run build`
2. Report: files changed, build result, page count, TypeScript errors
3. If build fails: STOP. Report exact error. Make no further changes.
