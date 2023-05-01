import { Connection } from "mysql2/promise";
import { User, IUser } from "./user.model";
import { hash, compare } from "bcryptjs";

export class UserService {
  constructor(private db: Connection) {}

  async getUsers(): Promise<User[]> {
    const [rows] = await this.db.query<any>("SELECT * FROM users");
    return rows;
  }

  async getUserById(id: string): Promise<User | null> {
    const [rows] = await this.db.query<any>(
      "SELECT * FROM users WHERE id = ? LIMIT 1",
      [id]
    );
    return rows.length ? rows[0] : null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const [rows] = await this.db.query<any>(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );
    return rows.length ? rows[0] : null;
  }

  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const hashedPassword = await hash(password, 12);
    const [result] = await this.db.query<any>(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    const createdUser = { id: result.insertId, name, email };
    return createdUser;
  }

  async updateUser(
    id: string,
    name?: string,
    email?: string
  ): Promise<User | null> {
    if (!name && !email) {
      throw new Error("At least one field must be provided to update user");
    }
    const user = await this.getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = {
      ...user,
      name: name || user.name,
      email: email || user.email,
    };
    await this.db.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [
      updatedUser.name,
      updatedUser.email,
      id,
    ]);
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }
    await this.db.query("DELETE FROM users WHERE id = ?", [id]);
  }

  async authenticateUser(
    email: string,
    password: string
  ): Promise<IUser | null> {
    const user: any = await this.getUserByEmail(email);
    if (!user) {
      return null;
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return null;
    }
    return user;
  }
}
