"use client";

import { useTransition } from "react";
import { deleteUserAction } from "./actions";

interface Props {
  email: string;
}

export default function DeleteUserButton({ email }: Props) {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          deleteUserAction(email);
        });
      }}
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
