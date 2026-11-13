import { useCallback, useRef } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import type { FormActionResult } from "@/lib/forms/createFormAction";
import type { ToastCopy } from "@/types/content";

export type ActionSubmitMessages = {
  success: ToastCopy;
  error: ToastCopy;
};

/**
 * Submit handler that sends the raw form values to a Server Action built with `createFormAction`:
 * - success → reset the form and show a success toast;
 * - server-side Zod errors → shown inline on their fields, focusing the first one;
 * - anything else (server or network failure) → error toast, the values are kept.
 * Concurrent submits are ignored while a request is in flight.
 */
export function useActionSubmit<TInput extends FieldValues, TOutput extends FieldValues>(
  form: UseFormReturn<TInput, unknown, TOutput>,
  action: (input: TInput) => Promise<FormActionResult<TOutput>>,
  messages: ActionSubmitMessages,
) {
  const inFlight = useRef(false);

  return useCallback(async () => {
    // Enter in a field while a request is running must not send the message twice.
    if (inFlight.current) return;
    inFlight.current = true;
    // A network failure (action never reached) is handled like a server failure.
    const result = await action(form.getValues())
      .catch((): FormActionResult<TOutput> => ({ ok: false }))
      .finally(() => {
        inFlight.current = false;
      });

    if (result.ok) {
      form.reset();
      toast.success(messages.success.title, { description: messages.success.description });
      return;
    }

    const invalid = Object.entries<string[] | undefined>(result.fieldErrors ?? {}).flatMap(([name, errors]) =>
      errors?.[0] ? [{ name: name as Path<TInput>, message: errors[0] }] : [],
    );

    if (invalid.length > 0) {
      invalid.forEach(({ name, message }) => form.setError(name, { message }));
      form.setFocus(invalid[0].name);
      return;
    }

    toast.error(messages.error.title, { description: messages.error.description });
  }, [form, action, messages]);
}
