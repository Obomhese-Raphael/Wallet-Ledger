import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";
import { getUserByEmail } from "../controllers/user.controller.js";

const router = Router();

router.get("/find", protect, getUserByEmail);

export default router;
