import { IOrderRepository } from "./interfaces/IOrderRepository";
import { OrderModel } from "../models/OrderModel";
import { Order } from "../entities/Order";

export class OrderRepository implements IOrderRepository {
  async create(orderData: Order): Promise<Order> {
    const order = await OrderModel.create(orderData);
    if (!order) {
      throw new Error("Failed to create order");
    }
    return order.toJSON() as Order;
  }

  async findById(id: string): Promise<Order | null> {
    const order = await OrderModel.findByPk(id);
    return order ? (order.toJSON() as Order) : null;
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll();
    return orders.map((o) => o.toJSON() as Order);
  }

  async update(id: string, status: string): Promise<Order | null> {
    const order = await OrderModel.findByPk(id);
    if (!order) return null;
    order.status = status as any;
    await order.save();
    return order.toJSON() as Order;
  }
}
