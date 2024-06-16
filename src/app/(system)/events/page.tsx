import { Button } from "@/components/ui/button";
import { dbServer } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { cookies } from "next/headers";
import EventsCard from "./components/events_card";
import Spinner from "@/components/rotating_lines";

async function EventsPage() {
  const db = dbServer(cookies);

  const {
    data: { user },
  } = await db.auth.getUser();

  const { data: events } = await db

    .from("events")
    .select("*")
    .eq("user_id", user?.id!);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center gap-5">
        <div>
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Your Events
          </h3>
        </div>
        <div>
          <Link href={"/events/create"}>
            <Button>Create new Event</Button>
          </Link>
        </div>
      </div>
      <br />
      <div>
        <Suspense
          fallback={
            <div className=" w-full grid place-content-center">
              <Spinner />
            </div>
          }
        >
          <EventsCard id={user?.id!} />
        </Suspense>
      </div>
    </div>
  );
}

export default EventsPage;
