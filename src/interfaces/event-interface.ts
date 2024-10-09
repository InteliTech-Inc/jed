export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

interface Event {
  id: string;
  name: string;
  description: string;
  img_url: string;
  img_public_id: string;
  is_completed: boolean;
  amount_per_vote: string;
  nomination_period: Period;
  voting_period: Period;
  created_at: string;
  user_id: string;
  Categories: Category[];
}

interface EventResponse {
  next?: null | string;
  previous?: null | string;
  result: Event[];
  count?: number;
}

export type { EventResponse, Event };
