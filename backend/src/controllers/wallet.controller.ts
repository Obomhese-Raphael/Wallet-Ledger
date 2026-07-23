import type { Request, Response } from "express";

import { errorResponse, successResponse } from "../utils/apiResponse.js";
import {
  depositMoney,
  withdrawMoney,
} from "../services/transaction.service.js";
import Account from "../models/account.model.js";
import { getAccountBalance } from "../services/balance.service.js";
import { transferMoney } from "../services/transaction.service.js";

export const deposit = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const transaction = await depositMoney(user._id.toString(), req.body.amount);

  return successResponse(res, "Deposit successful", transaction);
};

export const getBalance = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const account = await Account.findOne({
    ownerType: "USER",
    ownerId: user._id.toString(),
    type: "WALLET",
  });

  if (!account) {
    return errorResponse(res, "Account not found", 404);
  }

  const entries = await getAccountBalance(account._id.toString());

  return successResponse(res, "Ledger Entries Retrieved", entries);
};
