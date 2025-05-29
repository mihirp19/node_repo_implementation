import { Request, Response } from "express";
import { ItemService } from "../services/itemService";
import { ItemRepository } from "../repository/itemRepository";
import { ProductRepository } from "../repository/productRepository";

const itemRepository = new ItemRepository();
const productRepository = new ProductRepository();
const itemService = new ItemService(itemRepository, productRepository);

export const getItems = async (req: Request, res: Response) => {
  const items = await itemService.getItemService();
  if (!items) {
    res.status(404).json({ message: "Items not found" });
  }
  res.status(200).json({ items });
};
export const getItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await itemService.getItemByIdService(id);
    if (!item) {
      res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ item });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const addItem = async (req: Request, res: Response) => {
  try {
    const { orderId, productId, quantity } = req.body;

    if (!orderId || !productId || !quantity) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const item = await itemService.createItemService({
      orderId,
      productId,
      quantity,
    });

    res.status(201).json({
      message: "Product added to cart",
      item,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const removeItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await itemService.removeItemService(id);
    res.status(200).json({ message: "Item removed and stock updated" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
