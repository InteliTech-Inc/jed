import axios, { AxiosError } from "axios";

export interface votesData {
  nominee_id: string | undefined;
  event_id: string | undefined;
  count: number;
  amount_payable: string | undefined;
}

interface updatedData {
  id: string;
  count: number;
  amount_payable: string;
}

export const getVotingRecord = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/voting`
    );
    const data = response.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
      return null;
    }
  }
};

export const updateVotingRecord = async (payloads: updatedData) => {
  try {
    const updatedResponse = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/voting/${payloads.id}`,
      {
        count: Number(payloads.count),
        amount_payable: String(payloads.amount_payable),
      }
    );

    const data = updatedResponse.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
      return null;
    }
  }
};

export const createVotingRecord = async (payload: votesData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/voting`,
      payload
    );
    const data = response.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
      return null;
    }
  }
};
