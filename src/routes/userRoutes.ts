import { Router } from "express";
import {
  deleteUser,
  getUserByEmail,
  getUsers,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/userController";
import { validate } from "../middleware/validate";
import {
  createUserSchema,
  loginSchema,
  updateUserSchema,
} from "../schemas/userSchema";
import { checkRole } from "../middleware/checkRole";
import authMiddleware from "../middleware/authMiddleware";

const userRouter = Router();
userRouter.get("/", getUsers);
userRouter.get("/:email", getUserByEmail);
userRouter.post(
  "/",
  authMiddleware,
  validate(createUserSchema),
  checkRole(["admin"]),
  registerUser
);
userRouter.post("/login", validate(loginSchema), loginUser);
userRouter.put(
  "/:id",
  authMiddleware,
  validate(updateUserSchema),
  checkRole(["admin"]),
  updateUser
);
userRouter.delete("/:id", authMiddleware, checkRole(["admin"]), deleteUser);

export default userRouter;
