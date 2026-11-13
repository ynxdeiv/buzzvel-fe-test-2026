# Forms — React Hook Form + Zod

- Schema in `src/lib/schemas/` with Zod; type inferred with `z.infer`. RHF uses `zodResolver`.
- Use a reusable `ui/FormField` (label + input + error) primitive. Every input has a visible `<label>`.
- Errors: `aria-invalid`, `aria-describedby` pointing to the error message, focus the first invalid field on
  submit (RHF `shouldFocusError`).
- Enter submits the form.
- Submission is mocked (simulated async). Show loading (disabled button), success and error states.
