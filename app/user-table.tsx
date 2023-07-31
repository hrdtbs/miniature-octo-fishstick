import { sql } from "@vercel/postgres";
import { timeAgo } from "@/lib/utils";
import RefreshButton from "@/components/refresh-button";
import { seed } from "@/lib/seed";
import { deleteUserAction, updateUserAction } from "@/app/actions";
import SubmitButton from "@/components/submit-button";
import Image from "next/image";

export default async function UserTable() {
  let data;
  let startTime = Date.now();

  try {
    data = await sql`SELECT * FROM users`;
  } catch (e: any) {
    if (e.message === `relation "users" does not exist`) {
      console.log(
        "Table does not exist, creating and seeding it with dummy data now..."
      );
      // Table is not created yet
      await seed();
      startTime = Date.now();
      data = await sql`SELECT * FROM users`;
    } else {
      throw e;
    }
  }
  const { rows: users } = data;
  const duration = Date.now() - startTime;

  return (
    <div>
      <div>
        <p>
          Fetched {users.length} users in {duration}ms
        </p>
        <p>
          <RefreshButton />
        </p>
      </div>
      <div>
        {users.map((user) => {
          return (
            <section key={user.id}>
              <div>
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={48}
                    height={48}
                  />
                ) : null}

                <form action={updateUserAction}>
                  <input type="text" defaultValue={user.name} name="name" />
                  <input type="email" defaultValue={user.email} name="email" />
                  <input type="hidden" value={user.id} readOnly name="id" />
                  <SubmitButton>Update</SubmitButton>
                  <SubmitButton formAction={deleteUserAction}>
                    Delete
                  </SubmitButton>
                </form>
              </div>
              <p>
                <time dateTime={user.createdAt.toISOString()}>
                  Created at {timeAgo(user.createdAt)}
                </time>
              </p>
            </section>
          );
        })}
      </div>
    </div>
  );
}
