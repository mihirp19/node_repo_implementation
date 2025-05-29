import { Request, Response } from "express";
import { UserService } from "../services/userServices";
import { UserRepository } from "../repository/userRepository";
import { RefreshTokenRepository } from "../repository/refreshTokenRepository";

const userRepository = new UserRepository();
const refreshTokenRepository = new RefreshTokenRepository();
const userService = new UserService(userRepository, refreshTokenRepository);

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.registerService(req.body);
    res.status(201).json({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "email and password are required" });
      return;
    }
    const { accessToken, refreshToken } = await userService.loginService(
      email,
      password
    );
    res.status(200).json({ accessToken, refreshToken });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsersService();
    if (users.length === 0) {
      res.status(404).json({ message: "No users found" });
      return;
    }
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const user = await userService.getUserByEmailService(email);
    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }
    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedUser = await userService.updateUserService(id, req.body);
    if (!updatedUser) {
      res.status(404).json({ message: "User not found!" });
      return;
    }
    res.status(200).json({ message: "User Updated", updatedUser });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteUser = await userService.deleteUserService(id);
    if (!deleteUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted", deleteUser });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
