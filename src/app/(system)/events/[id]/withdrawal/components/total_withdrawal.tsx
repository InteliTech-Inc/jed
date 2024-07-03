"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function TotalWithdrawal() {
  const [balance, setBalance] = useState(0);
  const supabase = createClientComponentClient();
  const { id } = useParams();

  useEffect(() => {
    async function GetTotal() {
      const { data } = await supabase
        .from("withdrawals")
        .select("amount")
        .eq("event_id", id);

      const totals = data
        ?.map((total) => total.amount)
        .reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0);
      setBalance(totals);
    }
    GetTotal();
  }, []);
  return (
    <div className=" flex items-center justify-between lg:block border-secondary border bg-accent/20 rounded-lg p-4">
      <p className=" text-sm text-neutral-600">Total Withdrawals:</p>
      <h3 className=" font-semibold text-secondary text-xl">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "GHC",
        }).format(Number(balance))}
      </h3>
    </div>
  );
}
