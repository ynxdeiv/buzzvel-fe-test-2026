"use client";

import { Form } from "@/components/forms/fields/Form";
import { InputField } from "@/components/forms/fields/InputField";
import { SubmitButton } from "@/components/forms/fields/SubmitButton";
import { TextareaField } from "@/components/forms/fields/TextareaField";
import { useActionSubmit } from "@/hooks/useActionSubmit";
import { useZodForm } from "@/hooks/useZodForm";
import { sendContactMessage } from "@/lib/actions/contact";
import { contactSchema, QUESTION_MAX_LENGTH, type ContactFormInput } from "@/lib/schemas/contact";
import { cn } from "@/lib/utils";
import type { ContactFormCopy } from "@/types/content";

export type ContactFormProps = {
  copy: ContactFormCopy;
  className?: string;
};

/** Contact form: Zod rules in `contactSchema`, saved by the `sendContactMessage` Server Action. */
export function ContactForm({ copy, className }: ContactFormProps) {
  const form = useZodForm(contactSchema, { defaultValues: { name: "", email: "", question: "" } });
  const onSubmit = useActionSubmit(form, sendContactMessage, copy.toast);

  return (
    <Form form={form} onSubmit={onSubmit} className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col gap-5">
        <InputField<ContactFormInput> name="name" autoComplete="name" {...copy.fields.name} />
        <InputField<ContactFormInput>
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          {...copy.fields.email}
        />
        <TextareaField<ContactFormInput> name="question" maxLength={QUESTION_MAX_LENGTH} {...copy.fields.question} />
      </div>

      <SubmitButton fullWidth pendingLabel={copy.submit.pendingLabel}>
        {copy.submit.label}
      </SubmitButton>
    </Form>
  );
}
