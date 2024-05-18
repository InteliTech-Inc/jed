"use client";

import { RotatingLines } from "react-loader-spinner";

export default function Spinner() {
  return (
    <span className="mr-1">
      <RotatingLines width="20" strokeColor="#fff" />
    </span>
  );
}
