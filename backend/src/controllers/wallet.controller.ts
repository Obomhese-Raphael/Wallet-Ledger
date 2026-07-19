import type { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import { getWalletByUserId } from "../services/wallet.service.js";

export const getWallet = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const wallet = await getWalletByUserId(user._id.toString());

  if (!wallet) {
    return errorResponse(res, "Wallet not found", 404);
  }

  return successResponse(res, "Wallet fetched successfully", wallet);
};
