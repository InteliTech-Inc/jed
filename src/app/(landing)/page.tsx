import Hero from "./components/hero";
import Product from "./components/product";
import Premium from "./components/premium";
import FAQ from "./components/faqs";
import Globe from "./components/globe";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

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
