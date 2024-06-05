import React from "react";
import VoteNomineePage from "./components/vote_nominee";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: "Voting",
  description: "Vote for your favourite nominee",
};

export default async function Voting({}: Props) {
  return <VoteNomineePage />;
}
