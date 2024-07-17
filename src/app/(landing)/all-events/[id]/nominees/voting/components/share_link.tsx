"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
export default function ShareLink() {
  const handleCopyLink = async (url: string) => {
    await navigator.clipboard.writeText(url);
    toast.success("Voting link copied to clipboard");
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
      toast.success("Shortened url copied to clipboard", { id: toastId });
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
