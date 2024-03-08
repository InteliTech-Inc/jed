import { log } from "@repo/logger";
import mongoose from "mongoose";
import { createServer } from "./server";

const PORT = process.env.PORT || 8000;
const server = createServer();


void (async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    log("Database connected!");
  } catch (err) {
    log(err);
  }
  server.listen(PORT, () => {
    log(`app running on ${PORT}`);
  });
})();
