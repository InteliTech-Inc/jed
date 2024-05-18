"use client";

import { RotatingLines } from "react-loader-spinner";

export default function Spinner({
  color = "rgb(115, 115,115)",
}: {
  color?: string;
}) {
  return (
    <span className="mr-1">
      <RotatingLines width="20" strokeColor={color} />
    </span>
  );
}
