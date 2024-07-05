import { ReactNode } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Metadata } from "next";

const description =
  "Discover all the essential tools for creating memorable events, including ticketing, nomination filing, and voting for nominees, designed to be user-friendly for both organizers and attendees.";

export const metadata: Metadata = {
  metadataBase: new URL("https://jed-event.com"),
  title: {
    default: "JED",
    template: "JED - %s",
  },
  authors: [
    {
      name: "Evans Elabo",
      url: "https://linkedin.com/in/eelabo",
    },
    {
      name: "Joshua Richardson Owusu",
      url: "https://jed-event.com",
    },
    {
      name: "Yaw Diabene Addo",
      url: "https://jed-event.com",
    },
  ],
  description,
  twitter: {
    description,
    card: "summary_large_image",
  },

  alternates: {
    canonical: "https://jed-event.com",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    siteName: "JED",
    description,
    authors: ["Evans Elabo", "Addo Yaw Diabene", "Joshua Richardson Owusu"],
    url: "https://jed-event.com",
    images: [
      {
        url: `https://jed-event.com/opengraph-image.png`,
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
