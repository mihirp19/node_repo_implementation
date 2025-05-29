import { IProductRepository } from "../repository/interfaces/IProductRepository";
import { Product } from "../entities/Product";

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
  // Filter Products Service
  async getProductsByFilterService(
    filter: Partial<Product>
  ): Promise<Product[]> {
    return this.productRepository.productSearch(filter);
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
