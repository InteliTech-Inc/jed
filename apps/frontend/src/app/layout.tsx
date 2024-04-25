import "../globals.css";
import { Be_Vietnam_Pro as JedFont } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "sonner";
import { cn } from "../../@/lib/utils";
import Providers from "./providers";

const jedFont = JedFont({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
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
          ` "min-h-screen bg-background font-sans antialiased",
         ${jedFont.variable} ${GeistSans.variable} ${GeistMono.variable}`
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
