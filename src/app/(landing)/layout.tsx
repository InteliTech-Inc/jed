import { ReactNode } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "JED",
    template: "JED - %s",
  },
};

export default function LandingPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="w-full  mx-auto max-w-screen-2xl">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
