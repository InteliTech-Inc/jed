import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  key: string;
  nominee: Nominee;
  votes: Vote[];
  handleNomineeVoting: (id: string) => void;
};

export default function NomineeCard({
  key,
  nominee,
  handleNomineeVoting,
  votes,
}: Props) {
  const router = useRouter();
  return (
    <div>
      <div
        key={key}
        className="relative h-[25rem] w-full md:w-[18rem] rounded rounded-top-md rounded-b-none overflow-hidden hover:shadow transition-all duration-150 hover:border border-secondary bg-white group"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${nominee.img_url}`}
          className="z-0 h-full object-cover w-full"
          width={2000}
          height={2000}
          alt={nominee.full_name}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent opacity-90 h-1/2 z-10"></div>
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
