import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/router";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use(router)
    .get("/", (req, res) => {
      return res.json({ message: "Hello JEDVOTES API" });
    });

  return app;
};
