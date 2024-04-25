import WaitList from "./waitlist/page";

export const metadata = {
  title: "JEDVOTES | WaitLyst",
};

export default function Home(): JSX.Element {
  return (
    <div>
      <WaitList />
    </div>
  );
}
