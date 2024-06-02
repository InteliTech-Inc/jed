"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function TotalWithdrawal() {
  const [balance, setBalance] = useState(0);
  const supabase = createClientComponentClient();
  const url = usePathname();
  const segments = url.split("/");
  const eventId = segments[segments.length - 2];

  //   let's fetch the total amount of withdrawal for this event and use the reduce method to accumulate its figure
  useEffect(() => {
    async function GetTotal() {
      const { data } = await supabase
        .from("withdrawals")
        .select("amount")
        .eq("event_id", eventId);

      const totals = data
        ?.map((total) => total.amount)
        .reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0);
      setBalance(totals);
    }
    GetTotal();
  }, []);
  return (
    <div className="text-center text-neutral-600 font-bold text-2xl mt-10 text-2xl">
      <h1>Total Withdrawals:</h1>
      <h3>
        GHS{" "}
        {balance.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </h3>
    </div>
  );
}
