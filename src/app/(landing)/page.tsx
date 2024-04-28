import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Product from "./components/product";
export default async function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Product />
    </div>
  );
}
