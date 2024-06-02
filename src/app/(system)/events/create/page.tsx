import React from "react";
import CreateEventForm from "./components/create_event";
import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";
async function CreateEventsPage() {
  const db = dbServer(cookies);
  const {
    data: { user },
  } = await db.auth.getUser();
  return (
    <div className="w-full bg-pattern bg-center bg-cover font-sans p-6">
      <CreateEventForm user={user} />
    </div>
  );
}

export default CreateEventsPage;
