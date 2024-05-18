"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import NomineeCard from "./nominee_card";

type Nominee = {
  id: string;
  full_name: string;
  category: string;
  code: string;
  img_url: string;
};

export default function GetNominees({ nominees, votes }: any) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "nominees",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  // Realtime for votes
  useEffect(() => {
    const channel = supabase
      .channel("realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "voting",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  // Let get the nominees id and then add voting logic
  async function handleNomineeVoting(nomineeId: string) {
    // Check if the nominee has been voted for
    const { data: votes, error } = await supabase
      .from("voting")
      .select("*")
      .eq("nominee_id", nomineeId);

    if (error) {
      console.error("Error fetching votes:", error);
      return;
    }

    if (votes && votes.length > 0) {
      // If the nominee has been voted for, increment the vote count
      const { error: updateError } = await supabase
        .from("voting")
        .update({ count: votes[0].count + 1 })
        .eq("nominee_id", nomineeId);

      if (updateError) {
        console.error("Error updating vote count:", updateError);
      }
    } else {
      const { error: insertError } = await supabase
        .from("voting")
        .insert({ nominee_id: nomineeId, count: 1 });

      if (insertError) {
        console.error("Error inserting new vote:", insertError);
      }
    }
  }

  return (
    <div className="flex items-start justify-start ">
      <div className="grid grid-cols-1 md:flex items-start justify-start px-2  flex-wrap gap-4 mt-4">
        {nominees.length === 0 && (
          <h1 className="text-2xl font-bold">
            There are no nominees available at the moment.
          </h1>
        )}
        {nominees.map((nominee: Nominee) => (
          <div key={nominee.id}>
            <NomineeCard
              nominee={nominee}
              handleNomineeVoting={handleNomineeVoting}
              votes={votes}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
