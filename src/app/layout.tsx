import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { SkipLink } from "@/components/layout/SkipLink";
import { Toaster } from "@/components/ui/Toaster";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const title = "Luma — Practical courses that move you forward";
const description =
  "Short, practical courses taught by people who do the work every day. Learn design, technology, business and more — one focused lesson at a time.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "Luma",
  openGraph: {
    title,
    description,
    siteName: "Luma",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

/** Browser UI color. Metadata can't read CSS variables, so this mirrors --color-background-light-yellow. */
const THEME_COLOR = "#f9f8f3";

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body>
        <SkipLink />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
