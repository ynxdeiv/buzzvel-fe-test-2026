"use client";

import { useFormState } from "react-hook-form";
import { Button, type ButtonProps } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

export type SubmitButtonProps = Omit<ButtonProps, "type"> & {
  /** Visible label while the form is submitting (e.g. "Sending…"). */
  pendingLabel: string;
};

/**
 * Submit button of the surrounding `<Form>`, with a spinner while submitting.
 * Uses `aria-disabled` instead of `disabled` so keyboard focus stays on the button during the request.
 */
export function SubmitButton({ pendingLabel, children, onClick, ...props }: SubmitButtonProps) {
  const { isSubmitting } = useFormState();

  return (
    <Button
      type="submit"
      aria-disabled={isSubmitting || undefined}
      onClick={(event) => {
        if (isSubmitting) event.preventDefault();
        onClick?.(event);
      }}
      {...props}
    >
      {isSubmitting ? (
        <>
          <Spinner />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
