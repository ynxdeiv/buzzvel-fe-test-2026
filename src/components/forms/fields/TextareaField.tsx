"use client";

import { useWatch, type FieldPath, type FieldValues } from "react-hook-form";
import { FormField } from "@/components/ui/FormField";
import { Textarea, type TextareaProps } from "@/components/ui/Textarea";
import { useField } from "./useField";

export type TextareaFieldProps<T extends FieldValues = FieldValues> = Omit<TextareaProps, "id" | "name"> & {
  name: FieldPath<T>;
  label: string;
};

/** Labelled textarea bound to the surrounding `<Form>`. Shows a character counter when `maxLength` is set. */
export function TextareaField<T extends FieldValues = FieldValues>({
  name,
  label,
  maxLength,
  className,
  ...props
}: TextareaFieldProps<T>) {
  const { id, registration, error } = useField<T>(name);
  const value = useWatch<T>({ name });
  const counter = maxLength ? (
    <span aria-hidden="true">
      {String(value ?? "").length}/{maxLength}
    </span>
  ) : undefined;

  return (
    <FormField id={id} label={label} error={error} aside={counter} className={className}>
      {(a11y) => <Textarea {...props} maxLength={maxLength} {...a11y} {...registration} />}
    </FormField>
  );
}
