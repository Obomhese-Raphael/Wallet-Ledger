import type { Request, Response } from "express";
import { successResponse } from "../utils/apiResponse.js";

export const healthController = (_req: Request, res: Response) => {
    return successResponse(
        res,
        "Wallet Ledger API is healthy"
    );
};
