import { EclipseIcon, ArrowRightIcon } from "lucide-react";

export default function Product() {
  return (
    <div className=" py-12 h-screen grid place-content-center">
      <section className="p-4 w-full text-center">
        <h1 className=" main-heading py-6">
          Our <mark className=" text-secondary">Products</mark>
        </h1>
        <p className=" text-lg lg:text-2xl  leading-[1.4] w-full lg:w-3/5 mx-auto">
          Seamless online events organization and management{" "}
          <mark className=" text-primary/80">
            platforms purposely built for you! 
          </mark>
        </p>
      </section>
      <section className=" grid lg:grid-cols-3 gap-4 p-4">
        {["Nominations", "Ticketing", "Voting"].map((item) => {
          return (
            <div className=" border border-neutral-600 rounded-md p-4">
              <div className="p-4 bg-green-50 rounded-md w-fit aspect-square">
                <EclipseIcon className="text-secondary" />
              </div>
              <h3 className=" text-2xl font-semibold text-secondary py-2">
                {item}
              </h3>
              <p className="py-3">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </p>
              <a className="text-primary items-center border-b w-fit border-b-primary gap-1 hover:gap-3 transition-all duration-300 flex text-sm" href="/">
                Learn more <ArrowRightIcon size={12}/>
              </a>
            </div>
          );
        })}
      </section>
    </div>
  );
}
