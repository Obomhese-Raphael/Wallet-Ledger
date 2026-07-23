import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.js";

import { deposit, getBalance } from "../controllers/wallet.controller.js";

import { depositSchema, withdrawSchema } from "../validators/wallet.validator.js";
import { transferSchema } from "../validators/transaction.validator.js";
import { transfer, withdraw } from "../controllers/transaction.controller.js";

const router = Router();

// Deposit money into wallet
router.post("/deposit", protect, validate(depositSchema), deposit);
// Get the Account Balance
router.get("/balance", protect, getBalance)
// Withraw an Amount
router.post("/withdraw", protect, validate(withdrawSchema), withdraw)
// Transfer an amount
router.post("/transfer", protect , validate(transferSchema), transfer)

export default router;
