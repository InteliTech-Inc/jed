import React from "react";
import CategoryNomineeCard from "./components/category_nominee";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: "Nominees",
  description: "Nominees for the category",
};

export default function CategoryNominees({}: Props) {
  return <CategoryNomineeCard />;
}
