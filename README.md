# Luma — Buzzvel Front-End Coding Challenge (November 2026)

A single responsive landing page built from the supplied Figma design with **Next.js 16 (App Router), React 19,
TypeScript (strict) and Tailwind CSS v4**.

**Live preview:** https://buzzvel.deiv.com.br (deployed on Vercel from `main`; every pull request gets
its own preview deployment).

**Video walkthrough (1:11):** https://drive.google.com/file/d/1sFlvLyWZass0xjQ9-Yh8YZcyJZM2eU4N/view?usp=drivesdk
(Figma vs. live page, keyboard navigation, the responsive layout, the mobile menu and the contact form).

|                 | Mobile                                                        | Desktop                                                         |
| --------------- | ------------------------------------------------------------- | --------------------------------------------------------------- |
| Lighthouse      | ![Lighthouse mobile](docs/screenshots/lighthouse-mobile.webp) | ![Lighthouse desktop](docs/screenshots/lighthouse-desktop.webp) |
| LCP / CLS / TBT | 3.2 s / 0 / 150 ms (simulated slow 4G)                        | 0.7 s / 0 / 0 ms                                                |

Full-page screenshots: [375](docs/screenshots/site-375.webp) · [768](docs/screenshots/site-768.webp) ·
[1024](docs/screenshots/site-1024.webp) · [1440](docs/screenshots/site-1440.webp) · form
[errors](docs/screenshots/form-errors.webp) / [success](docs/screenshots/form-toast-success.webp) /
[failure](docs/screenshots/form-toast-error.webp).

## Getting started

Requirements: **Node.js 22.13+** (26 LTS recommended, see `.nvmrc`) and **pnpm 10** (`corepack enable`).

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build (static page)
pnpm start        # serve the production build
```

No environment variables are required. Images are read from the public Prismic API, so `dev` and `build` need
internet access. Optional variables are documented in [`.env.example`](.env.example).

| Script              | What it does                                    |
| ------------------- | ----------------------------------------------- |
| `pnpm lint`         | ESLint (Next.js config)                         |
| `pnpm typecheck`    | Generates Next route types, then `tsc --noEmit` |
| `pnpm test`         | Vitest (form action tests)                      |
| `pnpm format:check` | Prettier, with Tailwind class sorting           |

GitHub Actions runs all of them, plus `pnpm build`, on every push and pull request.

## How it is built

```
src/
  app/                 layout (fonts, metadata, skip link, toaster) and the page
  components/
    ui/                design-system primitives: Button, Heading, Text, Section, Icon, FormField, PrismicImage…
    layout/            Header, MobileNav (native <dialog>), Footer, SkipLink
    sections/          one folder per Figma section; they only receive typed props
    forms/             ContactForm + RHF-bound fields (Form, InputField, TextareaField, SubmitButton)
  content/landing.ts   all page copy, typed
  hooks/               useZodForm, useActionSubmit
  lib/                 Prismic fetcher, Zod schema, Server Action factory, SQLite access
docs/rules/            the conventions this project follows (also used as AI instructions)
```

- **Design tokens.** Every Figma color, text style and shadow is a Tailwind v4 `@theme` variable in
  `globals.css`. Components never use raw hex values or arbitrary font sizes. Sections compose `ui/` primitives
  with `cva` variants.
- **Images come from Prismic.** A `landing_images` singleton holds every photo along with its alt text.
  `PrismicImage` serves them as AVIF/WebP with responsive `srcset`/`sizes`. The page is fully static:
  `'use cache'` + `cacheLife("max")`, refreshed by a Prismic webhook on `/api/revalidate`, which requires
  `PRISMIC_WEBHOOK_SECRET`. Copy stays in typed local content, since the brief says a CMS is not required.
- **Contact form.** One Zod schema validates in the browser (React Hook Form + `zodResolver`). A Server Action
  built with `createFormAction(schema, handler)` validates again on the server, so tampered requests are
  rejected with inline field errors. Valid messages are stored in SQLite through Node's built-in `node:sqlite`,
  which needs no native dependency. Sonner toasts report success or failure. Field errors stay next to their
  field, focus moves to the first invalid one, and double submits are ignored.
- **Accessibility and keyboard.**
  - Skip link, landmarks and a correct heading order.
  - A single focus ring token, with a different color on dark sections.
  - The mobile menu is a native `<dialog>`: it traps focus, closes on Esc and returns focus to its trigger.
  - Cards use stretched links, stats use a `<dl>`, and the testimonial uses `<figure>`/`<blockquote>`.
  - Transitions and smooth scrolling respect `prefers-reduced-motion`.
  - Every link, button and field has an accessible name: visible text, `alt`, `aria-label` or `<label>`.
  - **Testing with Safari on macOS:** by default Safari moves Tab only between form fields. Use **Option+Tab**, or
    turn on Safari › Settings › Advanced › "Press Tab to highlight each item on a webpage". Chrome, Edge and
    Firefox (with macOS keyboard navigation on) reach every link and button with Tab.
- **Performance.**
  - `next/font` with `display: swap` and only the weights that are used.
  - Only the hero image is preloaded with `fetchPriority="high"`; everything else lazy-loads.
  - No client JavaScript besides the menu, the form and the toaster.
- **Sharing and metadata.** Title, description, a favicon derived from the logo, and an Open Graph/X image
  (`opengraph-image.tsx`). The image is generated with `next/og` from the hero copy and the Prismic photo, and
  prerendered at build time.

## Decisions and deviations from the design

- **Step labels:** the desktop design labels all three steps "STEP 01". I used 01/02/03, as on mobile.
- **Form copy:** the mobile form copy is in Portuguese, so I used the English copy from desktop.
- **Error color:** the design has none, and its orange fails contrast, so I added `feedback-error` (#c0341d,
  5.6:1). Two design colors were also nudged by a barely visible amount to pass WCAG AA:
  - `text-tertiary` #6d7384 → #686e7f (4.45 → 4.79:1);
  - `text-white-secondary` #e7e7ec → #ececf0 (4.46 → 4.66:1).
- **Hero at 1024 px:** the hero stacks until 1280 px. At 1024 px the 500 px visual does not fit next to the
  headline without clipping.
- **Mobile menu:** the design shows the hamburger icon but not the open menu, so the panel follows the page's
  existing styles.
- **Links:** they point to sections of the page (Courses, Community, About, Contact). Pages outside the scope
  use `#`.
- **Prismic preview:** I removed the Prismic preview toolbar and the slice-simulator routes, because they added
  a third-party script to every visit.

## Known gaps

- **SQLite in production:** it works locally and on any server with a writable disk. On read-only/serverless
  hosts such as Vercel (including the live preview) it falls back to the temp folder, so messages are not
  persisted. A real deployment would use a hosted database such as Postgres or Turso.
- **No spam protection:** the form has no rate limiting or spam protection.
- **Node warning:** `node:sqlite` is still marked experimental, so Node may print an `ExperimentalWarning` at startup. It is harmless.
- **Mobile LCP:** 3.2 s in Lighthouse's simulated slow 4G. Almost all of it is the hero photo download
  (desktop: 0.7 s).
- **Browser coverage:** the automated checks ran in Chromium and WebKit (Safari's engine), but not in Firefox.
- **Approximate time spent:** about 4 hours in one session on November 13, 2026 (first commit 10:31, last 14:17), working with the AI tools described below.

## AI tools

I used **Claude Code** (Anthropic) as a pair programmer throughout:

- **Figma MCP:** read the design (frames, variables, assets) and exported section screenshots to compare against.
- **Prismic MCP and CLI:** modelled the `landing_images` type, uploaded the images with alt text and published them.
- **Implementation:** components, the form stack and the project rules in `docs/rules/`, which also served as
  instructions for the AI.
- **Video walkthrough:** edited with HyperFrames from Playwright captures of the live site; the English voiceover
  is AI-generated with ElevenLabs.

How the result was checked:

- I reviewed every change.
- `format:check`, `lint`, `typecheck`, `test` and `build` all pass, locally and in CI.
- Playwright scripts captured every section at 1280 and 402 px, compared side by side with the Figma exports.
  This caught several issues: a wrapping rating badge, horizontal overflow at 1024 px and a gallery offset.
- An automated keyboard pass checked the full Tab/Shift+Tab order (36 stops in Chromium, and the same 36 with
  Option+Tab in WebKit), the skip link, the menu's focus trap and Esc, and that focus returns to the trigger.
- axe-core (WCAG 2.0/2.1/2.2 A and AA plus best practices) on the live site: 0 violations, with every link, button,
  image and field correctly named.
- Form scenarios: empty, invalid, a tampered request rejected by the server, offline, and double submit.
- Lighthouse runs on mobile and desktop.
