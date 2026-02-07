# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OASIS is a French-language healthcare survey platform (AIRE/MOTS assessments) built with Next.js 16, TypeScript, and PostgreSQL. It allows healthcare professionals to create structures, manage surveys, and collect responses.

## Commands

- **Package manager**: pnpm
- `pnpm dev` — Start dev server (http://localhost:3000)
- `pnpm build` — Runs `prisma generate` then `next build`
- `pnpm lint` — ESLint
- `npx prisma migrate dev` — Apply database migrations
- `npx prisma generate` — Regenerate Prisma client after schema changes
- `npx prisma studio` — Open Prisma database GUI

## Architecture

**Next.js App Router** with Server Components and Client Components (`"use client"` directive).

### Key directories
- `app/` — Routes and API handlers (file-based routing)
- `app/api/` — REST API routes (structures, surveys, auth)
- `components/` — React components; `components/ui/` for primitives
- `lib/` — Auth config, Prisma client singleton, validation schemas
- `lib/validations/` — Zod schemas for API input validation
- `prisma/` — Schema and migrations

### Auth system
**BetterAuth** with email/password, Prisma adapter, session-based (7-day expiry).
- `lib/auth.ts` — Server config
- `lib/auth-client.ts` — Client hooks (`useSession`, `signIn`, `signOut`)
- `lib/auth-server.ts` — `getSession()` for Server Components
- `app/api/auth/[...all]/route.ts` — Catch-all BetterAuth handler

### Database
PostgreSQL (Neon) via Prisma 6. Client instantiated as singleton in `lib/db.ts`.

**Application models**: `Structure` → has many `Survey` → has many `SavedSurvey` (stores JSON responses).

**Enums**: `SurveyStatus` (EN_COURS, FERMEE, EXPIREE), `SurveyType` (AIRE, MOTS, AIRE_ET_MOTS).

### API pattern
Route handlers validate with Zod, check auth via `getSession()`, return `NextResponse.json()` with appropriate status codes.

### Forms
React Hook Form + `@hookform/resolvers` + Zod schemas from `lib/validations/`.

### Styling & UI Components
Tailwind CSS 4 with custom healthcare theme (dark blue primary, teal accents) defined in `app/globals.css` via `@theme` directive.

**coss.com/ui** (shadcn registry based on Base UI + Tailwind CSS) for all UI primitives in `components/ui/`. Key components:
- `Button` (variants: default, outline, destructive, destructive-outline, ghost, secondary, link)
- `Dialog` (DialogPopup, DialogHeader, DialogTitle, DialogPanel, DialogFooter, DialogClose) — controlled via `open` + `onOpenChange`
- `AlertDialog` — for destructive action confirmations (replaces `confirm()`)
- `Card` (CardHeader, CardTitle, CardAction, CardPanel, CardFooter)
- `Table` (TableHeader, TableBody, TableRow, TableHead, TableCell)
- `Badge` (variants: success, secondary, destructive, warning, info, outline)
- `Switch` — toggle controls (Base UI, uses `checked` + `onCheckedChange`)
- `Toast` — notifications via `toastManager.add()` (ToastProvider in layout)
- `Input`, `Label`, `Spinner`
- Native `<select>` with Input-matching styles for react-hook-form `register()` compatibility

### Path alias
`@/*` maps to the project root (e.g., `import { prisma } from "@/lib/db"`).

## Environment Variables

- `DATABASE_URL` — PostgreSQL connection string (Neon)
- `BETTER_AUTH_SECRET` — Session signing secret
- `BETTER_AUTH_URL` — Auth server URL
- `NEXT_PUBLIC_APP_URL` — Public app URL (used in client-side auth)

## Conventions

- All UI text is in **French**
- Date formatting uses French locale (`toLocaleDateString("fr-FR")`)
- Zod 4 API: use `z.enum()` with array syntax for enums
- Protected pages do server-side auth checks and redirect to `/auth/sign-in`
- API routes return 401 for unauthenticated requests
