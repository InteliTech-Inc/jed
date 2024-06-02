"use client";

import { RotatingLines } from "react-loader-spinner";

export default function Spinner({
  color = "rgb(115, 115,115)",
}: {
  color?: string;
}) {
  return (
    <span className="mr-1">
      <RotatingLines width="18" strokeColor={color} />
    </span>
  );
}
