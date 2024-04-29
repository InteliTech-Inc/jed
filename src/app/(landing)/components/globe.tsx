import GlobeImage from "@/app/assets/globe.webp";
import Image from "next/image";
export default function Globe() {
  return (
    <div className=" grid lg:grid-cols-2 gap-4 p-4 lg:pt-6 place-items-center lg:pb-0 lg:pr-0 lg:h-screen">
      <section className="p-4">
        <h3 className=" text-3xl lg:text-[3rem] leading-[1.2] text-gray-900/90">
          Create an event at one place,{" "}
          <mark className="text-primary/80">
            receive payment from anywhere around the world!
          </mark>
        </h3>
        <p className=" py-4 leading-[1.6] lg:py-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad sunt porro
          eius atque, officiis saepe. Amet deleniti aut quod, velit nam sit
        </p>
      </section>
      <section className="w-full h-full overflow-hidden relative">
        <section className=" relative left-0 lg:absolute lg:-right-[30%]">
          <Image
            src={GlobeImage}
            alt="Globe"
            width={2000}
            height={2000}
            className=" w-full h-full"
          />
        </section>
      </section>
    </div>
  );
}
