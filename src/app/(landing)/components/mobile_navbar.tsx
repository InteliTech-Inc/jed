"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { XIcon } from "lucide-react";
import { useRef } from "react";
import useClickOutside from "@/hooks/use_click_outside";
import { NavLinks } from "./navbar";

type MobileNavbarProps = {
  isOpen: boolean;
  closeButtonHandler: () => void;
};

export default function MobileNavbar({
  isOpen,
  closeButtonHandler,
}: MobileNavbarProps) {
  const menuRef = useRef(null);

  useClickOutside([menuRef], closeButtonHandler);

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
        <div className=" absolute right-4 lg:hidden">
          <XIcon size={24} onClick={closeButtonHandler} />
        </div>
        <ul className=" flex-col flex gap-4 pt-6 lg:flex-row lg:pt-0">
          {NavLinks.map(({ name, path }) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            <li key={name} onClick={closeButtonHandler}>
              <Link
                href={path}
                className="hover:underline hover:underline-offset-4 ease-in duration-100"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.section>
  );
}
