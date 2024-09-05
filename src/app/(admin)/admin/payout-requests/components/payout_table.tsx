import { DataTable, PayoutResponse } from "./data_table";
import { columns } from "./columns";
import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";

export default async function PayoutTable() {
  const db = dbServer(cookies);

  // Fetch all requested payouts
  const { data: payouts } = await db
    .from("payouts")
    .select("*")
    .eq("is_payout_request", true);

  // Fetch events from which payouts are available
  const { data: events } = await db.from("events").select("*");

  // Create a DataTable with the transformed payouts
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
    <div>
      <DataTable
        data={transformedPayouts as unknown as PayoutResponse[]}
        columns={columns}
      />
    </div>
  );
}
