import { Suspense } from "react";
import Spinner from "@/components/spinner";
import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import { DataTable, PayoutResponse } from "./components/data_table";
import { columns } from "./components/columns";
export default async function AdminPayoutsPage() {
  const db = dbServer(cookies);

  // Fetch all requested payouts
  const { data: payouts } = await db
    .from("payouts")
    .select("*")
    .eq("is_payout_request", true);

  // Fetch events from which payouts are available
  const { data: events } = await db.from("events").select("*");

  // Create a DataTable with the transformed payout
  const transformedPayouts = payouts?.map((payout) => {
    const event = events?.find((event) => event.id === payout?.event_id!);
    return {
      id: String(payout.id),
      amount: String(payout.amount),
      payment_method: payout.payment_method,
      account_number: payout.account_number,
      account_name: payout.account_name,
      provider: payout.provider,
      created_at: new Date(payout.created_at).toLocaleString(),
      updated_at: new Date(payout.created_at).toLocaleString(),
      transaction_status: payout.is_paid,
      event_name: event?.name,
    };
  });

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
        <DataTable
          data={transformedPayouts as unknown as PayoutResponse[]}
          columns={columns}
        />
      </Suspense>
    </section>
  );
}
