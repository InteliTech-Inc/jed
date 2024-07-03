"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/constants/nav_links";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
export default function MobileTopbar() {
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (pathname !== "/" && href === "/") {
      return false;
    }
    return pathname?.startsWith(href);
  };
  const [navIsOpen, setNavIsOpen] = useState(false);
  return (
    <Sheet open={navIsOpen} onOpenChange={setNavIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-gray-50" side="left">
        <nav className="grid mt-10  gap-4 font-medium">
          {NAV_LINKS.map((link) => {
            return (
              <Link
                href={link.href}
                key={link.id}
                onClick={() => setNavIsOpen(false)}
                className={`${
                  isActive(link.href)
                    ? "bg-secondary text-white hover:text-white"
                    : "hover:text-secondary"
                } text-muted-foreground text-sm p-2 flex items-center gap-2 rounded-md transition-all  w-full`}
              >
                {link.icon}
                {link.title}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
