/**
 * Shared look of text inputs and textareas (Figma "Input Container").
 * Invalid fields get the error border, a light error tint and an error-colored focus ring.
 */
export const fieldStyles =
  "w-full rounded-lg border border-line-1 bg-background-light-yellow px-4 text-body-1 text-text-primary placeholder:text-text-tertiary transition-colors motion-reduce:transition-none hover:border-text-tertiary focus:border-primary-blue aria-invalid:border-feedback-error aria-invalid:bg-feedback-error/5 aria-invalid:[--focus-ring:var(--color-feedback-error)]";
