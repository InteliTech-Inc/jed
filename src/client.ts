import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
  projectId: "lja4ovft",
  dataset: "production",
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2024-05-01", // use current date (YYYY-MM-DD) to target the latest API version
};
export const client = createClient(config);
