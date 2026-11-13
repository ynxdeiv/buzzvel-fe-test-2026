"use client";

import type { ComponentProps } from "react";
import { FormProvider, type FieldValues, type SubmitHandler, type UseFormReturn } from "react-hook-form";

export type FormProps<TInput extends FieldValues, TOutput extends FieldValues> = Omit<
  ComponentProps<"form">,
  "onSubmit"
> & {
  form: UseFormReturn<TInput, unknown, TOutput>;
  onSubmit: SubmitHandler<TOutput>;
};

/**
 * `<form>` + RHF context: fields read their state with `useFormContext`, so they only need a `name`.
 * Native validation is off (`noValidate`) because Zod owns the rules and the messages.
 */
export function Form<TInput extends FieldValues, TOutput extends FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: FormProps<TInput, TOutput>) {
  return (
    <FormProvider {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
}
