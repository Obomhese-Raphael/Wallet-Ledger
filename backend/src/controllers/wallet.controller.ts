import type { Request, Response } from "express";

import { successResponse } from "../utils/apiResponse.js";
import { depositMoney } from "../services/transaction.service.js";

export const deposit = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const transaction = await depositMoney(user._id.toString(), req.body.amount);

  return successResponse(res, "Deposit successful", transaction);
};
