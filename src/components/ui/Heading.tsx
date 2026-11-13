import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("font-heading", {
  variants: {
    size: {
      /** Desktop/H1 → Mobile/H1 (hero) */
      display: "text-mobile-h1 lg:text-desktop-h1",
      /** Desktop/H2 → Mobile/H2 (final call to action) */
      cta: "text-mobile-h2 lg:text-desktop-h2",
      /** Desktop/H3 → Mobile/H3 (section titles) */
      section: "text-mobile-h3 lg:text-desktop-h3",
      /** Desktop/H5 → Mobile/H5 (cards, steps, form) */
      card: "text-mobile-h5 lg:text-desktop-h5",
      /** Desktop/H5 on every breakpoint (contact form title, same in both designs) */
      form: "text-desktop-h5",
    },
    tone: {
      default: "text-text-primary",
      inverse: "text-text-white-primary",
    },
  },
  defaultVariants: { size: "section", tone: "default" },
});

export type HeadingProps = ComponentProps<"h2"> &
  VariantProps<typeof headingVariants> & {
    as?: "h1" | "h2" | "h3";
  };

export function Heading({ as: Tag = "h2", size, tone, className, ...props }: HeadingProps) {
  return <Tag className={cn(headingVariants({ size, tone }), className)} {...props} />;
}
