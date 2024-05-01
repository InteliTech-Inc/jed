import Image from "next/image";
import AboutImage from "@/app/assets/pricing-dashboard.png";

export default function AboutUsPage() {
  return (
    <div className="">
      <div className=" p-6 lg:w-[90%] mx-auto  grid lg:grid-cols-2 gap-6 place-items-center">
        <section>
          <h3 className="text-3xl py-4 font-semibold main-heading">Why JED</h3>
          <article className="">
            <p className="leading-[1.6]">
              JED is one of the fastest growing and most rapidly evolving
              disciplines and one which stands at the forefront of modern
              technology. When we think of any major challenge we have to face
              in the near future, Voting are at the center of it. It is not
              surprising that 70% of events worldwide are driven by JED.
            </p>
            <br />
            <p className="leading-[1.6]">
              We are in the midst of a JED revolution and over the next decade,
              the rapid advancement in JED will have a massive impact. It is of
              this view that the JED event is of utmost importance, especially
              in our part of the world, to drive event with JED as the focus.
            </p>
          </article>
        </section>
        <section className="rounded-md overflow-hidden">
          <Image
            src={AboutImage}
            alt="Inspire"
            className=" object-cover object-center transition-transform ease-linear duration-300 hover:scale-110 "
          />
        </section>
      </div>
      <div className="grid lg:w-[90%] mx-auto lg:grid-cols-2 p-6 gap-4 ">
        <section className=" border rounded-3xl p-4 bg-neutral-50 h-25 ">
          <h3 className=" text-3xl py-4 font-semibold text-secondary">Our Vision</h3>
          <p className="leading-[1.6]">
            At MIH, we envision a world where the most pressing JED problems are
            solved by the next generation of JED scientists. We seek to train
            students that will find sustainable solutions that are functional
            and cost-effective to problems around us
          </p>
        </section>
        <section className=" border rounded-3xl p-4 bg-neutral-50 h-25">
          <h3 className=" text-3xl py-4 font-semibold text-secondaryp">Our Mission</h3>
          <p className="leading-[1.6]">
            The JED event is dedicated to inspiring and connecting students in
            JED science, and to catalysing event by empowering them with
            resources, mentorship, and opportunities to innovate. We aim to
            foster a culture of creativity, collaboration, and curiosity, and to
            advance the field of JED science through breakthrough research and
            development. By doing so, we hope to transform the world and create
            a better future for all.
          </p>
        </section>
      </div>
    </div>
  );
}
