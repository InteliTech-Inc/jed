import { useEffect } from "react";
import axios from "@/lib/axios";

const useAuthAxios = () => {
  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      (config) => {
        if (!config.headers.apiKey || !config.headers.Authorization) {
          config.headers.apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
          config.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(requestIntercept);
    };
  }, []);
  return axios;
};

export default useAuthAxios;
