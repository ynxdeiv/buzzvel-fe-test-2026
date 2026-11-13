import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    size: {
      /** Desktop/subtitle 1 (18/28) → Mobile/subtitle 1 (16/26) */
      "subtitle-1": "text-mobile-subtitle-1 lg:text-desktop-subtitle-1",
      /** Desktop/subtitle 2 (16/28) → Mobile/subtitle 2 (14/24) */
      "subtitle-2": "text-mobile-subtitle-2 lg:text-desktop-subtitle-2",
      /** body 1 (14/24) on every breakpoint */
      body: "text-body-1",
    },
    tone: {
      primary: "text-text-primary",
      secondary: "text-text-secondary",
      tertiary: "text-text-tertiary",
      inverse: "text-text-white-primary",
    },
  },
  defaultVariants: { size: "subtitle-1", tone: "secondary" },
});

export type TextProps = ComponentProps<"p"> & VariantProps<typeof textVariants>;

export function Text({ size, tone, className, ...props }: TextProps) {
  return <p className={cn(textVariants({ size, tone }), className)} {...props} />;
}
