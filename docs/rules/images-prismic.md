# Images — Prismic

- Images live in the Prismic repository and are fetched in Server Components via `src/lib/prismic/`.
  With `cacheComponents` on, fetchers use the `'use cache'` directive so the page stays static.
- Render with `ui/PrismicImage` (wraps `PrismicNextImage` and adds imgix `auto=format,compress`, so PNG assets are
  served as AVIF/WebP). Never import `PrismicNextImage` directly. Always set `sizes` for responsive images.
- **Alt text:** comes from the Prismic image alt field; purely decorative images use `alt=""`.
- Only the LCP image (hero) gets `preload` + `fetchPriority="high"` (Next 16 replaced `priority` with `preload`).
  Everything else lazy-loads.
- Allow `images.prismic.io` in `next.config.ts` `images.remotePatterns`.
- The Prismic repo (`buzzvel`, set in `prismic.config.json`, client in `src/prismicio.ts`) must have a **public**
  API: reviewers must be able to `pnpm install && pnpm dev` with no secrets. Never commit tokens.
- Use the `prismic` skill and the `npx prismic` CLI for models; never edit model JSON by hand.
- Icons and logos exported from Figma are local SVGs (inline React components or `public/`), not Prismic.
