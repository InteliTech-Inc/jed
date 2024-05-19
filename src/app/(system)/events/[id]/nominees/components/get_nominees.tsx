"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import NomineeCard from "./nominee_card";

type Nominee = {
  id: string;
  full_name: string;
  category: string;
  code: string;
  img_url: string;
  event_id: string;
};

export default function GetNominees({ nominees, votes }: any) {
  const supabase = createClientComponentClient();

  const url = usePathname();
  const segments = url.split("/");
  const id = segments[segments.length - 2];

  const router = useRouter();

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

  // Realtime for nominees fetch
  useEffect(() => {
    const nominee_channel = supabase
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
          console.log("Nominee channel updated");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(nominee_channel);
    };
  }, [supabase, router, nominees]);

  // Realtime for votes
  useEffect(() => {
    const voting_channel = supabase
      .channel("realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "voting",
        },
        () => {
          console.log("Votes channel updated");
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(voting_channel);
    };
  }, [supabase, router, votes]);

  return (
    <section className="flex flex-col md:flex-row md:items-start md:justify-start">
      <div className="grid grid-cols-1 md:flex md:items-start md:justify-start px-2 flex-wrap  mt-4">
        {/* Check if particular event has no nominee*/}
        {nominees.filter((nominee: Nominee) => nominee.event_id === id)
          .length === 0 && (
          <div className="w-full flex items-center justify-center">
            <p className="text-center text-lg text-slate-500">
              No nominee has been added to this category
            </p>
          </div>
        )}

        {nominees
          .filter((nominee: Nominee) => nominee.event_id === id)
          .map((nominee: Nominee) => (
            <div key={nominee.id} className="md:mr-4 md:mb-4">
              <NomineeCard
                nominee={nominee}
                handleNomineeVoting={handleNomineeVoting}
                votes={votes}
              />
            </div>
          ))}
      </div>
    </section>
  );
}
