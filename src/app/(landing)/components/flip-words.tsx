import React from "react";
import { FlipWords } from "@/components/ui/flip-words";

export function FlipWord() {
  const words = ["fastest", "beautiful", "modern"];

  return (
    <div className="flex justify-center items-center px-4">
      <div className="text-5xl mx-auto font-normal leading-[4rem] ">
        JED is one of the <FlipWords words={words} />
        growing and most rapidly evolving platform on earth.
      </div>
    </div>
  );
}
