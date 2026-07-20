import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.js";

import { deposit } from "../controllers/wallet.controller.js";

import { depositSchema } from "../validators/wallet.validator.js";

const router = Router();

// Deposit money into wallet
router.post("/deposit", protect, validate(depositSchema), deposit);

export default router;
