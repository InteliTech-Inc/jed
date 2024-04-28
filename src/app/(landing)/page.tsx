import Navbar from "./components/navbar";
import Hero from "./components/hero";
export default async function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <section className=" h-[200vh]">
        <h1>Roll up and smoke my sins away</h1>
      </section>
    </div>
  );
}
