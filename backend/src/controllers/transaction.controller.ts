import type { Request, Response } from "express";

import { depositMoney } from "../services/transaction.service.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";
import Account from "../models/account.model.js"
import { getTransactionHistory } from "../services/history.service.js";

export const deposit = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const transaction = await depositMoney(user._id.toString(), req.body.amount);

  return successResponse(res, "Deposit successful", transaction, 201);
};

export const getHistory = async (
  req: Request, res: Response
) => {
  try {
    // Get the authenticated user
    const user = (req as any).user
    // Find the authenticated user's wallet account
    const account = await Account.findOne({
      ownerId: user._id,
      ownerType: "USER",
      type: "WALLET"
    });

    if (!account) {
      return errorResponse(res, "Wallet account not found", 404);
    }

    // Fetch transaction history
    const transactions = await getTransactionHistory(
      account._id.toString(),
    )

    return successResponse(
      res,
      "Transaction history retrieved successfully",
      transactions,
    );
  } catch (error) {
    return errorResponse(
      res,
      error instanceof Error
        ?
        error.message
        :
        "Failed to retrieve transaction history",
      500,
    );
  }
};