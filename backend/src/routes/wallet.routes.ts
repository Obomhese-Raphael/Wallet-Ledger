import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";
import { getWallet } from "../controllers/wallet.controller.js";

const router = Router();

router.get("/", protect, getWallet);

export default router;
