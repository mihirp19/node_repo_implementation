import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProductByFilter,
  getProductById,
  getProducts,
  increaseProductStock,
  updateProduct,
} from "../controllers/productController";
import { validate } from "../middleware/validate";
import {
  addProductSchema,
  updateProductSchema,
} from "../schemas/productSchema";
import { checkRole } from "../middleware/checkRole";
import authMiddleware from "../middleware/authMiddleware";

const productRouter = Router();

productRouter.get("/filter", getProductByFilter);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.post(
  "/",
  authMiddleware,
  validate(addProductSchema),
  checkRole(["admin"]),
  addProduct
);
productRouter.put(
  "/:id",
  authMiddleware,
  validate(updateProductSchema),
  checkRole(["admin"]),
  updateProduct
);
productRouter.delete(
  "/:id",
  authMiddleware,
  checkRole(["admin"]),
  deleteProduct
);
productRouter.patch(
  "/increase/:id",
  authMiddleware,
  checkRole(["admin"]),
  increaseProductStock
);

export default productRouter;
