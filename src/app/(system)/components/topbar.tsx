"use client";
import { NAV_LINKS } from "@/constants/nav_links";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Topbar() {
  const pathname = usePathname();
  return (
    <nav className="hidden flex-col gap-6 md:flex md:flex-row md:items-center px-4 ">
      {NAV_LINKS.map((link) => {
        return (
          <Link
            href={link.href}
            key={link.id}
            className={`${
              pathname === link.href ? "text-secondary" : ""
            } text-muted-foreground transition-all hover:text-secondary w-full`}
          >
            {link.title}
          </Link>
        );
      })}
    </nav>
  );
}
