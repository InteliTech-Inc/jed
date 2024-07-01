"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import NomineeCard from "./nominee_card";
import { db } from "@/lib/supabase";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

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
  const url = usePathname();
  const segments = url.split("/");
  const id = segments[segments.length - 2];

  const [searchQuery, setSearchQuery] = React.useState("");

  const router = useRouter();

  // Let get the nominees id and then add voting logic
  async function handleNomineeVoting(nomineeId: string) {
    // Check if the nominee has been voted for
    const { data: votes, error } = await db
      .from("voting")
      .select("*")
      .eq("nominee_id", nomineeId);

    if (error) {
      console.error("Error fetching votes:", error);
      return;
    }

    if (votes && votes.length > 0) {
      // If the nominee has been voted for, increment the vote count
      const { error: updateError } = await db
        .from("voting")
        .update({ count: votes[0].count! + 1 })
        .eq("nominee_id", nomineeId);

      if (updateError) {
        console.error("Error updating vote count:", updateError);
      }
    } else {
      const { error: insertError } = await db
        .from("voting")
        .insert({ nominee_id: nomineeId, count: 1 });

      if (insertError) {
        console.error("Error inserting new vote:", insertError);
      }
    }
  }

  // Realtime for nominees fetch
  useEffect(() => {
    const nominee_channel = db
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
      db.removeChannel(nominee_channel);
    };
  }, [nominees]);

  // Realtime for votes
  useEffect(() => {
    const voting_channel = db
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
      db.removeChannel(voting_channel);
    };
  }, [votes]);

  const filteredNominees = nominees.filter((nominee: Nominee) => {
    return nominee.categories.category_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <div className="flex md:justify-end w-full">
        <div className="relative my-2">
          <SearchIcon
            size={18}
            className="absolute left-4 top-[0.6rem] text-gray-500"
          />
          <Input
            placeholder="Search nominee by category"
            className="md:w-[18rem] px-10"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </div>
      </div>
      <div
        className={`${
          filteredNominees.length === 0
            ? "justify-center items-center"
            : "justify-start items-start"
        } flex w-full h-screen gap-4 mt-6 flex-wrap`}
      >
        {filteredNominees.length === 0 ? (
          <section className="flex flex-col items-center justify-center">
            <Image
              src={"/images/no-docs.svg"}
              width={200}
              height={200}
              alt={"No nominees"}
            />
            <p className="text-center text-gray-600">There is no nominees.</p>
          </section>
        ) : (
          filteredNominees.length > 0 &&
          filteredNominees
            .filter((nominee: Nominee) => nominee?.event_id === id)
            .map((nominee: Nominee) => (
              <NomineeCard key={nominee.id} nominee={nominee} votes={votes} />
            ))
        )}
      </div>
    </>
  );
}

//
