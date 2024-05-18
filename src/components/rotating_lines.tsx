"use client";

import { RotatingLines } from "react-loader-spinner";

export default function Spinner() {
  return (
    <span className="mr-1 text-inherit">
      <RotatingLines width="20" strokeWidth="3" />
    </span>
  );
}
