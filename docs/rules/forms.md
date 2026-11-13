# Forms — React Hook Form + Zod

## Validation: one Zod schema, both sides

- Schema in `src/lib/schemas/`; types with `z.input` / `z.output`. Messages live in the schema: start each
  field with a `min(1, "Please enter …")` check so empty and invalid fields get different messages.
- Client: `useZodForm(schema, options)` (`src/hooks/`) = `useForm` + `zodResolver`, `mode: "onTouched"`,
  `shouldFocusError`.
- Server: `createFormAction(schema, handler)` (`src/lib/forms/`) builds the Server Action. It `safeParse`s the
  raw input, returns `z.flattenError(...).fieldErrors` when invalid and only calls the handler with parsed data.
  Export it from a `"use server"` file in `src/lib/actions/`.
- `useActionSubmit(form, action, messages)` wires the two: success → reset + `toast.success`; server field
  errors → `setError` inline + focus the first one; any other failure → `toast.error` (values kept).

## Components — never call `register` in a feature form

- `components/forms/fields/`: `<Form form onSubmit>` (FormProvider + `<form noValidate>`), `<InputField name label>`,
  `<TextareaField name label maxLength>` (character counter), `<SubmitButton pendingLabel>` (disabled + spinner).
  They read the form through context, so a feature form is only a list of fields.
- They compose the library-agnostic `ui/` primitives: `FormField` (label + control + error, ARIA wiring),
  `Input`, `Textarea`, `FieldError` (icon + message), `Spinner`.
- Every input has a visible `<label>`; errors use `aria-invalid` + `aria-describedby`; invalid fields switch the
  focus ring to the error color. Field errors stay next to the field, never only in a toast.
- Copy (labels, placeholders, toasts) comes from `src/content/`; validation messages from the schema.

## Persistence

- Contact messages are stored in SQLite (`node:sqlite`, `src/lib/db/`, `server-only`, file in gitignored `data/`).
  Always use prepared statements with `?` placeholders, never string interpolation.
