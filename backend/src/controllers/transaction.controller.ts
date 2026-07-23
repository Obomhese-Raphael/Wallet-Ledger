import { z } from "zod";
import type { Request, Response } from "express";

import { depositMoney, transferMoney, withdrawMoney } from "../services/transaction.service.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";
import Account from "../models/account.model.js";
import {
  getTransactionDetails,
  getTransactionHistory,
} from "../services/history.service.js";
import { historySchema } from "../validators/history.validators.js";

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

    const { page, limit, type, reference, startDate, endDate, sort } =
      historySchema.parse(req.query);

    const history = await getTransactionHistory({
      accountId: account._id.toString(),
      page,
      limit,

      ...(type && { type }),

      ...(reference && { reference }),

      ...(startDate && { startDate }),

      ...(endDate && { endDate }),

      ...(sort && { sort }),
    });

    return successResponse(
      res,
      "Transaction history retrieved successfully",
      history,
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

export const getTransaction = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
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

export const withdraw = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const { amount } = req.body;

    const transaction = await withdrawMoney(user._id.toString(), amount);

    return successResponse(res, "Withdrawal successful", transaction, 201);
  } catch (error) {
    return errorResponse(
      res,
      error instanceof Error ? error.message : "Withdrawal failed",
      400,
    );
  }
};

export const transfer = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const { recipientEmail, amount } = req.body;

    const transaction = await transferMoney(
      user._id.toString(),
      recipientEmail,
      amount,
    );

    return successResponse(res, "Transfer Successful", transaction, 201);
  } catch (error) {
    return errorResponse(
      res,
      error instanceof Error ? error.message : "Transfer Failed",
      400,
    );
  }
};