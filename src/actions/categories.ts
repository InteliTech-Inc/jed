import axios from "@/lib/axios";

const fetchAllCategories = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/category`
  );
  const data = response.data;
  return data;
};

const fetchCategory = async (id: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/category/${id}`
  );
  const data = response.data;
  return data;
};

export { fetchAllCategories, fetchCategory };
