import React from "react";
import Guide from "./components/guide";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guide",
};

export default function GuidePage() {
  return (
    <>
      <Guide />
    </>
  );
}
