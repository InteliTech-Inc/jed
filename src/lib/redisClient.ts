import { createClient } from "redis";

const getUrl = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }

  throw new Error("REDIS_URL is not defined");
};

const redisClient = createClient({
  url: getUrl(),
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
  await redisClient.connect();
})();

export default redisClient;
