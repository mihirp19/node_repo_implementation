import { IProductRepository } from "./interfaces/IProductRepository";
import { Product } from "../entities/Product";
import { ProductModel } from "../models/ProductModel";
import { Op, Sequelize } from "sequelize";

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
  async productSearch(
    search: string,
    sortBy: string,
    sortOrder: "ASC" | "DESC",
    page: number,
    limit: number,
    category: string[],
    price: { lte: number; gte: number },
    date: { lte: Date | string; gte: Date | string }
  ): Promise<{ products: Product[]; count: number }> {
    let whereClause: any = {};
    const offset = (page - 1) * limit;

    if (search && search !== "") {
      whereClause = {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            category: {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            description: {
              [Op.iLike]: `%${search}%`,
            },
          },
        ],
      };
    }

    if (category.length > 0) {
      whereClause = {
        [Op.and]: [
          {
            category: {
              [Op.in]: category,
            },
          },
        ],
        ...whereClause,
      };
    }
    if (!isNaN(price.gte) && !isNaN(price.lte)) {
      whereClause.price = {
        [Op.lte]: price.lte,
        [Op.gte]: price.gte,
      };
    } else if (!isNaN(price.gte) && !price.lte) {
      whereClause.price = {
        [Op.gte]: price.gte,
      };
    } else if (!isNaN(price.lte) && !price.gte) {
      whereClause.price = {
        [Op.lte]: price.lte,
      };
    }

    if (date && date.gte && date.lte) {
      whereClause.createdAt = {
        [Op.lte]: date.lte,
        [Op.gte]: date.gte,
      };
    } else if (date.gte && !date.lte) {
      whereClause.createdAt = {
        [Op.gte]: date.gte,
      };
    } else if (date.lte && !date.gte) {
      whereClause.createdAt = {
        [Op.lte]: date.lte,
      };
    }

    const { rows, count } = await ProductModel.findAndCountAll({
      where: whereClause,
      order: [[sortBy, sortOrder]],
      limit,
      offset,
    });
    // pagination: { totalPages:, page, limit, total:}
    return { products: rows, count };
  }
  async categoryCount(): Promise<{ title: string; count: number }[]> {
    const results = await ProductModel.findAll({
      attributes: [
        ["category", "title"],
        [Sequelize.fn("COUNT", Sequelize.col("category")), "count"],
      ],
      group: ["category"],
      raw: true,
    });

    return results as unknown as { title: string; count: number }[];
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
