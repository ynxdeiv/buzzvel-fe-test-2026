import { cn } from "@/lib/utils";

export type SpinnerProps = {
  className?: string;
};

/** Decorative loading indicator; pair it with visible text (e.g. "Sending…"). */
export function Spinner({ className }: SpinnerProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "size-4 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none",
        className,
      )}
    />
  );
}
