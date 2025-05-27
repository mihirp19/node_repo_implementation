import { Order } from "../../entities/Order";

export interface IOrderRepository {
  create(order: Order): Promise<Order | null>;
  findById(id: string): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  update(id: string, status: string): Promise<Order | null>;
}
