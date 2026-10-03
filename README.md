# ☕ CoffeLovers

**Coffee Discovery & Calculator Platform**

A Next.js 14 application for exploring coffee varieties, brewing methods, and calculating the perfect coffee-to-water ratio.

---

## 📁 Project Structure

```
CoffeLovers/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── graos/             # Coffee bean pages
│   └── metodos/           # Brewing method pages
├── components/            # React components
│   ├── CoffeeCalculator.tsx          # Main calculator component
│   ├── CoffeeCalculatorSection.tsx   # Calculator wrapper
│   └── OptimizedImage.tsx            # Image optimization
├── lib/                   # Utilities & data
│   ├── data.ts           # Data loaders
│   └── types.ts          # TypeScript interfaces
├── public/               # Static assets
│   └── assets/images/    # Bean & method images
├── __tests__/            # Test files
├── conteudo/             # Content data (JSON)
├── docs/                 # Documentation
└── coffee-ratios.json    # Core data file (35 bean-method combinations)
```

---

## 🚀 Quick Start

```bash
npm install
npm run dev
# Opens http://localhost:3000
```

---

## 🎯 Key Features

- **Coffee Calculator:** Input bean, method, water volume → get exact coffee amount
- **Bean Explorer:** 7 specialty coffee varieties with flavor profiles
- **Method Guide:** 4 brewing methods (V60, Aeropress, French Press, Moka)
- **Responsive Design:** Mobile-first, dark luxury theme (#121212 / #D4AF37)

---

## 📚 Documentation

- **[AUDITORIA-TEXTOS.md](docs/AUDITORIA-TEXTOS.md)** — Copy audit & improvements
- **[SPRINT-WORKFLOW.md](docs/SPRINT-WORKFLOW.md)** — Development workflow
- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** — System design decisions

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Jest
- **Deployment:** Node.js ready

---

## 📝 Development Notes

All changes follow the workflow: **Dev → QA → Code Review → Commit**

See [docs/SPRINT-WORKFLOW.md](docs/SPRINT-WORKFLOW.md) for details.

---

**Last Updated:** 2026-10-02
