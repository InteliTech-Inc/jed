import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import PricingImage from "@/app/assets/pricing-dashboard.png";

export default function Premium() {
  return (
    <div className="lg:p-16 place-content-center">
      <section className="p-8 w-full h-full mx-auto lg:rounded-xl bg-primary grid lg:grid-cols-2 gap-4">
        <div className="text-white p-2 lg:p-6">
          <h3 className=" text-2xl lg:text-[3rem] lg:leading-[1.3]">
            Flexible pricing system specifically tailored for customers.
          </h3>
          <p className=" py-4 lg:py-8">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae
            minus nihil aliquam.
          </p>
          <Button className=" px-12 gap-2 hover:gap-4 transition-all duration-300 ">
            See Pricing <ArrowRightIcon size={16} />
          </Button>
        </div>
        <div className=" rounded-lg overflow-hidden">
          <Image
            src={PricingImage}
            alt="Pricing dashboard"
            width={2000}
            height={2000}
          />
        </div>
      </section>
    </div>
  );
}
