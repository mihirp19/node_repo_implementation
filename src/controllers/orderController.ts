import { Request, Response } from "express";
import { OrderService } from "../services/orderService";
import { OrderRepository } from "../repository/orderRepository";
import { ItemService } from "../services/itemService";
import { ItemRepository } from "../repository/itemRepository";
import { ProductRepository } from "../repository/productRepository";

const orderRepository = new OrderRepository();
const productRepository = new ProductRepository();
const itemRepository = new ItemRepository();

const itemService = new ItemService(itemRepository, productRepository);
const orderService = new OrderService(orderRepository, itemService);

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, items } = req.body;
    const order = await orderService.createOrder({
      userId,
      items,
    });
    res.status(201).json(order);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getAllOrders = async (_req: Request, res: Response) => {
  const orders = await orderService.getAllOrders();
  res.status(200).json(orders);
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updated = await orderService.update(id, status);
    res.status(200).json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
