# Images — Prismic

- Images live in the Prismic repository and are fetched in Server Components via `src/lib/prismic/`.
  With `cacheComponents` on, fetchers use the `'use cache'` directive so the page stays static.
- Render with `PrismicNextImage` (imgix: auto format + compression). Always set `sizes` for responsive images.
- **Alt text:** comes from the Prismic image alt field; purely decorative images use `alt=""`.
- Only the LCP image (hero) gets `preload` (Next 16 replaced `priority` with `preload`). Everything else lazy-loads.
- Allow `images.prismic.io` in `next.config.ts` `images.remotePatterns`.
- The Prismic repo must be **public**: reviewers must be able to `pnpm install && pnpm dev` with no secrets.
  Repo name in `.env.example` (`PRISMIC_REPOSITORY_NAME`), never commit tokens.
- Icons and logos exported from Figma are local SVGs (inline React components or `public/`), not Prismic.
