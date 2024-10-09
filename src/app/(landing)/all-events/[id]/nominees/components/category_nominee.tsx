"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import VotingResults from "./voting_results";
import BackButton from "@/components/back";
import { canVote, hasVotingEnded } from "@/lib/utils";
import { Event } from "@/app/(system)/events/[id]/nominations/components/nomination_form";
type Nominees = {
  category_id: string | null;
  code: string | null;
  created_at: string;
  event_id: string | null;
  full_name: string | null;
  id: string;
  img_url: string | null;
  user_id: string;
} | null;

export default function CategoryNomineeCard() {
  const router = useRouter();
  // if (nominees?.length === 0) {
  //   return (
  //     <div className="p-10">
  //       <BackButton />
  //       <div className="grid place-items-center">
  //         <Image
  //           src={"/images/no-docs.svg"}
  //           alt="No-docs"
  //           width={200}
  //           height={200}
  //         />
  //         <p className="text-center">
  //           Sorry, there are no nominees for this category.
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <section className="container mx-auto px-6">
        <section className=" flex justify-between">
          <BackButton />
          {/* <VotingResults event={event} /> */}
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-10">
          {/* {nominees?.length! > 0 &&
            nominees?.map((nominee) => (
              <div
                className="transition-all duration-150 hover:shadow-lg rounded-xl cursor-pointer border"
                key={nominee?.id}
              >
                <div className="h-[20rem]">
                  <Image
                    className="h-full w-full rounded-lg rounded-b-none object-cover object-center"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${nominee?.img_url}`}
                    width={2000}
                    height={2000}
                    alt={nominee?.full_name!}
                    priority
                  />
                </div>
                <div className="px-6 py-4">
                  <p className="font-bold text-neutral-700 text-lg text-center">
                    {nominee?.full_name}
                  </p>
                  <p className="font-normal text-neutral-600  my-2 text-center">
                    Nominee's Code: {nominee?.code}
                  </p>
                  <Button
                    onClick={() =>
                      router.push(`/all-events/${nominee?.id}/nominees/voting`)
                    }
                    className="w-full"
                    disabled={
                      !canVote(
                        event.voting_period?.start_date || "",
                        event.voting_period?.end_date || ""
                      )
                    }
                  >
                    Vote Nominee
                  </Button>
                </div>
              </div>
            ))} */}
        </div>
      </section>
    </>
  );
}
