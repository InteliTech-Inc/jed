import Image from "next/image";
import NominationsImage from "@/app/assets/nominations.webp";
import VotingImage from "@/app/assets/voting.webp";
import TicketingImage from "@/app/assets/ticketing.webp";

export default function ProductsPage() {
  return (
    <div className="">
      <section className="p-6">
        <h1 className="py-4 main-heading">Products</h1>
        <p className=" text-lg lg:w-3/5 lg:text-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
          impedit,{" "}
          <mark className=" text-primary/60">
            odit praesentium perspiciatis vel voluptatum omnis amet odio quia
            corporis!
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
