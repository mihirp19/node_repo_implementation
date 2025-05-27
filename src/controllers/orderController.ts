// controllers/orderController.ts

import { Request, Response } from "express";
import { OrderService } from "../services/orderService";
import { OrderRepository } from "../repository/orderRepository";

const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, totalAmount } = req.body;
    const order = await orderService.createOrder({
      userId,
      totalAmount,
      status: "pending",
    });
    res.status(201).json(order);
  } catch (err: any) {
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
  console.log(req.body);
  try {
    const updated = await orderService.update(id, status);
    res.status(200).json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
