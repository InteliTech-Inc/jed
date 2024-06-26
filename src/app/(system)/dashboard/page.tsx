import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import { isEqual } from "date-fns";
import AnalyticsCards from "./components/analytics_cards";
import AnalyticsGraph from "./components/graph";

export default async function Dashboard() {
  const db = dbServer(cookies);
  const user = await db.auth.getUser();

  const isFirstLogin = isEqual(
    user.data.user?.last_sign_in_at as string,
    user.data.user?.created_at as string
  );

  return (
    <div className="min-h-screen w-full p-4 lg:px-6 bg-gray-50/30">
      <section className=" my-6">
        <p className=" text-2xl mb-2 font-semibold text-gray-800">
          Welcome {isFirstLogin ? "" : "back"},{" "}
          {user.data.user?.user_metadata.firstName} 👋
        </p>
        <p className=" text-gray-500">
          Here's what's happening with your account today.
        </p>
      </section>
      <section className=" my-8 ">
        <AnalyticsCards />
        <div className=" mt-8">
          <p className=" uppercase">Recent Activity</p>
          <section className=" ">
            <AnalyticsGraph />
          </section>
        </div>
      </section>
    </div>
  );
}
