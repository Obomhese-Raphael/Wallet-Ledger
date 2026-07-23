import * as z from "zod";

export const transferSchema = z.object({
  recipientEmail: z.email(),
  amount: z.number().positive(),
});
