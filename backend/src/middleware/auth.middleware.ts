import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

import User from "../models/user.model.js";
import { errorResponse } from "../utils/apiResponse.js";

interface TokenPayload extends JwtPayload {
  id: string;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return errorResponse(res, "Unauthorized", 401);
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return errorResponse(res, "Unauthorized", 401);
    }

    // Get JWT secret
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return errorResponse(res, "JWT_SECRET is not configured", 500);
    }

    // Verify token
    const decoded = jwt.verify(token, secret) as TokenPayload;

    // Find user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return errorResponse(res, "User not found", 404);
    }

    // Attach user to request
    (req as any).user = user;

    next();
  } catch (error) {
    return errorResponse(res, "Invalid or expired token", 401);
  }
};
