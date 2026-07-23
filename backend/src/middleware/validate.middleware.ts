import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { errorResponse } from "../utils/apiResponse.js";

type ValidationTarget = "body" | "query" | "params";

// export const validate =
//   (
//     schema: z.ZodType,
//     target: ValidationTarget = "body",
//   ) =>
//     (
//       req: Request,
//       res: Response,
//       next: NextFunction
//     ) => {
//     const result = schema.safeParse(req[target]);

//     if (!result.success) {
//       return errorResponse(
//         res,
//         "Validation failed",
//         400,
//         result.error.issues
//       );
//     }

//     req[target] = result.data;

//     next();
//   };

export const validate =
  (schema: z.ZodType, target: "body" | "query" | "params" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      return errorResponse(res, "Validation failed", 400, result.error.issues);
    }

    if (target === "body") {
      req.body = result.data;
    }

    next();
  };