import Hero from "./components/hero";
import Product from "./components/product";
import Premium from "./components/premium";
import FAQ from "./components/faqs";
import Globe from "./components/globe";
export default async function Home() {
  return (
    <div className=" ">
      <Hero />
      <Product />
      <Premium />
      <FAQ />
      <Globe />
    </div>
  );
}
