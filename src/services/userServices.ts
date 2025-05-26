import { IUserRepository } from "../repository/interfaces/IUserRepository";
import { User } from "../entities/User";
import bcrypt from "bcrypt";

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
  constructor(private userRepository: IUserRepository) {}

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
