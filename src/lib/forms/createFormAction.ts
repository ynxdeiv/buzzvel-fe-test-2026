import "server-only";
import { z } from "zod";

/** Zod's flattened field errors: every message per field, keyed by field name. */
export type FormFieldErrors<TValues> = Partial<Record<keyof TValues, string[]>>;

export type FormActionResult<TValues> = { ok: true } | { ok: false; fieldErrors?: FormFieldErrors<TValues> };

/**
 * Turns a Zod schema + handler into a Server Action. The raw input is never trusted:
 * it is parsed on the server, invalid fields come back as Zod messages and the handler
 * only ever receives parsed data. Unexpected errors are logged, never leaked to the client.
 */
export function createFormAction<TInput, TOutput>(
  schema: z.ZodType<TOutput, TInput>,
  handler: (data: TOutput) => void | Promise<void>,
) {
  return async (input: TInput): Promise<FormActionResult<TOutput>> => {
    const parsed = schema.safeParse(input);
    if (!parsed.success) {
      return { ok: false, fieldErrors: z.flattenError(parsed.error).fieldErrors };
    }

    try {
      await handler(parsed.data);
      return { ok: true };
    } catch (error) {
      console.error("[form action] handler failed", error);
      return { ok: false };
    }
  };
}
