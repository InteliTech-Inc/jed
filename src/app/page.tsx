import { db } from "@/lib/supabase";
import Link from "next/link";
export default async function Home() {
  const { data, error } = await db.from("waitlist").insert({
    email: "test@example.com",
  });

  if (data) console.log(data);
  if (error) console.log(error);

  return (
    <div>
      <h1>This is what we do for living</h1>
      <Link href="/login">Log In</Link>
    </div>
  );
}
