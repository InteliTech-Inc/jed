import Spinner from "@/components/spinner";
import React from "react";

type Props = {};

export default function Loader({}: Props) {
  return (
    <div className="flex items-center py-28 justify-center">
      <Spinner />
    </div>
  );
}
