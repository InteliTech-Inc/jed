import Link from "next/link";
import {
  TwitterIcon,
  LinkedinIcon,
  InstagramIcon,
  YoutubeIcon,
} from "lucide-react";
import Image from "next/image";
export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className=" border-t border-t-neutral-300 z-10 w-full text-white bg-primary ">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 p-10 lg:place-items-center">
        <div className="flex flex-col">
          <h1 className="font-semibold text-xl">Useful Links</h1>
          <div className="flex flex-col  md:text-left my-6 space-y-3 text-md">
            <Link href={"/"} className="hover:text-secondary">
              Home
            </Link>
            <Link href={"/about"} className="hover:text-secondary">
              About
            </Link>
            <Link href={"/blog"} className="hover:text-secondary">
              Blog
            </Link>
            <Link href={"/#faq"} className="hover:text-secondary">
              FAQs
            </Link>
          </div>
        </div>
        <div className="flex flex-col  md:items-start ">
          <h1 className="font-semibold md:text-left text-xl">
            Contact & Address
          </h1>
          <div className="flex flex-col md:text-left my-6 space-y-3 text-md">
            <a
              href="mailto:jed.info@gmail.com"
              className="hover:text-secondary"
            >
              jed.info@gmail.com
            </a>
            <a href="tel:+14049039843" className="hover:text-secondary">
              +1 404 903 9843
            </a>
            <p>College of Engineering, KNUST, Kumasi - Ghana</p>
          </div>
        </div>
        <div className="flex flex-col items-center w-fit mx-auto md:items-start">
          <Image
            src={"/images/logo.png"}
            alt="logo"
            width={200}
            height={200}
            className="object-cover"
          />
        </div>
      </div>
      <section className="border-t-accent/20 text-white/90 p-6 flex flex-col lg:flex-row border-t w-4/5 mx-auto justify-between">
        <section className=" inline-flex flex-col lg:flex-row text-center items-center gap-4">
          <p className=" mx-auto text-[.8rem] ">
            &copy; {date} InteliTech Inc. All rights reserved.
          </p>
          <ul className="flex gap-4 text-[.8rem]">
            <li className="hover:text-secondary">
              <Link href="/resources/terms">Terms of Use</Link>
            </li>
            <li className="hover:text-secondary">
              <Link href="/resources/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </section>
        <section>
          <div className="flex justify-center py-6 gap-4">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon
                size={16}
                className="hover:text-secondary transition-all duration-300 cursor-pointer hover:-translate-y-1"
              />
            </a>
            <Link
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon
                size={16}
                className="hover:text-secondary transition-all duration-300 cursor-pointer hover:-translate-y-1"
              />
            </Link>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon
                size={16}
                className="hover:text-secondary transition-all duration-300 cursor-pointer hover:-translate-y-1"
              />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YoutubeIcon
                size={16}
                className="hover:text-secondary transition-all duration-300 cursor-pointer hover:-translate-y-1"
              />
            </a>
          </div>
        </section>
      </section>
    </footer>
  );
}
