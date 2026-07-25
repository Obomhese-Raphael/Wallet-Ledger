import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters."),

    lastName: z.string().min(2, "Last name must be at least 2 characters."),

    email: z.email("Please enter a valid email address."),

    phoneNumber: z
      .string()
      .min(11, "Phone number must be at least 11 digits.")
      .max(11, "Phone number must be exactly 11 digits.")
      .regex(/^\d+$/, "Phone number must contain only numbers."),

    password: z.string().min(6, "Password must be at least 6 characters."),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
