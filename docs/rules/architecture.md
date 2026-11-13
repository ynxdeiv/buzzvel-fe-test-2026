# Architecture — componentized and reusable

```
src/
  app/                  # routes only: layout.tsx, page.tsx, globals.css, metadata
  components/
    ui/                 # design-system primitives, no page content
                        # Button, Container, Heading, Text, Icon, Input, FormField, Tabs...
    layout/             # Header, Footer, MobileNav, SkipLink
    sections/           # one folder per Figma section (Hero/, Features/, ...)
                        # compose ui/ primitives, receive content via props
    forms/              # RHF forms (client components)
  content/              # typed local/mock content (text, links, lists)
  lib/
    prismic/            # client + cached fetchers
    schemas/            # Zod schemas
    utils.ts            # cn() and small helpers
  types/                # shared types
```

- **Server Components by default.** `'use client'` only on the smallest interactive leaf
  (form, menu toggle, carousel, accordion, tabs). Never on a whole section.
- **Sections are dumb:** they receive data via typed props; `page.tsx` wires `content/` + Prismic data into them.
  No hardcoded copy inside components.
- **Reuse before creating:** if two places share a visual pattern, it is a `ui/` primitive with variants (`cva`).
- One component per file, PascalCase file names, **named exports** (default export only where Next requires it).
- Every component exports its props type (`export type ButtonProps = ...`). No `any`.
  Extend native element props when wrapping an element (`ComponentProps<'button'>`).
- Merge classes with `cn()` (`clsx` + `tailwind-merge`) so consumers can extend via `className`.
- Keep files small and focused (~150 lines). Split when a component grows past that.
