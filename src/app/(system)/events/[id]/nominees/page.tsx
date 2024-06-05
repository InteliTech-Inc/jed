import React, { Suspense } from "react";
import AddNominees from "./components/add_nominees";
import { cookies } from "next/headers";
import { dbServer } from "@/lib/supabase";
import GetNominees from "./components/get_nominees";
import Spinner from "@/components/rotating_lines";

export default async function AdminNominee() {
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
    .eq("user_id", user?.id!);

  // Get Votes and its nominees
  const { data: votes } = await db.from("voting").select(`*, nominees(*)`);

  // Get only the count and nominee_id props
  const votesCount = votes?.map((vote) => ({
    count: vote.count,
    nominee_id: vote.nominee_id,
  }));

  return (
    <section className="py-8 px-3 md:px-6 ">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Your Nominees</h1>
          <p className="text-slate-500">
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
