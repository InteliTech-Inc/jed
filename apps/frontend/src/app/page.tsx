import { Button } from "../../@/components/ui/button";

export const metadata = {
  title: "JEDVOTES | Home",
};

export default function Home(): JSX.Element {
  return (
    <div className="">
      <h2 className=" text-green-500 text-3xl py-4">Welcome to JEDVOTES web</h2>
      <p className="">Start!!</p>
      <Button>Test Shadcn</Button>
    </div>
  );
}
