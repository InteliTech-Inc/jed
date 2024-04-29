import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "sonner";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import Providers from "./providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JED",
  description: "The all-in-one ",
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
          <Toaster className="font-sans" position="top-center" richColors />
          {children}
        </Providers>
      </body>
    </html>
  );
}
