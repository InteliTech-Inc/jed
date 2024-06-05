import React from "react";
import CategoryNomineeCard from "./components/category_nominee";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: "Nominees",
};

export default function CategoryNominees({}: Props) {
  return <CategoryNomineeCard />;
}
