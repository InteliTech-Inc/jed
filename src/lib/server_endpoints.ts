import { dbServer } from "./supabase";
import { cookies } from "next/headers";
import { db } from "./supabase";
import { VotingDataResponse } from "@/types/types";
import { Tables } from "@/types/supabase";

export const getServerUser = async () => {
  const db = dbServer(cookies);
  const {
    data: { user },
  } = await db.auth.getUser();
  return user;
};

export const uploadImage = async ({
  file,
  path,
}: {
  file: File;
  path: string;
}) => {
  const db = dbServer(cookies);
  const { data, error } = await db.storage.from("events").upload(path, file, {
    contentType: "image/*",
  });

  if (error) throw new Error(error.message);
  return data;
};

export const createEvent = async (eventPayload: any) => {
  const db = dbServer(cookies);
  const { data, error } = await db
    .from("events")
    .insert([eventPayload])
    .select();
  if (error) throw new Error(error.details);
  return data;
};

export const updateEvent = async (id: string, eventPayload: any) => {
  const db = dbServer(cookies);
  const { data, error } = await db
    .from("events")
    .update(eventPayload)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const addEmailToWaitlist = async (email: string) => {
  const { data, error } = await db.from("waitlist").insert({ email }).select();
  if (error) {
    throw new Error(error.details);
  }
  return data;
};

export const getVotingDataResponse = async (id: string) => {
  const db = dbServer(cookies);
  const [votingData, nomineesResult, categoriesResult, nominationsResult] =
    await Promise.all([
      db.from("voting").select("id, nominee_id, count").eq("event_id", id),
      db
        .from("nominees")
        .select("id,code, full_name, category_id")
        .eq("event_id", id),
      db.from("categories").select("id, category_name").eq("event_id", id),
      db.from("nominations").select("*").eq("event_id", id),
    ]);

  const { data: voting } = votingData;
  const { data: nominees } = nomineesResult;
  const { data: categories } = categoriesResult;
  const { data: nominations } = nominationsResult;

  //Getting the nominees data
  const data = voting?.map((vote) => {
    const nominee = nominees?.find((nominee) => nominee.id === vote.nominee_id);
    const category = categories?.find(
      (category) => category.id === nominee?.category_id
    );
    const nomination = nominations?.find(
      (record) => record.full_name === nominee?.full_name
    );

    return {
      id: vote.id,
      full_name: nominee?.full_name,
      email: nomination?.email || "N/A",
      phone: nomination?.phone || "N/A",
      code: nominee?.code,
      number_of_votes: vote.count,
      category: category?.category_name,
    };
  }) as VotingDataResponse[];

  return data;
};

export const getNominee = async (code: string) => {
  const db = dbServer(cookies);

  const { data: nominee, error: nomineeError } = await db
    .from("nominees")
    .select("*")
    .eq("code", code)
    .single();

  if (nomineeError) throw new Error(nomineeError.message);

  return { nominee };
};

export async function createOrUpdateVote(voteData: {
  nominee_id: string;
  event_id: string;
  count: number;
  amount_payable: number;
}) {
  const { nominee_id, count, amount_payable, event_id } = voteData;

  const { data, error } = await db
    .from("voting")
    .select("*")
    .eq("nominee_id", nominee_id);

  if (error) {
    console.error("Error fetching voting record:", error);
    return null;
  }

  if (data && data.length > 0) {
    // Nominee already has counts, update their count with the new one

    const updatedVotes = Number(data[0].count) + Number(count);
    const updatedAmount =
      Number(data[0].amount_payable) + Number(amount_payable);

    const { error: updateError } = await db
      .from("voting")
      .update({ count: updatedVotes, amount_payable: updatedAmount })
      .eq("nominee_id", nominee_id);

    if (updateError) {
      console.error("Error updating voting record:", updateError);
      return null;
    }
  } else {
    // If Nominee is being voted for the first time, insert a new vote
    const { error: insertError } = await db
      .from("voting")
      .insert({ nominee_id, count, amount_payable, event_id })
      .select();

    if (insertError) {
      console.error("Error inserting voting record:", insertError);
      return null;
    }
  }

  return true;
}

export async function getEventVotingPrice(eventId: string) {
  const { data, error } = await db
    .from("events")
    .select("amount_per_vote")
    .eq("id", eventId)
    .single();

  if (error) {
    console.error("Error fetching event:", error);
    return null;
  }

  return { data };
}

// Import axios if not already imported
import axios, { AxiosError } from "axios";

// Function to initiate payment on Paystack
// export async function initiatePayment(
//   amount: number,
//   email: string,
//   callbackUrl: string,
//   phone: number
// ) {
//   try {
//     const response = await axios.post(
//       "https://api.paystack.co/transaction/initialize",
//       {
//         amount: amount,
//         email: email,
//         callback_url: callbackUrl,
//         reference: "xkljjsdkjfasdf", // Implement this function to generate unique references
//         mobile_money: {
//           phone,
//           provider: "MTN",
//         },
//         currency: "GHS",
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     if (error instanceof Error)
//       console.error("Failed to initialize payment:", error.name);
//     throw error;
//   }
// }

export async function generatePaystackPaymentLink(
  email: string,
  amount: number,
  callbackUrl: string
): Promise<string | null> {
  const url = "https://api.paystack.co/transaction/initialize";
  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`, // Replace YOUR_SECRET_KEY with your actual secret key
    "Content-Type": "application/json",
  };
  const data = {
    email: email,
    amount: Number(amount) * 100, // Convert amount to kobo
    callback_url: callbackUrl,
  };

  try {
    const response = await axios.post(url, data, { headers: headers });
    return response.data.data.reference;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        "Error generating Paystack payment link:",
        error.response ? error.response.data : error.message
      );
    }
    return null;
  }
}
