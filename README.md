# Cortex Core Group Website

Marketing website and digital portal for **Cortex Core Group**, built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Base UI, and Framer Motion.

## 🚀 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom dark mode design system tokens
- **UI Primitives:** `@base-ui-components/react`, `clsx`, `class-variance-authority`
- **Motion:** `framer-motion`
- **Icons:** `lucide-react`

## 🛠️ Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup environment variables:**
   ```bash
   cp .env.example .env.local
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Run Type Check & Lint:**
   ```bash
   npm run typecheck
   npm run lint
   ```

5. **Build for Production:**
   ```bash
   npm run build
   ```

## 📁 Project Architecture

```
app/                    # Next.js 14 App Router pages & API routes
components/
  layout/               # Header, Footer, Navigation Drawer
  sections/             # Page sections (HeroVariantA, HeroVariantB, ServicesGrid, etc.)
  ui/                   # Reusable UI primitives (Button, Card, Pill, CookieConsent)
data/                   # Typed seed data (services.ts, team.ts, projects.ts)
lib/                    # Utility functions (cn merge helper)
public/                 # Static assets and images
```
