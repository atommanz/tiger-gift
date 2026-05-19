# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**FTC Gift Finder** — An intelligent gift recommendation web app for Flying Tiger Copenhagen (Index Living Mall). This is a hackathon project (4-5 hours build time) designed to help customers find the perfect gift through a TikTok-style product discovery experience.

**Goal:** Mobile-first prototype with complete user flow from gift selection to checkout celebration in under 3 minutes.

**Primary Language:** Thai (for UI text, product names, and user-facing content)

## Important: Next.js & React Versions

⚠️ **This project uses Next.js 16.2.6 and React 19.2.4 with breaking changes from earlier versions.**

Before writing any Next.js code, read the relevant documentation in `node_modules/next/dist/docs/` to understand API changes, deprecated features, and new conventions. Your training data may not reflect these breaking changes.

See `AGENTS.md` for the full agent rules regarding Next.js compatibility.

## Tech Stack

- **Framework:** Next.js 16.2.6 (App Router)
- **React:** 19.2.4
- **TypeScript:** 5.x (strict mode, bundler resolution)
- **Styling:** Tailwind CSS 4.x with new `@theme inline` syntax
- **Fonts:** Geist Sans & Geist Mono (next/font/google)
- **ESLint:** v9 flat config format

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

## Configuration Notes

**TypeScript:** Path alias `@/*` maps to root directory for cleaner imports:
```typescript
import Component from "@/app/components/Component"
```

**Tailwind CSS 4.x:** Uses new inline theme syntax in `globals.css`:
```css
@theme inline {
  --color-background: var(--background);
  --font-sans: var(--font-geist-sans);
}
```

**ESLint:** Configured with `defineConfig()` and `globalIgnores()` (v9 flat config format), includes Next.js TypeScript and Core Web Vitals presets.

## Feature Requirements

Full requirements documented in `propmt.text`. Core features:

### Must Build

1. **Multi-step form** (6 screens) — Gender, age, relationship, occasion, budget, style selection with progress bar
2. **Loading screen** — 2-3 second animation
3. **TikTok-style product feed** — Vertical snap-scroll, one product per screen, full-screen cards with "Add to Cart" button and cart badge counter
4. **Shopping cart** — Quantity controls, total calculation, gift message text area, checkout button
5. **Celebration screen** — Confetti/fireworks animation on checkout

### Must NOT Build

No authentication, real payment gateway, backend/database (use mock JSON), AI/ML recommendations (simple filter logic only), responsive beyond mobile-first, search/filter UI, reviews, wishlist, or share features.

### Mock Data Structure

Create JSON file with 20-30 FTC products:
- Product image URL/path
- Name (Thai)
- Price (THB)
- Tags: gender, age, relationship, occasion, budget, style

Use placeholder images from `public/` or external sources.

## Styling Guidelines

- Mobile-first design (primary target)
- Tailwind utility classes throughout
- Geist font CSS variables: `--font-geist-sans`, `--font-geist-mono`
- Root HTML has `antialiased` class
- Use Next.js `<Image>` component for optimized images
- Keep bundle size minimal

## Architecture Notes

**App Router Structure:**
- `app/layout.tsx` — Root layout with Geist fonts and metadata
- `app/page.tsx` — Home page entry point
- `app/globals.css` — Tailwind imports and theme configuration

**React 19 Considerations:**
- Leverage server components where appropriate
- Client components only when needed for interactivity (form state, animations, cart state)
