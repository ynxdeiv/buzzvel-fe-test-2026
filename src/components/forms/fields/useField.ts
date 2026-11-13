import { useId } from "react";
import { useFormContext, useFormState, type FieldPath, type FieldValues } from "react-hook-form";

/**
 * Connects a field to the surrounding `<Form>`: a unique id, the RHF registration and the
 * current Zod error message. Subscribes to this field only, so typing elsewhere doesn't re-render it.
 */
export function useField<T extends FieldValues>(name: FieldPath<T>) {
  const id = useId();
  const { register, getFieldState } = useFormContext<T>();
  const formState = useFormState<T>({ name });

  return {
    id,
    registration: register(name),
    error: getFieldState(name, formState).error?.message,
  };
}
