import { db } from "@/lib/supabase";
import WaitListPage from "./waitlist/page";

export default async function Home() {
  const { data, error } = await db.from("waitlist").insert({
    email: "test@example.com",
  });

  if (data) console.log(data);
  if (error) console.log(error);

  return (
    <div>
      <WaitListPage />
    </div>
  );
}
