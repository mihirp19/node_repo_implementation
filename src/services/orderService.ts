import { IOrderRepository } from "../repository/interfaces/IOrderRepository";
import { Order } from "../entities/Order";

export class OrderService {
  constructor(private orderRepository: IOrderRepository) {}

  async createOrder(orderData: Order): Promise<Order | null> {
    return this.orderRepository.create(orderData);
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
}
