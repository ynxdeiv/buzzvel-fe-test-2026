import type { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

const sectionVariants = cva("py-15 lg:py-25", {
  variants: {
    tone: {
      cream: "bg-background-light-yellow",
      white: "bg-background-white",
      blue: "bg-primary-blue [--focus-ring:var(--color-secondary-yellow)]",
      yellow: "bg-background-yellow",
    },
  },
  defaultVariants: { tone: "cream" },
});

export type SectionProps = Omit<ComponentProps<"section">, "children"> &
  VariantProps<typeof sectionVariants> & {
    children: ReactNode;
    containerClassName?: string;
  };

/** Landing section with the design's vertical rhythm (60px mobile, 100px desktop). */
export function Section({ tone, className, containerClassName, children, ...props }: SectionProps) {
  return (
    <section className={cn(sectionVariants({ tone }), className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
