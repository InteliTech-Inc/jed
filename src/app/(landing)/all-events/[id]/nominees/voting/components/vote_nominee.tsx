import Image from "next/image";
import PaystackPayment from "@/components/paystack_payment";
import BackButton from "@/components/back";
import ShareLink from "./share_link";
type Nominee = {
  id: string;
  category_id: string | null;
  full_name: string | null;
  img_url: string | null;
  code: string | null;
  event_id: string | null;
};

type Props = {
  votingNominee: Nominee;
};

export default async function VoteNomineePage({ votingNominee }: Props) {
  return (
    <section className="container mx-auto mb-8 p-6">
      <div className=" flex justify-between">
        <BackButton />
        <ShareLink />
      </div>

      <div className="flex flex-col md:flex-row items-start justify-center w-full gap-4">
        <div className="border rounded-lg p-3 w-full md:w-[25rem] md:h-[30rem]">
          <div className="h-full w-full mb-4">
            <Image
              className="h-full w-full object-cover object-bottom rounded-lg"
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${votingNominee?.img_url}`}
              width={2000}
              height={2000}
              alt={votingNominee?.full_name || "Event"}
              priority
            />
          </div>
        </div>
        <div className="my-8 w-full md:w-[40rem] px-4">
          <p className=" text-3xl lg:text-4xl font-bold mb-3">
            Vote for {votingNominee?.full_name}
          </p>
          <p className="text-gray-700">
            Nominee's Code:{" "}
            <span className="font-bold text-lg">{votingNominee?.code}</span>{" "}
          </p>
          <p className="text-neutral-600">
            You may directly vote offline using the USSD CODE{" "}
            <span className="text-black text-md font-bold">*928*121#</span> and
            Nominee Code
          </p>
          <PaystackPayment id={votingNominee.id} />
        </div>
      </div>
    </section>
  );
}
