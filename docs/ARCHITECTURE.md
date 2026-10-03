---
status: draft
updated: 2026-09-30
project: CoffeLovers
altitude: initiative
framework: Next.js 14+
paradigm: Static Site Generation (SSG) + React
---

# CoffeLovers Architecture Spine

## Initiative Summary

Premium coffee enthusiast website: static content site (Phase 1) delivering dark-luxury visual identity and comprehensive bean/method educational content. Optimized for mobile performance with desktop interactivity. Prepared for future evolution (shop, recommendations) but **not building those in Phase 1**.

---

## Architectural Decisions

### AD-1: Framework = Next.js 14 with TypeScript

**Binds:**
- React as UI library; App Router (file-based routing); TypeScript for type safety
- Build-time SSG for static content pages
- Vercel as natural deployment platform

**Prevents:**
- Misalignment on framework between design and implementation
- Runtime performance overhead on mobile (pure HTML delivery at build-time)

**Rule:**
```
All pages (homepage, /graos/[id], /metodos/[id]) generated statically at build-time.
React for client-side interactivity only where needed (hover states, quiz, transitions).
TypeScript enforces type safety across data → components → pages.
```

**Status:** [ADOPTED] — User confirmed Phase 1 priorities (mobile performance, subtle interactivity, single codebase evolution)

---

### AD-2: Rendering Strategy = Static Site Generation (SSG)

**Binds:**
- `graos.json` and `metodos.json` loaded at build-time
- `generateStaticParams()` creates `/graos/bourbon`, `/graos/catuai`, etc. as pre-rendered HTML
- No runtime file I/O; pages are pure static HTML + CSS + minimal JS

**Prevents:**
- Per-request rendering overhead (kills mobile performance)
- Data/code desync (content and routes always in sync)

**Rule:**
```
Content lives in TypeScript-typed JSON objects.
Build-time generation: JSON → TypeScript types → React components → static HTML pages.
All 12 pages (1 home + 7 grãos + 5 métodos) exist as .html files post-build.
```

**Status:** [ADOPTED]

---

### AD-3: Styling = Tailwind CSS + Custom Design Tokens

**Binds:**
- Design.md tokens (colors, spacing, typography, rounded, shadows) mapped to `tailwind.config.ts`
- Utility-first approach for consistency
- CSS-in-JS (via Tailwind) for all styling; no separate CSS files

**Prevents:**
- Spacing/color drift between team members
- Inconsistency with DESIGN.md

**Rule:**
```
tailwind.config.ts:
  extend: {
    colors: {
      primary: "#D4AF37",        // ouro
      dark: "#121212",
      "bg-subtle": "rgba(212,175,55,0.04)",
      // ... (see DESIGN.md colors table)
    },
    spacing: { ... },             // 6px, 12px, 16px, 20px, 24px, 32px, 48px, 60px, 80px
    fontFamily: {
      serif: ["EB Garamond", ...],
      sans: ["Inter", ...],
    },
    // ... (rounded, shadows, etc from DESIGN.md)
  }
```

Every Tailwind class references a token; never hard-code colors/spacing.

**Status:** [ADOPTION PENDING] — Will finalize token mapping during implementation

---

### AD-4: Images = Next.js Image Component + CDN Optimization

**Binds:**
- 12 pre-generated 3D renders (1200x1200px PNG/JPG) live in `/public/assets/images/{graos,metodos}`
- Served via `next/image` Image component (auto-format AVIF/WebP, lazy-load, responsive sizing)
- Drop-shadow filter (CSS) on image containers per DESIGN.md

**Prevents:**
- Unoptimized assets bloating mobile loads
- Inconsistent image sizing across responsive breakpoints

**Rule:**
```
<Image
  src="/assets/images/graos/bourbon.png"
  alt="Bourbon coffee bean"
  width={1200}
  height={1200}
  priority={false}  // lazy-load by default
  className="drop-shadow-lg"
/>
```

**Status:** [ADOPTION PENDING] — Assets verified; image optimization strategy confirmed

---

### AD-5: Data → Code Pipeline = TypeScript-Typed JSON at Build-Time

**Binds:**
- `graos.json` and `metodos.json` are single source of truth
- TypeScript interfaces (Grao, Metodo) generated or hand-written from schema
- No runtime fetch; data imported as static objects

**Prevents:**
- Runtime data loading bottlenecks
- Type mismatches between data and components

**Rule:**
```typescript
// lib/types.ts
interface Grao {
  id: string;
  nome: string;
  regiao: string;
  // ... (matches conteudo/graos.json schema)
}

// lib/data.ts
import graos from "@/conteudo/graos.json";
const graosTyped: Grao[] = graos;  // Type-checked at build

// app/graos/[id]/page.tsx
export function generateStaticParams() {
  return graosTyped.map(g => ({ id: g.id }));
}
```

**Status:** [ADOPTED]

---

### AD-6: Interactivity = CSS Transitions + Conditional JS + `prefers-reduced-motion`

**Binds:**
- Hover states (card elevation, color shifts) via Tailwind `hover:` classes
- Desktop: smooth CSS transitions (300-400ms)
- Mobile: instant (no transition delay) via `@media (max-width: 768px)` or JS gate
- Respects `prefers-reduced-motion` OS setting (all transitions disabled if user set)

**Prevents:**
- Animation jank on mobile (kills perceived performance)
- Accessibility violations (users with motion sensitivity)

**Rule:**
```css
/* In Tailwind config or globals.css */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Per-component */
<div className="hover:shadow-lg hover:translate-y-[-4px] transition-all duration-300 
                  md:transition-all md:duration-300 sm:hover:translate-y-0">
  Card content
</div>
```

**Status:** [ADOPTED]

---

### AD-7: Folder Structure = App Router with Data-Driven Routes

**Binds:**
- `/app` directory (Next.js App Router)
- `/lib` for utilities, types, data
- `/components` for reusable React components
- `/public` for static assets (images, fonts)
- `/conteudo` for JSON content (graos.json, metodos.json)

**Rule:**
```
CoffeLovers/
├── app/
│   ├── layout.tsx              # Root layout (header, footer, global styles)
│   ├── page.tsx                # / (homepage with explorer grids)
│   ├── graos/
│   │   ├── page.tsx            # /graos (explorer/index)
│   │   └── [id]/
│   │       └── page.tsx        # /graos/[id] (bean detail, SSG)
│   ├── metodos/
│   │   ├── page.tsx            # /metodos (explorer/index)
│   │   └── [id]/
│   │       └── page.tsx        # /metodos/[id] (method detail, SSG)
│   ├── api/                    # [Deferred] for shop/APIs
│   └── globals.css             # Tailwind directives
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── GraoCard.tsx
│   ├── MetodoCard.tsx
│   ├── FlavorProfile.tsx
│   ├── SpecsGrid.tsx
│   └── Quiz.tsx
├── lib/
│   ├── types.ts                # TypeScript interfaces
│   ├── data.ts                 # Import/export graos, metodos
│   └── utils.ts                # Helpers (formatters, etc)
├── public/
│   └── assets/images/
│       ├── graos/
│       │   ├── bourbon.png
│       │   └── ... (7 total)
│       └── metodos/
│           ├── v60.png
│           └── ... (5 total)
├── conteudo/
│   ├── graos.json              # Source data
│   └── metodos.json
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

**Status:** [ADOPTED]

---

## Deferred Decisions

- **Shop / E-commerce:** API routes created but empty. Database, payments, authentication deferred to Phase 2.
- **Dark/Light mode toggle:** Dark-only in Phase 1. Toggle UI logic deferred.
- **Internationalization:** Portuguese (PT-BR) only in Phase 1. i18n infrastructure deferred.
- **Analytics / Tracking:** Deferred.
- **Search:** Deferred (static site, no backend search needed yet).
- **Deployment platform:** Assumed Vercel; other platforms possible but not configured.

---

## Responsive Design Grid

**Mobile-First Approach:**

- **Mobile (<768px):** 1-column layout, 20px padding, font sizes -15%, animations disabled
- **Tablet (768px–1024px):** 2-column grids, 40px padding, animations enabled
- **Desktop (>1024px):** 3-column grids, 80px padding, full animation suite

Breakpoints via Tailwind defaults: `sm:`, `md:`, `lg:`, `xl:`.

---

## Data Flow Diagram

```
conteudo/graos.json
        ↓
   [Build-time]
        ↓
lib/types.ts (TypeScript interfaces)
        ↓
lib/data.ts (import graos, metodos)
        ↓
app/graos/[id]/page.tsx
  ├─ generateStaticParams() → /graos/bourbon.html, /graos/catuai.html, ...
  └─ GraoCard, SpecsGrid, FlavorProfile components → render static HTML
        ↓
   [Static HTML files]
        ↓
   Deploy (Vercel CDN)
        ↓
   Browser loads .html + .css + minimal .js (interactivity hooks)
```

---

## Next Steps

1. **Create Next.js project** with TypeScript, Tailwind
2. **Setup Tailwind config** mapping DESIGN.md tokens
3. **Create TypeScript types** for Grao and Metodo
4. **Build data pipeline**: JSON → types → export
5. **Implement Root Layout** (header, footer, fonts)
6. **Generate static pages** (homepage, grão explorer, method explorer, detail pages)
7. **Add CSS transitions** per AD-6
8. **Test responsive** on mobile/desktop/tablet
9. **Deploy to Vercel**

---

**Status:** Draft | **Last Updated:** 2026-09-30 | **Next:** Visual mockups (mobile/desktop responsive plan)
