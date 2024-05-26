import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface Nominee {
  id: string;
  full_name: string;
  img_url: string;
  category: string;
  code: string;
}

interface Vote {
  nominee_id: string;
  count: string;
}

type Props = {
  nominee: Nominee;
  votes: Vote[];
  handleNomineeVoting: (id: string) => void;
};

export default function NomineeCard({
  nominee,
  handleNomineeVoting,
  votes,
}: Props) {
  return (
    <div className="w-full">
      <div className="relative h-[25rem] w-full flex-grow rounded-lg overflow-hidden hover:shadow transition-all duration-150 border-secondary bg-white group">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${nominee.img_url}`}
          className="z-0 h-full object-cover w-full transition-all scale-110 duration-300 group-hover:scale-100"
          width={2000}
          height={2000}
          alt={nominee.full_name}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent opacity-100 h-1/2 z-10"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white z-20">
          <h2 className="text-xl font-bold">{nominee.full_name}</h2>
          <p>{nominee.category}</p>
          <p>Nominee's code: {nominee.code}</p>
          <p>
            Votes:{" "}
            {votes.find((vote) => vote.nominee_id === nominee.id)?.count || 0}
          </p>
        </div>
        <Button
          variant={"outline"}
          className="absolute top-0 right-0 m-4 font-bold py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 z-30"
        >
          <Link href={`nominees/edit/${nominee.id}`}>Edit</Link>
        </Button>
      </div>
      <Button
        onClick={() => handleNomineeVoting(nominee.id)}
        className="w-full rounded-b-md rounded-t-none my-2"
      >
        Vote
      </Button>
    </div>
  );
}
