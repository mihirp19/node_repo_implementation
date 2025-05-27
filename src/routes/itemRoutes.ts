import { Router } from "express";
import { addItem, removeItem } from "../controllers/itemController";
const itemRouter = Router();

itemRouter.post("/", addItem);
itemRouter.delete("/:id", removeItem);
export default itemRouter;
