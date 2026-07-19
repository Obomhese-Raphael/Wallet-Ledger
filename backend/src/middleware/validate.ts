import type { NextFunction, Request, Response } from "express";
import * as z from "zod";

const validate =
  (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.issues,
      });
    }

    req.body = result.data;

    next();
  };

export default validate;
