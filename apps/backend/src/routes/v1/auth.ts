import { Router } from "express";
import { handleCreateAccount } from "../../controller/auth";

const router: Router = Router();

router.post("/signup", handleCreateAccount);

export { router as AuthRoutes };
