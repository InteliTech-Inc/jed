"use client";
import { useParams } from "next/navigation";
import React from "react";
import NomineeCard from "./nominee_card";

type Nominee = {
  id: string;
  full_name: string;
  categories: {
    category_name: string;
  };
  code: string;
  img_url: string;
  event_id: string;
};

export default function GetNominees({ nominees, votes }: any) {
  const { id } = useParams();

  if (
    nominees.filter((nominee: Nominee) => nominee?.event_id === id).length === 0
  ) {
    return <p className="mt-2">No nominee has been added to this category</p>;
  }

  return (
    <section className="flex flex-col md:flex-row md:items-start md:justify-start">
      <div className="grid grid-cols-1 md:flex md:items-start md:justify-start px-2 flex-wrap  mt-4">
        {nominees
          .filter((nominee: Nominee) => nominee?.event_id === id)
          .map((nominee: Nominee) => (
            <NomineeCard key={nominee?.id} nominee={nominee} votes={votes} />
          ))}
      </div>
    </section>
  );
}

//
