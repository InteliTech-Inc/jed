"use client";
import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function Template({ children }: Props) {
  const pathname = usePathname();

  const shouldbeEscaped =
    pathname.match(/events\/?(.*)/) ||
    pathname.match(/dashboard\/?(.*)/) ||
    pathname.match(/admin\/?(.*)/);

  if (shouldbeEscaped) return children;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
