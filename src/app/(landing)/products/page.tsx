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
            Improve the prestige of your event by using our simplified Nominee
            Voting system. Handle the nomination process for the event with
            dedication, making sure that everything is transparent and fair.
            Encourage participation in a dynamic and open voting process by
            providing participants with customisable vote criteria and real-time
            result tracking. Encourage a sense of excitement and anticipation as
            voters select deserving candidates.
          </p>
        </section>
        <section>
          <div className=" border rounded-3xl p-4 bg-neutral-50">
            <Image src={NominationsImage} alt="Product" className="" />
          </div>
        </section>
      </section>
      <section
        id="ticketing"
        className="grid lg:h-screen lg:grid-cols-2  gap-4 place-content-center bg-green-50 p-6"
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur consectetur deserunt quaerat illum tempora magni ut
            molestiae magnam. Doloremque, ipsum. Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Est corrupti quidem nemo! Labore
            sequi quae optio dolorem officia odit distinctio!
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur consectetur deserunt quaerat illum tempora magni ut
            molestiae magnam. Doloremque, ipsum. Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Est corrupti quidem nemo! Labore
            sequi quae optio dolorem officia odit distinctio!
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur consectetur deserunt quaerat illum tempora magni ut
            molestia
          </p>
        </section>
      </section>
      <section
        id="voting"
        className="grid lg:h-screen lg:grid-cols-2 gap-4 place-content-center p-6"
      >
        <section className="lg:p-4">
          <h1 className=" text-2xl lg:text-5xl text-secondary font-semibold py-4">
            Voting
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur consectetur deserunt quaerat illum tempora magni ut
            molestiae magnam. Doloremque, ipsum. Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Est corrupti quidem nemo! Labore
            sequi quae optio dolorem officia odit distinctio!
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur consectetur deserunt quaerat illum tempora magni ut
            molestiae magnam. Doloremque, ipsum. Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Est corrupti quidem nemo! Labore
            sequi quae optio dolorem officia odit distinctio!
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur consectetur deserunt quaerat illum tempora magni ut
            molestia
          </p>
        </section>
        <section>
          <div className=" border rounded-3xl p-4 bg-neutral-50">
            <Image src={VotingImage} alt="Product" className="" />
          </div>
        </section>
      </section>
    </div>
  );
}
