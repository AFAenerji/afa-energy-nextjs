# Claude Code Instruction: B5 Piyasa Dinamikleri — v3 Kulakçık Sistemi
# Component: B5PiyasaDinamikleri.tsx
# Date: April 2026
# Do NOT modify: globals.css @theme block, Header.tsx, Footer.tsx

---

## OVERVIEW

Completely replace B5PiyasaDinamikleri.tsx with the v3 tab (kulakçık)
card system. This is a full rewrite — do not patch the existing component.

---

## SECTION STRUCTURE

```tsx
<section style={{ width: '100%', background: '#18625F', paddingBlock: '80px' }}>
  <div style={{
    maxWidth: '1180px',
    marginInline: 'auto',
    paddingInline: '52px'
  }}>
    {/* Header group */}
    {/* Cards grid */}
    {/* Pull-quote */}
  </div>
</section>
```

---

## 1 — HEADER GROUP

### Kicker
```tsx
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '18px' }}>
  <div style={{ width: '28px', height: '1px', background: '#FFCB00', opacity: 0.6 }} />
  <span style={{
    fontSize: '11px',
    letterSpacing: '0.18em',
    color: '#FFCB00',
    fontWeight: 600,
    textTransform: 'uppercase'
  }}>
    PİYASA DİNAMİKLERİ
  </span>
  <div style={{ width: '28px', height: '1px', background: '#FFCB00', opacity: 0.6 }} />
</div>
```

### H2
```tsx
<h2 style={{
  fontFamily: 'Montserrat, sans-serif',
  fontSize: 'clamp(26px, 3vw, 42px)',
  fontWeight: 800,
  color: '#FFFFFF',
  textAlign: 'center',
  lineHeight: 1.1,
  margin: '0 0 20px'
}}>
  İki Piyasa. Tek Karar Disiplini.
</h2>
```

### Intro paragraph
```tsx
<p style={{
  fontSize: '15px',
  color: 'rgba(255,255,255,0.76)',
  lineHeight: 1.75,
  maxWidth: '600px',
  margin: '0 auto',
  textAlign: 'center'
}}>
  {content.b5Intro}
</p>
```

---

## 2 — CARDS GRID

```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px',
  alignItems: 'stretch',
  marginTop: '44px'
}}>
  {/* Romania card */}
  {/* Turkey card */}
</div>
```

---

## 3 — CARD COMPONENT (apply to both cards)

Each card = card-body div + card-tab div, no margin between them.

```tsx
<div style={{ display: 'flex', flexDirection: 'column' }}>

  {/* Card body */}
  <div style={{
    flex: 1,
    background: 'rgba(255,255,255,0.07)',
    borderRadius: '4px 4px 0 0',
    borderTop: '3px solid ACCENT_COLOR',
    borderLeft: '1px solid ACCENT_BORDER',
    borderRight: '1px solid ACCENT_BORDER',
    borderBottom: 'none',
    padding: '32px 30px 30px',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '280px',
    boxShadow: `
      0 2px 4px rgba(0,0,0,0.18),
      0 8px 20px rgba(0,0,0,0.22),
      0 18px 36px rgba(0,0,0,0.14),
      inset 0 1px 0 rgba(255,255,255,0.10)
    `
  }}>

    {/* Ghost number — decorative, behind content */}
    <div style={{
      position: 'absolute',
      bottom: '-28px',
      right: '-12px',
      fontSize: '180px',
      fontWeight: 900,
      lineHeight: 1,
      pointerEvents: 'none',
      userSelect: 'none',
      zIndex: 0,
      color: 'GHOST_COLOR',
      opacity: GHOST_OPACITY
    }}>
      GHOST_NUMBER
    </div>

    {/* Title row — z-index 1 */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '24px',
      position: 'relative',
      zIndex: 1
    }}>
      <span style={{ fontSize: '15px', fontWeight: 700, color: 'ACCENT_COLOR', lineHeight: 1 }}>
        CARD_NUMBER
      </span>
      <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: 0, lineHeight: 1 }}>
        CARD_TITLE
      </h3>
    </div>

    {/* Content columns — z-index 1 */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '32px',
      position: 'relative',
      zIndex: 1
    }}>
      <div>
        <p style={{ fontSize: '10px', letterSpacing: '0.18em', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 10px', color: 'ACCENT_COLOR' }}>
          KIRILMA NOKTASI
        </p>
        <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.86)', lineHeight: 1.72, margin: 0 }}>
          BREAKING_POINT_TEXT
        </p>
      </div>
      <div>
        <p style={{ fontSize: '10px', letterSpacing: '0.18em', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 10px', color: 'ACCENT_COLOR' }}>
          YK ÇEVİRİSİ
        </p>
        <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.86)', lineHeight: 1.72, margin: 0 }}>
          BOARD_TRANSLATION_TEXT
        </p>
      </div>
    </div>

  </div>

  {/* Tab footer — flush against card body, no gap */}
  <div style={{
    padding: '12px 24px',
    borderRadius: '0 0 4px 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    background: 'TAB_BACKGROUND',
    boxShadow: `
      0 6px 14px rgba(0,0,0,0.22),
      0 12px 24px rgba(0,0,0,0.14)
    `
  }}>
    <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F2E2C', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
      TAB_CODE
    </span>
    <span style={{ fontSize: '10px', color: 'rgba(15,46,44,0.45)', fontWeight: 500 }}>
      TAB_DESC
    </span>
  </div>

</div>
```

---

## 4 — COLOR TOKENS PER CARD

Romania card — replace placeholders:
  ACCENT_COLOR:   #FFCB00
  ACCENT_BORDER:  rgba(255,203,0,0.22)
  GHOST_COLOR:    #FFCB00
  GHOST_OPACITY:  0.04
  GHOST_NUMBER:   01
  CARD_NUMBER:    01
  CARD_TITLE:     Romanya
  TAB_BACKGROUND: #FFCB00
  TAB_CODE:       ANRE
  TAB_DESC:       — Romanya Enerji Regülatörü

Turkey card — replace placeholders:
  ACCENT_COLOR:   #28AFB0
  ACCENT_BORDER:  rgba(40,175,176,0.22)
  GHOST_COLOR:    #28AFB0
  GHOST_OPACITY:  0.05
  GHOST_NUMBER:   02
  CARD_NUMBER:    02
  CARD_TITLE:     Türkiye
  TAB_BACKGROUND: #28AFB0
  TAB_CODE:       EPDK
  TAB_DESC:       — Türkiye Enerji Regülatörü

GOLD ZONE RULE — CRITICAL:
  Tab text color is ALWAYS #0F2E2C (afa-deep).
  Never use white text on #FFCB00 or #28AFB0 backgrounds.

---

## 5 — PULL-QUOTE

```tsx
<div style={{
  marginTop: '24px',
  borderLeft: '3px solid #FFCB00',
  borderRadius: '0 4px 4px 0',
  padding: '24px 28px',
  background: 'rgba(255,255,255,0.06)'
}}>
  <p style={{
    fontSize: '15px',
    fontWeight: 700,
    color: 'rgba(255,255,255,0.92)',
    lineHeight: 1.70,
    margin: '0 0 10px'
  }}>
    {content.pullQuoteMain}
  </p>
  <p style={{
    fontSize: '13px',
    color: 'rgba(255,255,255,0.44)',
    lineHeight: 1.65,
    margin: 0
  }}>
    {content.pullQuoteSub}
  </p>
</div>
```

---

## 6 — JSON CONTENT

messages/tr/hakkimizda.json — b5 section:

```json
"b5": {
  "intro": "",
  "romania": {
    "title": "Romanya",
    "breakingPoint": "ATR belgesi teorik bağlantı hakkı tanır; ancak fiili şebeke kapasitesi ve üretim kısıntısı riski belgeden farklı bir tablo ortaya koyabilir.",
    "boardTranslation": "Gelir görünürlüğü, takvim gerçekçiliği ve finansmana uygunluk üzerinde belirsizlik bandı oluşur. Bu belirsizlik hangi riskin hangi koşulla üstlenileceğini doğrudan etkiler."
  },
  "turkey": {
    "title": "Türkiye",
    "breakingPoint": "Düzenleyici çerçeve genel olarak sabit görünse de uygulama, Elektrik Dağıtım Şirketi düzeyinde farklılaşabilir. Bu farklılıklar bağlantı gerçekliğinde belirgin hale gelir.",
    "boardTranslation": "Uygulama farklılıkları, proje takvimi, izin zinciri ve sözleşme risk dağılımının nakit akışı güvenilirliği üzerindeki belirsizlik bandını genişletebilir."
  },
  "pullQuoteMain": "Aynı proje başlığı, iki piyasada farklı belirsizlik kaynakları nedeniyle farklı karar tartışmaları üretir. Piyasa dinamiklerini karşılaştırılabilir bir çerçevede okumak, yatırım komitesinin bu farkları erken aşamada ayırt etmesine zemin hazırlar.",
  "pullQuoteSub": "Romanya merkezli bu analiz çerçevesi, Orta ve Doğu Avrupa'daki gelişen yenilenebilir enerji piyasalarına yönelik genişleyen bir kapsama zemin hazırlamaktadır."
}
```

messages/en/hakkimizda.json — b5 section:
```json
"b5": {
  "intro": "",
  "romania": {
    "title": "Romania",
    "breakingPoint": "An ATR document grants theoretical connection rights; however, actual grid capacity and curtailment risk may paint a different picture than the document suggests.",
    "boardTranslation": "Uncertainty bands form around revenue visibility, schedule realism, and bankability — directly affecting which risks can be assumed and under what conditions."
  },
  "turkey": {
    "title": "Turkey",
    "breakingPoint": "The regulatory framework appears broadly stable, but implementation can diverge at the electricity distribution company level — divergences that become visible in connection realities.",
    "boardTranslation": "Implementation variability may widen the uncertainty band around project timelines, permit chains, and contractual risk allocation, affecting cash flow reliability."
  },
  "pullQuoteMain": "The same project headline generates different decision discussions in two markets due to different sources of uncertainty. Reading market dynamics within a comparable framework gives the investment committee the tools to distinguish these differences at an early stage.",
  "pullQuoteSub": "This Romania-centred analytical framework lays the groundwork for an expanding scope targeting emerging renewable energy markets across Central and Eastern Europe."
}
```

messages/ro/hakkimizda.json — b5 section:
```json
"b5": {
  "intro": "",
  "romania": {
    "title": "România",
    "breakingPoint": "Un document ATR acordă drepturi teoretice de conexiune; cu toate acestea, capacitatea reală a rețelei și riscul de reducere a producției pot prezenta o imagine diferită față de document.",
    "boardTranslation": "Se formează benzi de incertitudine în jurul vizibilității veniturilor, realismului calendarului și bancabilității — afectând direct ce riscuri pot fi asumate și în ce condiții."
  },
  "turkey": {
    "title": "Turcia",
    "breakingPoint": "Cadrul de reglementare pare în general stabil, dar implementarea poate diverge la nivelul companiei de distribuție a energiei electrice — divergențe care devin vizibile în realitățile de conexiune.",
    "boardTranslation": "Variabilitatea implementării poate lărgi banda de incertitudine privind termenele proiectelor, lanțurile de autorizare și alocarea riscurilor contractuale, afectând fiabilitatea fluxului de numerar."
  },
  "pullQuoteMain": "Același titlu de proiect generează discuții diferite de decizie în două piețe din cauza diferitelor surse de incertitudine. Citirea dinamicii pieței într-un cadru comparabil oferă comitetului de investiții instrumentele necesare pentru a distinge aceste diferențe într-un stadiu incipient.",
  "pullQuoteSub": "Acest cadru analitic centrat pe România pune bazele unei extinderi a scopului către piețele emergente de energie regenerabilă din Europa Centrală și de Est."
}
```

---

## 7 — RESPONSIVE

Mobile (<768px):
  cards grid: grid-template-columns: '1fr' (single column, stacked)
  content columns inside card: grid-template-columns: '1fr', gap: '24px'

---

## 8 — ANCHOR COMPLIANCE

- ANCHOR-1: No hardcoded hex in className — all via inline style
- ANCHOR-2: No hover transitions on cards — compliant
- ANCHOR-3: All text on dark bg uses inline rgba() — no Tailwind modifiers
- ANCHOR-4 GOLD ZONE: tab text #0F2E2C on gold and teal backgrounds
- ANCHOR-5: globals.css @theme block, Header.tsx, Footer.tsx not modified

---

## BUILD

1. Run: `npm run build`
2. Report: files changed, build result, page count, TypeScript errors
3. If build fails: STOP. Report exact error. Make no further changes.
