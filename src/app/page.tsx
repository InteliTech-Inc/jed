import Link from "next/link";
export default async function Home() {
  return (
    <div>
      <h1>This is what we do for living</h1>
      <Link href="/login">Log In</Link>
    </div>
  );
}
