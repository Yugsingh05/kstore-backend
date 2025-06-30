import { PgTransaction } from "drizzle-orm/pg-core";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import { db } from "../../../db/index";
import { cart } from "../../../db/schema";

type DBClient = PostgresJsDatabase<any> | PgTransaction<any, any, any>;

class cart_repo {
  constructor(private dbInstance: DBClient) {}

  async AddToCart(data: any) {
    return await this.dbInstance.insert(cart).values(data).returning();
  }

  async RemoveFromCart(id: string) {
    return await this.dbInstance.delete(cart).where(eq(cart.id, id));
  }

  async UpdateCart(id: string, data: any) {
    const res = await this.dbInstance
      .update(cart)
      .set(data)
      .where(eq(cart.id, id))
      .returning();
    
    return res;
  }

  async GetCart(id: string) {
    return await this.dbInstance.select().from(cart).where(eq(cart.userId, id));
  }
}

export function CartRepo(dbInstance: DBClient = db) {
  return new cart_repo(dbInstance);
}
