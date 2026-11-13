import { Toaster as SonnerToaster } from "sonner";

/**
 * App-wide toast outlet (Sonner). Colors come from the design tokens in globals.css.
 * Toasts pause on hover/focus and Alt+T moves focus to them, so they stay keyboard-friendly.
 */
export function Toaster() {
  return <SonnerToaster position="bottom-right" closeButton />;
}
