import { Router } from "express";

const router: Router = Router();

router.get("/", (_, res) => res.send("Hello from v1 apis"));

export { router as VERSION_ONE_ROUTER };
