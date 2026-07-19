import type { Request, Response } from "express";
import { registerUser } from "../services/auth.service.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import AppError from "../utils/AppError.js";
import { loginUser } from "../services/auth.service.js";
import { createWallet } from "../services/wallet.service.js";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    await createWallet(user._id.toString());
    return successResponse(res, "User registered successfully", user, 201);
  } catch (error) {
    if (error instanceof AppError) {
      return errorResponse(res, error.message, error.statusCode);
    }

    return errorResponse(res, "Internal Server Error", 500);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = await loginUser(req.body);

    return successResponse(res, "Login successful", data);
  } catch (error) {
    if (error instanceof AppError) {
      return errorResponse(res, error.message, error.statusCode);
    }

    return errorResponse(res, "Internal Server Error", 500);
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  return successResponse(res, "Current user retrieved successfully", req.user);
};
