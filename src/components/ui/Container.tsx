import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type ContainerProps = ComponentProps<"div">;

/** Page-width wrapper: 1280px frame with 20/40/80px gutters (1120px content on desktop). */
export function Container({ className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full max-w-page px-5 md:px-10 lg:px-20", className)} {...props} />;
}
