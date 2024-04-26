"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/app/assets/arrow.png";
import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import MobileNavbar from "./mobile_navbar";

export default function Navbar() {
  const [navIsOpen, setNavIsOpen] = useState(false);

  const handleCloseNavbar = () => {
    setNavIsOpen(false);
  };

  return (
    <div className="flex p-4 gap-8 sticky top-0 bg-white lg:border-b">
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
      <section className={`hidden h-fit bg-transparent lg:block`}>
        <nav className={`bg-white h-fit p-0 w-full `}>
          <ul className=" flex gap-4 pt-6 flex-row lg:pt-0">
            <li>
              <Link href="/" className="hover:text-secondary">
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-secondary">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-secondary">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </div>
  );
}
