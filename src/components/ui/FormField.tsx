import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FieldError } from "./FieldError";

export type FieldA11yProps = {
  id: string;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
};

export type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  /** Extra info shown on the right of the error row (e.g. a character counter). */
  aside?: ReactNode;
  className?: string;
  /** Receives the ids/ARIA attributes that connect the control to its label and error. */
  children: (a11y: FieldA11yProps) => ReactNode;
};

/** Label + control + error message, wired for screen readers. Library-agnostic. */
export function FormField({ id, label, error, aside, className, children }: FormFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-body-1 font-bold text-text-primary">
        {label}
      </label>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
      })}
      {error || aside ? (
        <div className="flex items-start gap-3">
          <FieldError id={errorId} message={error} />
          {aside ? <span className="ml-auto shrink-0 text-caption text-text-tertiary">{aside}</span> : null}
        </div>
      ) : null}
    </div>
  );
}
