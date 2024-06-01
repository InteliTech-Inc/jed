import { StaticImageData } from "next/image";

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

export type { Post, Nominee, Category_sup, EditNominee, NominationsResponse };
