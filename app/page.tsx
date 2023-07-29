import { Suspense } from "react";
import Table from "@/components/table";
import TablePlaceholder from "@/components/table-placeholder";

export const runtime = "edge";
export const preferredRegion = "home";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<TablePlaceholder />}>
        <Table />
      </Suspense>
    </main>
  );
}
