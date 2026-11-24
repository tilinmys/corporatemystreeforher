# Her Corporate Care

Corporate women's-health app by MyStree. One React codebase that is **both** a full responsive desktop website and a native-feeling phone app. Built to run fully offline on weak hospital Wi-Fi: fonts, portraits and PDF generation are all bundled locally. Never add a runtime CDN dependency.

## Stack & commands

Vite 8 · React 19 · TypeScript 7 · Tailwind CSS v4 (`@tailwindcss/vite`) · zustand · date-fns · framer-motion · lucide-react · jsPDF · `@fontsource` (Fraunces display, Plus Jakarta Sans UI).

```powershell
npm run dev          # http://localhost:5173 (or the port in ../.claude/launch.json)
npx tsc -b           # type-check (root tsconfig uses project references; plain `tsc --noEmit` checks nothing)
npm run build        # tsc -b && vite build
```

- `vite.config.ts` sets `css.postcss: {}` on purpose so Vite does **not** pick up the parent MyStree website's `postcss.config.js` (Tailwind v3). Keep it.
- In PowerShell, `npm create … -- --flag` loses the bare `--`; quote it: `'--'`.

## Layout of `src/`

| Path | Purpose |
|---|---|
| `design-system/AppShell.tsx` | Responsive shell (replaces the old fixed-width `MobileShell`) |
| `design-system/HerLogo.tsx` | Brand mark. Click → Today; 1.5s long-press or Shift+Click → `resetDemo()` |
| `design-system/DemoToolbar.tsx` | Presenter pill: `Real MyStree / Spec Names`, `Fluid / 390px Phone` |
| `design-system/PhonePreview.tsx` | 390×844 iframe preview (`?embed=1`) so real media queries apply |
| `design-system/NotificationToast.tsx`, `NotificationBell.tsx` | Push banner + bell with unread dot; click → `targetScreen` |
| `design-system/BurgundySilkCanvas.tsx` | Resize-safe WebGL silk background |
| `design-system/DoctorCard.tsx`, `BenefitsCard.tsx`, `LabResultRow.tsx` | `@container`-responsive components |
| `design-system/Layout.tsx` | `Container`, `ReadingColumn`, `SplitGrid`, `PageHeader`, `Section` |
| `design-system/Controls.tsx` | `PrimaryButton`, `SlotMatrix`, `StickyCTA` |
| `store/app.ts` | zustand store: screen, notifications, booking, linked company, presenter prefs, `resetDemo()` |
| `data/doctors.ts` | Clinical data + Real (MyStree site) / Spec (fictional) names. Portraits in `public/doctors/` |
| `data/demo.ts` | Illustrative benefits, labs and slots. Not clinical records |

## Design tokens (`src/index.css` → `@theme`)

| Token | Value | Use |
|---|---|---|
| `burgundy` | `#641E2B` | Primary, active text/icons, focus ring |
| `burgundy-50` | `#F4E9EC` | Active nav pill fill, soft chips |
| `hairline` | `#E8DFDC` | 1px borders, sidebar right edge |
| `porcelain` | `#FAF7F5` | Page canvas |
| `surface` | `#FFFFFF` | Cards, sidebar, mobile header |
| `covered` | `#1D6B4F` | `₹0 Covered` / Active states |

Prefer tokens over hex: `hover:border-burgundy/40` is the same as `hover:border-[#641E2B]/40`. Shared strings live in `lib/cn.ts` (`focusRing`, `cardSurface`, `cardHover`).

## Responsive shell

- **Phone (< 1024px):** full-bleed `min-h-dvh`; sticky white top header (`pt-safe`); fixed bottom 4-tab bar (Today, Calendar, Care, Profile) with `env(safe-area-inset-bottom)`; every tab ≥ 44×44px. `<main>` uses `pb-tabbar` so content clears the bar.
- **Desktop (`lg` ≥ 1024px):** persistent 248px left sidebar on `#FFFFFF` with `1px solid #E8DFDC` right hairline: `<HerLogo />`, nav links with the burgundy active pill (`bg-burgundy-50 text-burgundy`), and a bottom-pinned Corporate Status card (`Acme Tech · Active` or `Link company`). A sticky 64px top utility bar holds the breadcrumb, Demo Toolbar and notification bell. Content is capped at `max-w-[1320px]`.
- **Push banner:** top-centre on phone; top-right floating toast `max-w-[380px]` on desktop. Auto-dismisses after 6s.
- **Demo Toolbar** shows only on desktop and is hidden inside the phone-preview iframe.

## Container-sensitive grid rules

1. **Never stretch mobile forms edge-to-edge on desktop.** Single-column reading/setup flows (profile, onboarding, consent, settings) go in `<ReadingColumn>`: `max-w-[560px]`, centred on the porcelain `#FAF7F5` canvas.
2. **Multi-part clinical workflows use asymmetric 12-column splits.** Use `<SplitGrid layout="8/4" | "7/5">` (`lg:grid-cols-12 gap-6`). The right-hand summary/action rail is `lg:sticky lg:top-24 lg:self-start`. Below `lg` everything stacks into one column.
   - Dashboard (Today): 8/4. Booking (Calendar): 7/5. Care/checkout: 8/4.
3. **Components adapt to their own column, not the screen.** `DoctorCard`, `BenefitsCard`, `LabResultRow` and `SlotMatrix` wrap themselves in `@container`. Never use viewport breakpoints (`sm:`/`lg:`) inside these components for their internal layout. `BenefitsCard`, `LabResultRow` and `SlotMatrix` switch at `@md` (448px).
   - DoctorCard < `@lg`: `grid-cols-[88px_1fr]`, 4:5 portrait (`object-cover object-top`), serif name, specialty, years/languages, full-width bottom bar (Next slot left, `₹0 Covered` right); the whole card is the tap target.
   - DoctorCard ≥ `@lg` (512px): `grid-cols-[116px_1fr_auto]`, with credentials and languages in the middle, and Next slot, `₹0 Covered` and a `Book slot →` CTA in a fixed 156px right column.
   - Why `@lg`, not `@md`: at 448–511px the three-column card leaves only 50–100px for the doctor's name. That happens in the Today 8/12 column at a 1024px viewport.
4. **Dual-modality polish on every interactive element:**
   - Touch: ≥ 44×44px hit area on phone (`min-h-11`, `size-11`, `h-11`).
   - Pointer: subtle `hover:border-burgundy/40` on cards and inputs.
   - Keyboard: `focus-visible:ring-2 focus-visible:ring-burgundy` (use `focusRing`). Never remove outlines without this replacement.
5. **Primary actions on phone** use `<StickyCTA>`: pinned above the tab bar below `lg`, inline in the sticky rail on desktop.
6. **Motion and GPU:** WebGL/animated pieces must respect `prefers-reduced-motion`, pause off-screen, cap DPR at 2, and resize from a `ResizeObserver` on their parent (see `BurgundySilkCanvas`), with aspect-corrected UVs so nothing stretches.

## Verification checklist

- `npx tsc -b` passes and `npm run build` shows no warnings.
- Resize smoothly from 375px → 1440px: the shell switches at 1024px, DoctorCards flip at 448px of card width, the silk hero never stretches, and no horizontal scroll appears.
- The `390px Phone` toggle shows the phone shell inside the device frame, and `Real MyStree / Spec Names` updates both views.
