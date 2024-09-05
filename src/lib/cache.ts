import redisClient from "./redisClient";

const CACHE_DURATION = 1200; // Cache duration in seconds

export const getCachedData = async (key: string) => {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
};

export const setCachedData = async (key: string, value: any) => {
  await redisClient.setEx(key, CACHE_DURATION, JSON.stringify(value));
  console.log(`Set cache: ${key} ->`, value);
};
