"use client";

import { Button } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <div>
      <Button variant={"link"} onClick={() => router.back()}>
        <ArrowLeftIcon size={14} />
        Go Back
      </Button>
    </div>
  );
}
