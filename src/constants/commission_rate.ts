"use server";
import { client } from "@/client";
import { commissionQuery } from "@/lib/query";

const calculateCommission = async (revenue: number): Promise<number> => {
  const rate = await client.fetch(
    commissionQuery,
    {},
    { next: { revalidate: 0 } }
  );

  const conversion = rate[0].commission / 100;
  return revenue * conversion;
};

async function totalWithdrawal(
  revenue: number,
  afterdeduction: number
): Promise<number> {
  const total = revenue - afterdeduction;

  return total;
}

export { calculateCommission, totalWithdrawal };
