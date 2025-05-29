import { Router } from "express";
import { addItem, getItems, removeItem } from "../controllers/itemController";
const itemRouter = Router();

itemRouter.get("/", getItems);
itemRouter.post("/", addItem);
itemRouter.delete("/:id", removeItem);
export default itemRouter;
