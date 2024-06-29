"use client";
import { DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { VotingDataResponse } from "@/types/types";
import { exportToCSV } from "@/lib/utils";
import { formatDate } from "date-fns";
export default function TopButtons({
  results,
}: {
  results: VotingDataResponse[];
}) {
  const handleDownloadData = () => {
    if (!results.length) {
      return toast.error("No data to download");
    }
    const data = results!.map((r) => {
      return {
        "Full Name": r.full_name!,
        EMAIL: r.email || "N/A",
        CATEGORY: r.category,
        "PHONE NUMBER": r.phone || "N/A",
        "NUMBER OF VOTES": r.number_of_votes,
        "NOMINEE CODE": r.code,
      };
    });
    exportToCSV(
      data,
      `Voting_Results_${formatDate(new Date().toString(), "dd/MM/yyyy")}`
    );
    toast.success("Voting results exported successfully");
  };
  return (
    <div className="flex items-center justify-end gap-x-4">
      <Button className=" gap-2" onClick={handleDownloadData}>
        <DownloadIcon size={14} />
        Download results
      </Button>
    </div>
  );
}
