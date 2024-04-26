import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import Providers from "./providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JED",
  description: "The all-in-one ",
};

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
          ${GeistSans.variable} ${GeistMono.variable}`
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
