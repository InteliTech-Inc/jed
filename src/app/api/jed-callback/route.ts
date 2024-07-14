import { createOrUpdateVote } from "@/lib/server_endpoints";
import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const db = dbServer(cookies);
  const incoming = await req.json();

  try {
    if (
      incoming.status === "success" &&
      incoming.trans_id &&
      incoming.foreignID
    ) {
      const { data: getData } = await db
        .from("transactions")
        .select("*")
        .eq("trans_id", incoming.trans_id)
        .single();

      const voting_payloads = {
        nominee_id: getData?.nominee_id,
        event_id: getData?.event_id,
        count: getData?.count,
        amount_payable: getData?.amount_payable,
      };
      await createOrUpdateVote(voting_payloads);
    }
    // Let's update or create the transaction
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json(incoming);
}
