import { Request, Response } from "express";
import { UserService } from "../services/userServices";
import { UserRepository } from "../repository/userRepository";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json({ email: user.email, password: user.password });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
