"use client";
import { Clipboard, DownloadIcon, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { NominationsResponse } from "@/types/types";
import { format, formatDate } from "date-fns";
import { exportToCSV } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import axios from "@/lib/axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function TopButtons({
  url,
  results,
  event_name,
}: {
  url: string;
  results: NominationsResponse[];
  event_name?: string;
}) {
  const [open, setOpen] = useState(false);
  const [downloadableUrl, setDownloadableUrl] = useState(url);

  const handleCopyLink = async () => {
    if (navigator.share) {
      await navigator.share({
        url: downloadableUrl,
        title: "JED | Nominations",
        text: "Fill this form to add a new nomination",
      });
    } else {
      await navigator.clipboard.writeText(downloadableUrl);
      toast.success("Nominations forms link copied to clipboard");
    }
  };

  const handleShortenURL = async () => {
    const data = {
      url: url,
    };

    let toastId;
    toastId = toast.loading("Shortening URL...");

    try {
      const res = await axios.post("https://spoo.me/", data, {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });

      setDownloadableUrl(res.data.short_url);
      toast.success("URL shortened successfully", { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while shortening URL", { id: toastId });
    }
  };

  const handleDownloadData = () => {
    if (!results.length) {
      return toast.error("No data to download");
    }
    const data = results!.map((r) => {
      return {
        "Full Name": r.full_name!,
        EMAIL: r?.email!,
        CATEGORY: r.categories?.category_name!,
        "PHONE NUMBER": r.phone!,
        REASON: r.reasons!,
        "SUBMITTED ON": format(new Date(r.created_at!), "dd/MM/yyyy"),
      };
    });
    exportToCSV(
      data,
      `Nominations_Results_${formatDate(new Date().toString(), "dd/MM/yyyy")}`
    );
    toast.success("Nominations results exported successfully");
  };
  return (
    <div className="flex items-center justify-end gap-x-2 md:gap-x-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary" className=" gap-2">
            {" "}
            <LinkIcon size={14} />
            Generate forms link
          </Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle className=" text-left text-xl">
              Nominations forms link.
            </DialogTitle>
            <DialogDescription className=" text-left">
              Send out this link for people to nominate others for the different
              categories that you have added.
            </DialogDescription>
          </DialogHeader>
          <Input
            id="full_name"
            type="text"
            readOnly
            placeholder="Nominations forms URL"
            className="border border-accent focus:border-secondary focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-opacity-50 focus-visible:border-transparent"
            value={downloadableUrl}
          />
          <DialogFooter className=" gap-2">
            <Button onClick={handleCopyLink} className=" gap-2">
              <Clipboard size={14} />
              Share forms link
            </Button>
            <Button variant="secondary" onClick={handleShortenURL}>
              Shorten URL
            </Button>
          </DialogFooter>
        </DialogContent>
        <Button className=" gap-2" onClick={handleDownloadData}>
          <DownloadIcon size={14} />
          Download results
        </Button>
      </Dialog>
    </div>
  );
}
