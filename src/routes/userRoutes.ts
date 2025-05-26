import { Router } from "express";
import { getUsers, registerUser } from "../controllers/userController";

const userRouter = Router();
userRouter.get("/", getUsers);
userRouter.post("/", registerUser);

export default userRouter;
