import type { ImageField } from "@prismicio/client";
import { PrismicImage } from "./PrismicImage";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva("relative overflow-hidden rounded-full border-2 bg-primary-blue-light not-first:-ml-2", {
  variants: {
    size: {
      sm: "size-8",
      md: "size-10",
    },
    ring: {
      cream: "border-background-light-yellow",
      yellow: "border-secondary-yellow",
    },
  },
  defaultVariants: { size: "sm", ring: "cream" },
});

const PIXELS = { sm: 32, md: 40 } as const;

export type AvatarStackProps = VariantProps<typeof avatarVariants> & {
  avatars: ImageField[];
  className?: string;
};

/** Overlapping learner avatars. Decorative: the adjacent copy carries the meaning. */
export function AvatarStack({ avatars, size = "sm", ring, className }: AvatarStackProps) {
  const px = PIXELS[size ?? "sm"];

  return (
    <div aria-hidden="true" className={cn("flex", className)}>
      {avatars.map((avatar, index) => (
        <span key={index} className={avatarVariants({ size, ring })}>
          <PrismicImage field={avatar} alt="" fill sizes={`${px}px`} className="object-cover" />
        </span>
      ))}
    </div>
  );
}
