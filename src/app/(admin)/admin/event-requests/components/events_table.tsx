import { DataTable } from "./data_table";
import { columns, EventsResponse } from "./columns";
// import TopButtons from "./top_buttons";
import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";
const events: EventsResponse[] = [
  {
    amount_per_vote: "5.00",
    created_at: "2024-08-01T14:30:00Z",
    description: "Nomination for the Best Project Award",
    id: "nom_001",
    status: "approved",
    img_url: "https://example.com/images/nom_001.png",
    is_completed: true,
    name: "Best Project Award",
    full_name: "John Doe",
    nomination_period: {
      start_date: "2024-07-01T00:00:00Z",
      end_date: "2024-07-15T23:59:59Z",
    },
    user_id: "user_001",
    voting_period: {
      start_date: "2024-08-01T00:00:00Z",
      end_date: "2024-08-10T23:59:59Z",
    },
  },
  {
    amount_per_vote: "3.50",
    created_at: "2024-08-05T09:20:00Z",
    description: "Nomination for the Most Innovative Idea",
    id: "nom_002",
    status: "pending",
    img_url: "https://example.com/images/nom_002.png",
    is_completed: false,
    name: "Most Innovative Idea",
    full_name: "Jane Smith",
    nomination_period: {}, // Optional, empty object
    user_id: "user_002",
    voting_period: {
      start_date: "2024-08-05T00:00:00Z",
      end_date: "2024-08-15T23:59:59Z",
    },
  },
  {
    amount_per_vote: null,
    created_at: "2024-08-10T11:45:00Z",
    description: "Nomination for the Leadership Excellence Award",
    id: "nom_003",
    status: "declined",
    img_url: null,
    is_completed: true,
    name: "Leadership Excellence Award",
    full_name: "Alice Johnson",
    nomination_period: {
      start_date: "2024-07-10T00:00:00Z",
      end_date: "2024-07-25T23:59:59Z",
    },
    user_id: "user_003",
    voting_period: {
      start_date: "2024-08-10T00:00:00Z",
      end_date: "2024-08-20T23:59:59Z",
    },
  },
  {
    amount_per_vote: "2.75",
    created_at: "2024-08-12T15:00:00Z",
    description: "Nomination for the Best Team Collaboration",
    id: "nom_004",
    status: "approved",
    img_url: "https://example.com/images/nom_004.png",
    is_completed: false,
    name: "Best Team Collaboration",
    full_name: "Michael Brown",
    nomination_period: {}, // Optional, empty object
    user_id: "user_004",
    voting_period: {
      start_date: "2024-08-12T00:00:00Z",
      end_date: "2024-08-22T23:59:59Z",
    },
  },
  {
    amount_per_vote: "4.00",
    created_at: "2024-08-15T10:10:00Z",
    description: "Nomination for the Rising Star Award",
    id: "nom_005",
    status: "pending",
    img_url: "https://example.com/images/nom_005.png",
    is_completed: true,
    name: "Rising Star Award",
    full_name: "Emily Davis",
    nomination_period: {
      start_date: "2024-07-15T00:00:00Z",
      end_date: "2024-07-30T23:59:59Z",
    },
    user_id: "user_005",
    voting_period: {
      start_date: "2024-08-15T00:00:00Z",
      end_date: "2024-08-25T23:59:59Z",
    },
  },
  {
    amount_per_vote: null,
    created_at: "2024-08-17T12:00:00Z",
    description: "Nomination for the Best Mentor Award",
    id: "nom_006",
    status: "approved",
    img_url: null,
    is_completed: false,
    name: "Best Mentor Award",
    full_name: "David Wilson",
    nomination_period: {}, // Optional, empty object
    user_id: "user_006",
    voting_period: {
      start_date: "2024-08-17T00:00:00Z",
      end_date: "2024-08-27T23:59:59Z",
    },
  },
  {
    amount_per_vote: "1.50",
    created_at: "2024-08-20T09:30:00Z",
    description: "Nomination for the Best Innovation in Technology",
    id: "nom_007",
    status: "declined",
    img_url: "https://example.com/images/nom_007.png",
    is_completed: true,
    name: "Best Innovation in Technology",
    full_name: "Sophia Miller",
    nomination_period: {
      start_date: "2024-07-20T00:00:00Z",
      end_date: "2024-08-05T23:59:59Z",
    },
    user_id: "user_007",
    voting_period: {
      start_date: "2024-08-20T00:00:00Z",
      end_date: "2024-08-30T23:59:59Z",
    },
  },
  {
    amount_per_vote: "3.00",
    created_at: "2024-08-22T14:00:00Z",
    description: "Nomination for the Community Service Award",
    id: "nom_008",
    status: "approved",
    img_url: "https://example.com/images/nom_008.png",
    is_completed: false,
    name: "Community Service Award",
    full_name: "James Martinez",
    nomination_period: {
      start_date: "2024-07-22T00:00:00Z",
      end_date: "2024-08-07T23:59:59Z",
    },
    user_id: "user_008",
    voting_period: {
      start_date: "2024-08-22T00:00:00Z",
      end_date: "2024-09-01T23:59:59Z",
    },
  },
  {
    amount_per_vote: "2.00",
    created_at: "2024-08-25T11:15:00Z",
    description: "Nomination for the Best Environmental Initiative",
    id: "nom_009",
    status: "pending",
    img_url: "https://example.com/images/nom_009.png",
    is_completed: true,
    name: "Best Environmental Initiative",
    full_name: "Olivia Garcia",
    nomination_period: {}, // Optional, empty object
    user_id: "user_009",
    voting_period: {
      start_date: "2024-08-25T00:00:00Z",
      end_date: "2024-09-05T23:59:59Z",
    },
  },
  {
    amount_per_vote: null,
    created_at: "2024-08-28T13:45:00Z",
    description: "Nomination for the Lifetime Achievement Award",
    id: "nom_010",
    status: "declined",
    img_url: null,
    is_completed: false,
    name: "Lifetime Achievement Award",
    full_name: "Liam Anderson",
    nomination_period: {
      start_date: "2024-07-28T00:00:00Z",
      end_date: "2024-08-12T23:59:59Z",
    },
    user_id: "user_010",
    voting_period: {
      start_date: "2024-08-28T00:00:00Z",
      end_date: "2024-09-07T23:59:59Z",
    },
  },
];

export default async function EventsTable() {
  const db = dbServer(cookies);
  //   const { data: data_nominations, error } = await db
  //     .from("nominations")
  //     .select("*, categories(category_name), events(name)")
  //     .eq("event_id", id);

  //   const { data } = await db.from("events").select("name").single();

  if (!events) return [];

  return (
    <div>
      <DataTable data={events} columns={columns} />
    </div>
  );
}
