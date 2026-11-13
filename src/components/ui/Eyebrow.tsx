import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const eyebrowVariants = cva("text-overline uppercase", {
  variants: {
    tone: {
      brand: "text-primary-blue",
      inverse: "text-text-white-primary",
      muted: "text-text-tertiary",
      footer: "text-text-white-secondary",
    },
  },
  defaultVariants: { tone: "brand" },
});

export type EyebrowProps = ComponentProps<"p"> &
  VariantProps<typeof eyebrowVariants> & {
    as?: "p" | "span" | "h2";
  };

/** Figma "Overline" text style: small, uppercase, tracked label above headings. */
export function Eyebrow({ as: Tag = "p", tone, className, ...props }: EyebrowProps) {
  return <Tag className={cn(eyebrowVariants({ tone }), className)} {...props} />;
}
