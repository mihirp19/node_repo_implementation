import { User } from "../../entities/User";

export interface IUserRepository {
  // Find all users
  findAll(): Promise<User[]>;
  // Find user by email
  findByEmail(email: string): Promise<User | null>;
  // Create user
  create(user: User): Promise<User>;
  // Update user
  update(id: string, data: Partial<User>): Promise<User | null>;
  // Delete user
  delete(id: string): Promise<User | null>;
}
