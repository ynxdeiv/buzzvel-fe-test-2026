"use client";

import type { FieldPath, FieldValues } from "react-hook-form";
import { FormField } from "@/components/ui/FormField";
import { Input, type InputProps } from "@/components/ui/Input";
import { useField } from "./useField";

export type InputFieldProps<T extends FieldValues = FieldValues> = Omit<InputProps, "id" | "name"> & {
  name: FieldPath<T>;
  label: string;
};

/** Labelled text input bound to the surrounding `<Form>` by `name`. */
export function InputField<T extends FieldValues = FieldValues>({
  name,
  label,
  className,
  ...props
}: InputFieldProps<T>) {
  const { id, registration, error } = useField<T>(name);

  return (
    <FormField id={id} label={label} error={error} className={className}>
      {(a11y) => <Input {...props} {...a11y} {...registration} />}
    </FormField>
  );
}
