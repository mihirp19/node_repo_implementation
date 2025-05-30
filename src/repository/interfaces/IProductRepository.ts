import { Product } from "../../entities/Product";

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  create(product: Product): Promise<Product | null>;
  findOne(id: string): Promise<Product | null>;
  update(id: string, product: Partial<Product>): Promise<Product | null>;
  delete(id: string): Promise<Product | null>;
  productSearch(product: Partial<Product>): Promise<Product[]>;
  increaseStock(id: string, quantity: number): Promise<Product | null>;
  decreaseStock(id: string, quantity: number): Promise<Product | null>;
}
