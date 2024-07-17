import React, { Suspense } from "react";
import AddNominees from "./components/add_nominees";
import { cookies } from "next/headers";
import { dbServer } from "@/lib/supabase";
import GetNominees from "./components/get_nominees";
import Spinner from "@/components/spinner";

export default async function AdminNominee({
  params: { id },
}: {
  params: { id: string };
}) {
  const db = dbServer(cookies);
  const {
    data: { user },
  } = await db.auth.getUser();

  const { data: categories } = await db
    .from("events")
    .select(`*, categories(category_name, event_id, id)`)
    .eq("user_id", user?.id!);

  // Get Nominees
  const { data: nominees } = await db
    .from("nominees")
    .select(
      `*, 
    categories:category_id(*)
    `
    )
    .eq("user_id", user?.id!)
    .eq("event_id", id);

  // Get Votes and its nominees
  const { data: votes } = await db.from("voting").select(`*, nominees(*)`);

  // Get only the count and nominee_id props
  const votesCount = votes?.map((vote) => ({
    count: vote.count,
    nominee_id: vote.nominee_id,
  }));

  return (
    <section className="py-8 px-3 md:px-6 h-fit">
      <div className="flex md:items-center flex-col md:flex-row gap-4 justify-between">
        <div className="">
          <p className="text-4xl text-neutral-700 mb-2 font-semibold">
            Your Nominees
          </p>
          <p className="text-neutral-600">
            Add nominees to the categories you have created.
          </p>
        </div>
        <AddNominees data={categories} user_id={user?.id} />
      </div>
      <Suspense
        fallback={
          <div className=" w-full grid place-content-center">
            <Spinner />
          </div>
        }
      >
        <GetNominees nominees={nominees} votes={votesCount} />
      </Suspense>
    </section>
  );
}
