import { dbServer } from "./supabase";
import { cookies } from "next/headers";
import { db } from "./supabase";
import { VotingDataResponse } from "@/types/types";
import axios, { AxiosError } from "axios";
import { setCachedData } from "./cache";

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
    .select("full_name, code, category_id, event_id, id")
    .eq("code", code)
    .single();

  const { data: nomineeCategory } = await db
    .from("categories")
    .select("category_name")
    .eq("id", nominee?.category_id!)
    .single();

  const { data: nomineeEvent } = await db
    .from("events")
    .select("voting_period")
    .eq("id", nominee?.event_id!)
    .single();

  if (nomineeError) throw new Error(nomineeError.message);

  return { nominee, nomineeCategory, nomineeEvent };
};

interface votesDataProps {
  nominee_id: string | null | undefined;
  event_id: string | null | undefined;
  count: number | null | undefined;
  amount_payable: number | null | undefined;
}
export async function createOrUpdateVote(voteData: votesDataProps) {
  const { nominee_id, count, amount_payable, event_id } = voteData;

  const { data, error } = await db
    .from("voting")
    .select("*")
    .eq("nominee_id", nominee_id as string);

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
      .eq("nominee_id", nominee_id as string);

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

interface JuniPayProps {
  votingData: {
    nominee_id: string;
    event_id: string;
    count: number;
    amount_payable: number;
  };
}

export async function juniPay(
  amount: number,
  total_amount: number,
  provider: string,
  phoneNumber: string,
  description: string,
  token: string,
  votingData: JuniPayProps["votingData"]
) {
  let callbackUrl = "https://www.jed-event.com/api/jed-callback";
  let senderEmail = "info.jedvotes@gmail.com";
  let channel = "mobile_money";
  let foreignID = Date.now().toString();
  let payload = {
    amount: amount,
    tot_amnt: total_amount,
    provider: provider.toLocaleLowerCase(),
    phoneNumber: phoneNumber,
    description: description,
    callbackUrl: callbackUrl,
    senderEmail: senderEmail,
    channel: channel,
    foreignID: foreignID,
  };

  const config = {
    method: "POST",
    url: "https://api.junipayments.com/payment",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${token}`,
      clientid: `Ih11176`,
    },
    data: payload,
  };

  try {
    const response = await axios(config);
    console.log("junipay", response.data);
    // const { data, error } = await db
    //   .from("transactions")
    //   .insert([{ ...votingData, trans_id: response.data.transID }])
    //   .select();

    // if (!error) {
    //   return data;
    // }

    // Cache the transaction data before processing payment

    const transactionData = {
      nominee_id: votingData.nominee_id,
      event_id: votingData.event_id,
      count: votingData.count,
      amount_payable: votingData.amount_payable,
    };

    await setCachedData(
      `transactionData-${response.data.transID}`,
      transactionData
    );
    // console.log(
    //   "SET CACHED IN JUNIPAY FUNC:",
    //   `transactionData-${response.data.transID}`,
    //   transactionData
    // );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error response data:", error.response?.data);
    } else {
      console.error("Error:", error);
    }
    return {
      status: "failed",
    };
  }
}
