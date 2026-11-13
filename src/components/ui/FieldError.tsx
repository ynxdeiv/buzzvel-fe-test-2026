import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

export type FieldErrorProps = {
  id: string;
  message?: string;
  className?: string;
};

/** Inline validation message (icon + text). Renders nothing when there is no error. */
export function FieldError({ id, message, className }: FieldErrorProps) {
  if (!message) return null;

  return (
    <p id={id} className={cn("flex items-start gap-1.5 text-caption text-feedback-error", className)}>
      <Icon name="icon-alert" className="mt-0.5 shrink-0" />
      {message}
    </p>
  );
}
