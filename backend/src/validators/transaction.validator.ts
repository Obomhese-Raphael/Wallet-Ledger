import { z } from "zod";

export const depositSchema = z.object({
  amount: z
    .number({
      error: "Amount is required",
    })
    .positive("Amount must be greater than zero"),
});
