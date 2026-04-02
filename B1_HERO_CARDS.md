# Claude Code Fix: B1 Hero — Metric Cards Redesign
# Component: B1Hero.tsx
# Date: March 2026
# Do NOT modify: globals.css, Header.tsx, Footer.tsx

---

## OVERVIEW

Update the metric cards section and body text in B1Hero.tsx.
The hero section background, grid pattern, H1, subheadline, and slogan
label remain unchanged. Only the following elements are updated:
1. Body text (hero-body)
2. CTA button
3. Metric cards grid

---

## 1 — HERO BODY TEXT

Find the body paragraph below the subheadline.
Update text content in messages/tr/hakkimizda.json:

```
"Bir projenin yatırım değeri dosyasında değil —
şebekeye bağlanabilirliğinde ve izin zincirinin
gerçek sağlamlığında saklıdır."
```

Also update messages/en/hakkimizda.json:
"A project's investment value lies not in its documents —
but in its grid connectivity and the true integrity
of its permit chain."

Also update messages/ro/hakkimizda.json:
"Valoarea de investiție a unui proiect nu stă în documente —
ci în conectivitatea la rețea și soliditatea reală
a lanțului de autorizare."

Body text styles (inline, ANCHOR-3 compliant):
```tsx
<p style={{
  fontSize: '15px',
  color: 'rgba(255,255,255,0.78)',
  lineHeight: 1.7,
  maxWidth: '420px',
  margin: '0 0 32px'
}}>
  {content.heroBody}
</p>
```

---

## 2 — CTA BUTTON

Update CTA button to appear directly below body text, left-aligned.
Remove any existing CTA implementation and replace with:

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
  marginBottom: '40px',
  transition: 'background-color 120ms linear'
}}>
  {content.heroCta} →
</Link>
```

Update JSON cta label:
  TR: "ATR Matrix™ Nasıl Çalışır"
  EN: "How ATR Matrix™ Works"
  RO: "Cum Funcționează ATR Matrix™"

---

## 3 — METRIC CARDS GRID

Replace the existing metric cards implementation with the following.

### Grid wrapper
```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(3, auto)',
  gap: '12px',
  width: 'fit-content'
}}>
  {content.metrics.map((metric, index) => (
    <MetricCard key={index} metric={metric} />
  ))}
</div>
```

### Card component
```tsx
<div style={{
  background: 'linear-gradient(160deg, #1E7A77 0%, #175E5C 100%)',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: '10px',
  borderBottom: '2px solid #28AFB0',
  padding: '20px 24px',
  minWidth: '160px',
  boxShadow: `
    0 2px 4px rgba(0,0,0,0.15),
    0 8px 20px rgba(0,0,0,0.25),
    0 16px 32px rgba(0,0,0,0.15),
    inset 0 1px 0 rgba(255,255,255,0.10)
  `
}}>
  <p style={{
    fontSize: '32px',
    fontWeight: 800,
    color: '#FFCB00',
    margin: '0 0 6px',
    lineHeight: 1,
    fontFamily: 'Montserrat, sans-serif'
  }}>
    {metric.value}
  </p>
  <p style={{
    fontSize: '12px',
    color: 'rgba(255,255,255,0.78)',
    margin: 0,
    lineHeight: 1.4
  }}>
    {metric.label}
  </p>
</div>
```

### Metric data (update in JSON)

messages/tr/hakkimizda.json:
```json
"metrics": [
  { "value": "1,3 GW", "label": "Analiz edilen proje kapasitesi" },
  { "value": "500+",   "label": "Değerlendirilen ATR belgesi" },
  { "value": "10",     "label": "AB Ülkesi Deneyimi" }
]
```

messages/en/hakkimizda.json:
```json
"metrics": [
  { "value": "1.3 GW", "label": "Project capacity analysed" },
  { "value": "500+",   "label": "ATR documents reviewed" },
  { "value": "10",     "label": "EU Countries Experience" }
]
```

messages/ro/hakkimizda.json:
```json
"metrics": [
  { "value": "1,3 GW", "label": "Capacitate de proiecte analizată" },
  { "value": "500+",   "label": "Documente ATR evaluate" },
  { "value": "10",     "label": "Țări UE Experiență" }
]
```

---

## 4 — GRID TEXTURE (verify, do not change if already correct)

The hero grid overlay must be:
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

Hero content wrapper must have: `position: relative; zIndex: 1`
Grid is always behind all content.

---

## ANCHOR COMPLIANCE

- ANCHOR-1: No hardcoded hex in className — all via inline style
- ANCHOR-2: CTA uses transition-colors 120ms linear only
- ANCHOR-3: All text on dark bg via inline rgba() — no Tailwind modifiers
- ANCHOR-4: CTA gold bg uses color #0F2E2C — never white
- ANCHOR-5: globals.css, Header.tsx, Footer.tsx not modified

---

## BUILD

1. Run: `npm run build`
2. Report: files changed, build result, page count, TypeScript errors
3. If build fails: STOP. Report exact error. Make no further changes.
