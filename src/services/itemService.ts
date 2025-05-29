import { IItemRepository } from "../repository/interfaces/IItemRepository";
import { IProductRepository } from "../repository/interfaces/IProductRepository";
import { Item } from "../entities/Item";

export class ItemService {
  constructor(
    private itemRepository: IItemRepository,
    private productRepository: IProductRepository
  ) {}
  // get items pending
  async getItemService(): Promise<Item[]> {
    const items = await this.itemRepository.findAll();
    return items;
  }
  async getItemByIdService(id: string): Promise<Item | null> {
    const item = await this.itemRepository.findById(id);
    if (!item) return null;
    return item;
  }
  async createItemService(itemData: {
    orderId: string;
    productId: string;
    quantity: number;
  }): Promise<Item> {
    const { orderId, productId, quantity } = itemData;

    const product = await this.productRepository.findOne(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    if (product.stock < quantity) {
      throw new Error("Out of stock");
    }

    await this.productRepository.decreaseStock(productId, quantity);

    const price = product.price;
    const totalPrice = parseFloat((price * quantity).toFixed(2));

    const item = await this.itemRepository.create({
      orderId,
      productId,
      quantity,
      price,
      totalPrice,
    });

    return item;
  }
  async removeItemService(itemId: string) {
    const item = await this.itemRepository.findById(itemId);
    if (!item) throw new Error("Item not found");
    const product = await this.productRepository.findOne(item.productId);
    if (!product) {
      throw new Error(`Product with ID ${item.productId} not found`);
    }
    await this.productRepository.increaseStock(item.productId, item.quantity);
    await this.itemRepository.deleteById(itemId);
  }
}
