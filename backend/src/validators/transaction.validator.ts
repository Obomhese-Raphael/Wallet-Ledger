import { z } from "zod";

export const depositSchema = z.object({
  amount: z
    .number({ error: "Amount is required" })
    .positive("Amount must be greater than zero"),
});

export const withdrawSchema = z.object({
  amount: z
    .number({ error: "Amount is required" })
    .positive("Amount must be greater than zero"),
});

export const transferSchema = z.object({
  recipientEmail: z.email("Invalid email address"),

  amount: z
    .number({ error: "Amount is required" })
    .positive("Amount must be greater than zero"),

  description: z
    .string()
    .trim()
    .max(100, "Description cannot exceed 100 characters")
    .optional(),
});
