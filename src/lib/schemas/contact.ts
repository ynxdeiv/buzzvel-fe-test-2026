import { z } from "zod";

export const QUESTION_MAX_LENGTH = 1000;

/**
 * Single source of truth for the contact form rules: the browser validates with it through
 * `useZodForm`, the Server Action validates the raw request again through `createFormAction`.
 * The first failing check of each field is the message the user sees.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .min(2, "Your name looks too short.")
    .max(100, "Please keep your name under 100 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .max(254, "This email is too long.")
    .pipe(z.email("This email doesn’t look right — try name@example.com.")),
  question: z
    .string()
    .trim()
    .min(1, "Please write your question.")
    .min(10, "Add a little more detail (at least 10 characters).")
    .max(QUESTION_MAX_LENGTH, `Please keep it under ${QUESTION_MAX_LENGTH} characters.`),
});

export type ContactFormInput = z.input<typeof contactSchema>;
export type ContactFormValues = z.output<typeof contactSchema>;
