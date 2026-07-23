import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import { deposit, getHistory, getTransaction } from "../controllers/transaction.controller.js";
import { depositSchema } from "../validators/transaction.validator.js";
import { historySchema } from "../validators/history.validators.js";

const router = Router();

router.post(
  "/deposit",
  protect,
  validate(depositSchema),
  deposit
);

router.get(
  "/",
  protect,
  validate(historySchema, "query"),
  getHistory
);

router.get(
  "/:id",
  protect,
  getTransaction
);

export default router;