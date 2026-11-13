"use server";

import { saveContactMessage } from "@/lib/db/contactMessages";
import { createFormAction } from "@/lib/forms/createFormAction";
import { contactSchema } from "@/lib/schemas/contact";

/** Contact form Server Action: re-validates with the shared Zod schema, then stores in SQLite. */
export const sendContactMessage = createFormAction(contactSchema, saveContactMessage);
