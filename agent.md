# AGENT.md — Cortex Core Group Website

This file is the persistent reference for any AI agent working in this repository. Read it before making changes. Keep it updated as decisions change — this file should always reflect the current state of truth for the project, not the state when it was written.

---

## 1. Project Overview

**What this is:** The marketing website for Cortex Core Group, a tech consulting and product development studio. This is the company's own site — not a client project.

**Goals of the site:**
- Present Cortex as a credible, modern, technically strong studio
- Showcase services, portfolio work, and team
- Convert visitors into leads via contact form / "Let's Talk" CTAs
- Support a future digital-goods shop and blog

**Primary audience:** Prospective clients (businesses looking for a dev/consulting partner) and, secondarily, potential hires.

---

## 2. Tech Stack

- **Framework:** Next.js 14+ (App Router, `app/` directory, Server Components by default)
- **Language:** TypeScript — no `.js`/`.jsx` files
- **Styling:** Tailwind CSS with a custom theme (see Section 4)
- **Animation:** Framer Motion
- **Icons:** lucide-react
- **Images:** `next/image` everywhere — no raw `<img>` tags
- **Fonts:** loaded via `next/font` (Inter or equivalent), no external font `<link>` tags
- **Package manager:** [confirm with user before assuming npm/pnpm/yarn]
- **Deployment target:** [confirm — Vercel assumed unless stated otherwise]

Do not introduce a new major dependency (state management library, CMS, UI kit) without flagging it first. Use `pick-ui-library` skill guidance before adding any component library.

---

## 3. Design Skills In Use

This project has design/frontend skills installed at `.agents/skills`. Apply them actively during any frontend work, not just when explicitly reminded:

- `emil-design-eng` — core design engineering principles (spacing, hierarchy, contrast, state design)
- `apple-design` — motion and interaction philosophy
- `animation-vocabulary` — shared vocabulary for describing animation choices
- `find-animation-opportunities` — where motion should be added
- `improve-animations` — auditing/fixing existing motion
- `review-animations` — strict review pass before shipping motion
- `pick-ui-library` — decision framework for any new UI dependency
- `prototype` — build multiple variants of high-stakes components before locking one in

When making a non-trivial visual or motion decision, name the skill that informed it in your commit message or PR description.

---

## 4. Design System

**Theme:** Dark mode only.

**Colors** (define as Tailwind theme tokens, not inline hex):
| Token | Value | Use |
|---|---|---|
| `background` | `#0A0A14` | Page background |
| `surface` | `#12121F` | Card/panel fill |
| `border-subtle` | `rgba(255,255,255,0.08)` | Card borders |
| `accent-purple` | `#8B5CF6` | Gradient start, labels |
| `accent-blue` | `#3B82F6` | Gradient end |
| `accent-magenta` | `#A855F7` | Secondary tag/label color |
| `text-primary` | `#FFFFFF` | Headings |
| `text-secondary` | `#9CA3AF` (gray-400) | Body copy |

Gradient (`accent-gradient`): `linear-gradient(to right, #8B5CF6, #3B82F6)` — used on headline emphasis words, primary buttons, active icons. Treat this as a scarce resource: it marks emphasis, not decoration. Do not apply it to more than one or two elements per section.

**Typography:**
- Headings: bold, large (48–64px desktop / 28–36px mobile), white, with 1–2 emphasis words in the gradient
- Eyebrow labels: small, uppercase, letter-spaced, `accent-purple`, placed above section headings (e.g. "OUR SERVICES")
- Body: `text-secondary`, comfortable line-height (1.6+)

**Shape & elevation:**
- Cards: `rounded-xl`/`rounded-2xl`, `surface` fill, `border-subtle` border, hover state = brighter border + subtle lift (translate-y + shadow), transition ~200–300ms, non-linear easing
- Buttons: pill-shaped (`rounded-full`). Primary = gradient fill + arrow icon. Secondary = transparent with bordered outline.
- Logo: circular abstract network/brain icon + two-line "CORTEX / CORE GROUP" wordmark

**States:** every interactive element must have explicit default, hover, focus-visible, active, and disabled styles — never rely on browser defaults, and never remove focus outlines without providing a replacement (accessibility requirement, non-negotiable).

---

## 5. Site Structure

| Route | Purpose |
|---|---|
| `/` | Home — hero, services grid, team strip, brands, about teaser, featured work, testimonials |
| `/about` | Mission, vision, core values, stats |
| `/services` | Full services detail |
| `/our-work` | Portfolio grid with filters |
| `/team` | Full team roster with filters — **has a distinct mobile layout, not just a collapsed desktop grid** |
| `/blog` | Article listing + filters |
| `/blog/[slug]` | Article detail |
| `/shop` | Digital products catalog (future phase — confirm before building) |
| `/contact` | Contact form + office location + info cards |

---

## 6. Folder & Code Conventions

```
app/                    route segments, one folder per page above
components/
  layout/               Header, Footer, MobileNav
  sections/             HomeHero, ServicesGrid, TeamStrip, Testimonials, etc. (one file per section)
  ui/                    generic reusable pieces: Button, Card, Pill, Badge
data/
  services.ts            typed array of service objects
  team.ts                 typed array of team member objects
  projects.ts             typed array of portfolio project objects
lib/                    utility functions (formatting, etc.)
```

Rules:
- One component per file. Section components live in `components/sections`, not inline in page files.
- Content (team bios, service descriptions, project details) lives in `data/*.ts` as typed objects — never hardcode content arrays inside JSX.
- Every exported component gets a TypeScript `interface`/`type` for its props, even if there's only one.
- No `any`. If a type is genuinely unknown, define it properly rather than escaping typing.
- Client components (`"use client"`) only where interactivity requires it (forms, filters, carousels, animated sections) — default to Server Components elsewhere.

---

## 7. Tooling & Code Quality

- **Linting:** ESLint with `next/core-web-vitals` config, enforced — no disabling rules inline without a comment explaining why
- **Formatting:** Prettier, run on save/pre-commit — no manually-formatted code that fights the formatter
- **Pre-commit:** set up Husky + lint-staged (or equivalent) to run lint + format + type-check before any commit lands
- **Type-checking:** `tsc --noEmit` must pass with zero errors before a change is considered complete
- **Imports:** absolute imports via `@/` path alias, not deep relative `../../../` chains

---

## 8. Git & Commit Conventions

- **Branches:** `feature/<short-name>`, `fix/<short-name>` — no direct commits to `main`
- **Commits:** Conventional Commits style — `feat:`, `fix:`, `style:`, `refactor:`, `chore:` prefixes
- **PR description:** state what changed, which page/section it affects, which design skill (Section 3) informed any visual/motion decision, and include before/after screenshots for visual changes (desktop + mobile)
- Don't bundle unrelated changes (e.g. a copy fix and a new section) into one commit/PR

---

## 9. SEO & Metadata

- Use the Next.js `metadata` API (or `generateMetadata`) on every route — title, description, and Open Graph tags are required, not optional, for a marketing site
- Each page needs a distinct, accurate `<title>` and meta description — no copy-pasted boilerplate across routes
- Provide `og:image` per page (or a solid site-wide default) for link previews
- Include `favicon`, `apple-touch-icon`, `sitemap.xml`, and `robots.txt`
- Use semantic HTML (`<h1>` once per page, proper heading order, `<nav>`, `<main>`, `<footer>`) — this matters for both SEO and accessibility
- Add `alt` text to every image with real content value (see Section 11)

---

## 10. Performance Budget

- Target Lighthouse scores of 90+ on Performance, Accessibility, Best Practices, and SEO for the production build
- Images: served via `next/image`, correctly sized per breakpoint, modern formats (WebP/AVIF) — no unoptimized full-resolution screenshots
- No render-blocking custom fonts — use `next/font` with `display: swap`
- Keep client-side JS minimal: default to Server Components, only mark a component `"use client"` when it truly needs interactivity
- Animations must not cause layout shift (CLS) — animate `transform`/`opacity`, not `width`/`height`/`top`/`left`
- Lazy-load below-the-fold heavy content (project screenshots further down `/our-work`, etc.) using `next/image`'s built-in lazy loading or dynamic imports

---

## 11. Accessibility

- Color contrast: body text on `background`/`surface` must meet WCAG AA at minimum
- All interactive elements keyboard-navigable with visible focus states
- All images have meaningful `alt` text (empty `alt=""` only for pure decoration)
- Respect `prefers-reduced-motion` — disable/simplify non-essential animation for users who request it
- Form fields have associated `<label>`s, not just placeholder text
- Use proper landmark roles/elements (`<nav>`, `<main>`, `<header>`, `<footer>`) and ensure the mobile menu is announced correctly to screen readers (correct `aria-expanded`, `aria-label` on the toggle)
- Test primary flows (nav, contact form, portfolio filters) with keyboard-only navigation and a screen reader (VoiceOver/NVDA) before considering a page done

---

## 12. Animation Principles

- Motion should support hierarchy or feedback — not decoration for its own sake
- Micro-interactions (hover, button press): under ~300ms, non-linear easing
- Scroll-in animations: trigger once per element, not on every re-entry into viewport
- Never let animation block or delay a user's ability to act (no gating a click behind a decorative transition)
- Describe non-trivial animation choices using the `animation-vocabulary` skill's terms so intent is explicit

---

## 13. Responsiveness Requirements

Breakpoints to explicitly design and test — not just let Tailwind's defaults handle:
- **375px / 390px** (mobile)
- **768px** (tablet — must be its own considered layout, not a stretched mobile or squeezed desktop)
- **1024px** (small laptop)
- **1440px** (desktop)

Mobile is not a lower priority than desktop. The Team page in particular has a dedicated mobile design (stacked single-column cards with a different internal layout than desktop rows) — match it, don't just reflow the desktop grid.

Minimum tap target size on mobile: 44x44px. Test the mobile nav menu, filter pill scrolling, card carousels (must be swipeable), and the contact form with a mobile keyboard open.

---

## 14. Contact Form Backend

- Form submissions must actually go somewhere — do not ship a form that only logs to console
- Default approach unless the user specifies otherwise: a Next.js API route (`app/api/contact/route.ts`) that sends via a transactional email service (e.g. Resend) to the studio's inbox
- Validate all fields server-side (not just client-side) before sending
- On success: show an inline confirmation state (not just an alert), and clear the form
- On failure: show a clear error state and preserve the user's entered data so they don't have to retype it
- Never expose API keys client-side — they belong in server-only environment variables

---

## 15. Error, Loading & Empty States

Every dynamic section needs all three states designed, not just the "happy path":
- **Loading:** skeleton placeholders matching the final layout's shape (not a generic spinner) for the blog list, portfolio grid, and team grid
- **Empty:** what the portfolio/blog looks like with zero results after a filter is applied — a clear message + a way to reset the filter, not a blank section
- **Error:** what the contact form and any data-fetching section show if the request fails — a human message, not a raw error or blank screen

---

## 16. Asset Plan

- All team photos, project screenshots, and logos currently in the design are placeholders — flag any you generate or source as `[PLACEHOLDER]` in a code comment so they're easy to find and swap later
- Standardize on aspect ratios per use: team photos (fixed ratio, e.g. 4:5), project screenshots (16:10 or per-device mockup frame), logo (SVG, transparent background)
- Store real final assets in `public/images/<category>/` once supplied — don't scatter them across component folders

---

## 17. Definition of Done

A page or component is not complete until all of the following are true:
- [ ] Matches the reference design at 375px, 768px, 1024px, and 1440px
- [ ] All interactive elements have default/hover/focus/active/disabled states
- [ ] Passes `tsc --noEmit` and lint with zero errors/warnings
- [ ] No `any` types, no hardcoded content that belongs in `data/`
- [ ] Metadata (title, description, OG tags) set for the route
- [ ] Loading/empty/error states designed where the section is dynamic
- [ ] Animations reviewed against Section 12 and pass a `review-animations` pass
- [ ] Keyboard and screen-reader tested for primary interactions
- [ ] No console errors/warnings in dev or production build
- [ ] Lighthouse Performance/Accessibility/Best Practices/SEO all 90+ on the built page

---

## 18. What NOT To Do

- Don't add a UI kit, CMS, or state library without running it by the user first
- Don't hardcode content in components — it belongs in `data/`
- Don't ship a section without checking both mobile and desktop
- Don't overuse the gradient accent — it should read as emphasis, not wallpaper
- Don't remove focus outlines without a replacement focus style
- Don't guess at content the screenshots don't show — flag it as a placeholder and ask, don't invent business details (pricing, stats, claims) that could be factually wrong
- Don't mark anything "done" without checking it against Section 17

## 19. Open Questions To Confirm With User

- Package manager (npm/pnpm/yarn)? (Currently using npm based on package-lock.json)
- Real copy for About/Services detail pages, or continue with placeholder text?

## 20. Resolved Architectural Decisions (from framework.txt)

- **Deployment Target:** Vercel (frontend/API), Neon or Supabase (PostgreSQL), Cloudflare R2 (storage).
- **Blog System:** Custom blog admin panel (CRUD) built in Phase 2, with database storage (PostgreSQL + Prisma) rather than a third-party CMS or static MDX files.
- **Transactional Email Service:** Resend.
- **Marketplace (/shop):** In scope for Phase 4 (Marketplace & Customer Platform), utilizing Stripe/Lemon Squeezy for payments and Cloudflare R2 for secure downloads.

---

*Keep this file current. When a decision gets resolved, move it into the relevant section above and remove it from the open-questions list.*