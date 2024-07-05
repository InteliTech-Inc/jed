import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import { isEqual } from "date-fns";
import AnalyticsCards from "./components/analytics_cards";
import AnalyticsGraph from "./components/graph";
import { fetchEventsData } from "./helpers/fetch_event_data";
import { EventType } from "./components/dummy_data";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "This page provides an overview of key performance indicators and metrics for organizations",
};

export default async function Dashboard() {
  const db = dbServer(cookies);
  const { data, error } = await db.auth.getUser();

  const isFirstLogin = isEqual(
    data.user?.last_sign_in_at as string,
    data.user?.created_at as string
  );

  const userId = data.user?.id;

  const { data: events } = await db

    .from("events")
    .select("*")
    .eq("user_id", userId!)
    .eq("is_completed", true);

  const formattedEvents = await fetchEventsData(userId as string);

  return (
    <div className="min-h-screen w-full p-4 lg:px-6 bg-gray-50/30">
      <section className=" my-6">
        <p className=" text-2xl mb-2 font-semibold text-gray-800">
          Welcome {isFirstLogin ? "" : "back"},{" "}
          {data.user?.user_metadata.firstName} 👋
        </p>
        <p className=" text-gray-500">
          Here's what's happening with your account today.
        </p>
      </section>
      <section className=" my-8 ">
        {formattedEvents?.length === 0 ? (
          <div className=" flex items-center justify-center flex-col">
            <Image
              src={"/images/no-docs.svg"}
              alt="No-docs"
              width={200}
              height={200}
            />
            <p className="text-center">No data available yet.</p>
            <p> Data will display after activity begins</p>
          </div>
        ) : (
          <>
            <AnalyticsCards liveEvents={events} />
            <div className=" mt-8">
              <p className=" uppercase">Recent Activity</p>
              <section className=" ">
                <AnalyticsGraph events={formattedEvents as EventType[]} />
              </section>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
