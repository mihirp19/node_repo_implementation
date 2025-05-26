import { Router } from "express";
import {
  deleteUser,
  getUserByEmail,
  getUsers,
  registerUser,
  updateUser,
} from "../controllers/userController";
import { validate } from "../middleware/validate";
import { createUserSchema, updateUserSchema } from "../schemas/userSchema";

const userRouter = Router();
userRouter.get("/", getUsers);
userRouter.get("/:email", getUserByEmail);
userRouter.post("/", validate(createUserSchema), registerUser);
userRouter.put("/:id", validate(updateUserSchema), updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
