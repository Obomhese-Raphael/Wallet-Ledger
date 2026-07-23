import type { Request, Response } from "express";

import { depositMoney } from "../services/transaction.service.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";
import Account from "../models/account.model.js";
import { getTransactionDetails, getTransactionHistory } from "../services/history.service.js";

export const deposit = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const transaction = await depositMoney(user._id.toString(), req.body.amount);

  return successResponse(res, "Deposit successful", transaction, 201);
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const account = await Account.findOne({
      ownerId: user._id,
      ownerType: "USER",
      type: "WALLET",
    });

    if (!account) {
      return errorResponse(res, "Wallet account not found", 404);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await getTransactionHistory(account._id.toString(), {
      page,
      limit,
      type: req.query.type as any,
      reference: req.query.reference as string,
      startDate: req.query.startDate as string,
      endDate: req.query.endDate as string,
    });

    return successResponse(
      res,
      "Transaction history retrieved successfully",
      result,
    );
  } catch (error) {
    return errorResponse(
      res,
      error instanceof Error
        ? error.message
        : "Failed to retrieve transaction history",
      500,
    );
  }
};

export const getTransaction = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const user = (req as any).user;

    const account = await Account.findOne({
      ownerId: user._id,
      ownerType: "USER",
      type: "WALLET",
    });

    if (!account) {
      return errorResponse(res, "Wallet account not found", 404);
    }

    const transaction = await getTransactionDetails(
      req.params.id,
      account._id.toString(),
    );

    return successResponse(
      res,
      "Transaction retrieved successfully",
      transaction,
    );
  } catch (error) {
    return errorResponse(
      res,
      error instanceof Error ? error.message : "Failed to retrieve transaction",
      500,
    );
  }
};