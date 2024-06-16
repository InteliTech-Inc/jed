import Link from "next/link";
import { Menu } from "lucide-react";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Topbar from "./components/topbar";
import { NAV_LINKS } from "@/constants/nav_links";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import UserDropdown from "./components/user_dropdown";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col max-w-screen-2xl mx-auto ">
      <header className="sticky top-0 flex h-16 items-center bg-white z-50 gap-4 border-b px-4 md:px-6">
        <Link className="hidden lg:block" href={"/"}>
          <Logo />
        </Link>
        <Topbar />
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
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
                    className=" text-muted-foreground transition-all hover:text-secondary w-full"
                  >
                    {link.title}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="w-fit ml-auto">
          <UserDropdown />
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 md:gap-8 ">
        {children}
      </main>
    </div>
  );
}
