"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function deleteUserAction(email: string) {
  await sql`
        DELETE FROM users WHERE email = ${email};
    `;
  revalidatePath("/");
}

export async function updateUserActionByEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  await sql`
      UPDATE users SET name = ${name} WHERE email = ${email};
    `;
}
