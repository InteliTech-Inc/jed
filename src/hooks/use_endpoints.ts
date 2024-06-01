import useAuthAxios from "./use_auth_axios";

export default function useEndpoints() {
  const authAxios = useAuthAxios();

  const getEventById = async (eventId: string) => {
    const { data } = await authAxios.get(`/events?id=eq.${eventId}`);
    return data;
  };

  const getEventByUserId = async (userId: string) => {
    const { data } = await authAxios.get(`/events?user_id=eq.${userId}`);
    return data;
  };

  //   const uploadImage = async () => {
  //     const { data } = await authAxios.post(`/events`);
  //     return data;
  //   };

  return { getEventById };
}
