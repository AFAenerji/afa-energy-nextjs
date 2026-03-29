# Claude Code Fix Instructions: Hakkımızda Page
# Version: Fix-02 (Final) | Date: March 2026
# Apply all fixes in one pass. Run npm run build after all changes.
# Do NOT modify: globals.css @theme block, Header.tsx, Footer.tsx

---

## BEFORE STARTING

Copy the 4 SVG icon files to `public/icons/`:
- `b3-icon-approve.svg`     → `public/icons/approve.svg`
- `b3-icon-engineer.svg`    → `public/icons/engineer.svg`
- `b3-icon-increase.svg`    → `public/icons/increase.svg`
- `b3-icon-time-money.svg`  → `public/icons/time-is-money.svg`

---

## FIX 1 — B1Hero.tsx: Remove gap between Header and Hero

**Problem:** White space visible between Header and Hero section.

**Fix:**
- Ensure the outer `<section>` in B1Hero.tsx has no top margin or top padding.
- Open `src/app/[locale]/about/page.tsx` — ensure `<main>` has no `pt-*` or `mt-*` class.
- The section element: `className="relative w-full bg-afa-primary-dark"` with no top offset.

---

## FIX 2 — B2BizKimiz.tsx: Photo overlay + typography

### 2a — Gold overlay height
Find the pull-overlay div (absolute, bottom-0, gold background).
Change height from `38%` to `48%`.
Change background opacity from `rgba(255,203,0,0.90)` to `rgba(255,203,0,0.92)`.
Mask: `WebkitMaskImage: 'linear-gradient(transparent, black 30%)'`

### 2b — Pull quote typography
Pull quote main text: Montserrat 900, `clamp(16px, 1.8vw, 22px)`, inline `color: #0F2E2C`
Pull sub text: Open Sans / **14px** / italic / font-weight 600 / line-height 1.6
  inline style: `color: rgba(15,46,44,0.85)`

### 2c — Font size audit for B2
- H2 "Teknik Filtre. Doğru Buluşma.": `clamp(26px, 2.6vw, 34px)` / font-weight 700
- Body paragraphs: `15px` / line-height 1.65 / inline `color: #374151`
- Kicker: `11px` / letter-spacing 0.18em
- ATR status label: `11px` / letter-spacing 0.18em / inline `color: #9CA3AF`
- Status card titles: `14px` / font-weight 700
- Status card descriptions: `13px` / inline `color: #6B7280`

---

## FIX 3 — B3DegerlendirmeCercevesi.tsx: Icons + layout + CTA

### 3a — Replace icons with SVG files
Remove all Phosphor icon references.
Use Next.js `<Image>` for each card icon.

Icon assignment:
- Card 01 "Bağlantı Uygulanabilirliği"              → `/icons/engineer.svg`
- Card 02 "Şebeke Kapasitesi ve Üretim Kısıntısı"   → `/icons/time-is-money.svg`
- Card 03 "Bağlantı Maliyeti ve Şebeke Yatırımı"    → `/icons/increase.svg`
- Card 04 "İzin Zinciri ve Takvim Riski"             → `/icons/approve.svg`

Icon circle wrapper (replaces old circle):
```tsx
<div style={{
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  background: 'rgba(40,175,176,0.15)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  marginBottom: '12px'
}}>
  <Image
    src="/icons/engineer.svg"
    alt=""
    width={26}
    height={26}
    style={{
      filter: 'invert(28%) sepia(44%) saturate(567%) hue-rotate(131deg) brightness(93%) contrast(92%)'
    }}
  />
</div>
```

### 3b — Left column content — ensure all items render
The 2-column grid (5fr / 7fr) stays. Ensure left column contains ALL of:
1. Kicker: "DEĞERLENDİRME ÇERÇEVEMİZ" — gold, 11px, uppercase
2. H2: "Her Proje Dört Eksende İncelenir."
   → `clamp(24px, 2.4vw, 34px)` / font-weight 700
   → inline style: `color: rgba(255,255,255,0.95)`
3. Body paragraph:
   "AFA, incelediği her projeyi yatırım kararından önce aynı metodolojik
    disipline tabi tutar. Proje aşaması değişse de çerçeve değişmez."
   → `15px` / line-height 1.6 / inline style: `color: rgba(255,255,255,0.82)`

### 3c — CTA position
Move CTA link to a full-width row BELOW the 2-column grid. Right-aligned.
```tsx
<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
  <Link href="/tr/atr-matrix" style={{
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    background: 'transparent',
    border: '1.5px solid #FFCB00',
    color: '#FFCB00',
    fontWeight: 700, fontSize: '15px',
    padding: '13px 28px', borderRadius: '6px',
    textDecoration: 'none'
  }}>
    ATR Matrix™ metodolojisini inceleyin →
  </Link>
</div>
```

### 3d — Card number visibility
Number badge (01–04): font-size `13px` / opacity `1.0` / color text-afa-gold

---

## FIX 4 — B4AfarklıYapan.tsx: NO CHANGES

B4 banner stack design is approved and must not be modified.
Skip this component entirely.

---

## FIX 5 — B5PiyasaDinamikleri.tsx: Typography + spacing + contrast

### 5a — Number-title hierarchy
Number ("01", "02"):
  → `clamp(20px, 2vw, 28px)` / inline `color: rgba(255,255,255,0.15)`

Country name ("Romanya", "Türkiye"):
  → `clamp(26px, 2.8vw, 36px)` / font-weight 700
  → inline `color: rgba(255,255,255,0.95)`

Both on same baseline: `display: flex; align-items: baseline; gap: 16px`

### 5b — Column sub-labels: increase size + correct color per market
Font-size: `10px` → `12px`

Romania block sub-labels:   inline `color: rgba(255,203,0,0.85)`    ← gold
Turkey block sub-labels:    inline `color: rgba(40,175,176,0.85)`   ← teal
Do NOT make both gold — each market keeps its own color.

### 5c — Spacing between market blocks
`.market-block` marginBottom: `48px` → `72px`

### 5d — Gold pull statement visibility
```tsx
<div style={{
  marginTop: '48px',
  padding: '28px 36px',
  background: 'rgba(255,203,0,0.18)',
  borderLeft: '4px solid #FFCB00',
  borderRadius: '0 8px 8px 0'
}}>
  <p style={{
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '17px',
    fontWeight: 600,
    lineHeight: 1.55,
    color: '#FFCB00',
    fontStyle: 'normal',
    maxWidth: '700px'
  }}>
    Farklı regülasyon yapılarına rağmen, AFA'nın teknik değerlendirme
    disiplini her iki piyasada da tutarlı karar zemini sunar.
  </p>
</div>
```

---

## FIX 6 — B6B7Kapanis.tsx: Spacing + disclaimer text

### 6a — Whitespace reduction
- Closing quote margin-bottom: `60px` → `40px`
- Quote divider margin-bottom: `56px` → `36px`
- Closing body margin-bottom: `40px` → `48px`

### 6b — Disclaimer text UPDATE (content change — approved)
Find the disclaimer text element.
Replace current text with:
"Her projeye özgü hukuki ve teknik doğrulama için bağımsız danışmanlık
 alınması tavsiye edilir."

Disclaimer styles:
- font-size: `13px`
- font-style: italic
- inline style: `color: #4B6463`
- line-height: 1.5
- text-align: center
- margin-top: 20px

Also update the JSON file `messages/tr/hakkimizda.json`:
Find the `disclaimer` field and update its value to the new text above.
Also update `messages/en/hakkimizda.json` and `messages/ro/hakkimizda.json`
with translated equivalents:
  EN: "Independent legal and technical due diligence is recommended for each project."
  RO: "Se recomandă consultanță juridică și tehnică independentă pentru fiecare proiect."

---

## GLOBAL TYPOGRAPHY FLOOR (all hakkimizda components)

No text element on this page should be below 11px.
Verify these minimums across all 6 components:

| Element                     | Min size |
|-----------------------------|----------|
| Kicker / section labels     | 11px     |
| Card descriptions           | 13px     |
| Sub-labels (market blocks)  | 12px     |
| Footnotes / disclaimers     | 11px     |
| Pull sub text (overlay)     | 14px     |
| Card number badges          | 13px     |

---

## BUILD

1. Run: `npm run build`
2. Report:
   - Files changed (list)
   - Build result: success or failure
   - Total page count
   - Any TypeScript errors
3. If build fails: STOP. Report exact error. Make no further changes.
