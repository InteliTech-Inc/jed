"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/constants/nav_links";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
export default function MobileTopbar() {
  const [navIsOpen, setNavIsOpen] = useState(false);
  return (
    <Sheet open={navIsOpen} onOpenChange={setNavIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 font-medium">
          {NAV_LINKS.map((link) => {
            return (
              <Link
                href={link.href}
                key={link.id}
                onClick={() => setNavIsOpen(false)}
                className=" text-muted-foreground transition-all hover:text-secondary w-full"
              >
                {link.title}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
