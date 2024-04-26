export default function Hero() {
  return (
    <section className="h-[calc(100vh_-_60px)] grid gap-4 lg:grid-cols-2">
      <section className="flex flex-col gap-4 p-4 place-content-center">
        <h1 className=" text-6xl ">Your all in one events organization platform</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
          neque quis dolorum sequi maiores libero porro ut exercitationem maxime
          dolorem.
        </p>
        <button className="w-fit bg-secondary px-4 py-2 text-white rounded-md" type="button">Get started</button>
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
