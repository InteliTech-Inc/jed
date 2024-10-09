import axios from "@/lib/axios";

const fetchAllEvent = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events`);
  const data = response.data;
  return data;
};

const fetchEvent = async (id: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/events/${id}`
  );
  const data = response.data;
  return data;
};

export { fetchAllEvent, fetchEvent };
