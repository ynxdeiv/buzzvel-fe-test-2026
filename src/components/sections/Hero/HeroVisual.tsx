import type { ImageField } from "@prismicio/client";
import { PrismicImage } from "@/components/ui/PrismicImage";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { HeroContent } from "@/types/content";

export type HeroVisualProps = {
  image: ImageField;
  coursesBadge: HeroContent["coursesBadge"];
  ratingBadge: HeroContent["ratingBadge"];
  className?: string;
};

const badgeStyles =
  "absolute flex w-max items-center whitespace-nowrap rounded-xl bg-background-white px-4 py-3 text-body-1 shadow-badge";

/**
 * Hero image with its decorative shapes and floating badges.
 * Geometry follows the Figma frames: 362×380 on mobile, 500×520 from tablet up.
 */
export function HeroVisual({ image, coursesBadge, ratingBadge, className }: HeroVisualProps) {
  return (
    <div className={cn("relative mx-auto h-95 w-full max-w-90.5 md:h-130 md:w-125 md:max-w-none", className)}>
      <span
        aria-hidden="true"
        className="absolute top-6 -right-2.5 bottom-3.5 left-[28%] rounded-2xl bg-background-orange md:-right-9.75 md:bottom-7 md:left-112.5"
      />
      <span
        aria-hidden="true"
        className="absolute top-76 -left-2.5 size-16 rounded-full bg-primary-blue-light md:top-100.75 md:-left-11 md:size-26.5"
      />

      <div className="absolute inset-y-0 right-2 left-2 overflow-hidden rounded-2xl bg-primary-blue-light md:inset-x-0 md:rounded-3xl">
        <PrismicImage
          field={image}
          fill
          preload
          fetchPriority="high"
          sizes="(min-width: 768px) 500px, calc(100vw - 56px)"
          className="object-cover"
        />
      </div>

      <p className={cn(badgeStyles, "top-1.5 left-0 gap-3 md:top-4 md:-left-5.5")}>
        <span className="flex h-8 items-center rounded-lg bg-primary-blue-light px-1 font-bold text-primary-blue">
          {coursesBadge.value}
        </span>
        <span className="text-text-primary">{coursesBadge.label}</span>
      </p>

      <p className={cn(badgeStyles, "right-0 bottom-9 gap-2 md:top-109 md:right-auto md:bottom-auto md:left-87")}>
        <span aria-hidden="true" className="flex shrink-0 gap-0.5">
          {Array.from({ length: 5 }, (_, index) => (
            <Icon key={index} name="star" />
          ))}
        </span>
        <span className="text-text-primary">{ratingBadge.label}</span>
      </p>
    </div>
  );
}
