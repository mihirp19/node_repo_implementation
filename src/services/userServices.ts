import { IUserRepository } from "../repository/interfaces/IUserRepository";
import { User } from "../entities/User";
import bcrypt from "bcrypt";

interface CreateUserDTO {
  email: string;
  password: string;
}

export class UserService {
  constructor(private userRepository: IUserRepository) {}
  async register(data: CreateUserDTO): Promise<User> {
    const exists = await this.userRepository.findByEmail(data.email);

    if (exists) throw new Error("email already exists");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser: Omit<User, "id"> = {
      email: data.email,
      password: hashedPassword,
    };

    return this.userRepository.create(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
