import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldValues, type UseFormProps } from "react-hook-form";
import type { z } from "zod";

export type UseZodFormOptions<TInput extends FieldValues, TOutput extends FieldValues> = Omit<
  UseFormProps<TInput, unknown, TOutput>,
  "resolver"
>;

/**
 * `useForm` bound to a Zod schema, with the project defaults: validate a field once it is
 * touched, then on every change, and focus the first invalid field on submit.
 */
export function useZodForm<TInput extends FieldValues, TOutput extends FieldValues>(
  schema: z.ZodType<TOutput, TInput>,
  options?: UseZodFormOptions<TInput, TOutput>,
) {
  return useForm<TInput, unknown, TOutput>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    shouldFocusError: true,
    ...options,
  });
}
