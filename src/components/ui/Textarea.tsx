import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { fieldStyles } from "./fieldStyles";

export type TextareaProps = ComponentProps<"textarea">;

export function Textarea({ className, ...props }: TextareaProps) {
  return <textarea className={cn(fieldStyles, "h-25 resize-y py-3.5 lg:h-30", className)} {...props} />;
}
