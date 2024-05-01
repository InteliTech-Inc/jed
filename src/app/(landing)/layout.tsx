import { ReactNode } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
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
