import { Router } from "express";
import { AuthRoutes } from "./auth";

const router: Router = Router();

router.get("/", (_, res) => res.send("Hello from v1 apis"));
router.use("/auth", AuthRoutes);

export { router as VERSION_ONE_ROUTER };
