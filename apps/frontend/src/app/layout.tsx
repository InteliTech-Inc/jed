import "../globals.css";
import { Inter as JedFont } from "next/font/google";
import { cn } from "../../@/lib/utils";
import Providers from "./providers";

const jedFont = JedFont({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          jedFont.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
