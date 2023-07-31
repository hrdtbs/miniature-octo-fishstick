"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function deleteUserAction(formData: FormData) {
  const id = formData.get("id") as string;
  await sql`
        DELETE FROM users WHERE id = ${id};
    `;
  revalidatePath("/");
}

export async function updateUserAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const id = formData.get("id") as string;
  await sql`
      UPDATE users SET name = ${name}, email = ${email} WHERE id = ${id};
    `;
}

export async function insertUserAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const image = `https://api.dicebear.com/6.x/identicon/png?seed=${name}`;
  await sql`
    INSERT INTO users (name, email, image)
    VALUES (${name}, ${email}, ${image})
    ON CONFLICT (email) DO NOTHING;
  `;
  revalidatePath("/");
}
