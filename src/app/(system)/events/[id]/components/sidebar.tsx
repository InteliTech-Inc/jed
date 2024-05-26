"use client";

import Link from "next/link";
import { Home, LineChart, Package, Users, Sidebar } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useParams, usePathname } from "next/navigation";
import NetworkStatus from "./check_network";

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
    name: "Withdrawal",
    icon: <Package size={20} />,
  },
];
export default function EventsSidebar() {
  const path = usePathname();
  const { id } = useParams();
  const segments = path.split("/");
  const lastSegment = segments[segments.length - 1];

  const activeLink = lastSegment === id ? "details" : lastSegment;

  return (
    <div className="h-fit z-50 sticky top-16 p-2 border-b md:border-b-0 md:h-[calc(100vh_-_5rem)] border-r bg-white">
      <div className="hidden md:block md:flex-1">
        <nav className="hidden md:grid items-start gap-2 text-neutral-800 px-2 lg:px-4 mb-[18rem]">
          {SidebarLinks.map((item) => {
            const ac =
              activeLink === item.name.toLowerCase()
                ? "bg-secondary text-white hover:bg-secondary/90"
                : "hover:bg-gray-50 ";
            return (
              <Link
                href={`/events/${id}/${
                  item.name === "Details" ? "" : item.name.toLowerCase()
                }`}
                key={item.name}
                className={`${ac} mx-[-0.65rem] flex items-center gap-4 text-sm rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
              >
                {item.icon}
                {item.name}{" "}
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
              <nav className="grid mt-6 gap-2 text-lg font-medium">
                {SidebarLinks.map((item) => {
                  const ac =
                    activeLink === item.name.toLowerCase()
                      ? "bg-secondary text-white hover:bg-secondary/90"
                      : "hover:bg-gray-50 ";
                  return (
                    <Link
                      href={`/events/${id}/${
                        item.name === "Details" ? "" : item.name.toLowerCase()
                      }`}
                      key={item.name}
                      className={`${ac} mx-[-0.65rem] flex items-center gap-4 text-sm rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
                    >
                      {item.icon}
                      {item.name}{" "}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <div className=" pl-4">
          <NetworkStatus />
        </div>
      </div>
    </div>
  );
}
