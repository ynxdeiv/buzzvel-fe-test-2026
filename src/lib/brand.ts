/**
 * Brand values for places that cannot read the CSS design tokens: the browser theme color and the
 * generated Open Graph image. Keep them in sync with the @theme variables in src/app/globals.css.
 */
export const brandColors = {
  textPrimary: "#171b2c", // --color-text-primary
  textSecondary: "#656770", // --color-text-secondary
  primaryBlue: "#3157f6", // --color-primary-blue
  primaryBlueLight: "#e2e8ff", // --color-primary-blue-light
  backgroundOrange: "#ffcb9f", // --color-background-orange
  backgroundLightYellow: "#f9f8f3", // --color-background-light-yellow
  backgroundWhite: "#ffffff", // --color-background-white
  lineOne: "#dbdfeb", // --color-line-1
} as const;

/** Absolute URL of the site: Vercel's production domain when deployed, localhost otherwise. */
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";
