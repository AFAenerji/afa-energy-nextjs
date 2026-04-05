# Claude Code Fix: Hero ↔ Page Container Alignment
# Components: B1Hero.tsx + all section components
# Date: April 2026
# Do NOT modify: globals.css @theme block, Header.tsx, Footer.tsx

---

## PROBLEM

Hero content left edge does not align with B2+ section content.
Hero uses fixed padding (e.g. 80px or 52px) while page sections use
a centered container (max-width + margin-inline: auto + padding-inline).
On wide screens this creates a visible horizontal misalignment.

---

## FIX — B1Hero.tsx

Find the hero content wrapper (the div that contains kicker, H1,
subheadline, body, CTA, and metric cards).

Replace its positioning with:

```tsx
{/* Hero section — full width background */}
<section style={{
  width: '100%',
  background: '#18625F',
  position: 'relative',
  overflow: 'hidden',
  minHeight: '540px'
}}>
  {/* Grid texture — z-index 0 */}
  {/* Photo + gradient — z-index 1 */}

  {/* Content wrapper — aligned to global container */}
  <div style={{
    position: 'relative',
    zIndex: 3,
    maxWidth: '1180px',
    marginInline: 'auto',
    paddingInline: '52px',
    paddingBlock: '60px'
  }}>
    {/* kicker, H1, subhead, body, CTA, metrics */}
  </div>

</section>
```

Key rules:
- `maxWidth: '1180px'` + `marginInline: 'auto'` centers the content
- `paddingInline: '52px'` must match all other section containers exactly
- `paddingBlock: '60px'` controls vertical rhythm only — does not affect alignment
- Section background remains full width — only the inner wrapper is constrained

---

## VERIFY — All other section components

Check B2BizKimiz.tsx, B3DegerlendirmeCercevesi.tsx, B4AfarklıYapan.tsx,
B5PiyasaDinamikleri.tsx, B6B7Kapanis.tsx.

Each section's content wrapper must use:
```tsx
style={{
  maxWidth: '1180px',
  marginInline: 'auto',   // or margin: '0 auto'
  paddingInline: '52px',  // or padding: '0 52px'
}}
```

If any section uses a different padding-inline value (e.g. 40px, 60px, 64px),
update it to 52px to maintain mathematical alignment with the hero.

Do NOT change paddingBlock (vertical padding) of any section.
Do NOT change section background colors.

---

## RESPONSIVE

Mobile (<768px):
  paddingInline: '24px' — reduce horizontal padding on small screens
  Apply via className or conditional style based on viewport

Tablet (768–1023px):
  paddingInline: '40px'

Desktop (≥1024px):
  paddingInline: '52px' (default, as specified above)

If the project uses Tailwind breakpoints, equivalent classes are:
  px-6 md:px-10 lg:px-[52px]
But prefer inline styles on dark section wrappers (ANCHOR-3 compliance).

---

## ANCHOR COMPLIANCE

- ANCHOR-5: globals.css @theme block not modified
- ANCHOR-3: Dark section text colors remain as inline rgba() styles
- No color or transition changes in this fix — layout only

---

## BUILD

1. Run: `npm run build`
2. Report:
   - Which files were updated (list)
   - Build result: success or failure
   - Total page count
   - Any TypeScript errors
3. If build fails: STOP. Report exact error. Make no further changes.
