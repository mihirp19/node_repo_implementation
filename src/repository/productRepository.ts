import { IProductRepository } from "./interfaces/IProductRepository";
import { Product } from "../entities/Product";
import { ProductModel } from "../models/ProductModel";

export class ProductRepository implements IProductRepository {
  // Create Product
  async create(product: Product): Promise<Product | null> {
    const addProduct = await ProductModel.create(product);
    return addProduct.toJSON() as Product;
  }
  // Get Products
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();
    return products.map((product) => product.toJSON() as Product);
  }
  // Get Products By Id
  async findOne(id: string): Promise<Product | null> {
    const product = await ProductModel.findOne({ where: { id } });
    return product ? (product.toJSON() as Product) : null;
  }
  // Update Product
  async update(id: string, product: Partial<Product>): Promise<Product | null> {
    const updateProduct = await ProductModel.findOne({ where: { id } });
    if (!updateProduct) return null;
    await updateProduct.update(product);
    return updateProduct.toJSON();
  }
  // Delete Product
  async delete(id: string): Promise<Product | null> {
    const delProduct = await ProductModel.findOne({ where: { id } });
    if (!delProduct) return null;
    await delProduct.destroy();
    return delProduct.toJSON();
  }
}
