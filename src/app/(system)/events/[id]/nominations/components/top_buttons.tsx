"use client";
import { Clipboard, DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { NominationsResponse } from "@/types/types";
import { format } from "date-fns";
import { exportToCSV } from "@/lib/utils";

export default function TopButtons({
  url,
  results,
}: {
  url: string;
  results: NominationsResponse[];
}) {
  const handleCopyLink = async () => {
    if (navigator.share) {
      await navigator.share({
        url,
        title: "JED | Nominations",
        text: "Fill this form to add a new nomination",
      });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Nominations forms link copied to clipboard");
    }
  };

  const handleDownloadData = () => {
    const data = results!.map((r) => {
      return {
        "Full Name": r.full_name!,
        EMAIL: r?.email!,
        CATEGORY: r.categories?.category_name!,
        "PHONE NUMBER": r.phone!,
        REASON: r.reasons!,
        "SUBMITTED AT": format(new Date(r.created_at!), "dd/MM/yyyy"),
      };
    });
    exportToCSV(data, "Nominations Results");
    toast.success("Nominations results exported successfully");
  };
  return (
    <div className="flex items-center justify-end gap-x-4">
      <Button onClick={handleCopyLink} variant={"secondary"} className=" gap-2">
        <Clipboard size={14} />
        Share forms link
      </Button>
      <Button className=" gap-2" onClick={handleDownloadData}>
        <DownloadIcon size={14} />
        Download results
      </Button>
    </div>
  );
}
