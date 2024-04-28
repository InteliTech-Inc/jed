import { ArrowRightIcon } from "lucide-react";
import ProductImage from "@/app/assets/hero-image.webp";
import Image from "next/image";
import Link from "next/link";
import Badge from "./bagde";
import { Dot } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen h-fit w-full z-10 grid place-content-center lg:p-12">
      <section className="relative">
        <div className=" hidden lg:absolute w-60 aspect-square bg-green-400/40 blur-[120px]  right-[4%] bottom-[15%]  animate-pulse duration-1000" />
        <div className="absolute w-60 aspect-square bg-green-200/60 blur-[120px]  left-[4%] top-[15%]" />
        <section className="flex flex-col gap-8 p-2 lg:p-6 text-center w-full lg:w-4/5 mx-auto">
          <Badge>
            <p className="flex">
              {" "}
              <Dot className=" text-inherit" /> 2 weeks to product launch 🎊{" "}
              <Dot className=" text-inherit" />
            </p>
          </Badge>
          <h1 className=" main-heading">
            Your <mark className=" text-secondary">all-in-one</mark> events
            organization platform.
          </h1>
          <p className=" lg:px-12 mx-auto text-lg lg:text-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            neque quis dolorum sequi maiores libero porro ut exercitationem
            maxime dolorem.
          </p>
          <div className="flex w-fit mx-auto gap-4">
            <Link
              className="w-fit px-8 py-2 bg-secondary flex items-center rounded-md text-white mx-auto gap-2 hover:gap-3 transition-all duration-300"
              href={"/login"}
            >
              Get started for free <ArrowRightIcon size={16} />
            </Link>
          </div>
        </section>
      </section>
      <section className=" w-full lg:w-[80%] mx-auto px-3 py-6 lg:py-12 shadow-2xl">
        <Image
          src={ProductImage}
          width={2000}
          height={2000}
          alt="Product Dashboard"
        />
      </section>
    </section>
  );
}
