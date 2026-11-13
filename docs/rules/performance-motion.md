# Performance and motion

- Fonts via `next/font` (only the weights used in Figma, `display: swap`).
- No client-side data fetching; the page is statically rendered.
- Keep client JS minimal; no animation library unless the design needs it.
- Every animation respects reduced motion (`motion-safe:` / `motion-reduce:` or `prefers-reduced-motion`).
- Images: see `images-prismic.md` (`sizes`, lazy loading, `preload` only on the LCP image).
