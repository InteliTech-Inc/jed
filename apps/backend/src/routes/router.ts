import { Router } from "express";
import { VERSION_ONE_ROUTER } from "./v1";

const router: Router = Router();

router.use("/api/v1", VERSION_ONE_ROUTER);

export default router;
