import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tagVariants = cva("inline-flex items-center", {
  variants: {
    variant: {
      /** Category number ("01") */
      number: "rounded-md bg-primary-blue-light px-2 py-1 text-overline text-primary-blue uppercase",
      /** "Featured course" label */
      highlight: "rounded-md bg-secondary-yellow px-3 py-1.5 text-overline text-text-primary uppercase",
      /** Course details on the blue section */
      outline: "rounded-lg border border-line-1 px-3.5 py-1.5 text-body-1 text-text-white-primary",
    },
  },
  defaultVariants: { variant: "number" },
});

export type TagProps = ComponentProps<"span"> & VariantProps<typeof tagVariants>;

export function Tag({ variant, className, ...props }: TagProps) {
  return <span className={cn(tagVariants({ variant }), className)} {...props} />;
}
