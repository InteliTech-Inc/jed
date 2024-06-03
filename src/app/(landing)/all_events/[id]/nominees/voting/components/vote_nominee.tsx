"use client";
import { db } from "@/lib/supabase";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

type Nominee = {
  category_id: string | null;
  full_name: string | null;
  img_url: string | null;
  code: string | null;
  event_id: string | null;
};

export default function VoteNomineePage({}: Props) {
  const [votingNominee, setVotingNominee] = useState<Nominee>();

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    async function GetNominees() {
      try {
        const { data, error } = await db
          .from("nominees")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;
        setVotingNominee(data!);
      } catch (error) {
        console.log("error", error);
      }
    }
    GetNominees();
  }, []);
  return <div>VoteNomineePage -{votingNominee?.full_name}</div>;
}
