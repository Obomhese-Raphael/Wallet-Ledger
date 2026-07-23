import { z } from "zod";

export const historySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),

  type: z.enum(["deposit", "withdraw", "transfer"]).optional(),

  reference: z.string().optional(),

  startDate: z.string().optional(),

  endDate: z.string().optional(),

  sort: z.enum(["newest", "oldest"]).default("newest"),
});
