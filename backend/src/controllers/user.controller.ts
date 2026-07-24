import type { Request, Response } from "express";

import { findUserByEmail } from "../services/user.service.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;

    if (!email) {
      return errorResponse(res, "Email is required", 400);
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return errorResponse(res, "User not found", 404);
    }

    return successResponse(res, "User found", user);
  } catch (error) {
    return errorResponse(res, "Internal Server Error", 500);
  }
};
