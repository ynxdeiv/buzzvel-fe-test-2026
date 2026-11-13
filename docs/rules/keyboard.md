# Keyboard navigation — every Tab must work

The whole page must be usable with the keyboard only (Tab, Shift+Tab, Enter, Space, Esc, arrows).

## Tab order

- DOM order = visual order, on every breakpoint. Never reorder with CSS (`order`, `flex-row-reverse`, absolute
  positioning) in a way that makes Tab jump around.
- Never use positive `tabindex`. `tabIndex={0}` only on custom widgets, `tabIndex={-1}` only for programmatic focus targets.
- Only interactive things are tabbable, and they use the right element: `<a href>` navigates, `<button>` acts.
  No `div`/`span` with `onClick`.
- The first Tab stop is the **skip link** ("Skip to content"), visible on focus, jumping to `<main id="main">`.

## Focus visibility

- Every focusable element shows a clear `focus-visible:` ring (token color + offset), defined once in the `ui/`
  primitives so it is consistent. Never `outline-none` without a replacement.
- Content revealed on hover must also be revealed on focus (`focus-visible:`, `group-focus-within:`).

## Hidden content is not tabbable

- Closed mobile menu, collapsed accordion panels, off-screen carousel slides and inactive tab panels are removed
  from the Tab order with `hidden` or `inert` — hiding with `opacity`/`translate` alone is a bug.

## Overlays (mobile menu, modal)

- Prefer native `<dialog>` with `showModal()` (built-in focus trap, Esc, inert background).
- On open: focus moves inside. Tab/Shift+Tab cycle inside. Esc closes. On close: focus returns to the trigger.
- Trigger button has `aria-expanded` and `aria-controls`; body scroll is locked while open.

## Tabs widget (WAI-ARIA Tabs pattern)

Build one reusable `ui/Tabs` if the design has tabs.

- `role="tablist"` (with `aria-label`) > `role="tab"` (`aria-selected`, `aria-controls`, `id`) and
  `role="tabpanel"` (`aria-labelledby`, `tabIndex={0}`).
- Roving tabindex: only the selected tab has `tabIndex={0}`, the others `-1`. Tab enters the tablist on the selected
  tab and the next Tab goes to the panel.
- ArrowLeft/ArrowRight move between tabs (wrapping), Home/End go to first/last. Automatic activation on focus.
- Inactive panels use `hidden`.

## Other widgets

- Accordion: `<button aria-expanded aria-controls>` (or `details/summary`); Enter/Space toggle.
- Carousel/slider: labelled prev/next `<button>`s, current slide announced (`aria-live="polite"`), only the visible
  slide is focusable, no autoplay (or a pause button and no autoplay with reduced motion).
