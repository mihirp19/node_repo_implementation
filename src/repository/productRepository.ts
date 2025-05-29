import { IProductRepository } from "./interfaces/IProductRepository";
import { Product } from "../entities/Product";
import { ProductModel } from "../models/ProductModel";
import { Op } from "sequelize";

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
  // Search Product
  async productSearch(product: Partial<Product>): Promise<Product[]> {
    const whereClause: any = {};

    if (product.title) {
      whereClause.title = { [Op.iLike]: `%${product.title}%` };
    }
    if (product.category) {
      whereClause.category = { [Op.iLike]: `%${product.category}%` };
    }

    return await ProductModel.findAll({ where: whereClause });
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
  // Decrease Product stock
  async decreaseStock(id: string, quantity: number): Promise<Product | null> {
    const product = await ProductModel.findByPk(id);
    if (!product || product.stock < quantity) return null;
    product.stock -= quantity;
    await product.save();
    return product.toJSON() as Product;
  }
  // Increase Product stock
  async increaseStock(id: string, quantity: number): Promise<Product | null> {
    const product = await ProductModel.findByPk(id);
    if (!product) return null;
    product.stock += quantity;
    await product.save();
    return product.toJSON() as Product;
  }
}
