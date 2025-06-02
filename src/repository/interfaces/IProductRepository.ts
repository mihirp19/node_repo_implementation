import { Product } from "../../entities/Product";

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  create(product: Product): Promise<Product | null>;
  findOne(id: string): Promise<Product | null>;
  update(id: string, product: Partial<Product>): Promise<Product | null>;
  delete(id: string): Promise<Product | null>;
  productSearch(
    search: string,
    sortBy: string,
    sortOrder: "ASC" | "DESC",
    page: number,
    limit: number,
    category: string[],
    price: { lte: number; gte: number },
    date: { lte: Date | string; gte: Date | string }
  ): Promise<{ products: Product[]; count: number }>;
  categoryCount(): Promise<{ title: string; count: number }[]>;
  increaseStock(id: string, quantity: number): Promise<Product | null>;
  decreaseStock(id: string, quantity: number): Promise<Product | null>;
}
