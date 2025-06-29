import { PgTransaction } from "drizzle-orm/pg-core";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import { db } from "../../../db/index";
import { user as userType } from "../users.types";
import { user } from "../../../db/schema";

type DBClient = PostgresJsDatabase<any> | PgTransaction<any, any, any>;

class userRepo {
  constructor(private dbInstance: DBClient) {}

  async createUser(data: userType) {
    return await this.dbInstance.insert(user).values(data).returning();
  }

  async getAllUsers() {
    return await this.dbInstance.select().from(user);
  }

  async updateUser(id: string, data: userType) {
    return await this.dbInstance
      .update(user)
      .set(data)
      .where(eq(user.id, id))
      .returning();
  }

  async getUserById(id: string) {
    return await this.dbInstance.select().from(user).where(eq(user.id, id));
  }

  async deleteUser(id: string) {
    return await this.dbInstance.delete(user).where(eq(user.id, id));
  }
}

export function UserRepo(dbInstance: DBClient = db) {
  return new userRepo(dbInstance);
}
