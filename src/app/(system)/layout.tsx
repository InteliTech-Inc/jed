import Link from "next/link";
import Logo from "@/components/logo";
import Topbar from "./components/topbar";
import MobileTopbar from "./components/mobile_topbar";
import UserDropdown from "./components/user_dropdown";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col max-w-screen-2xl mx-auto ">
      <header className="sticky top-0 flex h-16 items-center bg-white backdrop-blur-md z-50 gap-4 border-b px-4 md:px-6">
        <Link className="hidden lg:block" href={"/"}>
          <Logo />
        </Link>
        <Topbar />
        <MobileTopbar />
        <div className="w-fit ml-auto">
          <UserDropdown />
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-white flex-1 flex-col gap-4 bg-muted/40 md:gap-8 ">
        {children}
      </main>
    </div>
  );
}
