# Design tokens — colors and styles as variables

- All colors, fonts, font sizes, radii, shadows and spacing that come from Figma are declared as
  Tailwind v4 theme variables in `src/app/globals.css`:
  ```css
  @theme {
    --color-brand-500: #...;
    --font-heading: var(--font-...);
  }
  ```
  and used as utilities (`bg-brand-500`, `font-heading`).
- Token names mirror the Figma variable/style names (kebab-case).
- **Forbidden in components:** raw hex/rgb, arbitrary values like `bg-[#123456]`, `text-[17px]`,
  inline `style` for colors. If a value is missing, add a token.
- Remove the scaffold's dark-mode `prefers-color-scheme` block unless the design has a dark theme.
