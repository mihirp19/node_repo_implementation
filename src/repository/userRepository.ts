import { IUserRepository } from "./interfaces/IUserRepository";
import { User } from "../entities/User";
import { UserModel } from "../models/UserModel";

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const created = await UserModel.create(user);
    return created.toJSON() as User;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ where: { email } });
    return user ? (user.toJSON() as User) : null;
  }
  async findAll(): Promise<User[]> {
    const users = await UserModel.findAll();
    return users.map((user) => user.toJSON() as User);
  }
}
