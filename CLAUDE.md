@AGENTS.md

# CLAUDE.md — AI Website Cloner Template

This is a **Next.js 16 landing-page scaffold** designed for pixel-perfect website cloning via AI coding agents. The repository ships a pre-built "Profit Phones" demo clone and the `/clone-website` skill that orchestrates multi-agent browser extraction + component building.

---

## Tech Stack (exact versions matter — do not upgrade without testing)

| Layer | Package | Version |
|---|---|---|
| Framework | `next` | 16.2.1 |
| React | `react` / `react-dom` | 19.2.4 |
| UI primitives | `@base-ui/react` | ^1.3.0 |
| Component library | `shadcn` | ^4.1.0 |
| Styling | `tailwindcss` | ^4 |
| Animation | `tw-animate-css` | ^1.4.0 |
| Icons | `lucide-react` | ^1.6.0 |
| Language | TypeScript strict | ^5 |
| Node | | >=24 |

> **Warning:** Next.js 16 has breaking changes from v14/v15. Before writing any Next.js-specific code, read the relevant guide in `node_modules/next/dist/docs/`.

---

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint (eslint.config.mjs)
npm run typecheck    # tsc --noEmit
npm run check        # lint + typecheck + build (run before committing)
```

CI runs `npm run check` on every push/PR to `master`. All three checks must pass.

---

## Project Structure

```
src/
  app/
    layout.tsx        # Root layout — font (Inter), metadata, html/body wrapper
    page.tsx          # Home route — assembles all section components
    globals.css       # Tailwind v4 @theme, design tokens (oklch), shadcn import
  components/
    ui/               # shadcn/ui primitives (button.tsx, etc.)
    icons.tsx         # Extracted SVG icons as named React components
    Navbar.tsx
    HeroSection.tsx
    StatsSection.tsx
    ProblemsSection.tsx
    HowItWorksSection.tsx
    WhatInsideSection.tsx
    ComparisonSection.tsx
    CalculatorSection.tsx
    TestimonialsSection.tsx
    CtaSection.tsx
    PricingSection.tsx
    FaqSection.tsx
    Footer.tsx
  lib/
    utils.ts          # cn() from clsx + tailwind-merge
  types/              # TypeScript interfaces (currently empty, add as needed)
  hooks/              # Custom React hooks (currently empty)
public/
  images/             # Downloaded images from target sites
  videos/             # Downloaded videos from target sites
  seo/                # Favicons, OG images, webmanifest
docs/
  research/           # Extraction artifacts per site (DESIGN_TOKENS.md, etc.)
    INSPECTION_GUIDE.md
  design-references/  # Screenshots and visual references
scripts/
  recon.mjs           # Reconnaissance/asset download helper
  sync-agent-rules.sh # Regenerates platform instruction files from AGENTS.md
  sync-skills.mjs     # Regenerates clone-website skill for all platforms
.claude/
  skills/
    clone-website/SKILL.md  # Claude Code /clone-website skill definition
.github/
  workflows/ci.yml          # GitHub Actions: lint + typecheck + build
  skills/clone-website/SKILL.md
  copilot-instructions.md
```

---

## Design System

### Tailwind v4 + oklch Tokens

All colors are defined in `src/app/globals.css` using oklch and CSS custom properties. The current demo is a **forced dark theme** — there is no light variant.

Key token groups (all consumed via `var(--token-name)` and exposed as `--color-*` in `@theme inline`):

- `--background` / `--foreground` — page base colors
- `--card` / `--card-foreground` — elevated surface
- `--primary` / `--primary-foreground` — brand green (`oklch(0.65 0.19 152)` ≈ #22c55e)
- `--brand` / `--brand-foreground` — alias for primary
- `--surface` / `--surface-2` — layered surfaces (darker than card)
- `--muted` / `--muted-foreground` — de-emphasized content
- `--border` / `--input` / `--ring` — interactive chrome
- `--radius` — base radius (`0.625rem`); variants: `--radius-sm` … `--radius-4xl`

When cloning a new site: replace these tokens in `globals.css` to match the target palette. Do not add inline styles.

### Font

Inter via `next/font/google`, injected as `--font-inter` CSS variable. Declared in `layout.tsx`.

---

## Component Conventions

- **Named exports** — always `export function ComponentName()`, never default
- **PascalCase** for components, **camelCase** for utilities
- **No inline styles** — use Tailwind utility classes
- **No `any`** — TypeScript strict mode is enforced
- **2-space indentation**
- **Mobile-first responsive** — start with base (mobile) styles, add `md:`, `lg:` breakpoints
- Use `cn()` from `src/lib/utils.ts` for conditional class merging

### Icon Pattern

Custom SVGs extracted from target sites go in `src/components/icons.tsx` as named React components:

```tsx
export function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} ...>...</svg>
  );
}
```

---

## Styling Conventions

- Tailwind v4 (`@import "tailwindcss"`) — no `tailwind.config.ts`; config lives in `globals.css`
- `@custom-variant dark (&:is(.dark *))` enables manual dark mode (class-based)
- `tw-animate-css` provides animation utilities like `animate-live-pulse`
- shadcn components imported from `shadcn/tailwind.css`

---

## The `/clone-website` Workflow

Invoke with: `/clone-website <url1> [<url2> ...]`

The skill operates as a **foreman pattern**: it extracts one page section at a time, writes a detailed spec file to `docs/research/`, then dispatches a builder agent (in its own git worktree/branch) to implement that section in parallel.

### Key steps the skill performs:
1. Pre-flight: verify browser MCP tool, valid URLs, and `npm run build` passes
2. Screenshot all viewport sizes and interaction states
3. Extract design tokens → `docs/research/DESIGN_TOKENS.md`
4. Inventory components → `docs/research/COMPONENT_INVENTORY.md`
5. Document layout → `docs/research/LAYOUT_ARCHITECTURE.md`
6. Document interactions → `docs/research/INTERACTION_PATTERNS.md`
7. Dispatch one builder agent per section in parallel worktrees
8. Merge all worktree branches, resolve conflicts, validate with `npm run check`

### Agent team rules (from AGENTS.md):
- Each teammate works in **its own worktree branch**
- The orchestrator merges all branches at the end and resolves conflicts
- After editing `AGENTS.md`: run `bash scripts/sync-agent-rules.sh`
- After editing `.claude/skills/clone-website/SKILL.md`: run `node scripts/sync-skills.mjs`

---

## Sync Scripts

These keep platform-specific instruction files in sync. Run them whenever you edit the source files they depend on:

| Source file | Command to sync |
|---|---|
| `AGENTS.md` | `bash scripts/sync-agent-rules.sh` |
| `.claude/skills/clone-website/SKILL.md` | `node scripts/sync-skills.mjs` |

Sync targets include: `.cursor/rules/project.mdc`, `.github/copilot-instructions.md`, `.windsurf/workflows/`, `.gemini/commands/`, `.augment/commands/`, `.clinerules`, `.aider.conf.yml`.

---

## CI / Quality Gate

`.github/workflows/ci.yml` triggers on push/PR to `master`:

1. `npm run lint` — ESLint with Next.js config
2. `npm run typecheck` — TypeScript strict
3. `npm run build` — Next.js production build

All must pass. Never skip with `--no-verify`.

---

## Design Principles for Cloning

1. **Pixel-perfect first** — match spacing, colors, typography exactly before customizing
2. **Real content** — use actual text/assets from the target, not Lorem Ipsum
3. **No personal aesthetic** — during emulation, match 1:1
4. **Beauty-first** — every pixel matters; complete sections before moving on

---

## Key Files to Know

| File | Purpose |
|---|---|
| `src/app/globals.css` | All design tokens, Tailwind v4 config |
| `src/app/layout.tsx` | Font, metadata, html/body shell |
| `src/app/page.tsx` | Section assembly order |
| `src/lib/utils.ts` | `cn()` utility |
| `components.json` | shadcn configuration |
| `eslint.config.mjs` | ESLint rules |
| `.claude/skills/clone-website/SKILL.md` | Skill definition (source of truth) |
| `scripts/sync-agent-rules.sh` | Propagates AGENTS.md to all platforms |
| `scripts/sync-skills.mjs` | Propagates skill to all platforms |
