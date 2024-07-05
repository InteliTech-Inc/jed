"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { XIcon } from "lucide-react";
import { useRef } from "react";
import useClickOutside from "@/hooks/use_click_outside";
import { NavLinks } from "./navbar";
import { usePathname } from "next/navigation";
type MobileNavbarProps = {
  isOpen: boolean;
  closeButtonHandler: () => void;
};

export default function MobileNavbar({
  isOpen,
  closeButtonHandler,
}: MobileNavbarProps) {
  const menuRef = useRef(null);
  const pathname = usePathname();

  useClickOutside([menuRef], closeButtonHandler);

  const isActive = (href: string) => {
    if (pathname !== "/" && href === "/") {
      return false;
    }
    return pathname?.startsWith(href);
  };

  return (
    <motion.section
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      className={` ${
        isOpen ? "absolute" : "hidden"
      } w-full h-screen lg:h-fit top-0 left-0 lg:relative bg-black/80 backdrop-blur-lg lg:bg-transparent lg:hidden`}
    >
      <nav
        ref={menuRef}
        className={
          "border top-0 left-0 h-screen bg-white w-5/6 p-4 lg:h-fit relative lg:p-0 lg:w-full "
        }
      >
        <div className=" flex justify-between items-center right-4 lg:hidden">
          <p className="">Menu</p>
          <XIcon size={24} onClick={closeButtonHandler} />
        </div>
        <ul className=" flex-col mt-8 flex gap-4 pt-6 lg:flex-row lg:pt-0">
          {NavLinks.map(({ icon, name, path }) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            <li key={name} onClick={closeButtonHandler}>
              <Link
                href={path}
                onClick={closeButtonHandler}
                className={`${
                  isActive(path)
                    ? "bg-secondary text-white hover:text-white"
                    : "hover:text-secondary"
                } text-muted-foreground text-sm p-2 flex items-center gap-2 rounded-md transition-all  w-full`}
              >
                {icon}
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.section>
  );
}
