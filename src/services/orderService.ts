import { IOrderRepository } from "../repository/interfaces/IOrderRepository";
import { Order } from "../entities/Order";
import { ItemService } from "./itemService";

export class OrderService {
  constructor(
    private orderRepository: IOrderRepository,
    private itemService: ItemService
  ) {}

  async createOrder(data: {
    userId: string;
    items: {
      productId: string;
      quantity: number;
    }[];
  }): Promise<Order | null> {
    const { userId, items } = data;
    const order = await this.orderRepository.create({
      userId,
      status: "pending",
      totalAmount: 0,
    });
    if (!order || !order.id) throw new Error("Order not found");
    let totalAmount = 0;
    for (const item of items) {
      const createdItem = await this.itemService.createItemService({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
      });
      totalAmount += createdItem.totalPrice;
    }
    order.totalAmount = totalAmount;

    return await this.orderRepository.updateTotalAmount(
      order.id,
      order.totalAmount
    );
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async update(id: string, status: string): Promise<Order | null> {
    return this.orderRepository.update(id, status);
  }
  async updateTotalAmount(
    id: string,
    totalAmount: number
  ): Promise<Order | null> {
    return this.orderRepository.updateTotalAmount(id, totalAmount);
  }
}
