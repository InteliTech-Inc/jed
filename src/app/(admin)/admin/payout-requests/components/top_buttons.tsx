"use client";
import { Clipboard, DownloadIcon, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format, formatDate } from "date-fns";
import { exportToCSV } from "@/lib/utils";

import { useState } from "react";
import { PayoutResponse } from "./data_table";

export default function TopButtons({ results }: { results: PayoutResponse[] }) {
  const handleDownloadData = () => {
    if (!results.length) {
      return toast.error("No data to download");
    }
    const data = results!.map((r) => {
      return {
        "Full NAME": r.event_name!,
        AMOUNT: r?.amount!,
        "PAYMENT METHOD": r.payment_method!,
        "ACCOUNT NUMBER": r.account_number!,
        "TRANSACTION STATUS":
          r.transaction_status === true ? "paid" : "unpaid"!,
        "SUBMITTED ON": format(new Date(r.created_at!), "dd/MM/yyyy"),
      };
    });
    exportToCSV(
      data,
      `Payout_Results_${formatDate(new Date().toString(), "dd/MM/yyyy")}`
    );
    toast.success("Payouts results exported successfully");
  };
  return (
    <div className="flex items-center  w-full lg:w-fit justify-end gap-x-2 md:gap-x-4">
      <Button className=" gap-2" onClick={handleDownloadData}>
        <DownloadIcon size={14} />
        Download results
      </Button>
    </div>
  );
}
