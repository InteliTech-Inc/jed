import { StaticImageData } from "next/image";

interface JSONObject {
  [key: string]: string;
}

export type EventsFields = {
  _id: number;
  title: string;
  description: string;
  image: StaticImageData;
  status: string;
  time: string;
  date: string;
  location: string;
};

export interface Schedule {
  start_date: string | null;
  end_date: string | null;
}

export interface Payload {
  name: string;
  description: string;
  amount_per_vote: string;
  user_id: string;
  img_file: File;
  is_completed: boolean;
  nomination_period?: string;
  voting_period: string;
}

interface Base {
  _createdAt: string;
  _updatedAt: string;
  _id: string;
  _rev: string;
  _type: string;
}

interface Post extends Base {
  author: Author;
  body: Block[];
  categories: Category[];
  mainImage: StaticImageData;
  slug: Slug;
  title: string;
  description: string;
}

interface Author extends Base {
  bio: Block[];
  image: Image;
  name: string;
  social: string;
  slug: Slug;
}

interface Image {
  _type: "image";
  asset: Reference;
}

interface Reference {
  _ref: string;
  _type: "reference";
}

interface Slug {
  _type: "slug";
  current: string;
}

interface Block {
  _key: string;
  _type: "block";
  children: Span[];
  markDefs: any[];
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote" | "code";
}

interface Span {
  _key: string;
  _type: "span";
  marks: string[];
  text: string;
}

interface Category extends Base {
  title: string;
  description: string;
}

interface MainImage {
  _type: "image";
  asset: Reference;
}

interface Title {
  _type: "title";
  current: string;
}

interface Data {
  id: string;
  full_name: string;
  category: string;
  code: string;
  img_url: string;
  event_id: string;
}

type Category_sup = {
  id: string;
  category_name: string;
};

interface Categories {
  categories: Category_sup[];
}

type Nominee = {
  data: Data;
  categories: Categories[];
};

// Define the category type
type EditNominee = {
  params: {
    id: string;
  };
};

type NominationsResponse = {
  id: string | null;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  reasons: string | null;
  created_at: string | null;
  event_id: string | null;
  categories: {
    category_name: string | null;
  } | null;
  category_id: string | null;
};

type VotingDataResponse = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  code: string;
  number_of_votes: number;
  category: string;
  img_url?: string;
};

type onSuccessReference = {
  message: string;
  redirecturl: string;
  reference: string;
  status: string;
  trans: string;
  transaction: string;
  trxref: string;
};

export type {
  Post,
  Nominee,
  Category_sup,
  EditNominee,
  NominationsResponse,
  onSuccessReference,
  VotingDataResponse,
};
