import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters"),

  lastName: z.string().trim().min(2, "Last name must be at least 2 characters"),

  email: z.email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  phoneNumber: z.string().min(11, "Phone number is invalid"),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type LoginInput = z.infer<typeof loginSchema>;

export type RegisterInput = z.infer<typeof registerSchema>;
