import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Pricing from "./components/pricing";

type Props = {};

export default function PricingPage({}: Props) {
  return (
    <div>
      <Navbar />
      <Pricing />
      <Footer />
    </div>
  );
}
