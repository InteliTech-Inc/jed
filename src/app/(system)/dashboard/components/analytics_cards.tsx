"use client";
import {
  calculateCommission,
  totalWithdrawal,
} from "@/constants/commission_rate";
import { db } from "@/lib/supabase";
import { CreditCard, Truck, BanknoteIcon } from "lucide-react";
import { useEffect, useState } from "react";

type AnalyticsCardsProps = {
  liveEvents: any;
  cardData: {
    revenue_generated: any;
  };
};

export default function AnalyticsCards({
  liveEvents,
  cardData,
}: AnalyticsCardsProps) {
  const [withdrawable, setWithdrawable] = useState<number | null>(null);
  const [user, setUser] = useState<any>(null);
  const [previousRevenue, setPreviousRevenue] = useState<number | null>(null);
  const total_revenue = cardData.revenue_generated?.reduce(
    (a: number, b: number) => a + b,
    0
  );

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await db.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchWithdrawableAndRevenue = async () => {
      if (!user) return;

      // Fetch the current withdrawable amount and total revenue from the database
      const { data: record, error } = await db
        .from("payouts")
        .select("withdrawable, total_revenue")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error(
          "Error fetching withdrawable amount and total revenue:",
          error
        );
      } else if (record) {
        setWithdrawable(record.withdrawable || 0);
        setPreviousRevenue(record.total_revenue || 0);
      } else {
        console.log("No record found for the user. Inserting a new record.");
        // Insert a new record if no record is found and default it to 0
        const { data: insertData, error: insertError } = await db
          .from("payouts")
          .insert({
            user_id: user.id,
            total_revenue: 0,
            withdrawable: 0,
          });

        if (insertError) {
          console.error("Error inserting new record:", insertError);
        } else {
          console.log("New record inserted successfully:", insertData);
          setWithdrawable(0);
          setPreviousRevenue(0);
        }
      }
    };

    fetchWithdrawableAndRevenue();
  }, [user]);

  useEffect(() => {
    const updateDatabase = async () => {
      if (!user || withdrawable === null || previousRevenue === null) return;

      // Calculate the new revenue by subtracting the previous revenue from the total revenue
      const newRevenue = total_revenue - previousRevenue;
      if (newRevenue <= 0) return; // No new revenue to process

      const afterDeduction = await calculateCommission(newRevenue);

      const newWithdrawable = await totalWithdrawal(newRevenue, afterDeduction);

      // Update the existing record with the new revenue and withdrawable amount
      const { data, error } = await db
        .from("payouts")
        .update({
          total_revenue: total_revenue,
          withdrawable: withdrawable + newWithdrawable,
        })
        .eq("user_id", user.id);

      if (error) {
        console.error("Error updating database:", error);
      } else {
        console.log("Database updated successfully:", data);
        setWithdrawable(withdrawable + newWithdrawable);
        setPreviousRevenue(total_revenue); // Update previousRevenue to the current total_revenue
      }
    };

    updateDatabase();
  }, [total_revenue, user, withdrawable, previousRevenue]);

  const cardsdetails = [
    {
      id: 3,
      title: "Revenue Generated",
      icon: <CreditCard size={20} className="text-secondary" />,
      value: total_revenue,
      bottomtext: "Earnings from all events.",
    },
    {
      id: 4,
      title: "Total Earnings",
      icon: <BanknoteIcon size={20} className="text-secondary" />,
      value: parseInt(withdrawable?.toString() || "0"),
      bottomtext: "Withdrawable earnings",
    },
  ];

  return (
    <section className="flex flex-col flex-wrap md:flex-row gap-4">
      <div className="rounded-lg flex-grow min-w-[18rem] p-4 bg-primary text-white border">
        <span className="flex justify-between items-center">
          <p className="text-sm">Ongoing events</p>
          <p className="p-1 bg-secondary rounded-md">
            <Truck size={20} className="text-primary" />
          </p>
        </span>
        <p className="text-2xl my-2">{liveEvents.length}</p>
        <small className="text-white/80">
          Updated after every event publish.
        </small>
      </div>
      {cardsdetails.map((item) => (
        <div
          key={item.id}
          className="rounded-lg flex-grow min-w-[18rem] p-4 bg-gray-50 border"
        >
          <span className="flex justify-between items-center">
            <p className="text-sm">{item.title}</p>
            <p className="p-1 bg-gray-200 rounded-md">{item.icon}</p>
          </span>
          <p className="text-2xl my-2">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "GHC",
            }).format(Number(item.value))}
          </p>
          <small className="text-gray-600">{item.bottomtext}</small>
        </div>
      ))}
    </section>
  );
}
