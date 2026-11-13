import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's default scale. Without registering the
 * custom theme tokens, `text-desktop-h1` would be treated as a text *color* and
 * silently dropped when merged with `text-text-primary`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "desktop-h1",
        "desktop-h2",
        "desktop-h3",
        "desktop-h5",
        "desktop-quotes",
        "desktop-subtitle-1",
        "desktop-subtitle-2",
        "mobile-h1",
        "mobile-h2",
        "mobile-h3",
        "mobile-h5",
        "mobile-quotes",
        "mobile-subtitle-1",
        "mobile-subtitle-2",
        "body-1",
        "overline",
        "caption",
      ],
      font: ["sans", "heading"],
      shadow: ["badge", "card", "photo"],
      container: ["page"],
    },
  },
});

/** Merges conditional class names and resolves Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
