import { Order } from "../../entities/Order";

export interface IOrderRepository {
  create(order: Order): Promise<Order | null>;
  findById(id: string): Promise<Order | null>;
  findByUser(userId: string): Promise<Order[]>;
  update(id: string, data: Partial<Order>): Promise<Order | null>;
  delete(id: string): Promise<Order | null>;
}
