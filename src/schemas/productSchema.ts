import { z } from "zod";

export const addProductSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().min(1),
  stock: z.number().int().nonnegative("Stock cannot be negative"),
});

export const updateProductSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().min(1).max(1000).optional(),
  price: z.number().positive("Price must be a positive number").optional(),
  category: z.string().min(1).optional(),
  stock: z.number().int().nonnegative("Stock cannot be negative").optional(),
});
