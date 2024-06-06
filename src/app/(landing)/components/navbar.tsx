"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import MobileNavbar from "./mobile_navbar";
import Logo from "@/components/logo";
import NavbarProductsDropdown from "./products_dropdown";
import NavbarResourcesDropdown from "./resources_dropdown";

import { UserRoundPlusIcon } from "lucide-react";

export const NavLinks = [
  {
    name: "Products",
    path: "/products",
    dropdown: <NavbarProductsDropdown />,
  },
  {
    name: "Events",
    path: "/all-events",
    dropdwon: false,
  },
  {
    name: "About",
    path: "/about",
    dropdown: false,
  },
  {
    name: "Blog",
    path: "/blog",
    dropdown: false,
  },
];

export default function Navbar() {
  const [navIsOpen, setNavIsOpen] = useState(false);

  const handleCloseNavbar = () => {
    setNavIsOpen(false);
  };

  return (
    <div className="flex p-4 gap-8 sticky top-0 bg-white justify-between items-center border-b z-50 ">
      <section className=" flex justify-between w-full lg:w-fit ">
        <Link href={"/"}>
          <Logo />
        </Link>
        <AnimatePresence>
          {!navIsOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="lg:hidden "
            >
              <MenuIcon size={24} onClick={() => setNavIsOpen(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <AnimatePresence>
        {navIsOpen && (
          <MobileNavbar
            isOpen={navIsOpen}
            closeButtonHandler={handleCloseNavbar}
          />
        )}
      </AnimatePresence>
      <section className={"hidden h-fit bg-transparent lg:block"}>
        <nav className={" h-fit p-0 w-full lg:bg-transparent"}>
          <ul className=" flex gap-4 pt-6 flex-row lg:pt-0">
            {NavLinks.map((link) => {
              return (
                <span key={link.name}>
                  <li className="relative group">
                    <Link
                      href={link.path}
                      className={` ${
                        !link.dropdown
                          ? "hover:underline hover:underline-offset-4"
                          : ""
                      } ease-in duration-100 flex items-center gap-2`}
                    >
                      {link.name} {link.dropdown && <ChevronDown size={14} />}
                    </Link>
                    {link.dropdown && link.dropdown}
                  </li>
                </span>
              );
            })}
          </ul>
        </nav>
      </section>
      <section className="hidden lg:block">
        <Link
          className="w-fit px-8 py-2 border flex items-center rounded-md text-secondary mx-auto gap-2 hover:bg-neutral-50 transition-all duration-300"
          href={"/waitlist"}
        >
          Join waitlist <UserRoundPlusIcon size={14} />
        </Link>
      </section>
    </div>
  );
}
