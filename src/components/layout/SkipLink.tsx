/** First Tab stop of the page: jumps over the header straight to the main content. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-lg bg-primary-blue px-4 py-2 text-body-1 font-bold text-text-white-primary focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
    >
      Skip to content
    </a>
  );
}
