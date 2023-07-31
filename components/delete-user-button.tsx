"use client";

import { useTransition } from "react";
import { deleteUserAction } from "./actions";

interface DeleteUserButtonProps {
  id: string;
}

export default function DeleteUserButton(props: DeleteUserButtonProps) {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          deleteUserAction(props.id);
        });
      }}
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
