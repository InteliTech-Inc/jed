import { getCachedData } from "@/lib/cache";
import { createOrUpdateVote } from "@/lib/server_endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const incoming = await req.json();

  try {
    if (
      incoming.status === "success" &&
      incoming.trans_id &&
      incoming.foreignID
    ) {
      // Check the cache for voting data
      const getData = await getCachedData(
        `transactionData-${incoming.trans_id}`
      );
      // console.log(
      //   "Attempting to retrieve data for trans_id:",
      //   incoming.trans_id
      // );
      // console.log("CALLBACK CACHED:", getData);

      if (getData) {
        const voting_payloads = {
          nominee_id: getData.nominee_id,
          event_id: getData.event_id,
          count: getData.count,
          amount_payable: getData.amount_payable,
        };

        await createOrUpdateVote(voting_payloads);
      } else {
        console.error(
          "Data not found in cache for trans_id:",
          incoming.trans_id
        );
      }
    }
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json(incoming);
}
