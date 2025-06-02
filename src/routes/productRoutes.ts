import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProductBySearch,
  getProductById,
  getProducts,
  increaseProductStock,
  updateProduct,
  getCategoryCount,
} from "../controllers/productController";
import { validate } from "../middleware/validate";
import {
  addProductSchema,
  updateProductSchema,
} from "../schemas/productSchema";
import { checkRole } from "../middleware/checkRole";
import authMiddleware from "../middleware/authMiddleware";
import { productSearchSchema } from "../schemas/productSearchSchema";

const productRouter = Router();

productRouter.get("/filter-data", getCategoryCount);
productRouter.get("/", getProducts);
// Used for filtering, sorting and pagination
productRouter.post("/", validate(productSearchSchema), getProductBySearch);
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
