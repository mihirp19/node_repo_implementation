import { IUserRepository } from "../repository/interfaces/IUserRepository";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { comparePassword } from "../utils/password";
import { generateRefreshToken, generateToken } from "../utils/token";
import { IRefreshTokenRepository } from "../repository/interfaces/IRefreshTokenRepository";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  role: "admin" | "user";
}

export class UserService {
  constructor(
    private userRepository: IUserRepository,
    private refreshTokenRepository: IRefreshTokenRepository
  ) {}

  async getAllUsersService(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserByEmailService(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async registerService(data: CreateUserDTO): Promise<User> {
    const exists = await this.userRepository.findByEmail(data.email);

    if (exists) throw new Error("email already exists");

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser: Omit<User, "id"> = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    };
    return this.userRepository.create(newUser);
  }

  async loginService(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const loginUser = await this.userRepository.findByEmail(email);

    if (!loginUser) throw new Error("user does not exists");

    const isMatch = await comparePassword(password, loginUser.password);

    if (!isMatch) {
      throw new Error("invalid email or password!");
    }
    if (!loginUser.id || !loginUser.email || !loginUser.role) {
      throw new Error("User data is incomplete");
    }

    const accessToken = generateToken({
      id: loginUser.id,
      email: loginUser.email,
      role: loginUser.role,
    });
    const refreshToken = generateRefreshToken({
      id: loginUser.id,
      email: loginUser.email,
      role: loginUser.role,
    });

    const existingToken = await this.refreshTokenRepository.findByUserId(
      loginUser.id
    );

    if (existingToken && existingToken.id) {
      await this.refreshTokenRepository.update(existingToken.id, {
        token: refreshToken,
      });
    } else {
      await this.refreshTokenRepository.create({
        token: refreshToken,
        userId: loginUser.id,
      });
    }

    return { accessToken, refreshToken };
  }

  async updateUserService(
    id: string,
    data: UpdateUserDTO
  ): Promise<User | null> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return this.userRepository.update(id, data);
  }

  async deleteUserService(id: string): Promise<User | null> {
    return this.userRepository.delete(id);
  }
}
