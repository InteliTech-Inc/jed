"use client";
import { db } from "@/lib/supabase";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PaystackPayment from "@/components/paystack_payment";

type Nominee = {
  category_id: string | null;
  full_name: string | null;
  img_url: string | null;
  code: string | null;
  event_id: string | null;
};

interface Vote {
  nominee_id: string;
  count: string;
}

export default function VoteNomineePage() {
  const [votingNominee, setVotingNominee] = useState<Nominee>();

  const { id } = useParams();

  useEffect(() => {
    async function GetNominees() {
      try {
        const { data, error } = await db
          .from("nominees")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;
        setVotingNominee(data!);
      } catch (error) {
        console.log("error", error);
      }
    }
    GetNominees();
  }, []);

  return (
    <section className="container mx-auto mb-8 p-6">
      <div className="flex flex-col md:flex-row items-start justify-center w-full gap-4">
        <div className="border p-3">
          <div className=" h-[23rem] md:w-[25rem] mb-4">
            <Image
              className="h-full w-full object-cover object-bottom rounded-lg"
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${votingNominee?.img_url}`}
              width={2000}
              height={2000}
              alt={votingNominee?.full_name || "Event"}
              priority
            />
          </div>
          <h1 className="text-xl font-bold my-1">{votingNominee?.full_name}</h1>
          <p className="text-gray-700">
            Nominee's Code:{" "}
            <span className="font-bold text-lg">{votingNominee?.code}</span>{" "}
          </p>
        </div>
        <div className="my-8 w-full md:w-[40rem] px-4">
          <h1 className="text-4xl font-bold mb-3">
            Vote for {votingNominee?.full_name}
          </h1>
          <p className="text-neutral-600">
            You may directly vote offline using the USSD CODE{" "}
            <span className="text-black text-md font-bold">*170*200#</span> and
            Nominee Code
          </p>
          <PaystackPayment />
        </div>
      </div>
    </section>
  );
}
