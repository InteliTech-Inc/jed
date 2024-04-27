"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/constants/nav_links";
import { db } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { PanelLeft, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import Logo from "../../../public/images/logo.png";

type Props = {
  children: ReactNode;
};

export default function AppLayout({ ...props }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async () => {
    await db.auth.signOut();
    router.push("/");
  };
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-[18%] flex-col border-r bg-background lg:flex px-3 py-2">
        <div className="border-b mb-5">
          <Image src={Logo} alt="Logo" width={80} height={80} />
        </div>
        <nav className="flex flex-col items-start gap-4">
          {NAV_LINKS.map((item) => {
            return (
              <Link
                href={item.href}
                key={item.id}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-secondary w-full",
                  {
                    "bg-secondary text-white rounded-r-xl hover:text-white":
                      pathname === item.href,
                  }
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            );
          })}
        </nav>
        <nav className="mt-auto flex flex-col items-start gap-4">
          <Link
            href={`/settings`}
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-secondary w-full",
              {
                "bg-secondary text-white rounded-r-xl hover:text-white":
                  pathname === "/settings",
              }
            )}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </nav>
      </aside>
      <div className="flex flex-col lg:gap-4 lg:py-4 lg:pl-[18%]">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 lg:static lg:h-auto lg:border-0 lg:bg-transparent lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="lg:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="lg:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Image src={Logo} alt="Logo" width={80} height={80} />
                <nav className="flex flex-col items-start gap-4">
                  {NAV_LINKS.map((item) => {
                    return (
                      <Link
                        href={item.href}
                        key={item.id}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-secondary w-full",
                          {
                            "bg-secondary text-white rounded-r-xl hover:text-white":
                              pathname === item.href,
                          }
                        )}
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                    );
                  })}
                </nav>
                <Link
                  href={`/settings`}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary w-full",
                    {
                      "bg-primary text-white rounded-r-xl hover:text-white":
                        pathname === "/settings",
                    }
                  )}
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full border"
                >
                  <User />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="p-5">{props.children}</main>
      </div>
    </div>
  );
}
