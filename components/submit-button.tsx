"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  const { pending } = useFormStatus();

  return (
    <button {...props} type="submit" disabled={pending}>
      {pending ? "Pending..." : children}
    </button>
  );
}
