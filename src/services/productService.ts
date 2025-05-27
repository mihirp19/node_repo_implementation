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

  async getAllProductsService(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
  async getProductById(id: string): Promise<Product | null> {
    return this.productRepository.findOne(id);
  }
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
  async updateProduct(
    id: string,
    productData: UpdateProductDTO
  ): Promise<Product | null> {
    return this.productRepository.update(id, productData);
  }
  async deleteProduct(id: string): Promise<Product | null> {
    return this.productRepository.delete(id);
  }
  async decreaseProductStockService(
    id: string,
    quantity: number
  ): Promise<Product | null> {
    return this.productRepository.decreaseStock(id, quantity);
  }
  async increaseProductStockService(
    id: string,
    quantity: number
  ): Promise<Product | null> {
    return this.productRepository.increaseStock(id, quantity);
  }
}
