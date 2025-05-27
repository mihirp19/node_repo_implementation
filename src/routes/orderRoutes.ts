// routes/orderRoutes.ts

import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController";
import authMiddleware from "../middleware/authMiddleware";
import { checkRole } from "../middleware/checkRole";

const orderRouter = Router();

orderRouter.post("/", authMiddleware, createOrder);
orderRouter.get("/", authMiddleware, checkRole(["admin"]), getAllOrders);
orderRouter.patch(
  "/:id/status",
  authMiddleware,
  checkRole(["admin"]),
  updateOrderStatus
);

export default orderRouter;
