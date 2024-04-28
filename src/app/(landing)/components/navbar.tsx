"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/app/assets/arrow.png";
import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import MobileNavbar from "./mobile_navbar";

import { Button } from "@/components/ui/button";
import { UserRoundPlusIcon } from "lucide-react";

export const NavLinks = [
  {
    name: "Product",
    path: "/product",
  },
  {
    name: "Resources",
    path: "/resources",
  },
  {
    name: "Pricing",
    path: "/pricing",
  },
  {
    name: "About Us",
    path: "/#about",
  },
  {
    name: "Blog",
    path: "/blog",
  },
];

export default function Navbar() {
  const [navIsOpen, setNavIsOpen] = useState(false);

  const handleCloseNavbar = () => {
    setNavIsOpen(false);
  };

  return (
    <div className="flex p-4 gap-8 sticky top-0 bg-white/70 saturate-150 justify-between backdrop-blur-md items-center border-b z-50 ">
      <section className=" flex justify-between w-full lg:w-fit ">
        <section>
          <Image src={Logo} width={20} height={20} alt="logo" />
        </section>
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
            {NavLinks.map(({ name, path }) => (
              <li key={name}>
                <Link
                  href={path}
                  className=" hover:underline hover:underline-offset-4 ease-in duration-100"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <section className="hidden lg:block">
      
        <Button className=" gap-2" variant={"outline"}>
          Join waitlist <UserRoundPlusIcon size={18} />{" "}
        </Button>
      </section>
    </div>
  );
}
