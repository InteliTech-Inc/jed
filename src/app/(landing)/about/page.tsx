import Image from "next/image";
import AboutImage from "@/app/assets/pricing-dashboard.png";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutUsPage() {
  return (
    <div className="">
      <div className=" p-6 lg:w-[90%] mx-auto  grid lg:grid-cols-2 gap-6 place-items-center">
        <section>
          <h3 className="text-5xl text-neutral-800 py-4 font-semibold ">
            Why JED
          </h3>
          <article className="">
            <p className="leading-[1.6]">
              JED's event creation procedure is simple to use; users can input
              details, set schedules, and customise the event to suit their
              requirements. The full nomination feature of the app makes it easy
              for organisers to collect and handle nominations, ensuring a
              systematic and fair procedure.
            </p>
            <br />
            <p className="">
              Ticketing is another area where JED excels. The app offers tools
              to create different ticket types, manage sales, and track
              attendees. This ensures that organizers have complete control over
              the ticketing process and can provide a smooth experience for
              participants from start to finish.
            </p>
            <br />
            <p>
              JED’s user-friendly interface and comprehensive features make it
              an invaluable tool for anyone looking to manage events
              effectively. By automating and simplifying the critical aspects of
              event management, JED helps users save time, reduce stress, and
              ensure the success of their events.
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
    </div>
  );
}
