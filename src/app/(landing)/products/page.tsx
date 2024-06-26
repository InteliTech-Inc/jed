import Image from "next/image";
import NominationsImage from "@/app/assets/nominations.webp";
import VotingImage from "@/app/assets/voting.webp";
import TicketingImage from "@/app/assets/ticketing.webp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};

export default function ProductsPage() {
  return (
    <div className="">
      <section className="p-6">
        <h1 className="py-4 main-heading">Products</h1>
        <p className=" text-lg lg:w-3/5 lg:text-2xl">
          Simplify voting, nominations, and ticketing to simplify your events
          management. Ensure every event is{" "}
          <mark className=" text-primary/60">
            memorable by improving your planning with our simple-to-use tools.
          </mark>
        </p>
      </section>
      <section
        id="nominations"
        className=" grid lg:h-screen lg:grid-cols-2 gap-4 place-content-center p-6"
      >
        <section className=" lg:p-4">
          <h1 className=" text-2xl lg:text-5xl text-secondary font-semibold py-4">
            Nominations
          </h1>
          <p>
            Jed's nominations feature allows users to effortlessly send out
            nomination forms through generated links. This platform guarantees
            that participants can nominate their choices at any time, from any
            location, for awards, positions, or recognitions.
            <br />
            <br />
            In addition to saving time, the shortened procedure guarantees a
            fair and systematic way of gathering nominations. Jed simplifies the
            process of organising nominations, giving users a productive
            approach to manage the initial stages of their events.
          </p>
        </section>
        <section>
          <div className=" border rounded-3xl p-4 bg-neutral-50">
            <Image src={NominationsImage} alt="Product" className="" />
          </div>
        </section>
      </section>
      <section
        id="voting"
        className="grid lg:h-screen lg:grid-cols-2 bg-green-50 gap-4 place-content-center p-6"
      >
        <section className="lg:p-4">
          <h1 className=" text-2xl lg:text-5xl text-secondary font-semibold py-4">
            Voting
          </h1>
          <p>
            Admins may easily oversee and monitor the voting period's progress
            thanks to Jed's voting tool. Because users can cast their votes
            directly through the app or by using a USSD code, this solution
            enables flexibility and accessibility while also allowing a wider
            range of preferences and participation.
          </p>
          <br />
          <p>
            Administrators can keep an eye on voting patterns and participation
            thanks to the real-time tracking feature, which offers transparency
            and insights into the voting process. Jed makes managing and
            conducting voting a hassle-free process, improving the event's speed
            and integrity.
          </p>
        </section>
        <section>
          <div className=" border rounded-3xl p-4 bg-neutral-50">
            <Image src={VotingImage} alt="Product" className="" />
          </div>
        </section>
      </section>
      <section
        id="ticketing"
        className="grid lg:h-screen lg:grid-cols-2  gap-4 place-content-center  p-6"
      >
        <section>
          <div className=" border rounded-3xl p-4 bg-neutral-50">
            <Image src={TicketingImage} alt="Product" className="" />
          </div>
        </section>
        <section className="lg:p-4">
          <h1 className=" text-2xl lg:text-5xl text-secondary font-semibold py-4">
            Ticketing
          </h1>
          <p>
            The goal of Jed's ticketing system is to make it easier for the
            general public to purchase event tickets. Admins have the ability to
            set prices, generate and manage different ticket kinds, and track
            sales in real-time. This tool makes sure that the entire ticketing
            process—from advertising to purchase and entry management—runs
            smoothly and efficiently.
          </p>
          <br />
          <p>
            Event planners may concentrate on other important elements of their
            planning when they use Jed to make ticket sales simple and
            effective. Ensuring a flawless experience for both organisers and
            guests, the strong ticketing tool helps maximise attendance.
          </p>
        </section>
      </section>
    </div>
  );
}
