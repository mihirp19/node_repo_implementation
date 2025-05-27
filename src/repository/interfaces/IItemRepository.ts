import { Item } from "../../entities/Item";

export interface IItemRepository {
  create(itemData: Partial<Item>): Promise<Item>;
  findById(itemId: string): Promise<Item | null>;
  deleteById(id: string): Promise<void>;
}
