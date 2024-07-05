import { calculateCommission } from "@/constants/commission_rate";
import { CreditCard, Truck, BadgeDollarSign, BanknoteIcon } from "lucide-react";

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
  const total_revenue = cardData.revenue_generated?.reduce(
    (a: number, b: number) => a + b,
    0
  );
  const afterDeduction = calculateCommission(total_revenue);

  const cardsdetails = [
    {
      id: 1,
      title: "Earnings Today",
      icon: <BadgeDollarSign size={20} className="text-secondary" />,
      value: 1500,
      bottomtext: "Updated after every successful voting.",
    },

    {
      id: 3,
      title: "Revenue Generated",
      icon: <CreditCard size={20} className="text-secondary" />,
      value: cardData.revenue_generated?.reduce(
        (a: number, b: number) => a + b,
        0
      ),
      bottomtext: "Earnings from all events.",
    },
    {
      id: 4,
      title: "Total Earnings",
      icon: <BanknoteIcon size={20} className="text-secondary" />,
      value:
        cardData.revenue_generated?.reduce((a: number, b: number) => a + b, 0) -
        afterDeduction,
      bottomtext: "Withdrawable earnings",
    },
  ];
  return (
    <section className=" flex flex-col flex-wrap md:flex-row gap-4">
      <div className="rounded-lg flex-grow min-w-[18rem] p-4 bg-primary text-white border">
        <span className=" flex justify-between items-center">
          <p className=" text-sm">Ongoing events</p>
          <p className=" p-1 bg-secondary rounded-md">
            <Truck size={20} className="text-primary" />
          </p>
        </span>
        <p className=" text-2xl my-2">{liveEvents.length}</p>
        <small className=" text-white/80">
          Updated after every event publish.
        </small>
      </div>
      {cardsdetails.map((item) => {
        return (
          <div
            key={item.id}
            className="rounded-lg flex-grow min-w-[18rem] p-4 bg-gray-50 border"
          >
            <span className=" flex justify-between items-center">
              <p className=" text-sm">{item.title}</p>
              <p className=" p-1 bg-gray-200 rounded-md">{item.icon}</p>
            </span>
            <p className=" text-2xl my-2">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "GHC",
              }).format(Number(item.value))}
            </p>
            <small className=" text-gray-600">{item.bottomtext}</small>
          </div>
        );
      })}
    </section>
  );
}
