import { Item } from "../entities/Item";
import { IItemRepository } from "./interfaces/IItemRepository";
import { ItemModel } from "../models/ItemModel";

export class ItemRepository implements IItemRepository {
  async create(itemData: Item): Promise<Item> {
    const item = await ItemModel.create(itemData);
    return item.toJSON();
  }
  async findAll(): Promise<Item[]> {
    const item = await ItemModel.findAll();
    return item;
  }
  async findById(itemId: string): Promise<Item | null> {
    const item = await ItemModel.findByPk(itemId);
    return item ? (item.toJSON() as Item) : null;
  }
  async deleteById(id: string): Promise<void> {
    const item = await ItemModel.findByPk(id);

    if (item) {
      await item.destroy();
    }
  }
  async updateById(id: string): Promise<void> {
    const item = await ItemModel.findByPk(id);

    if (item) {
      await item.destroy();
    }
  }
}
