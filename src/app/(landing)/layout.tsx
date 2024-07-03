import { ReactNode } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://jedevents.vercel.app"),
  title: {
    default: "JED",
    template: "JED - %s",
  },
  description:
    "Discover all the essential tools for creating memorable events, including ticketing, nomination filing, and voting for nominees, designed to be user-friendly for both organizers and attendees.",
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    images: [
      {
        url: `https://jedevents.vercel.app/opengraph-image.png`,
      },
    ],
  },
};

export default function LandingPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="w-screen overflow-x-hidden mx-auto max-w-screen-2xl">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
