import PayoutTable from "./components/payout_table";
import { Suspense } from "react";
import Spinner from "@/components/spinner";
import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";
export default async function AdminPayoutsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const db = dbServer(cookies);

  return (
    <section className="p-4">
      <section className=" mb-4 max-w-screen-sm">
        <p className=" text-4xl text-neutral-700 mb-2 font-semibold">
          Payout Requests
        </p>
        <p className=" text-neutral-600">
          View and manage payout requests for all the published events.
        </p>
      </section>

      <Suspense
        fallback={
          <div className=" w-full grid place-content-center">
            <Spinner />
          </div>
        }
      >
        <PayoutTable />
      </Suspense>
    </section>
  );
}
