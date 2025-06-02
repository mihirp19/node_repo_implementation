import { IProductRepository } from "../repository/interfaces/IProductRepository";
import { Product } from "../entities/Product";
import moment = require("moment");
import { ProductModel } from "../models/ProductModel";

interface CreateProductDTO {
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

interface UpdateProductDTO {
  title?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
}

export class ProductService {
  constructor(private productRepository: IProductRepository) {}
  // Get Products Service
  async getAllProductsService(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
  async getProductById(id: string): Promise<Product | null> {
    return this.productRepository.findOne(id);
  }
  // Search Products Service
  async getProductsBySearchService(
    search: string,
    sortBy: string,
    sortOrder: "ASC" | "DESC",
    page: number,
    limit: number,
    category: string[],
    price: { lte: number; gte: number },
    date: { lte: Date | string; gte: Date | string }
  ): Promise<{ products: Product[]; pagination: any }> {
    const { products, count } = await this.productRepository.productSearch(
      search,
      sortBy,
      sortOrder,
      page,
      limit,
      category,
      price,
      date
    );
    const formattedDate = products.map((p) => {
      return {
        id: p.id,
        title: p.title,
        description: p.description,
        price: p.price,
        category: p.category,
        stock: p.stock,
        createdAt: moment(p.createdAt).format("ddd, MMMM D, YYYY"),
        updatedAt: moment(p.updatedAt).format("ddd, MMMM D, YYYY"),
      };
    });
    const pagination = {
      totalRecords: count,
      page,
      totalPages: Math.ceil(count / limit),
      limit,
    };

    return { products: formattedDate, pagination };
  }

  async getCategoryCountService() {
    return this.productRepository.categoryCount();
  }
  // Add New Product Service
  async addProduct(product: CreateProductDTO): Promise<Product | null> {
    const newProduct: Omit<Product, "id"> = {
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
    };
    return this.productRepository.create(newProduct);
  }
  // Update Product Service
  async updateProduct(
    id: string,
    productData: UpdateProductDTO
  ): Promise<Product | null> {
    return this.productRepository.update(id, productData);
  }
  // Delete Product Service
  async deleteProduct(id: string): Promise<Product | null> {
    return this.productRepository.delete(id);
  }
  // Decrease Product Stock Service
  async decreaseProductStockService(
    id: string,
    quantity: number
  ): Promise<Product | null> {
    return this.productRepository.decreaseStock(id, quantity);
  }
  // Increase Product Stock Service
  async increaseProductStockService(
    id: string,
    quantity: number
  ): Promise<Product | null> {
    return this.productRepository.increaseStock(id, quantity);
  }
}
