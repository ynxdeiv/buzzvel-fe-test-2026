import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { fieldStyles } from "./fieldStyles";

export type InputProps = ComponentProps<"input">;

export function Input({ className, type = "text", ...props }: InputProps) {
  return <input type={type} className={cn(fieldStyles, "py-3", className)} {...props} />;
}
