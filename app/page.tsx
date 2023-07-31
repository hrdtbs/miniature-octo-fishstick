import { Suspense } from "react";
import UserTablePlaceholder from "@/app/user-table-placeholder";
import UserTable from "./user-table";
import CreateUserForm from "./create-user-form";

export const runtime = "edge";
export const preferredRegion = "home";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      <CreateUserForm />
      <Suspense fallback={<UserTablePlaceholder />}>
        <UserTable />
      </Suspense>
    </main>
  );
}
