"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      variant={"link"}
      type="button"
      className="flex py-4 items-center gap-2 mb-6"
      onClick={() => router.back()}
    >
      <ArrowLeftIcon size={14} />
      Back
    </Button>
  );
}
