"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

export default function AnimatedText(): JSX.Element {
  useEffect(() => {
    if (window.innerWidth >= 768) {
      const _ = new SplitType("#text");
      const characters = document.querySelectorAll(".char");

      for (let i = 0; i < characters.length; i++) {
        characters[i].classList.add("translate-y-full");
      }
      gsap.to(characters, {
        y: 0,
        stagger: 0.05,
        delay: 0.05,
        duration: 0.5,
      });
    } else if (window.innerWidth < 768) {
      const _ = new SplitType("#text-2");
      const characters = document.querySelectorAll(".char");

      for (let i = 0; i < characters.length; i++) {
        characters[i].classList.add("translate-y-full");
      }
      gsap.to(characters, {
        y: 0,
        stagger: 0.05,
        delay: 0.05,
        duration: 0.5,
      });
    }
  }, []);

  return (
    <main className="text-secondary">
      <div
        id="text"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        <h1 className="hidden md:block text-6xl text-center leading-tight font-bold ">
          Join the Waitlist for JED today!
        </h1>
      </div>
      <div
        id="text-2"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        <h1 className="md:hidden block text-4xl text-center leading-tight font-bold ">
          Join the Waitlist for JED today!
        </h1>
      </div>
    </main>
  );
}
