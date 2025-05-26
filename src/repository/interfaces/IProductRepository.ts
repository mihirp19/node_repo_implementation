import { Product } from "../../entities/Product";

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  create(product: Product): Promise<Product | null>;
  findOne(id: string): Promise<Product | null>;
  update(id: string, product: Partial<Product>): Promise<Product | null>;
  delete(id: string): Promise<Product | null>;
}
