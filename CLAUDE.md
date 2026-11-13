@AGENTS.md

# Buzzvel FE Test 2026 — Project Rules

One responsive landing page (mobile, tablet, desktop) built from the Buzzvel Figma design.
Evaluation criteria: **design accuracy, responsiveness, code quality, working interactions,
accessibility and performance**. Every rule serves one of those.

## Stack

- Next.js 16 (App Router, `cacheComponents` enabled) + React 19 + TypeScript (strict)
- Tailwind CSS v4 (CSS-first config in `src/app/globals.css`, no `tailwind.config.*`)
- React Hook Form + Zod (`@hookform/resolvers/zod`) for every form
- Prismic (`@prismicio/client` + `@prismicio/next`) as the image source
- `clsx` + `tailwind-merge` (`cn()` helper) and `class-variance-authority` for component variants
- pnpm

Do not add other dependencies without a clear reason stated in the README.

## Language

Code, comments, commit messages, README and UI copy in **English** (public repo, international reviewers).
Commits follow Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`).

## Rules

@docs/rules/architecture.md
@docs/rules/design-tokens.md
@docs/rules/images-prismic.md
@docs/rules/forms.md
@docs/rules/accessibility.md
@docs/rules/keyboard.md
@docs/rules/performance-motion.md
@docs/rules/responsive.md
@docs/rules/figma-workflow.md

## Definition of done

- `pnpm lint` and `pnpm build` pass with no errors.
- Section checked on mobile and desktop against the Figma screenshot.
- Keyboard pass: Tab from the top to the bottom of the page and Shift+Tab back, on mobile and desktop widths.
  Every action is reachable, focus is always visible, never lost, and never trapped (except inside an open overlay).
- README (English) kept up to date: install/run/build, key decisions, known gaps, approximate time spent,
  AI tools used and how results were verified.
- Tests are optional (per the challenge): at most one small test for the form schema or the Tabs keyboard behavior.
