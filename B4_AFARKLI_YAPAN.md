# Claude Code Instruction: B4 AFA'yı Farklı Kılan — Ribbon Card System
# Component: B4AfarklıYapan.tsx (NEW FILE)
# Date: April 2026
# Do NOT modify: globals.css @theme block, Header.tsx, Footer.tsx

---

## OVERVIEW

Create a new file: src/components/hakkimizda/B4AfarklıYapan.tsx
Then import and render it in src/app/[locale]/about/page.tsx
between B3DegerlendirmeCercevesi and B5PiyasaDinamikleri.

---

## SECTION STRUCTURE

```tsx
<section style={{ width: '100%', backgroundColor: '#F5F7F6', paddingBlock: '80px' }}>
  <div style={{
    maxWidth: '1180px',
    marginInline: 'auto',
    paddingInline: '52px'
  }}>
    {/* Header */}
    {/* Card stack */}
  </div>
</section>
```

---

## 1 — HEADER (centered)

```tsx
<div style={{ textAlign: 'center', marginBottom: '60px' }}>

  <div style={{
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#28AFB0',
    marginBottom: '12px'
  }}>
    {content.b4.kicker}
  </div>

  <h2 style={{
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 'clamp(28px, 3vw, 42px)',
    fontWeight: 700,
    color: '#18625F',
    letterSpacing: '-0.02em',
    margin: 0
  }}>
    {content.b4.h2}
  </h2>

</div>
```

---

## 2 — CARD STACK

```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
  {content.b4.cards.map((card, index) => (
    <RibbonCard key={index} card={card} colorIndex={index} />
  ))}
</div>
```

---

## 3 — RIBBON CARD COMPONENT

### Layout dimensions (locked)
- Card min-height: 130px
- Card padding: 30px 40px 30px 140px
- Card border-radius: 16px
- Gap between cards: 25px
- Ribbon size: 90px × 110px
- Ribbon position: left 30px, vertically centered (top 50%, translateY -50%)
- Ribbon border-radius: 12px

```tsx
<div style={{
  background: '#FFFFFF',
  borderRadius: '16px',
  padding: '30px 40px 30px 140px',
  position: 'relative',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
  minHeight: '130px',
  display: 'flex',
  alignItems: 'center',
  transition: 'box-shadow 120ms linear'   /* DSS: no transform, no "all", 120ms only */
}}>

  {/* Ribbon */}
  <div style={{
    position: 'absolute',
    left: '30px',
    top: '50%',
    transform: 'translateY(-50%)',        /* static positioning only — not animated */
    width: '90px',
    height: '110px',
    background: `linear-gradient(180deg, ${ribbonColor} 0%, ${ribbonDark} 100%)`,
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 8px 25px ${shadowColor},
                inset 0 2px 4px rgba(255,255,255,0.3),
                inset 0 -2px 4px rgba(0,0,0,0.2)`,
    zIndex: 10
  }}>

    {/* Ribbon highlight overlay */}
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0,
      height: '40%',
      background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)',
      borderRadius: '12px 12px 0 0',
      pointerEvents: 'none'
    }} />

    {/* Number container — debossed circle */}
    <div style={{
      position: 'relative',
      width: '70px',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      background: `linear-gradient(145deg,
        rgba(0,0,0,0.15) 0%,
        rgba(0,0,0,0.05) 50%,
        rgba(255,255,255,0.10) 100%)`,
      boxShadow: `inset 3px 3px 8px rgba(0,0,0,0.30),
                  inset -2px -2px 6px rgba(255,255,255,0.20),
                  2px 2px 4px rgba(0,0,0,0.20)`,
      zIndex: 1
    }}>
      <span style={{
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '32px',
        fontWeight: 800,
        color: 'rgba(255,255,255,0.95)',
        textShadow: '0 1px 2px rgba(0,0,0,0.30), 0 -1px 1px rgba(255,255,255,0.20)',
        position: 'relative',
        zIndex: 2
      }}>
        {card.number}
      </span>
    </div>

  </div>

  {/* Card content */}
  <div style={{ flex: 1 }}>
    <div style={{
      fontSize: '18px',
      fontWeight: 700,
      color: '#18625F',
      marginBottom: '8px',
      letterSpacing: '-0.01em'
    }}>
      {card.title}
    </div>
    <div style={{
      fontSize: '14px',
      color: '#5A6C7D',
      lineHeight: 1.6,
      fontWeight: 400
    }}>
      {card.description}
    </div>
  </div>

</div>
```

Hover (onMouseEnter/onMouseLeave):
  boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)'
  NO transform on hover — DSS ANCHOR-2 strictly forbidden

---

## 4 — RIBBON COLOR MATRIX (per card index)

Apply these values to ribbonColor, ribbonDark, shadowColor:

Card 01 (index 0):
  ribbonColor:  '#28AFB0'
  ribbonDark:   '#1E8E8F'
  shadowColor:  'rgba(40,175,176,0.35)'

Card 02 (index 1):
  ribbonColor:  '#4CC9F0'
  ribbonDark:   '#3AB0D9'
  shadowColor:  'rgba(76,201,240,0.35)'

Card 03 (index 2):
  ribbonColor:  '#18625F'
  ribbonDark:   '#124A48'
  shadowColor:  'rgba(24,98,95,0.35)'

Card 04 (index 3):
  ribbonColor:  '#28AFB0'
  ribbonDark:   '#239A9B'
  shadowColor:  'rgba(40,175,176,0.35)'

Card 05 (index 4) — GOLD:
  ribbonColor:  '#FFCB00'
  ribbonDark:   '#E6B800'
  shadowColor:  'rgba(255,203,0,0.40)'

  Number container override for card 05:
    background: 'linear-gradient(145deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.03) 50%, rgba(255,255,255,0.20) 100%)'
    boxShadow: 'inset 3px 3px 8px rgba(0,0,0,0.20), inset -2px -2px 6px rgba(255,255,255,0.30), 2px 2px 4px rgba(0,0,0,0.15)'

  Number text override for card 05:
    color: 'rgba(255,255,255,0.98)'
    textShadow: '0 1px 3px rgba(0,0,0,0.25), 0 -1px 1px rgba(255,255,255,0.30)'

GOLD ZONE NOTE: Card 05 ribbon background is #FFCB00.
  All text inside the ribbon uses white — this is the number only.
  Card title and description are on WHITE card background (#FFFFFF) — not gold.
  No ANCHOR-4 violation.

---

## 5 — JSON CONTENT

messages/tr/hakkimizda.json — b4 section:

```json
"b4": {
  "kicker": "NEDEN AFA ENERGY",
  "h2": "AFA'yı Farklı Kılan",
  "cards": [
    {
      "number": "01",
      "title": "ATR Matrix™ — Şebeke Bağlantı Analizi",
      "description": "Bağlantı koşullarının finansal etkisi erken aşamada görünür hale getirilir; belirsizlik, yatırım kararında kullanılabilir bir değerlendirme zeminine dönüşür."
    },
    {
      "number": "02",
      "title": "Yatırım Komitesine Hazır Çıktılar",
      "description": "Her bulgu tanımlanır, sınıflandırılır ve karar zeminini güçlendirecek biçimde yapılandırılır. Çıktılar yatırım komitesi değerlendirmesine uygun formatta hazırlanır."
    },
    {
      "number": "03",
      "title": "Türkiye–Romanya Köprüsü",
      "description": "Farklı şebeke yapıları ve düzenleyici çerçeveler karşılaştırılabilir bir analiz çerçevesi içinde birlikte ele alınır. İki piyasada tutarlı karşılaştırma sağlar."
    },
    {
      "number": "04",
      "title": "Uluslararası Finansman Uyumu",
      "description": "Analiz ve raporlama yapısı, finansmana uygunluk (bankability) perspektifini esas alan teknik durum tespiti beklentileriyle uyumlu olacak biçimde kurgulanır."
    },
    {
      "number": "05",
      "title": "Seçicilik Bir Değer Disiplinidir",
      "description": "Değerlendirme sürecinde belirsizliği yüksek projeler yatırımcı tarafında görünür hale gelmeden önce filtrelenir; sunulan havuz daha tutarlı bir olgunluk seviyesinde tutulur."
    }
  ]
}
```

messages/en/hakkimizda.json — b4 section:
```json
"b4": {
  "kicker": "WHY AFA ENERGY",
  "h2": "What Makes AFA Different",
  "cards": [
    {
      "number": "01",
      "title": "ATR Matrix™ — Grid Connection Analysis",
      "description": "The financial impact of connection conditions is made visible at an early stage; uncertainty is transformed into an actionable assessment basis for investment decisions."
    },
    {
      "number": "02",
      "title": "Investment Committee-Ready Deliverables",
      "description": "Every finding is defined, classified, and structured to strengthen the decision basis. Deliverables are prepared in formats aligned with investment committee review standards."
    },
    {
      "number": "03",
      "title": "Turkey–Romania Bridge",
      "description": "Different grid structures and regulatory frameworks are addressed together within a comparable analytical framework, enabling consistent cross-market comparison."
    },
    {
      "number": "04",
      "title": "International Financing Alignment",
      "description": "The analytical and reporting structure is designed to align with technical due diligence expectations grounded in a bankability perspective."
    },
    {
      "number": "05",
      "title": "Selectivity Is a Value Discipline",
      "description": "Projects with high uncertainty are filtered before reaching investor visibility; the presented pool is maintained at a consistent maturity level."
    }
  ]
}
```

messages/ro/hakkimizda.json — b4 section:
```json
"b4": {
  "kicker": "DE CE AFA ENERGY",
  "h2": "Ce Face AFA Diferit",
  "cards": [
    {
      "number": "01",
      "title": "ATR Matrix™ — Analiza Conexiunii la Rețea",
      "description": "Impactul financiar al condițiilor de conexiune este vizibilizat într-un stadiu incipient; incertitudinea este transformată într-o bază de evaluare utilizabilă pentru decizii de investiție."
    },
    {
      "number": "02",
      "title": "Livrabile Pregătite pentru Comitetul de Investiții",
      "description": "Fiecare constatare este definită, clasificată și structurată pentru a consolida baza decizională. Livrabilele sunt pregătite în formate aliniate cu standardele comitetului de investiții."
    },
    {
      "number": "03",
      "title": "Puntea Turcia–România",
      "description": "Structuri de rețea diferite și cadre de reglementare sunt abordate împreună într-un cadru analitic comparabil, permițând comparații consistente între piețe."
    },
    {
      "number": "04",
      "title": "Conformitate cu Finanțarea Internațională",
      "description": "Structura analitică și de raportare este concepută să se alinieze cu așteptările due diligence tehnice bazate pe perspectiva bancabilității."
    },
    {
      "number": "05",
      "title": "Selectivitatea Este o Disciplină a Valorii",
      "description": "Proiectele cu incertitudine ridicată sunt filtrate înainte de a deveni vizibile pentru investitori; portofoliul prezentat este menținut la un nivel consistent de maturitate."
    }
  ]
}
```

---

## 6 — PAGE.TSX UPDATE

In src/app/[locale]/about/page.tsx, add import and render:

```tsx
import B4AfarklıYapan from '@/components/hakkimizda/B4AfarklıYapan'
```

Render order:
```tsx
<B1Hero />
<B2BizKimiz />
<B3DegerlendirmeCercevesi />
<B4AfarklıYapan />
<B5PiyasaDinamikleri />
<B6B7Kapanis />
```

---

## 7 — RESPONSIVE

Mobile (<768px):
  Card padding: '100px 24px 24px 24px'
  Card marginTop: '30px' (ribbon overflows top)
  Ribbon position: left 50%, top -30px, transform translateX(-50%)
  Ribbon size: 80px × 100px
  Number container: 60px × 60px
  Number font-size: 28px
  Section paddingBlock: '64px'
  Container paddingInline: '24px'

---

## ANCHOR COMPLIANCE

- ANCHOR-1: No hardcoded hex in className — all via inline style
- ANCHOR-2: CRITICAL — hover uses box-shadow change only. NO transform on hover.
  The ribbon uses transform: translateY(-50%) for static centering ONLY — this is
  positional, not animated. It must NOT be included in any transition.
- ANCHOR-3: Section bg #F5F7F6 is light — dark bg text rules do not apply
- ANCHOR-4: Card 05 ribbon is gold (#FFCB00). Number text is white — acceptable
  because it is inside the ribbon element, not on a gold card surface.
  Card title/desc are on #FFFFFF — no gold zone issue.
- ANCHOR-5: globals.css @theme block, Header.tsx, Footer.tsx not modified

---

## BUILD

1. Run: `npm run build`
2. Report: files changed, build result, page count, TypeScript errors
3. If build fails: STOP. Report exact error. Make no further changes.
