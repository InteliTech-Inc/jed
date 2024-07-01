type Category = {
  id: string;
  category_name: string;
};

type Nominee = {
  id: string;
  nominee_name: string;
  category_id: string;
  nominee_code: string;
  total_votes: number;
};

export type EventType = {
  id: string;
  name: string;
  voting_period: {
    start_date: string;
    end_date: string;
  };
  categories: Category[];
  nominees: Nominee[];
};

export const events: EventType[] = [
  {
    id: "event1",
    name: "Tech Innovators Awards",
    voting_period: {
      start_date: "2024-06-01",
      end_date: "2024-06-31",
    },
    categories: [
      { id: "cat_1", category_name: "Best Startup" },
      {
        id: "cat_2",
        category_name: "Best Innovator",
      },
      { id: "cat_3", category_name: "Best Product" },
      { id: "cat_4", category_name: "Best CEO" },
      { id: "cat_5", category_name: "Best App" },
    ],
    nominees: [
      {
        id: "nom_1",
        nominee_name: "TechVision",
        category_id: "cat_1",
        nominee_code: "N1",
        total_votes: 1200,
      },
      {
        id: "nom_2",
        nominee_name: "InnoWave",
        category_id: "cat_1",
        nominee_code: "N2",
        total_votes: 1700,
      },
      {
        id: "nom_3",
        nominee_name: "NextGen Solutions",
        category_id: "cat_1",
        nominee_code: "N3",
        total_votes: 5000,
      },
      {
        id: "nom_4",
        nominee_name: "EcoTech",
        category_id: "cat_1",
        nominee_code: "N4",
        total_votes: 900,
      },
      {
        id: "nom_5",
        nominee_name: "FutureTech",
        category_id: "cat_1",
        nominee_code: "N5",
        total_votes: 1800,
      },
      {
        id: "nom_6",
        nominee_name: "Innovator X",
        category_id: "cat_2",
        nominee_code: "N6",
        total_votes: 1300,
      },
      {
        id: "nom_7",
        nominee_name: "Pioneer Y",
        category_id: "cat_2",
        nominee_code: "N7",
        total_votes: 1800,
      },
      {
        id: "nom_8",
        nominee_name: "Trendsetter Z",
        category_id: "cat_2",
        nominee_code: "N8",
        total_votes: 2100,
      },
      {
        id: "nom_9",
        nominee_name: "Visionary V",
        category_id: "cat_2",
        nominee_code: "N9",
        total_votes: 1500,
      },
      {
        id: "nom_10",
        nominee_name: "Creator C",
        category_id: "cat_2",
        nominee_code: "N10",
        total_votes: 2100,
      },
      {
        id: "nom_11",
        nominee_name: "Product A",
        category_id: "cat_3",
        nominee_code: "N11",
        total_votes: 1400,
      },
      {
        id: "nom_12",
        nominee_name: "Product B",
        category_id: "cat_3",
        nominee_code: "N12",
        total_votes: 2300,
      },
      {
        id: "nom_13",
        nominee_name: "Product C",
        category_id: "cat_3",
        nominee_code: "N13",
        total_votes: 1200,
      },
      {
        id: "nom_14",
        nominee_name: "Product D",
        category_id: "cat_3",
        nominee_code: "N14",
        total_votes: 2000,
      },
      {
        id: "nom_15",
        nominee_name: "Product E",
        category_id: "cat_3",
        nominee_code: "N15",
        total_votes: 1030,
      },
      {
        id: "nom_16",
        nominee_name: "CEO John Doe",
        category_id: "cat_4",
        nominee_code: "N16",
        total_votes: 1500,
      },
      {
        id: "nom_17",
        nominee_name: "CEO Jane Smith",
        category_id: "cat_4",
        nominee_code: "N17",
        total_votes: 1900,
      },
      {
        id: "nom_18",
        nominee_name: "CEO Emily Brown",
        category_id: "cat_4",
        nominee_code: "N18",
        total_votes: 1300,
      },
      {
        id: "nom_19",
        nominee_name: "CEO Michael Green",
        category_id: "cat_4",
        nominee_code: "N19",
        total_votes: 1200,
      },
      {
        id: "nom_20",
        nominee_name: "CEO Sarah Blue",
        category_id: "cat_4",
        nominee_code: "N20",
        total_votes: 2000,
      },
      {
        id: "nom_21",
        nominee_name: "App A",
        category_id: "cat_5",
        nominee_code: "N21",
        total_votes: 3400,
      },
      {
        id: "nom_22",
        nominee_name: "App B",
        category_id: "cat_5",
        nominee_code: "N22",
        total_votes: 4500,
      },
      {
        id: "nom_23",
        nominee_name: "App C",
        category_id: "cat_5",
        nominee_code: "N23",
        total_votes: 1500,
      },
      {
        id: "nom_24",
        nominee_name: "App D",
        category_id: "cat_5",
        nominee_code: "N24",
        total_votes: 1964,
      },
      {
        id: "nom_25",
        nominee_name: "App E",
        category_id: "cat_5",
        nominee_code: "N25",
        total_votes: 2100,
      },
    ],
  },

  {
    id: "event3",
    name: "Film Awards Gala",
    voting_period: {
      start_date: "2024-05-1",
      end_date: "2024-05-31",
    },
    categories: [
      { id: "cat_1", category_name: "Best Picture" },
      { id: "cat_2", category_name: "Best Director" },
      { id: "cat_3", category_name: "Best Actor" },
      { id: "cat_4", category_name: "Best Actress" },
      {
        id: "cat_5",
        category_name: "Best Screenplay",
      },
    ],
    nominees: [
      {
        id: "nom_1",
        nominee_name: "Movie Alpha",
        category_id: "cat_1",
        nominee_code: "F1",
        total_votes: 4100,
      },
      {
        id: "nom_2",
        nominee_name: "Movie Beta",
        category_id: "cat_1",
        nominee_code: "F2",
        total_votes: 3900,
      },
      {
        id: "nom_3",
        nominee_name: "Movie Gamma",
        category_id: "cat_1",
        nominee_code: "F3",
        total_votes: 6700,
      },
      {
        id: "nom_4",
        nominee_name: "Movie Delta",
        category_id: "cat_1",
        nominee_code: "F4",
        total_votes: 3500,
      },
      {
        id: "nom_5",
        nominee_name: "Movie Epsilon",
        category_id: "cat_1",
        nominee_code: "F5",
        total_votes: 5500,
      },
      {
        id: "nom_6",
        nominee_name: "Director Alpha",
        category_id: "cat_2",
        nominee_code: "F6",
        total_votes: 6563,
      },
      {
        id: "nom_7",
        nominee_name: "Director Beta",
        category_id: "cat_2",
        nominee_code: "F7",
        total_votes: 4300,
      },
      {
        id: "nom_8",
        nominee_name: "Director Gamma",
        category_id: "cat_2",
        nominee_code: "F8",
        total_votes: 4343,
      },
      {
        id: "nom_9",
        nominee_name: "Director Delta",
        category_id: "cat_2",
        nominee_code: "F9",
        total_votes: 5543,
      },
      {
        id: "nom_10",
        nominee_name: "Director Epsilon",
        category_id: "cat_2",
        nominee_code: "F10",
        total_votes: 3700,
      },
      {
        id: "nom_11",
        nominee_name: "Actor Alpha",
        category_id: "cat_3",
        nominee_code: "F11",
        total_votes: 5500,
      },
      {
        id: "nom_12",
        nominee_name: "Actor Beta",
        category_id: "cat_3",
        nominee_code: "F12",
        total_votes: 2323,
      },
      {
        id: "nom_13",
        nominee_name: "Actor Gamma",
        category_id: "cat_3",
        nominee_code: "F13",
        total_votes: 4300,
      },
      {
        id: "nom_14",
        nominee_name: "Actor Delta",
        category_id: "cat_3",
        nominee_code: "F14",
        total_votes: 5839,
      },
      {
        id: "nom_15",
        nominee_name: "Actor Epsilon",
        category_id: "cat_3",
        nominee_code: "F15",
        total_votes: 3900,
      },
      {
        id: "nom_16",
        nominee_name: "Actress Alpha",
        category_id: "cat_4",
        nominee_code: "F16",
        total_votes: 8998,
      },
      {
        id: "nom_17",
        nominee_name: "Actress Beta",
        category_id: "cat_4",
        nominee_code: "F17",
        total_votes: 4200,
      },
      {
        id: "nom_18",
        nominee_name: "Actress Gamma",
        category_id: "cat_4",
        nominee_code: "F18",
        total_votes: 5049,
      },
      {
        id: "nom_19",
        nominee_name: "Actress Delta",
        category_id: "cat_4",
        nominee_code: "F19",
        total_votes: 6083,
      },
      {
        id: "nom_20",
        nominee_name: "Actress Epsilon",
        category_id: "cat_4",
        nominee_code: "F20",
        total_votes: 700,
      },
      {
        id: "nom_21",
        nominee_name: "Screenplay Alpha",
        category_id: "cat_5",
        nominee_code: "F21",
        total_votes: 4600,
      },
      {
        id: "nom_22",
        nominee_name: "Screenplay Beta",
        category_id: "cat_5",
        nominee_code: "F22",
        total_votes: 5508,
      },
      {
        id: "nom_23",
        nominee_name: "Screenplay Gamma",
        category_id: "cat_5",
        nominee_code: "F23",
        total_votes: 4200,
      },
      {
        id: "nom_24",
        nominee_name: "Screenplay Delta",
        category_id: "cat_5",
        nominee_code: "F24",
        total_votes: 6000,
      },
      {
        id: "nom_25",
        nominee_name: "Screenplay Epsilon",
        category_id: "cat_5",
        nominee_code: "F25",
        total_votes: 4800,
      },
    ],
  },
];
