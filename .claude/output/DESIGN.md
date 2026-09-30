---
status: draft
updated: 2026-09-30
colors:
  primary: "#D4AF37"
  accent: "#C41E3A"
  dark: "#121212"
  black: "#0A0A0A"
  white: "#F5F5F0"
  bg-light: "#1a1a1a"
  bg-subtle: "rgba(212, 175, 55, 0.04)"
  text-primary: "#F5F5F0"
  text-secondary: "#B0B0A8"
  text-tertiary: "#999999"
  border: "rgba(212, 175, 55, 0.1)"
  border-accent: "rgba(212, 175, 55, 0.15)"
typography:
  display:
    family: "EB Garamond"
    weights: [400, 700]
    sizes: [36, 48, 56]
    letter-spacing: [-0.5, -1]
  body:
    family: "Inter"
    weights: [300, 400, 500, 600, 700]
    sizes: [12, 13, 14, 15, 16]
    letter-spacing: [0, 0.5, 1, 2, 3]
spacing:
  xs: "6px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "24px"
  2xl: "32px"
  3xl: "48px"
  4xl: "60px"
  5xl: "80px"
rounded:
  none: "0"
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
components:
  button:
    primary:
      bg: "#C41E3A"
      text: "white"
      padding: "18px 48px"
      border: "none"
      font-weight: 600
      hover:
        bg: "#344923"
        transform: "translateY(-4px)"
    secondary:
      bg: "#D4AF37"
      text: "#1A1A1A"
      padding: "12px 28px"
      border: "none"
      font-weight: 600
      hover:
        bg: "#C41E3A"
        color: "white"
        transform: "scale(1.05)"
  card:
    bg: "white"
    border: "3px solid #D4AF37"
    border-radius: "0px"
    padding: "32px"
    hover:
      border-color: "#C41E3A"
      transform: "translateY(-12px)"
      shadow: "0 24px 48px rgba(196, 30, 58, 0.2)"
  tag:
    border: "2px solid #D4AF37"
    color: "#D4AF37"
    padding: "8px 14px"
    border-radius: "0px"
    font-size: "12px"
    font-weight: 600
    hover:
      bg: "#D4AF37"
      color: "#1A1A1A"
---

# CoffeLovers Design System
## Bold & Vibrant Direction

### Brand & Style

CoffeLovers é uma marca premium para entusiastas sérios de café. O design é sofisticado, editorial, elegante. Dark mode como padrão. Tipografia refinada (EB Garamond). Spacing compacto, sem ar desperdiçado.

**Atitude:** Adulto, sofisticado, profissional. Editorial, luxury brand. Não é infantil ou excessivamente espaçado.

**Inspiração Visual:** Revistas de design de luxo + marcas premium de café (tipo Blue Bottle). Minimalismo elegante + profundidade.

---

### Colors

Paleta dark luxury com ouro como accent. Fundo #121212 (não pure black), texto #F5F5F0. Ouro como primária (premium, elegância), vermelho como acento mínimo (raramente). Verde Café aposentado.

| Token | Hex | Uso | Notas |
|-------|-----|-----|-------|
| `colors.primary` | #D4AF37 | Ouro | Links, accents, highlights. Cor de marca premium. |
| `colors.accent` | #C41E3A | Vermelho | Raramente usado (quase nunca em UI). |
| `colors.dark` | #121212 | Preto quase | Background principal. Menos duro que pure black. |
| `colors.black` | #0A0A0A | Preto puro | Apenas para profundidade extrema. |
| `colors.white` | #F5F5F0 | Off-white | Texto primário. Mais suave que pure white. |
| `colors.bg-light` | #1A1A1A | Cinza escuro | Cards, containers suaves. |
| `colors.bg-subtle` | rgba(212, 175, 55, 0.04) | Ouro translúcido | Background de cards, hover states. |
| `colors.text-primary` | #F5F5F0 | Off-white | Body text, headlines. Principal. |
| `colors.text-secondary` | #B0B0A8 | Cinza quente | Descrições, taglines. |
| `colors.text-tertiary` | #999999 | Cinza médio | Labels, helper text. |
| `colors.border` | rgba(212, 175, 55, 0.1) | Ouro 10% | Borders suaves. |
| `colors.border-accent` | rgba(212, 175, 55, 0.15) | Ouro 15% | Borders mais visíveis em hover. |

**Gradientes:**
- Mínimos. Apenas em hero/hero-visual com drop-shadow.
- Preferir backgrounds sólidos + borders ouro.

---

### Typography

**Display Font:** EB Garamond — editorial, luxury, elegância. Headlines são protagonistas. Refinada, não geométrica.

**Body Font:** Inter — claridade, funcional, eficiente. Suporta all weights pra variedade de ênfase.

| Role | Font | Size | Weight | Letter-spacing | Line-height | Uso |
|------|------|------|--------|-----------------|-------------|-----|
| h1 | EB Garamond | 56px | 700 | -1px | 1.2 | Hero headlines |
| h2 | EB Garamond | 36px | 700 | -0.5px | 1.2 | Section titles |
| h3 | EB Garamond | 18px | 700 | 0px | 1.4 | Card titles |
| Body Large | Inter | 16px | 300 | 0px | 1.8 | Long-form descriptions |
| Body | Inter | 15px | 400 | 0px | 1.6 | Standard text |
| Body Small | Inter | 13px | 400 | 0.5px | 1.6 | Secondary info, tags |
| Label | Inter | 11px | 600 | 2px | 1.0 | Section labels, uppercase |
| Breadcrumb | Inter | 12px | 400 | 0.5px | 1.4 | Navigation breadcrumbs |

**Hierarchy:**
- Headlines em EB Garamond — elegância, weight 700
- Body em Inter — funcionais, múltiplos weights
- Letter-spacing para ênfase (labels, breadcrumbs)
- Cores pra contraste: ouro em labels, cinza em secondary

---

### Layout & Spacing

**4px base grid.** Compacto, sem ar desperdiçado. Spacing reduzido 50% vs versão anterior.

| Token | Value | Uso |
|-------|-------|-----|
| `spacing.xs` | 6px | Gaps mínimos |
| `spacing.sm` | 12px | Padding small, gaps |
| `spacing.md` | 16px | Padding padrão |
| `spacing.lg` | 20px | Padding cards, specs |
| `spacing.xl` | 24px | Padding sections, gaps cards |
| `spacing.2xl` | 32px | Padding inline hero |
| `spacing.3xl` | 48px | Padding sections |
| `spacing.4xl` | 60px | Padding hero |
| `spacing.5xl` | 80px | Padding hero principal |

**Container:**
- Max-width: 1200px (desktop)
- Padding horizontal: 80px (desktop), 40px (tablet), 20px (mobile)
- Margin: 0 auto (centered)

**Hero:**
- Padding: 80px (compacto)
- Grid 1.2fr 1fr (mais compacto que 1fr 1fr)
- Gap: 60px (vs 80px anterior)

**Seções:**
- Padding vertical: 60px (desktop), 48px (tablet), 40px (mobile)
- Padding horizontal: 80px (desktop), 40px (tablet), 20px (mobile)
- Gap entre cards: 24px
- Margin-bottom entre títulos e conteúdo: 24px (vs 40px)

---

### Elevation & Depth

**Sombras sutis e dark-friendly.** Bordas com ouro translúcido. Transform em hover (elevação visual).

| Estado | Transform | Shadow | Nota |
|--------|-----------|--------|------|
| Default | none | none | Plano. Peso via borders/cor. |
| Hover (card) | `translateY(-4px)` | `0 12px 28px rgba(0, 0, 0, 0.15)` | Elevação suave, sombra dark-friendly. |
| Hover (button) | `background: #D4AF37` | none | Mudança de cor, sem transform. |
| Focus | border-color: `rgba(212, 175, 55, 0.2)` | none | Subtil foco visual. |

---

### Shapes

**Corners:** `border-radius: 4-8px`. Não quadrado (muito hard), não arredondado (muito soft). Mid-ground elegante.

- Cards: `border-radius: 6px`
- Buttons: `border-radius: 20px` (pills)
- Inputs: `border-radius: 4px`
- Large containers: `border-radius: 8px`

**Borders:**
- Cards: `1px solid rgba(212, 175, 55, 0.08)` (subtil ouro). Hover: `rgba(212, 175, 55, 0.2)`.
- Specs/containers: `1px solid rgba(212, 175, 55, 0.08)` ou `border-left: 2px solid #D4AF37`.
- Seções: `1px solid rgba(212, 175, 55, 0.1)` (separadores entre seções).
- Input/form: `1.5px solid {colors.text-secondary}`.

---

### Components

#### Button

**Primary (CTA):**
```
background: {colors.accent} (#C41E3A)
color: white
padding: 18px 48px
border: none
border-radius: 0px
font-family: Inter
font-size: 16px
font-weight: 600
letter-spacing: 0.5px
cursor: pointer
transition: all 0.3s ease
```

Hover: `background: {colors.dark}`, `transform: translateY(-4px)`

**Secondary (Navigation, Secondary CTA):**
```
background: {colors.primary} (#D4AF37)
color: {colors.text-primary} (#1A1A1A)
padding: 12px 28px
border: none
border-radius: 0px
font-size: 14px
font-weight: 600
cursor: pointer
transition: all 0.3s ease
```

Hover: `background: {colors.accent}`, `color: white`, `transform: scale(1.05)`

---

#### Card

**Bean/Method Card:**
```
background: white
border: 3px solid {colors.primary}
border-radius: 0px
overflow: hidden
padding: 32px
```

Structure:
- `.card-image`: height 280px, gradient background `{colors.dark}` → `{colors.primary}`, flex centered (emoji/icon)
- `.card-content`: padded 32px
  - `.card-subtitle`: font-size 14px, uppercase, color {colors.primary}, font-weight 600
  - `.card-title` (h3): Playfair Display 28px, weight 800
  - `.card-desc`: Inter 14px, weight 300, color {colors.text-secondary}
  - `.tags`: flex, gap 8px

Hover: `transform: translateY(-12px)`, `border-color: {colors.accent}`, `box-shadow: 0 24px 48px rgba(196, 30, 58, 0.2)`

---

#### Tag

```
display: inline-block
border: 2px solid {colors.primary}
color: {colors.primary}
padding: 8px 14px
border-radius: 0px
font-size: 12px
font-weight: 600
cursor: pointer
transition: all 0.3s ease
```

Hover: `background: {colors.primary}`, `color: {colors.text-primary}`, `transform: scale(1.05)`

---

#### Header

```
padding: 24px 80px
display: flex
justify-content: space-between
align-items: center
background: rgba(18, 18, 18, 0.98) sticky
backdrop-filter: blur(8px)
border-bottom: 1px solid rgba(212, 175, 55, 0.15)
position: sticky
top: 0
z-index: 100
```

- `.logo`: EB Garamond 20px, weight 700, color {colors.primary}, letter-spacing 3px
- `nav`: flex, gap 48px
  - `nav a`: Inter 13px, color #b0b0a8, font-weight 500, letter-spacing 0.5px, hover color {colors.primary}
- `.btn-nav`: EB Garamond 12px, border 1.5px solid #D4AF37, padding 11px 22px, border-radius 20px

---

#### Hero Section

Grid 2 columns, full viewport (100vh):

```
display: grid
grid-template-columns: 1fr 1fr
gap: 0
min-height: 100vh
align-items: center
background: white
```

Left (`.hero-content`):
- Padding: 80px 64px
- h1: Playfair Display 64px, weight 800
- p: Inter 18px, weight 300, color {colors.text-secondary}
- Button: Primary style

Right (`.hero-visual`):
- Background: `linear-gradient(135deg, {colors.primary}, {colors.accent})`
- Display: flex, centered
- Font-size: 120px (emoji visual)

---

#### Section (Generic)

```
padding: 100px 64px
max-width: 1400px
margin: 0 auto
background: white (ou {colors.bg-light} para about)
```

- h2: Playfair Display 56px, weight 800, letter-spacing -1px
- p: Inter 18px, weight 300, color {colors.text-secondary}, line-height 1.8

---

#### Quiz Widget

```
background: linear-gradient(135deg, {colors.dark}, black)
color: white
padding: 100px 64px
max-width: 600px
margin: 0 auto
text-align: center
```

- h3: Playfair Display 48px, weight 800, color {colors.primary}
- p: Inter 18px, weight 300, color #e0e0e0
- Button: `background: {colors.primary}`, `color: {colors.text-primary}`, full width

---

#### Footer

```
background: {colors.black}
color: white
padding: 64px
text-align: center
border-top: 4px solid {colors.primary}
```

- p: color #999, font-size 14px, font-weight 300
- a: color {colors.primary}, text-decoration none, hover underline

---

### Imagery Strategy

**Imagens de alta qualidade:** Renders 3D profissionais ou fotografias premium de produtos.

- **Equipamentos (V60, Aeropress, etc):** Renders 3D cinematic de alta qualidade
- **Grãos:** Fotografias macro ou renders 3D close-up
- **Xícaras/café:** Fotografias lifestyle ou renders 3D realistas

**Sem moldura geométrica:** Imagens flutuam soltas, com drop-shadow suave apenas.

**Animações (futuro):**
- Renders podem girar ao scroll (scroll-triggered rotation)
- Respeita `prefers-reduced-motion` — fallback para fade

---

### Do's and Don'ts

✅ **Do:**
- Dark mode como default. Elegância.
- EB Garamond pra headlines. Refinamento.
- Ouro (#D4AF37) como único accent primário — subtil, não gritante.
- Spacing compacto. Sem ar desperdiçado.
- Borders sutis em ouro translúcido. Peso via linhas finas.
- Imagens sem moldura. Limpas, flutuando.
- Letter-spacing em labels (aumenta elegância).
- Paleta dark: #121212 fundo, #F5F5F0 texto.

❌ **Don't:**
- Backgrounds brancas. Dark é o padrão.
- Tipografia pesada ou geométrica. EB Garamond é elegante.
- Espaçamento excessivo. Compacto = sofisticado.
- Muitos elementos coloridos. Restrição = luxury.
- Sombras complexas. Bordas finas e cor.
- Rounded corners demais. 6-8px é o limite.
- Pure black (#000000). Use #121212 ou #0A0A0A.
- Poppins ou fontes geométricas. EB Garamond apenas.

---

### Responsive

**Desktop (1024px+):**
- 2 colunas hero
- 3 colunas grid (cards)
- Padding 64px

**Tablet (768px - 1023px):**
- 1 coluna hero (stacked)
- 2 colunas grid
- Padding 32px
- Font sizes reduzem 10-15%

**Mobile (<768px):**
- 1 coluna tudo
- 1 coluna grid
- Padding 20px
- Font sizes reduzem 20%
- Nav collapse em hamburguer (future)

---

**Status:** Draft | **Last Updated:** 2026-09-30 | **Next:** EXPERIENCE.md (jornadas, interações)
