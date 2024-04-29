import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Product from "./components/product";
import Premium from "./components/premium";
import FAQ from "./components/faqs";
import Globe from "./components/globe";
import Footer from "./components/footer";
export default async function Home() {
  return (
    <div className="w-full  mx-auto max-w-screen-2xl ">
      <Navbar />
      <Hero />
      <Product />
      <Premium />
      <FAQ />
      <Globe />
      <Footer />
    </div>
  );
}
