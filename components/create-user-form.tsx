import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export default function CreateUserForm() {
  async function insertUserAction(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    await sql`
              INSERT INTO users (name, email, image)
              VALUES (${name}, ${email}, 'https://pbs.twimg.com/profile_images/1576257734810312704/ucxb4lHy_400x400.jpg')
              ON CONFLICT (email) DO NOTHING;
          `;
    revalidatePath("/");
  }

  return (
    <form action={insertUserAction}>
      <input type="text" placeholder="Your Name" name="name" />
      <input type="email" placeholder="your-email@gmail.com" name="email" />
      <button>Insert</button>
    </form>
  );
}
