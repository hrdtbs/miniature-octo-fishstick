import { sql } from "@vercel/postgres";
import { timeAgo } from "@/lib/utils";
import Image from "next/image";
import RefreshButton from "./refresh-button";
import { seed } from "@/lib/seed";

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
        {users.map((user) => (
          <div key={user.name}>
            <div>
              <Image src={user.image} alt={user.name} width={48} height={48} />
              <div>
                <p>{user.name}</p>
                <p>{user.email}</p>
              </div>
            </div>
            <p>{timeAgo(user.createdAt)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
