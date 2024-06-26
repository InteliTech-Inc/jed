import React from "react";
import { FlipWords } from "@/components/ui/flip-words";

export function FlipWord() {
  const words = ["nominations", "voting", "ticketing"];

  return (
    <div className="flex justify-center items-center px-4">
      <div className=" text-4xl leading-[1.5] lg:text-5xl mx-auto font-normal lg:leading-[4rem] ">
        JED offers the best solution by making the <FlipWords words={words} />
        process of your event smooth.
      </div>
    </div>
  );
}
