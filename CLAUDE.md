# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**FTC Gift Finder** — An intelligent gift recommendation web app for Flying Tiger Copenhagen (Index Living Mall). This is a hackathon project (4-5 hours build time) designed to help customers find the perfect gift through a TikTok-style product discovery experience.

**Target:** Mobile-first prototype demonstrating the complete user flow from gift selection to checkout celebration.

## Important: Next.js Version

⚠️ **This project uses Next.js 16.2.6 with breaking changes from earlier versions.** 

Before writing any Next.js code, read the relevant documentation in `node_modules/next/dist/docs/` to understand API changes, deprecated features, and new conventions. Your training data may not reflect these breaking changes.

See `AGENTS.md` for the full agent rules regarding Next.js compatibility.

## Tech Stack

- **Framework:** Next.js 16.2.6 (App Router)
- **React:** 19.2.4
- **TypeScript:** 5.x
- **Styling:** Tailwind CSS 4.x (PostCSS plugin)
- **Fonts:** Geist Sans & Geist Mono (via next/font/google)

## Development Commands

```bash
# Start development server (localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Project Structure

```
app/
  layout.tsx     # Root layout with Geist fonts
  page.tsx       # Home page (currently "hello world")
  globals.css    # Global Tailwind styles
  favicon.ico    # Site favicon

public/          # Static assets (SVG icons)
```

## Path Aliases

TypeScript is configured with `@/*` path alias mapping to the root directory:
```typescript
import Component from "@/app/components/Component"
```

## Key Configuration Files

- `next.config.ts` — Next.js configuration (TypeScript format)
- `eslint.config.mjs` — ESLint v9 flat config with Next.js presets
- `postcss.config.mjs` — PostCSS configuration for Tailwind
- `tsconfig.json` — TypeScript config with strict mode, bundler resolution, and Next.js plugin

## Development Guidelines

### What to Build

Based on `propmt.text` (project requirements document), the core features are:

1. **Multi-step form** — 6-screen wizard collecting gift recipient data:
   - Gender, age range, relationship, occasion, budget, style
   - Progress bar and smooth transitions between steps

2. **Loading screen** — 2-3 second animation while "processing"

3. **TikTok-style product feed** — Vertical snap-scroll showing one product at a time:
   - Full-screen product cards with image, name, price
   - "Add to Cart" button on each card
   - Cart badge counter (top-right corner)

4. **Shopping cart** — Product list with:
   - Quantity controls (+/-)
   - Total price calculation
   - Gift message text area
   - Checkout button

5. **Celebration screen** — Confetti/fireworks animation on checkout completion

### What NOT to Build

- Authentication/login system
- Real payment gateway
- Backend/database (use mock JSON data)
- True AI/ML recommendations (simple filter logic is fine)
- Responsive design beyond mobile-first
- Search/filter UI, reviews, wishlist, share features

### Mock Data

Create a JSON file with 20-30 FTC products containing:
- Product image URL or path
- Name (in Thai)
- Price (THB)
- Tags for filtering (gender, age, relationship, occasion, budget, style)

Use placeholder images from `public/` or external sources if needed.

## Styling Notes

- Mobile-first design (primary target is mobile devices)
- Use Tailwind utility classes
- CSS variables for Geist fonts are defined in layout: `--font-geist-sans`, `--font-geist-mono`
- Root HTML includes `antialiased` class for font smoothing

## Git Workflow

- **Main branch:** `main`
- Currently on: `main`
- Clean working tree (no uncommitted changes)

## ESLint Configuration

Uses Next.js ESLint presets with custom global ignores:
- `.next/**`
- `out/**`
- `build/**`
- `next-env.d.ts`

Configured with ESLint v9 flat config format (`eslint.config.mjs`).

## Performance Considerations

- Use Next.js `<Image>` component for optimized images
- Leverage React 19 server components where appropriate
- Keep bundle size minimal for hackathon demo

## Demo Requirements

For hackathon success:
- ✅ Complete user flow works end-to-end
- ✅ Smooth UX with no friction points (< 3 minutes to checkout)
- ✅ Visually polished, aligned with FTC brand
- ✅ Judges immediately understand the concept

---

**Project Status:** Initial setup complete. Ready to build core features.

**Timeline:** 4-5 hours total build time (hackathon constraint)

**Primary Language:** Thai (for UI text, product names, and user-facing content)
