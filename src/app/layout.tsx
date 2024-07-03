import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "sonner";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import Providers from "./providers";
import type { Metadata } from "next";

const openGraphImagesAbsolute = [
  {
    url: `https://jed-event.com/src/app/opengraph-image.png`,
    width: 1200,
    height: 630,
  },
  {
    url: `https://jed-event.com/src/app/opengraph-image-square.png`,
    width: 400,
    height: 400,
  },
];

export const metadata: Metadata = {
  metadataBase: new URL("https://jed-event.com"),
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
    images: openGraphImagesAbsolute,
  },
};

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body
        className={cn(
          ` "min-h-screen bg-background font-sans antialiased ",
          ${GeistSans.variable} ${GeistMono.variable} ${plusJakartaSans.variable}`
        )}
      >
        <Providers>
          <Toaster
            closeButton
            className="font-sans"
            position="top-center"
            richColors
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
