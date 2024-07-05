import { Calendar } from "@/components/ui/calendar";
import { addDays, subDays } from "date-fns";

type VotingSchedule = {
  Period: {
    start_date: string;
    end_date: string;
  };
};

export default function EventSchedules({ Period }: VotingSchedule) {
  const voting_period = {
    from: new Date(Period?.start_date),
    to: new Date(Period?.end_date),
  };
  return (
    <div className=" w-full h-full grid place-content-center">
      <p className=" text-center mb-3 text-sm">Voting Period </p>
      <Calendar mode="range" selected={voting_period} showOutsideDays />
    </div>
  );
}
