"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

interface SubmitButtonProps {
  children: React.ReactNode;
}

export default function SubmitButton({ children }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Pending..." : children}
    </button>
  );
}
