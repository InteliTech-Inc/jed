"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
export default function ShareLink() {
  const handleCopyLink = async (url: string) => {
    if (navigator.share) {
      await navigator.share({
        url: url,
        title: "JED | Voting",
        text: "Vote for a nominee",
      });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  const handleShortenURL = async (urlToShorten: string) => {
    const data = {
      url: urlToShorten,
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
      toast.success("URL shortened successfully", { id: toastId });

      const url = res.data.short_url;
      await handleCopyLink(url);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while shortening URL", { id: toastId });
    }
  };

  return (
    <Button
      onClick={async () => {
        await handleShortenURL(window.location.href);
      }}
    >
      Share link
    </Button>
  );
}
