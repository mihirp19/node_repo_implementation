import { IUserRepository } from "./interfaces/IUserRepository";
import { User } from "../entities/User";
import { UserModel } from "../models/UserModel";

export class UserRepository implements IUserRepository {
  // Create User
  async create(user: User): Promise<User> {
    const created = await UserModel.create(user);
    return created.toJSON() as User;
  }
  // Get Users
  async findAll(): Promise<User[]> {
    const users = await UserModel.findAll();
    return users.map((user) => user.toJSON() as User);
  }
  // Get User By Id
  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ where: { email } });
    return user ? (user.toJSON() as User) : null;
  }
  // Update User
  async update(id: string, data: Partial<User>): Promise<User | null> {
    const updateUser = await UserModel.findOne({ where: { id: id } });
    if (!updateUser) return null;
    await updateUser.update(data);
    return updateUser.toJSON();
  }
  // Delete User
  async delete(id: string): Promise<User | null> {
    const deleteUser = await UserModel.findByPk(id);
    if (!deleteUser) return null;
    await deleteUser.destroy();
    return deleteUser.toJSON();
  }
}
