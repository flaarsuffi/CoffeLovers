---
status: draft
updated: 2026-09-30
form-factor: web
ui-system: custom (references DESIGN.md)
---

# CoffeLovers Experience System
## How It Works

---

## Foundation

**Form Factor:** Web (responsive desktop, tablet, mobile). Single-page scroll experience.

**UI System:** Custom design system (see `DESIGN.md` for tokens).

**Platform:** Webflow / Next.js / similar. Progressive enhancement — JS for interactivity, but page readable without.

**Interaction Model:** Click + scroll. No drag-drop, no gestures beyond standard scroll.

---

## Information Architecture

### Core Surfaces (User-Facing Screens)

1. **Homepage (Main Landing)**
   - Hero section (call-to-action, 3D render rotating)
   - Grãos explorer (bean cards with 3D renders)
   - Métodos explorer (method cards with 3D rotating equipment)
   - Quiz CTA widget (prominent, at the bottom)
   - Footer

**IA Flow:** Hero → Explore Beans → Explore Methods → Then Quiz (engagement funnel, not push)

2. **Bean Detail Page** (navigated from card click)
   - Hero: large bean image
   - Info grid: origin, flavor profile, recommended methods
   - Recipe card: ingredients, steps, timing
   - Related beans carousel
   - Related methods cards
   - CTA to quiz

3. **Method Detail Page** (navigated from card click)
   - Hero: large method icon/image
   - Tutorial: step-by-step instructions
   - Equipment needed (checklist)
   - Technical specs (temp, time, ratio, grind)
   - Recipe variations
   - Compatible beans carousel
   - CTA to quiz

4. **Quiz Flow** (multi-step form)
   - Intro screen (8 questions)
   - Question 1-8 (cards, scales, or buttons)
   - Results screen (personalized: "Your ideal bean is X, method is Y")
   - Save/share results
   - Related content (beans, methods, recipes)

5. **Saved Favorites / Profile** (if authenticated)
   - My beans (cards user added)
   - My methods (cards user saved)
   - Quiz history
   - Settings

---

### Information Hierarchy

**Primary User Needs:**
1. Browse & explore beans first → **Bean explorer** (engagement, curiosity)
2. Discover specific methods → **Method explorer** (education)
3. Find my ideal pairing → **Quiz** (when ready, at bottom of flow)
4. Understand recipes (how to brew) → **Detail pages** (from cards)
5. Share/save favorites → **Profile / sharing** (optional)

**IA Principle:** Exploration-first, quiz-last. Let users browse and learn before converting to quiz. Quiz is reward, not entry barrier. Fluido, não pushy.

---

## Voice and Tone

**Brand Voice:** Casual, knowledgeable, irreverent.

- **Not:** Academic, gatekeeping, pretentious.
- **Yes:** Accessible, funny, opinion-forward.

**Microcopy Examples:**

| Context | Tone | Example |
|---------|------|---------|
| Quiz intro | Casual, playful | "8 perguntas pra descobrir seu café ideal (sem julgamentos)" |
| Bean description | Descriptive + poetic | "Floral intenso, frutas exóticas. Elegância que não pede permissão." |
| Method CTA | Action-oriented | "→ Dominar V60" ou "→ Começar agora" |
| Error message | Helpful, light | "Ops, algo deu errado. Tenta de novo?" |
| Success | Celebratory | "✓ Resultado salvo! Compartilha com alguém que ama café." |
| Footer | Humble | "Feito por entusiastas, pra entusiastas" |

**Inclusive language:**
- Avoid jargon without explanation.
- No gatekeeping ("café de verdade", "real coffee", etc). Everyone's journey is valid.
- Use "você" (tu is ok), speak directly.

---

## Component Patterns

### Interactive Patterns

**1. Card Tap/Click**
- Visual: Entire card is clickable (pointer cursor on hover).
- Hover state: `transform: translateY(-12px)` + border color change to accent + shadow.
- Destination: Detail page for bean/method.
- Feedback: Smooth 0.3s transition.

**2. Tag Selection** (used in quiz, filters, etc)
- Visual: Outlined tag with border + color.
- Hover: Fill with color, text inverts.
- Active: Filled state with accent color.
- Feedback: `transform: scale(1.05)` on hover.
- Interaction: Click to select/deselect. Multiple tags can be active.

**3. Button Press**
- Visual: Primary (red/maroon) or Secondary (gold).
- Hover: Color change + slight lift (`transform: translateY(-4px)`).
- Active/press: Subtle scale down (`scale(0.98)`).
- Disabled: Opacity 0.5, no cursor.
- Feedback: Smooth 0.3s.

**4. Form Input**
- Visual: `2px solid {colors.text-secondary}` border, white bg.
- Focus: Border color → {colors.primary} (gold).
- Typing: Smooth border transition.
- Error: Border color → {colors.accent} (red) + error message below.

**5. Scroll Reveal** (core interaction)
- Elements fade in + slide up as user scrolls to them.
- Fade-in: opacity 0 → 1 over 0.6s.
- Slide: `translateY(30px)` → `translateY(0)` over 0.6s.
- Stagger: Each card in grid staggers 0.1s delay.
- No motion: Respect `prefers-reduced-motion` — fade only, no transform.

**6. 3D Render Scroll Animations** (hero interaction)
- **Rotation:** 3D renders rotate along Y-axis as user scrolls.
  - Hero render: 360° rotation across full scroll depth.
  - Equipment cards: Subtle 45° rotation to reveal different angles.
- **Parallax:** Renders move slower than text (depth illusion).
  - Render movement: 50% of scroll speed (translateZ effect).
- **Float + Rotate:** Subtle float animation + rotation combined.
- **Detection:** Intersection Observer tracks card visibility → CSS custom properties update rotation angle.
- **Fallback:** If JS fails, renders show static default angle. Responsive still works.
- **No motion:** `prefers-reduced-motion: reduce` disables rotation, keeps fade/scale.

**6. Quiz Progress**
- Visual: Progress bar at top (% of questions answered).
- Interaction: Click back/next to move between questions.
- Validation: "Next" disabled until current question answered.
- Feedback: Smooth height change on answer select.

---

## State Patterns

### Loading States

- **Hero section:** Skeleton loader (gradient pulse) while image loads.
- **Quiz results:** Spinner (rotating icon) while results compute.
- **Card images:** Placeholder gradient while image loads.
- **Error fallback:** Gray background + "Couldn't load" text + retry button.

### Empty States

- **Favorites (no beans saved yet):** "Nenhum grão salvo ainda. Explora alguns? →"
- **Quiz (no results yet):** "Responde o quiz pra descobrir →"

### Disabled States

- **Button disabled:** Opacity 0.5, `cursor: not-allowed`.
- **Tag disabled:** Gray border/text, no hover effect.
- **Input disabled:** Gray background, no focus border change.

### Active/Selected States

- **Tag selected:** `background: {colors.primary}`, `color: {colors.text-primary}`.
- **Method selected (quiz):** Border color → `{colors.accent}`, background tint.
- **Saved favorite:** Icon change (outline → filled), toast notification.

---

## Interaction Primitives

### Scroll Interactions

- **Smooth scroll:** Page scrolls smoothly to target (no jump). Used for in-page navigation (e.g., click "Grãos" → scroll to grãos section).
- **Parallax (hero):** Background moves slower than foreground. Subtle depth effect (optional, low priority).

### Hover Interactions

- **Card hover:** Lift + shadow + border color change. All in 0.3s ease.
- **Button hover:** Slight lift + color shift. 0.3s.
- **Tag hover:** Scale 1.05 + fill color. 0.3s.
- **Link hover:** Underline appears/grows (if underline style). 0.3s.

### Click Interactions

- **Card click:** Navigate to detail page (quiz, bean detail, method detail).
- **Button click:** Trigger form submission, navigate, or open modal.
- **Tag click:** Toggle select state (quiz, filters).

### Focus Interactions (Keyboard)

- **Tab navigation:** Logical order (header nav → hero button → section content → footer).
- **Enter on focused button:** Same as click.
- **Escape key:** Close modal/details (if modal-based).
- **Visual focus indicator:** Outline 2px {colors.primary} with offset.

---

## Accessibility Floor

### WCAG 2.1 Level AA minimum

**Color Contrast:**
- Text on background: 4.5:1 minimum (AA standard).
- {colors.text-primary} on {colors.bg-light}: ✓ pass
- {colors.primary} on white: ⚠️ may need text outline or background tint
- {colors.accent} on white: ✓ pass
- White text on {colors.dark}: ✓ pass

**Semantic HTML:**
- Use `<button>` for clickable CTAs (not `<div>`).
- Use `<a>` for navigation links.
- Use `<nav>`, `<section>`, `<article>`, `<footer>` landmark elements.
- Use `<h1>`, `<h2>`, `<h3>` hierarchy (no skipping levels).

**ARIA Labels:**
- Buttons with icons only: Add `aria-label` or `title`.
- Quiz questions: Wrap in `<fieldset>` + `<legend>`.
- Modals: Add `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.

**Keyboard Navigation:**
- All interactive elements (buttons, links, form inputs) reachable via Tab.
- Tab order logical (left-to-right, top-to-bottom).
- No keyboard trap.
- Focus indicator visible (2px outline).

**Motion:**
- Respect `prefers-reduced-motion` media query.
- Disable transform animations if `prefers-reduced-motion: reduce`.
- Fade-only alternatives for scroll reveals.

**Images:**
- All images have descriptive `alt` text.
- Decorative images: `alt=""`.
- Bean/method images: `alt="Bourbon bean from Minas Gerais, chocolate and floral notes"`.

---

## Key Flows (User Journeys)

### Flow 1: Discovery (First Visit)

**Persona:** Marina, 28, curious about coffee, never used specialty beans.

**Goal:** Discover which bean + method to start with.

**Journey:**

1. **Land on homepage** — Sees hero ("Dominar a Arte do Café"), reads tagline, feels energy.
2. **Skim about section** — Understands mission in 20 seconds.
3. **Notice quiz widget** — "Qual é seu café ideal?" catches eye. Clicks "Começar Quiz".
4. **Answer Q1-Q8** — Questions like "Prefere sabor doce ou ácido?", "Tem 5 minutos ou 20?", "Espaço pra equipamento?" — easy to answer, visual (cards/sliders).
5. **See results** — "Marina, you're a Bourbon + V60 person" — personalized, celebratory. Includes why (flavor + method fit).
6. **Explore recommendations** — Click card → Bean detail page (origin, flavor, recipes). Scroll to "Compatible methods" → V60 detail page.
7. **Save or navigate** — "Save my beans" or "Back to explore" — Marina returns to homepage, browses other beans out of curiosity.

**Climax:** Marina clicks "Agora vou pedir meu Bourbon" (CTA on bean detail) → coffee order link or "next step" guidance.

**Total time:** 3-5 minutes. Feels smart, not overwhelmed.

---

### Flow 2: Specific Search (Return Visitor)

**Persona:** Lucas, 35, already knows beans, wants to try a new method.

**Goal:** Learn how to use French Press correctly.

**Journey:**

1. **Land on homepage** — Skips hero, scrolls directly to "Métodos".
2. **Scan method cards** — Sees V60, Aeropress, French Press. Clicks French Press.
3. **Read method detail** — Tutorial (step-by-step), equipment checklist, technical specs (temp, time, ratio).
4. **Save or bookmark** — "Salvar pra depois" button (if profile enabled) or browser bookmark.
5. **Related content** — "Grãos que combinam com French Press" — sees Bourbon, Catuaí cards. Clicks one.
6. **Cross-reference** — Goes back, explores another method. Total browsing.

**Climax:** Lucas screenshot the recipe or saves the page. Feels prepared to brew.

**Total time:** 2-3 minutes. Feels efficient.

---

### Flow 3: Quiz + Deep Dive (Engaged User)

**Persona:** Afonso, 42, wants to become "café guy", will invest time + money.

**Goal:** Learn everything about his ideal beans + methods.

**Journey:**

1. **Take quiz** — Honest answers (willing to invest time, wants flavor exploration, has space).
2. **Results surprise him** — "Geisha + V60" — unexpected, premium pairing. Intrigued.
3. **Geisha detail page** — Reads origin story (Panamá, Boquete, rare), flavor notes (floral, exotica). Wow.
4. **Recipe deep-dive** — Careful brewing recipe, step-by-step, photos/video (future).
5. **Method detail (V60)** — Learns precision, grind size, water temp, bloom time — becomes obsessed.
6. **"Where to buy" CTA** — Links to trusted coffee roasters (affiliate or curated).
7. **Save everything** — Creates profile, saves beans + methods.
8. **Share** — "Meu café ideal é Geisha + V60" — shares link with friends.

**Climax:** Afonso orders Geisha, buys V60 dripper, brews carefully, posts results (implied). Becomes community member.

**Total time:** 10-15 minutes. Deep engagement.

---

### Flow 4: Quiz Retake (Seasonal Visitor)

**Persona:** Julia, 26, took quiz 3 months ago, wants to re-evaluate.

**Journey:**

1. **Land on homepage** — If profile exists: "Retake Quiz?" prompt.
2. **Answer Q1-Q8 again** — Maybe answers differ (seasons change taste preferences).
3. **New results** — "Julia, your new match is Bourbon + French Press" (changed from V60).
4. **Compare to last time** — Optional: "Last time you were Catuaí + V60. Here's what's different."
5. **Explore new bean** — Click Bourbon, learn origin, try recipe.
6. **Save new favorite** — Adds to profile, maybe removes old.

**Climax:** Julia expands her coffee shelf, tries new brewing method, returns for another quiz in 3 months.

**Total time:** 3-5 minutes. Quick revisit.

---

## Navigation Model

**Primary Navigation:** Sticky header with logo + nav links (Grãos, Métodos, Sobre, Quiz button).

**Secondary Navigation:**
- In-page scroll links (click "Grãos" → smooth scroll to grãos section).
- Related content cards (end of bean detail → related beans/methods).
- Footer links (About, Contact, Instagram, Blog).

**Detail Pages:** Breadcrumb or "← Back to Grãos" button at top.

**Quiz:** Multi-step form with "Back" (go to previous Q) and "Next" (go to next Q).

---

## Content Inventory

### Page Sections

**Homepage:**
- Hero
- About (why CoffeLovers)
- Quiz widget
- Grãos section (3+ bean cards)
- Métodos section (3+ method cards)
- Footer

**Bean Detail:**
- Hero (bean name, origin)
- Info grid (origin, altitude, flavor profile, body, acidity)
- Recipe (ingredients, steps, timing)
- Related beans (carousel or grid)
- Related methods (cards)
- CTA (back to quiz or "order now")

**Method Detail:**
- Hero (method name, vibe)
- Tutorial (step-by-step instructions)
- Equipment checklist
- Technical specs (temperature, time, ratio, grind size)
- Recipe variations (for different beans)
- Compatible beans (cards)
- CTA (back to quiz or "get equipment")

**Quiz:**
- Intro ("8 questions")
- Q1-Q8 (visual, easy to answer)
- Results (personalized, actionable)
- Save/share options

---

## Responsive Strategy

**Mobile-First Approach:**
- Default layout: 1 column, linear scroll.
- Tablet (768px+): 2 columns for cards, larger text.
- Desktop (1024px+): 2-3 columns, hero grid.

**Touch Targets:**
- Buttons: 44px minimum height (Apple HIG standard).
- Card click area: Full card (generous).
- Links: 44px line-height.

**Orientation:**
- Portrait-first for mobile/tablet.
- Landscape supported (no reflow issues).

---

**Status:** Draft | **Last Updated:** 2026-09-30 | **Next:** Build phase (HTML/CSS/JS implementation)
