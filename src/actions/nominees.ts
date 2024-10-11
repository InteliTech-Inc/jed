import axios from "@/lib/axios";

const fetchAllNominees = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/nominee`
  );
  const data = response.data;
  return data;
};

const fetchNomineesByCategory = async (id: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/category/${id}`
  );
  const data = response.data;
  return data;
};

const fetchNominee = async (id: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/nominee/${id}`
  );
  const data = response.data;
  return data;
};

export { fetchAllNominees, fetchNomineesByCategory, fetchNominee };
