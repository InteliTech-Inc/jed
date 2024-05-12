"use client";

import Link from "next/link";
import { Home, LineChart, Package, Users, Sidebar } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const SidebarLinks = [
  {
    name: "Details",
    icon: <Home size={20} />,
  },
  {
    name: "Nominees",
    icon: <Users size={20} />,
  },
  {
    name: "Voting",
    icon: <LineChart size={20} />,
  },
  {
    name: "Nominations",
    icon: <Package size={20} />,
  },
  {
    name: "Ticketing",
    icon: <Package size={20} />,
  },
  {
    name: "Withdrawal",
    icon: <Package size={20} />,
  },
];
export default function EventsSidebar() {
  const path = usePathname();
  const segments = path.split("/");
  const lastSegment = segments[segments.length - 1];
  const activeLink = lastSegment.includes("-") ? "details" : lastSegment; // compromised

  return (
    <div className="h-fit sticky top-16 p-2 border-b md:border-b-0 md:h-[calc(100vh_-_5rem)] border-r bg-white">
      <div className="hidden md:block md:flex-1">
        <nav className="hidden md:grid items-start gap-2 text-neutral-800 px-2 font-medium lg:px-4">
          {SidebarLinks.map((item) => {
            const ac =
              activeLink === item.name.toLowerCase()
                ? "bg-secondary text-white hover:bg-secondary/90"
                : "hover:bg-gray-50 ";
            return (
              <Link
                href={`${path}/${item.name.toLowerCase()}`}
                key={item.name}
                className={`${ac} mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
              >
                {item.icon}
                {item.name}{" "}
                {item.name === "Ticketing" && (
                  <small className="px-2 p-1 bg-green-200 rounded-full">
                    Coming soon
                  </small>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex h-fit">
        <header className="flex items-center gap-4 bg-muted/40 px-2 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Sidebar className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Edit event
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Details
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Nominees
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Voting
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Nominations
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Ticketing
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Withdraw
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </div>
  );
}
