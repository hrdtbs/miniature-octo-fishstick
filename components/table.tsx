import { sql } from "@vercel/postgres";
import { timeAgo } from "@/lib/utils";
import Image from "next/image";
import RefreshButton from "./refresh-button";
import { seed } from "@/lib/seed";
import DeleteUserButton from "./delete-user-button";
import UserCard from "./user-card";

export default async function Table() {
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
        <RefreshButton />
      </div>
      <div>
        {users.map((user) => {
          return (
            <div key={user.id}>
              <div>
                <UserCard
                  name={user.name}
                  email={user.email}
                  image={user.image}
                  id={user.id}
                />
                <DeleteUserButton id={user.id} />
              </div>
              <p>{timeAgo(user.createdAt)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
