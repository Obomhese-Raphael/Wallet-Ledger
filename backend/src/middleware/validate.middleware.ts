import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { errorResponse } from "../utils/apiResponse.js";

export const validate =
  (schema: z.ZodTypeAny) =>
    (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return errorResponse(
        res,
        "Validation failed",
        400,
        result.error.issues
      );
    }

    req.body = result.data;

    next();
  };
