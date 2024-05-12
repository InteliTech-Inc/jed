"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./button";
import { ArrowLeft } from "lucide-react";

function BackButton() {
  const router = useRouter();
  return (
    <div className="my-5">
      <Button variant={'link'} className="text-sm" onClick={() => router.back()}>
        <ArrowLeft size={14} />
        Go Back
      </Button>
    </div>
  );
}

export default BackButton;
