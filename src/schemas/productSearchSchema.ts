import { number, string, z } from "zod";

export const productSearchSchema = z.object({
  search: z.string().optional().default(""),
  sortBy: z.enum(["title", "price", "createdAt", "category"]).optional(),
  sortOrder: z.enum(["ASC", "DESC"]).optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).optional(),
  category: z.array(string()).optional(),
  price: z
    .object({
      lte: z.number().positive().optional(),
      gte: z.number().positive().optional(),
    })
    .optional(),
  date: z
    .object({
      lte: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
    })
    .optional(),
});
