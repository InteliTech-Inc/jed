"use client";

import { useEffect, useRef } from "react";
import ProductImage from "@/app/assets/hero-image.webp";
import Image from "next/image";
import { useInView } from "framer-motion";

export default function HeroImage() {
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(imageRef, { amount: 0.4, once: true });

  useEffect(() => {
    if (isInView) {
      imageRef.current?.classList.add("normal");
    } else {
      imageRef.current?.classList.remove("normal");
    }
  }, [isInView]);
  return (
    <section
      ref={imageRef}
      className="rotate-hero-image w-full lg:w-[80%] mx-auto px-3 py-6 lg:py-12 shadow-2xl"
    >
      <Image
        src={ProductImage}
        width={2000}
        height={2000}
        alt="Product Dashboard"
        className=" "
      />
    </section>
  );
}
