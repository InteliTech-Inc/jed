import Spinner from "@/components/rotating_lines";
import React from "react";

type Props = {};

export default function Loader({}: Props) {
  return (
    <div className="flex items-center py-28 justify-center">
      <Spinner />
    </div>
  );
}
