import axios from "axios";
import { getServerUser } from "./server_endpoints";

const BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_REST_BASE_URL;

export default axios.create({
  baseURL: BASE_URL,
});

export const getServerSideAxios = () => {
  const defaultOptions = {
    baseURL: BASE_URL,
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.request.use(
    async (config) => {
      config.headers["apiKey"] = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      config.headers[
        "Authorization"
      ] = `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

export { getServerSideAxios as authServerAxios };
