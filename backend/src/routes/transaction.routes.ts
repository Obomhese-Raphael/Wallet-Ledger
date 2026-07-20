import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import { deposit } from "../controllers/transaction.controller.js";
import { depositSchema } from "../validators/transaction.validator.js";

const router = Router();

router.post(
  "/deposit",
  protect,
  validate(depositSchema),
  deposit
);

export default router;