# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is this

**invitly-web** is the public marketing site for the **Bento** platform (`app.bento.com.ar`) — a SaaS for digital event invitations. It lists templates, explains features, and captures contact inquiries. Built with Next.js 16 App Router, targeted at Argentine users (default locale: `es`).

## Commands

```bash
npm run dev           # Next.js dev server (localhost:3000)
npm run build         # Production build
npm run lint          # ESLint
npm run test          # Jest
npm run test:watch    # Jest watch mode
npm run test:coverage # Coverage report

# Run a single test file
npx jest __tests__/ContactForm.test.tsx
```

## Architecture

### Routing

All pages live under `app/[locale]/`. The `middleware.ts` uses `next-intl` to prefix every route with the locale. Supported locales: `es` (default), `en`. Static params are generated in each layout via `generateStaticParams()`.

### Internationalization

Translation files are in `messages/{locale}/{index,home,templates,contact}.json`, merged per-request in `src/i18n/request.ts`. All UI copy must be added to both `es/` and `en/` files.

- Server components: `const t = await getTranslations("Namespace")`
- Client components: `const t = useTranslations("Namespace")`

### Data fetching

- API base URL: `process.env.NEXT_PUBLIC_API_TEMPLATE_URL` (points to the shared `invitly-api` backend)
- Service functions in `services/` call the API via the Axios instance in `utils/api.ts`
- TanStack Query hooks in `hooks/` wrap those services (staleTime: 60 s, retry: 2)
- Pages use ISR (`export const revalidate = 3600`)

### State

Zustand is used only for the category filter in the templates page (`stores/categoriesStore.ts`). No global auth state — this site has no login flow.

### Component conventions

- `components/features/<feature>/` — feature-specific components
- `components/shared/` — cross-feature (Navbar, Footer, Container, skeletons, states)
- `components/ui/` — shadcn/ui primitives (Radix UI-based)
- Heavy animations: Framer Motion for scroll effects, GSAP for complex timelines (HeroPhonesClient)
- Below-the-fold home sections are `lazy()`-imported with Suspense + skeleton fallbacks

### Forms

React Hook Form + Zod everywhere. Schemas live in `utils/validations.ts`. Submit handlers call service functions and fire `toast.success()` / `toast.error()` (sonner).

### Styling

Tailwind CSS v4 with CSS variables in oklch format defined in `app/[locale]/globals.css` (and mirrored in `app/globals.css`). Primary brand color: `#FFA459` (`oklch(0.763 0.165 48)`). Dark mode is class-based. Font families: `font-sans` (Inter), `font-display` (Playfair Display).

### Testing

Jest + React Testing Library. `jest.setup.ts` mocks `next-intl`'s `getTranslations` with a hardcoded dict and polyfills browser APIs. Tests go in `__tests__/`. Mock services with `jest.mock("@/services/...")`.

## Environment variables

```
NEXT_PUBLIC_API_TEMPLATE_URL=https://invitation-api-production.up.railway.app
GA_MEASUREMENT_ID=G-XXXXXXX
```
