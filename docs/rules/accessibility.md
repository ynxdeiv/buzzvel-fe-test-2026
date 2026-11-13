# Accessibility

- Semantic landmarks: `header`, `nav`, `main`, `section` (with `aria-labelledby`), `footer`. One `h1`, ordered headings.
- Prefer native elements (`button`, `a`, `details`, `dialog`) over ARIA. Add ARIA only when no native element fits.
- Every meaningful image has a descriptive alt; decorative images use `alt=""`.
- Color contrast meets WCAG AA.
- Page metadata via the Metadata API (`title`, `description`, Open Graph) and `lang="en"` on `<html>`.
