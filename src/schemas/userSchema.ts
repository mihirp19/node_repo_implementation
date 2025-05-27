import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6, "Password must be atleast 6 characters long"),
  role: z.enum(["admin", "user"]).default("user"),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z
    .string()
    .min(6, "Password must be atleast 6 characters long")
    .optional(),
  role: z.enum(["admin", "user"]).default("user"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be atleast 6 characters long"),
});
