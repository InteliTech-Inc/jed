"use client";
import { NAV_LINKS } from "@/constants/nav_links";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Topbar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (pathname !== "/" && href === "/") {
      return false;
    }
    return pathname?.startsWith(href);
  };

  return (
    <nav className="hidden flex-col gap-6 md:flex md:flex-row md:items-center px-4 ">
      {NAV_LINKS.map((link) => {
        return (
          <Link
            href={link.href}
            key={link.id}
            className={`${
              isActive(link.href) ? "text-secondary" : ""
            } text-muted-foreground flex items-center gap-2 transition-all hover:text-secondary w-full`}
          >
            {link.title}{" "}
            {link.title === "Ticketing" && (
              <small className="px-2 p-1 bg-green-200 rounded-full text-[8px]">
                Soon
              </small>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
