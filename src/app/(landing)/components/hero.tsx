export default function Hero() {
  return (
    <section className="h-[calc(100vh_-_60px)] w-full grid lg:grid-cols-[60%_auto] gap-4 place-items-center">
      <section className="flex flex-col gap-4 p-6  border ">
        <h1 className=" text-7xl leading-[1.2]">
          Your <mark className=" text-primary/70">all-in-one</mark> events
          organization platform
        </h1>
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
          neque quis dolorum sequi maiores libero porro ut exercitationem maxime
          dolorem.
        </p>
        <button
          className="w-fit bg-secondary px-4 py-2 text-white rounded-md"
          type="button"
        >
          Get started
        </button>
      </section>
      <section className="">
        <img
          src="https://images.unsplash.com/photo-1616910111011-888888888888?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          alt=""
        />
      </section>
    </section>
  );
}
