import type { StepIconVariant } from "@/types/content";

export type StepIconProps = {
  variant: StepIconVariant;
};

/** Abstract shape illustrations of the three steps (pure CSS, as in the Figma file). */
export function StepIcon({ variant }: StepIconProps) {
  if (variant === "focus") {
    return (
      <span aria-hidden="true" className="relative block size-14 rounded-full bg-primary-blue-light">
        <span className="absolute top-2 left-2 size-6 rounded-md bg-primary-blue" />
      </span>
    );
  }

  if (variant === "experience") {
    return (
      <span aria-hidden="true" className="relative block size-14">
        <span className="absolute inset-0 rotate-12 rounded-lg bg-primary-orange/15 lg:bg-background-orange" />
        <span className="absolute top-6 left-6 size-7 rounded-full bg-primary-orange" />
      </span>
    );
  }

  return (
    <span aria-hidden="true" className="relative block size-14 rounded-xl bg-background-yellow">
      <span className="absolute top-7 left-2 size-5 rounded-full bg-secondary-mustard" />
    </span>
  );
}
