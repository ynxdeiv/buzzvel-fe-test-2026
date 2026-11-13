import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-center text-body-1 font-bold whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-70 aria-disabled:cursor-not-allowed aria-disabled:opacity-70 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        primary: "bg-primary-blue text-text-white-primary hover:bg-primary-blue/90",
        secondary:
          "border border-line-1 bg-background-white text-text-primary hover:border-text-tertiary hover:bg-background-light-yellow",
        accent: "bg-secondary-yellow text-text-primary hover:bg-secondary-yellow/85",
        /** Text-only action on the blue section ("Browse all courses") */
        "ghost-inverse": "text-text-white-secondary hover:text-text-white-primary",
        /** Text-only action on light backgrounds ("Log in") */
        ghost: "font-normal text-text-secondary hover:text-text-primary",
      },
      size: {
        md: "px-7 py-3.5",
        sm: "px-5 py-2.5",
        text: "px-4 py-3.5",
        compact: "px-4 py-2.5",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export type ButtonProps = ComponentProps<"button"> & ButtonVariantProps;

export function Button({ variant, size, fullWidth, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonVariants({ variant, size, fullWidth }), className)} {...props} />;
}

export type ButtonLinkProps = ComponentProps<"a"> & ButtonVariantProps & { href: string };

/** Anchor styled as a button (every CTA in the design navigates, so they are links). */
export function ButtonLink({ variant, size, fullWidth, className, ...props }: ButtonLinkProps) {
  return <a className={cn(buttonVariants({ variant, size, fullWidth }), className)} {...props} />;
}
