"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

interface Props {
  children: React.ReactNode;
}

export default function SubmitButton({ children }: Props) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Pending..." : children}
    </button>
  );
}
